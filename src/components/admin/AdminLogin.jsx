import React, { useState } from 'react';
import { supabase } from '../../config/supabase';
import { Mail, KeyRound, Loader2, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminLogin = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');

    // UI State
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [step, setStep] = useState('password'); // 'password' or 'otp'

    // To store intermediate session while waiting for 2FA
    const [tempSession, setTempSession] = useState(null);

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // 1. Standard Email & Password Authentication
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (signInError) {
            setError(signInError.message);
            setLoading(false);
            return;
        }

        // 2. Check if user is an admin before sending OTP
        const { data: isAdminData, error: adminError } = await supabase.rpc('is_admin');

        if (adminError || isAdminData !== true) {
            await supabase.auth.signOut();
            setError("Access denied. You are not an admin.");
            setLoading(false);
            return;
        }

        setTempSession(data.session);

        // 3. Send OTP to email
        try {
            const res = await fetch('/api/send-admin-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.session?.access_token}`
                },
                body: JSON.stringify({ email: email })
            });
            const otpData = await res.json();

            if (!res.ok || !otpData.success) {
                throw new Error(otpData.error || 'Failed to send OTP email');
            }

            // Success, move to OTP step
            setStep('otp');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to trigger 2FA email.');
            // Sign out since 2FA failed
            await supabase.auth.signOut();
            setTempSession(null);
        }

        setLoading(false);
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // 4. Verify OTP using backend RPC
        const { data: isValid, error: verifyError } = await supabase.rpc('verify_admin_otp', {
            submitted_code: otp
        });

        if (verifyError || !isValid) {
            setError('Invalid or expired 2FA code.');
            setLoading(false);
            return;
        }

        // 5. Success! Complete Login
        onLoginSuccess(tempSession);
        // AdminScreen.jsx handles the loading state as it verifies the backend authorization
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-4 selection:bg-rose-500/30 relative overflow-hidden">
            {/* Background ambient lighting */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(ellipse 70% 60% at 50% -10%, rgba(249,115,22,0.18), transparent), radial-gradient(ellipse 60% 50% at 50% 110%, rgba(244,63,94,0.12), transparent)` }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md glass-panel rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden border border-main z-10"
            >
                {/* Decorative border */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500" />

                <div className="mb-8 text-center pt-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-rose-500/20 border border-orange-500/30 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-orange-500/10">
                        <ShieldCheck size={32} className="text-orange-400" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-2xl font-black text-main tracking-tight">Admin Portal</h2>
                    <p className="text-xs font-semibold text-dim mt-1.5">Secure restricted access console</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 mb-6 bg-rose-500/15 border border-rose-500/30 rounded-2xl text-rose-500 dark:text-rose-400 text-xs font-bold text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    {step === 'password' ? (
                        <motion.form
                            key="password-step"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handlePasswordSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-[10px] font-black text-dim uppercase tracking-widest mb-2 ml-1">Admin Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@swinfosystems.online"
                                        className="w-full pl-12 pr-4 py-3.5 bg-secondary/80 border border-main rounded-2xl text-sm font-semibold text-main placeholder:text-dim/50 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-dim uppercase tracking-widest mb-2 ml-1 mt-4">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" size={18} />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full pl-12 pr-4 py-3.5 bg-secondary/80 border border-main rounded-2xl text-sm font-bold tracking-widest text-main placeholder:text-dim/50 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading || !email || !password}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white p-4 rounded-2xl text-sm font-black hover:brightness-105 active:scale-95 disabled:opacity-50 transition-all shadow-xl shadow-orange-500/25 mt-6"
                            >
                                {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                                Next
                            </button>
                            <p className="text-[10px] text-center text-dim mt-4 font-semibold uppercase tracking-widest">
                                Protected by Supabase RPC Authorizers
                            </p>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="otp-step"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleOtpSubmit}
                            className="space-y-4"
                        >
                            <div className="bg-orange-500/10 border border-orange-500/25 rounded-2xl p-4 text-center mb-6">
                                <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">
                                    2FA Code sent to
                                </p>
                                <p className="text-xs font-black text-main mt-1">{email}</p>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-dim uppercase tracking-widest mb-2 text-center">Enter 6-Digit Code</label>
                                <div className="relative max-w-[240px] mx-auto">
                                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" size={18} />
                                    <input
                                        type="text"
                                        required
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // only numbers
                                        placeholder="000000"
                                        className="w-full pl-12 pr-4 py-4 bg-secondary/80 border-2 border-main rounded-2xl text-2xl font-black tracking-[0.5em] text-center text-main focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all shadow-inner font-mono"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white p-4 rounded-2xl text-sm font-black hover:brightness-105 active:scale-95 disabled:opacity-50 transition-all shadow-xl shadow-orange-500/25 mt-6"
                            >
                                {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                                Verify & Authorize
                            </button>

                            <button
                                type="button"
                                onClick={async () => {
                                    await supabase.auth.signOut();
                                    setStep('password');
                                    setOtp('');
                                    setTempSession(null);
                                }}
                                className="w-full mt-4 text-xs font-bold text-dim hover:text-main transition-colors text-center"
                            >
                                Cancel & Return to Login
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
