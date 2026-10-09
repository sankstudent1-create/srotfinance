import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, QrCode, Fingerprint, Calendar, Sparkles } from 'lucide-react';

export const DigitalIDModal = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

    const domain = window.location.hostname || 'srotfinance.vercel.app';
    const joinDate = new Date(user?.created_at || Date.now()).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric'
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[500] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 22 }}
                        className="max-w-md w-full glass-panel border border-[var(--border-main)] rounded-[2.5rem] overflow-hidden shadow-2xl relative"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header Holographic Banner */}
                        <div className="h-32 bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600 relative overflow-hidden p-6 flex flex-col justify-end">
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] opacity-30" />
                            <div className="relative z-10 flex justify-between items-end">
                                <div>
                                    <div className="flex items-center gap-1.5 text-white/90">
                                        <Sparkles size={14} className="text-amber-300" />
                                        <h2 className="text-xl font-black tracking-tight">Fin.ID Pass</h2>
                                    </div>
                                    <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white/70">Verified Digital Membership</p>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 p-2 rounded-xl backdrop-blur-md transition-colors text-white"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Avatar & Info */}
                        <div className="px-6 sm:px-8 pb-7 -mt-10 relative">
                            <div className="flex justify-between items-end mb-6">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-[var(--bg-secondary)] shadow-xl overflow-hidden bg-[var(--bg-secondary)] relative">
                                    <img
                                        src={user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="mb-2">
                                    <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/25">
                                        <ShieldCheck size={13} />
                                        <span className="text-[10px] font-black uppercase tracking-wider">Secured Vault</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                                        Account Holder
                                    </label>
                                    <h3 className="text-xl sm:text-2xl font-black text-[var(--text-main)] truncate">
                                        {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Fintech User'}
                                    </h3>
                                    <p className="text-xs text-[var(--text-muted)] font-medium truncate mt-0.5">{user?.email}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div className="glass-panel p-3 rounded-2xl">
                                        <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">
                                            Vault ID
                                        </label>
                                        <p className="font-mono text-xs font-bold text-[var(--text-main)] truncate">
                                            {user?.id ? `${user.id.slice(0, 10)}...` : 'SR-80942'}
                                        </p>
                                    </div>
                                    <div className="glass-panel p-3 rounded-2xl">
                                        <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">
                                            Member Since
                                        </label>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-main)]">
                                            <Calendar size={12} className="text-orange-400" />
                                            <span>{joinDate}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Biometric Hash & Verification Block */}
                                <div className="glass-panel rounded-2xl p-4 flex items-center justify-between border-orange-500/20 bg-orange-500/5">
                                    <div>
                                        <Fingerprint size={28} className="text-orange-400 mb-1.5" />
                                        <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Encrypted Cryptographic Key</p>
                                        <p className="text-xs font-mono font-bold text-orange-400 mt-0.5">SHA256: 0x9F...A3E2</p>
                                    </div>
                                    <div className="bg-white p-2 rounded-xl shrink-0 shadow-md">
                                        <QrCode size={36} className="text-slate-900" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-[var(--bg-surface)] p-3.5 text-center border-t border-[var(--border-main)]">
                            <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">
                                Powered by Srot Finance Secure Core • Swinfosystems
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
