import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, UploadCloud, Scan, Sparkles, Check, AlertCircle, FileText } from 'lucide-react';
import Tesseract from 'tesseract.js';

// Smart receipt parsing using Groq AI
const parseWithGroq = async (ocrText, groqKey) => {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${groqKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'openai/gpt-oss-120b',
            messages: [
                {
                    role: 'system',
                    content: `You are an expert receipt parser. Given OCR text from a receipt image, extract:
1. The TOTAL amount paid (number only, no currency symbols). Look for keywords like "Total", "Grand Total", "Amount Due", "Net Amount", "Balance Due", "Subtotal". Pick the largest final total.
2. The Category (choose one: Food, Shopping, Transport, Utilities, Entertainment, Health, Education, Personal Care, Bills, or Other).
3. A short vendor/store name.

IMPORTANT: Return ONLY a JSON object, no other text. Format: {"amount": 5.50, "category": "Food", "title": "Starbucks"}`
                },
                {
                    role: 'user',
                    content: `Parse this receipt text:\n\n${ocrText}`
                }
            ],
            max_tokens: 150,
            temperature: 0.1,
        }),
    });

    if (!response.ok) {
        throw new Error(`Groq error: ${response.status}`);
    }

    const data = await response.json();
    let text = data.choices[0]?.message?.content || '';
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
};

// Fallback: Smart regex-based parsing when AI is unavailable
const parseWithRegex = (ocrText) => {
    const text = ocrText.toLowerCase();

    // Look for totals
    const totalPatterns = [
        /(?:grand\s*total|total\s*amount|amount\s*due|net\s*amount|balance\s*due|total)\s*[:\-]?\s*[₹$€£]?\s*([\d,]+\.?\d*)/i,
        /[₹$€£]\s*([\d,]+\.\d{2})/g,
        /([\d,]+\.\d{2})/g,
    ];

    let amount = 0;
    for (const pattern of totalPatterns) {
        const matches = ocrText.match(pattern);
        if (matches) {
            const rawAmount = matches[1] || matches[0];
            const cleanAmount = parseFloat(rawAmount.replace(/[^\d.]/g, ''));
            if (!isNaN(cleanAmount) && cleanAmount > 0 && cleanAmount < 1000000) {
                amount = cleanAmount;
                break;
            }
        }
    }

    // Category detection
    let category = 'Shopping';
    if (/food|restaurant|cafe|coffee|starbucks|swiggy|zomato|pizza|burger|dine|eat|kitchen|bakery/i.test(text)) category = 'Food';
    else if (/uber|ola|taxi|cab|fuel|petrol|diesel|parking|metro|bus|train|flight/i.test(text)) category = 'Transport';
    else if (/pharmacy|medicine|hospital|doctor|clinic|health|medical|apollo/i.test(text)) category = 'Health';
    else if (/electricity|water|gas|wifi|internet|broadband|recharge|bill|jio|airtel/i.test(text)) category = 'Bills';
    else if (/netflix|amazon prime|spotify|movie|cinema|ticket|entertainment/i.test(text)) category = 'Entertainment';
    else if (/amazon|flipkart|myntra|mall|grocery|store|mart|reliance|dmart|bigbasket/i.test(text)) category = 'Shopping';

    // Store / vendor name
    const lines = ocrText.split('\n').map(l => l.trim()).filter(l => l.length > 2 && l.length < 50);
    let title = 'Scanned Receipt';
    if (lines.length > 0) {
        const nameLine = lines.find(l => !/^\d+[\.\-\/]/.test(l) && !/^(date|time|tel|ph|fax|gstin|gst)/i.test(l));
        if (nameLine) title = nameLine.slice(0, 40);
    }

    return { amount, category, title };
};

export const ReceiptScanner = ({ isOpen, onClose, onScanComplete }) => {
    const [scanning, setScanning] = useState(false);
    const [progressStatus, setProgressStatus] = useState("Analyzing receipt image...");
    const [progress, setProgress] = useState(0);

    const handleFile = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setScanning(true);
        setProgress(10);
        setProgressStatus("Reading receipt text (OCR)...");

        try {
            const { data: { text: ocrText } } = await Tesseract.recognize(file, 'eng', {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        setProgress(Math.round(m.progress * 65));
                    }
                }
            });

            if (!ocrText || ocrText.trim().length < 5) {
                alert("Could not recognize text from the image. Please try a clearer, higher contrast photo.");
                setScanning(false);
                return;
            }

            setProgress(75);
            let parsedData;
            const groqKey = import.meta.env.VITE_GROQ_API_KEY;

            if (groqKey) {
                try {
                    setProgressStatus("AI is parsing receipt details...");
                    parsedData = await parseWithGroq(ocrText, groqKey);
                    setProgress(95);
                } catch {
                    setProgressStatus("Parsing with smart rule engine...");
                    parsedData = parseWithRegex(ocrText);
                }
            } else {
                setProgressStatus("Parsing with smart rule engine...");
                parsedData = parseWithRegex(ocrText);
            }

            setProgress(100);

            onScanComplete({
                amount: Number(parsedData.amount) || 0,
                category: parsedData.category || 'Shopping',
                title: parsedData.title || 'Scanned Receipt',
                date: new Date().toISOString()
            });
            setScanning(false);
            onClose();

        } catch (err) {
            console.error("Scanner Error:", err);
            setScanning(false);
            alert("Failed to scan receipt. Please try again with a clearer image.");
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[500] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.92, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.92, opacity: 0, y: 20 }}
                    className="glass-panel border border-[var(--border-main)] rounded-[2.5rem] p-7 sm:p-8 max-w-sm w-full text-center relative shadow-2xl overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-9 h-9 rounded-xl glass-panel border border-[var(--border-main)] flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors"
                    >
                        <X size={18} />
                    </button>

                    {/* Scanner Visual Icon */}
                    <div className="w-20 h-20 rounded-3xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center mx-auto mb-5 relative overflow-hidden">
                        {scanning ? (
                            <>
                                <Scan size={34} className="text-orange-400 animate-pulse" />
                                <motion.div
                                    animate={{ y: [-30, 30, -30] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                    className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_8px_#f97316]"
                                />
                            </>
                        ) : (
                            <Camera size={34} className="text-orange-400" />
                        )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-[var(--text-main)] mb-1.5">
                        AI Receipt Scanner
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-medium mb-6 leading-relaxed">
                        Snap or upload an invoice. AI will automatically extract the total amount, merchant name, and category.
                    </p>

                    {scanning ? (
                        <div className="space-y-3 py-2">
                            <p className="text-xs font-bold text-orange-400 animate-pulse">{progressStatus}</p>
                            <div className="w-full h-2.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-main)] overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <span className="text-[10px] font-mono font-bold text-[var(--text-muted)]">{progress}%</span>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <button
                                type="button"
                                onClick={() => document.getElementById('cameraInput').click()}
                                className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3.5 rounded-2xl font-bold text-xs shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all"
                            >
                                <Camera size={16} /> Take Photo
                            </button>
                            <button
                                type="button"
                                onClick={() => document.getElementById('galleryInput').click()}
                                className="w-full glass-panel border border-[var(--border-main)] text-[var(--text-main)] hover:bg-[var(--bg-surface-active)] py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
                            >
                                <UploadCloud size={16} /> Upload from Gallery
                            </button>
                        </div>
                    )}

                    <input id="cameraInput" type="file" onChange={handleFile} className="hidden" accept="image/*" capture="environment" />
                    <input id="galleryInput" type="file" onChange={handleFile} className="hidden" accept="image/*" />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
