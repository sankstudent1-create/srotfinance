import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Loader2, Check, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { supabase } from '../config/supabase';

export const ResetPasswordScreen = ({ onComplete }) => {
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Password strength evaluator
    const getStrength = (pwd) => {
        let score = 0;
        if (pwd.length >= 6) score++;
        if (pwd.length >= 10) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        return score; // 0 to 5
    };

    const strength = getStrength(password);
    const strengthLabels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const strengthColors = ['bg-rose-500', 'bg-rose-500', 'bg-amber-500', 'bg-amber-400', 'bg-emerald-500', 'bg-emerald-400'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        if (password !== confirmPwd) {
            setError('Passwords do not match. Please re-enter.');
            return;
        }

        setLoading(true);
        try {
            const { error: updateErr } = await supabase.auth.updateUser({ password });
            if (updateErr) throw updateErr;

            setSuccess(true);
            setTimeout(() => {
                onComplete?.();
            }, 2000);
        } catch (err) {
            setError(err.message || 'Failed to update password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#07080D] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden text-white antialiased">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(ellipse 70% 60% at 50% -10%, rgba(249,115,22,0.18), transparent), radial-gradient(ellipse 60% 50% at 50% 110%, rgba(244,63,94,0.12), transparent)`,
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="glass-panel border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 sm:p-10 relative z-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden"
            >
                {/* Radiant top accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-orange-500/80 to-transparent" />

                {/* Header Icon */}
                <div className="text-center mb-7">
                    <motion.div
                        animate={success ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                        className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 ${
                            success
                                ? 'bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                                : 'bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.4)]'
                        }`}
                    >
                        {success ? <ShieldCheck size={32} /> : <Lock size={28} />}
                    </motion.div>

                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                        {success ? 'Password Updated!' : 'Set New Password'}
                    </h2>
                    <p className="text-xs sm:text-sm text-white/50 font-medium mt-1.5">
                        {success
                            ? 'Your security key has been updated. Redirecting to your vault...'
                            : 'Create a strong, unique password to safeguard your account'}
                    </p>
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-rose-500/15 border border-rose-500/25 text-rose-200 px-4 py-3 rounded-2xl text-xs font-semibold mb-5 flex items-start gap-2.5"
                        >
                            <span>⚠️</span>
                            <span>{error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!success ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* New Password */}
                        <div>
                            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-1.5 pl-1">
                                New Password
                            </label>
                            <div className="relative group">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-400 transition-colors" />
                                <input
                                    type={showPwd ? 'text' : 'password'}
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-11 py-3.5 text-sm font-semibold text-white placeholder:text-white/20 outline-none focus:border-orange-500/60 focus:bg-white/10 transition-all font-mono"
                                    required
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd(!showPwd)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                                >
                                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            {/* Strength indicator */}
                            {password && (
                                <div className="mt-2 space-y-1 px-1">
                                    <div className="flex justify-between items-center text-[10px] font-bold">
                                        <span className="text-white/40">Strength:</span>
                                        <span className="text-white/70">{strengthLabels[strength]}</span>
                                    </div>
                                    <div className="flex gap-1 h-1">
                                        {[1, 2, 3, 4, 5].map(step => (
                                            <div
                                                key={step}
                                                className={`flex-1 rounded-full transition-all duration-300 ${
                                                    strength >= step ? strengthColors[strength] : 'bg-white/10'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-1.5 pl-1">
                                Confirm Password
                            </label>
                            <div className="relative group">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-400 transition-colors" />
                                <input
                                    type={showConfirmPwd ? 'text' : 'password'}
                                    placeholder="••••••••••••"
                                    value={confirmPwd}
                                    onChange={e => setConfirmPwd(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-11 py-3.5 text-sm font-semibold text-white placeholder:text-white/20 outline-none focus:border-orange-500/60 focus:bg-white/10 transition-all font-mono"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                                >
                                    {showConfirmPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {confirmPwd && password && (
                                <p className={`text-[10px] font-bold mt-1.5 pl-1 ${confirmPwd === password ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {confirmPwd === password ? '✓ Passwords match' : '✗ Passwords do not match'}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-3">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full relative overflow-hidden rounded-2xl py-4 font-black text-sm tracking-wide disabled:opacity-60 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow-[0_8px_30px_rgba(249,115,22,0.4)] hover:brightness-105 transition-all"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow">
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={18} />
                                            <span>Securing Account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Update Password</span>
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </span>
                            </motion.button>
                        </div>
                    </form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-4 text-center space-y-4"
                    >
                        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-full text-xs font-bold">
                            <Check size={14} /> Password updated successfully
                        </div>
                        <p className="text-xs text-white/40 font-medium">Entering your dashboard now...</p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};
