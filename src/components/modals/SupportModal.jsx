import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ArrowRight, QrCode, Smartphone, Copy, Check, ExternalLink, Shield } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const UPI_ID = 'agriwadi464881.rzp@icici';
const MERCHANT_NAME = 'Agriwadi - Swinfosystems';
const APP_NAME = 'Srot Finance';

const TIERS = [
    { amt: 49, label: 'Coffee', emoji: '☕', desc: 'Buy us a coffee', gradient: 'from-amber-400 to-orange-500' },
    { amt: 199, label: 'Supporter', emoji: '🌟', desc: 'Fuel development', gradient: 'from-orange-500 to-rose-500', popular: true },
    { amt: 499, label: 'Champion', emoji: '👑', desc: 'Fintech patron', gradient: 'from-violet-500 to-purple-600' },
];

const UPI_APPS = [
    { name: 'Google Pay', scheme: 'tez://upi/', pkg: 'com.google.android.apps.nbu.paisa.user', icon: '⚡', color: 'from-blue-500 to-blue-600' },
    { name: 'PhonePe', scheme: 'phonepe://pay', pkg: 'com.phonepe.app', icon: '📱', color: 'from-indigo-500 to-purple-600' },
    { name: 'Paytm', scheme: 'paytmmp://pay', pkg: 'net.one97.paytm', icon: '💳', color: 'from-sky-400 to-blue-500' },
    { name: 'Any UPI', scheme: 'upi://pay', pkg: null, icon: '🏦', color: 'from-slate-600 to-slate-800' },
];

const buildUpiUrl = (amount) => {
    const params = new URLSearchParams({
        pa: UPI_ID,
        pn: MERCHANT_NAME,
        tn: `Support ${APP_NAME}`,
        cu: 'INR',
    });
    if (amount) params.set('am', amount.toString());
    return `upi://pay?${params.toString()}`;
};

export const SupportModal = ({ isOpen, onClose }) => {
    const [customAmount, setCustomAmount] = useState('');
    const [selected, setSelected] = useState(199);
    const [copied, setCopied] = useState(false);
    const [showQR, setShowQR] = useState(true);

    const finalAmt = customAmount ? parseInt(customAmount) : selected;
    const upiUrl = useMemo(() => buildUpiUrl(finalAmt), [finalAmt]);

    const handleCopyUPI = () => {
        navigator.clipboard?.writeText(UPI_ID).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleOpenApp = (app) => {
        const params = new URLSearchParams({
            pa: UPI_ID,
            pn: MERCHANT_NAME,
            tn: `Support ${APP_NAME}`,
            cu: 'INR',
        });
        if (finalAmt) params.set('am', finalAmt.toString());

        const schemeBase = app.scheme === 'tez://upi/' ? 'tez://upi/pay' : app.scheme;
        const url = `${schemeBase}?${params.toString()}`;

        if (/android/i.test(navigator.userAgent) && app.pkg) {
            const intentUrl = `intent://pay?${params.toString()}#Intent;scheme=upi;package=${app.pkg};end`;
            window.location.href = intentUrl;
        } else {
            window.location.href = url;
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 60, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 60, opacity: 0, scale: 0.96 }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                className="w-full sm:max-w-md glass-panel border border-[var(--border-main)] sm:rounded-[2.5rem] rounded-t-[2.5rem] overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Mobile drag bar */}
                <div className="flex justify-center pt-3 sm:hidden shrink-0">
                    <div className="w-10 h-1 bg-[var(--border-main)] rounded-full" />
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-2xl glass-panel text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors border border-[var(--border-main)] z-10"
                >
                    <X size={16} />
                </button>

                {/* Top Radiant Line */}
                <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-amber-400 to-rose-500 shrink-0" />

                <div className="flex-1 overflow-y-auto px-6 pb-8 pt-5 sm:px-8 sm:pb-8 hide-scrollbar">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/25 shrink-0">
                            <Heart size={22} className="text-white fill-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-[var(--text-main)] leading-tight">Support Srot Finance</h2>
                            <p className="text-xs text-[var(--text-muted)] font-medium">Crafted with care by Swinfosystems</p>
                        </div>
                    </div>

                    <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6 font-medium">
                        We build Srot Finance with ❤️ to give you absolute clarity over every rupee. Your support powers hosting, new features, and continuous updates!
                    </p>

                    {/* Tier selector */}
                    <div className="grid grid-cols-3 gap-2.5 mb-5">
                        {TIERS.map(tier => {
                            const isSel = selected === tier.amt && !customAmount;
                            return (
                                <button
                                    key={tier.amt}
                                    type="button"
                                    onClick={() => { setSelected(tier.amt); setCustomAmount(''); }}
                                    className={`relative p-3 rounded-2xl border transition-all text-center flex flex-col items-center justify-between ${
                                        isSel
                                            ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/15'
                                            : 'glass-panel border-[var(--border-main)] hover:bg-[var(--bg-surface-active)]'
                                    }`}
                                >
                                    {tier.popular && (
                                        <span className="absolute -top-2.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                                            Popular
                                        </span>
                                    )}
                                    <span className="text-xl mb-1">{tier.emoji}</span>
                                    <span className="font-mono font-black text-sm text-[var(--text-main)]">₹{tier.amt}</span>
                                    <span className="text-[10px] font-bold text-[var(--text-muted)] mt-0.5">{tier.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Custom Amount */}
                    <div className="relative mb-5">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] font-bold text-sm">₹</span>
                        <input
                            type="number"
                            placeholder="Custom amount (e.g. 250)"
                            value={customAmount}
                            onChange={e => setCustomAmount(e.target.value)}
                            className="w-full bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl pl-9 pr-4 py-3 font-bold text-sm text-[var(--text-main)] outline-none focus:border-orange-500 transition-all font-mono"
                        />
                    </div>

                    {/* QR Code toggle card */}
                    <div className="glass-panel p-5 rounded-3xl border border-[var(--border-main)] text-center mb-5">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-bold text-[var(--text-main)]">Scan UPI QR Code</span>
                            <span className="font-mono font-black text-sm text-orange-400">₹{finalAmt || 0}</span>
                        </div>

                        {showQR && (
                            <div className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl mx-auto w-fit shadow-md mb-3">
                                <QRCodeSVG value={upiUrl} size={150} level="M" />
                            </div>
                        )}

                        {/* UPI ID copy */}
                        <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                            <span className="font-mono text-xs font-bold text-[var(--text-dim)] truncate select-all">{UPI_ID}</span>
                            <button
                                type="button"
                                onClick={handleCopyUPI}
                                className="px-3 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-xs font-bold transition-all shrink-0 flex items-center gap-1"
                            >
                                {copied ? <Check size={12} /> : <Copy size={12} />}
                                <span>{copied ? 'Copied' : 'Copy'}</span>
                            </button>
                        </div>
                    </div>

                    {/* UPI Quick Open Apps */}
                    <div className="space-y-2">
                        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Or open UPI app directly</p>
                        <div className="grid grid-cols-2 gap-2">
                            {UPI_APPS.map(app => (
                                <button
                                    key={app.name}
                                    type="button"
                                    onClick={() => handleOpenApp(app)}
                                    className="p-3 rounded-2xl glass-panel border border-[var(--border-main)] hover:border-orange-500/30 flex items-center gap-2.5 text-xs font-bold text-[var(--text-main)] active:scale-95 transition-all"
                                >
                                    <span className="text-base">{app.icon}</span>
                                    <span>{app.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
