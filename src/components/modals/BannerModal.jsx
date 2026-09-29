import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Megaphone } from 'lucide-react';
import { supabase } from '../../config/supabase';

export const BannerModal = ({ isOpen, onClose }) => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const { data, error } = await supabase.from('app_settings').select('*').eq('id', 1).single();
            if (!error && data) {
                setSettings(data);
            }
        };
        if (isOpen) fetchSettings();
    }, [isOpen]);

    if (!isOpen || !settings || !settings.show_support_banner) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="glass-panel border border-[var(--border-main)] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative"
                onClick={e => e.stopPropagation()}
            >
                {settings.support_image_url && (
                    <div className="w-full h-48 bg-[var(--bg-surface)] relative">
                        <img
                            src={settings.support_image_url}
                            alt="Announcement"
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                <div className="p-6 relative">
                    {!settings.support_image_url && (
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 w-8 h-8 rounded-xl glass-panel border border-[var(--border-main)] flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}

                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">Announcement</span>
                    </div>

                    <h2 className="text-xl font-black text-[var(--text-main)] mb-2 pr-8 leading-tight">
                        {settings.support_title || "Important Update"}
                    </h2>
                    <p className="text-xs sm:text-sm text-[var(--text-dim)] mb-6 leading-relaxed whitespace-pre-wrap">
                        {settings.support_message}
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-2xl text-xs font-black shadow-lg shadow-orange-500/25 hover:brightness-105 active:scale-95 transition-all"
                    >
                        Got it, continue
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};
