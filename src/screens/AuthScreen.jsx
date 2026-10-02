import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp, Mail, Lock, ArrowRight, Loader2, User,
    AlertCircle, WifiOff, RefreshCw, BarChart3, Shield, Zap, Eye, EyeOff, CheckCircle2
} from 'lucide-react';
import { supabase } from '../config/supabase';

const FEATURES = [
    { icon: BarChart3, label: 'Smart Analytics', desc: 'Real-time insights into your spending, cashflow & trends' },
    { icon: TrendingUp, label: 'Growth Tracking', desc: 'Watch your net worth grow with smart forecasting & SIPs' },
    { icon: Shield, label: 'Bank-Grade Security', desc: 'Biometric authentication & end-to-end encrypted storage' },
    { icon: Zap, label: 'AI Advisor', desc: 'Instant financial coaching & custom budgeting insights' },
];

export const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotSent, setForgotSent] = useState(false);
    const [supabaseDown, setSupabaseDown] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);

    useEffect(() => {
        const on = () => { setIsOffline(false); setSupabaseDown(false); setError(null); };
        const off = () => { setIsOffline(true); };
        window.addEventListener('online', on);
        window.addEventListener('offline', off);
        return () => {
            window.removeEventListener('online', on);
            window.removeEventListener('offline', off);
        };
    }, []);

    useEffect(() => {
        const t = setInterval(() => setActiveFeature(p => (p + 1) % FEATURES.length), 3200);
        return () => clearInterval(t);
    }, []);

    const friendlyError = (err) => {
        const msg = err?.message || '';
        console.error('Auth Error:', { message: msg, code: err?.code, status: err?.status });
        if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('TIMEOUT') || msg.includes('ERR_CONNECTION')) {
            setSupabaseDown(true);
            return null;
        }
        if (msg.includes('Invalid login credentials')) return 'Incorrect email or password. Please verify and try again.';
        if (msg.includes('Email not confirmed')) return 'Please confirm your email address. Check your inbox for the activation link.';
        if (msg.includes('User already registered')) return 'An account with this email already exists. Try signing in instead.';
        if (msg.includes('Password should be')) return 'Password must be at least 6 characters.';
        if (msg.includes('rate limit') || msg.includes('429')) return 'Too many attempts. Please pause for 60 seconds before retrying.';
        if (msg.includes('signup is disabled')) return 'New sign-ups are currently disabled. Please contact the administrator.';
        return msg || 'An unexpected error occurred. Please try again.';
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        if (isOffline) return;
        setLoading(true);
        setError(null);
        setSupabaseDown(false);

        try {
            if (isLogin) {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password
                });
                if (error) throw error;
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email: email.trim(),
                    password,
                    options: {
                        data: {
                            full_name: fullName.trim(),
                            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email.trim())}`
                        }
                    },
                });
                if (error) throw error;
                alert('Account created successfully! Check your email for the confirmation link.');
            }
        } catch (err) {
            const msg = friendlyError(err);
            if (msg) setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        if (isOffline) return;
        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
            if (error) throw error;
        } catch (err) {
            const msg = friendlyError(err);
            if (msg) setError(msg);
        }
    };

    const handleForgotPassword = async () => {
        if (!email.trim()) {
            setError('Please enter your email address first, then click Forgot Password.');
            return;
        }
        setForgotLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
                redirectTo: window.location.origin,
            });
            if (error) throw error;
            setForgotSent(true);
            setTimeout(() => setForgotSent(false), 8000);
        } catch (err) {
            const msg = friendlyError(err);
            if (msg) setError(msg);
        } finally {
            setForgotLoading(false);
        }
    };

    // Demo Mode removed (Oct 2026): the button filled demo@srotfinance.app credentials for a
    // Supabase account that was never seeded, so sign-in always failed with
    // "Incorrect email or password". Re-add only after a real demo account exists.

    return (
        <div className="min-h-screen w-full font-sans bg-[#07080D] flex lg:grid lg:grid-cols-2 text-white antialiased selection:bg-orange-500/30 selection:text-white">

            {/* LEFT BRANDING PANEL */}
            <div className="hidden lg:flex relative flex-col justify-between p-14 xl:p-16 overflow-hidden">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(ellipse 80% 80% at 50% -20%, rgba(249,115,22,0.18), transparent), radial-gradient(ellipse 60% 50% at -10% 80%, rgba(244,63,94,0.12), transparent)`,
                        }}
                    />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-1/4 -right-1/4 w-[750px] h-[750px] rounded-full pointer-events-none"
                        style={{ background: 'conic-gradient(from 0deg, transparent, rgba(249,115,22,0.08), transparent, rgba(251,146,60,0.06), transparent)' }}
                    />
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                            backgroundSize: '50px 50px'
                        }}
                    />
                </div>

                {/* Top Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white p-2 overflow-hidden shadow-[0_0_35px_rgba(249,115,22,0.4)] border border-orange-500/30 flex items-center justify-center">
                        <img src="/logo.png" alt="Srot Finance" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white">Srot <span className="font-light text-white/50">Finance</span></h1>
                        <p className="text-[10px] font-extrabold text-orange-400 uppercase tracking-widest">Smart Money Operating System</p>
                    </div>
                </div>

                {/* Hero Showcase */}
                <div className="relative z-10 space-y-8 max-w-lg">
                    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
                        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 rounded-full px-4 py-1.5 mb-6">
                            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Financial Clarity & Freedom</span>
                        </div>
                        <h2 className="text-5xl xl:text-6xl font-black leading-[1.08] tracking-tight">
                            Take complete command of{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400">every rupee.</span>
                        </h2>
                        <p className="mt-5 text-base xl:text-lg text-white/60 font-medium leading-relaxed">
                            Intuitive expense tracking, SIP & compounding calculators, AI-guided budgeting, and bank-grade privacy — designed for modern life.
                        </p>
                    </motion.div>

                    {/* Features list */}
                    <div className="space-y-3">
                        {FEATURES.map((f, i) => (
                            <motion.div
                                key={i}
                                animate={{ opacity: activeFeature === i ? 1 : 0.4, x: activeFeature === i ? 0 : -4 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-4 cursor-pointer p-2.5 rounded-2xl transition-colors hover:bg-white/5"
                                onClick={() => setActiveFeature(i)}
                            >
                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                                    activeFeature === i ? 'bg-gradient-to-br from-orange-500 to-rose-500 shadow-[0_0_25px_rgba(249,115,22,0.45)] text-white' : 'bg-white/5 border border-white/10 text-white/40'
                                }`}>
                                    <f.icon size={20} />
                                </div>
                                <div>
                                    <p className={`text-sm font-bold transition-colors ${activeFeature === i ? 'text-white' : 'text-white/50'}`}>{f.label}</p>
                                    <p className={`text-xs transition-colors ${activeFeature === i ? 'text-white/70' : 'text-white/30'}`}>{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center gap-5 pt-3">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4, 5].map(i => (
                                <img
                                    key={i}
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user_${i * 27}`}
                                    className="w-10 h-10 rounded-full border-2 border-[#07080D] bg-[#14161A] shadow-md"
                                    alt="User Avatar"
                                />
                            ))}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">10,000+ active users</p>
                            <p className="text-xs text-amber-400 font-bold">★★★★★ 4.9 average satisfaction</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 text-white/30 text-xs font-medium">
                    © {new Date().getFullYear()} Srot Finance by Swinfosystems •{' '}
                    <a href="https://srotfinance.vercel.app" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors">
                        srotfinance.vercel.app
                    </a>
                </div>
            </div>

            {/* RIGHT AUTH CARD PANEL */}
            <div className="w-full flex items-center justify-center p-4 sm:p-8 relative z-10 bg-[#0A0C12] lg:border-l border-white/5 overflow-y-auto">
                {/* Mobile ambient glow */}
                <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(249,115,22,0.15), transparent)` }} />
                </div>

                <div className="w-full max-w-[440px] relative z-10 py-6">
                    {/* Mobile Header Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                        <div className="w-11 h-11 rounded-2xl bg-white p-2 overflow-hidden shadow-[0_0_25px_rgba(249,115,22,0.4)]">
                            <img src="/logo.png" alt="Srot Finance" className="w-full h-full object-contain" />
                        </div>
                        <h1 className="text-2xl font-black">Srot <span className="font-light text-white/50">Finance</span></h1>
                    </div>

                    {/* Auth Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="glass-panel border border-white/10 rounded-[2.5rem] p-7 sm:p-9 relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
                    >
                        {/* Radiant highlight line */}
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-orange-500/80 to-transparent" />

                        {/* Title & Mode Switcher */}
                        <div className="mb-7 text-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isLogin ? 'login' : 'signup'}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                        {isLogin ? 'Welcome back' : 'Create an account'}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-white/50 font-medium mt-1">
                                        {isLogin ? 'Sign in to access your financial dashboard' : 'Start your journey to financial discipline & freedom'}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Alerts & Notifications */}
                        <AnimatePresence>
                            {isOffline && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-3 bg-rose-500/15 border border-rose-500/25 text-rose-200 px-4 py-3 rounded-2xl text-xs font-semibold mb-4"
                                >
                                    <WifiOff size={16} className="text-rose-400 shrink-0" />
                                    <div>
                                        <p className="font-bold text-rose-100">You are offline</p>
                                        <p className="text-rose-300/80 font-normal">Check internet connection to sign in.</p>
                                    </div>
                                </motion.div>
                            )}
                            {supabaseDown && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-orange-500/15 border border-orange-500/25 px-4 py-3 rounded-2xl text-xs mb-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <AlertCircle size={16} className="text-orange-400 shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="font-bold text-orange-200">Server Waking Up</p>
                                            <p className="text-orange-300/70 mt-0.5">Please wait a few seconds while backend starts.</p>
                                            <button
                                                type="button"
                                                onClick={() => { setSupabaseDown(false); setError(null); }}
                                                className="mt-2 text-[11px] font-bold bg-orange-500/25 text-orange-200 px-3 py-1 rounded-lg flex items-center gap-1.5 hover:bg-orange-500/40 transition-colors"
                                            >
                                                <RefreshCw size={11} /> Retry Now
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-rose-500/15 border border-rose-500/25 text-rose-200 px-4 py-3 rounded-2xl text-xs font-semibold flex items-start gap-3 mb-4"
                                >
                                    <AlertCircle size={16} className="mt-0.5 shrink-0 text-rose-400" />
                                    <div>
                                        <p className="font-bold text-rose-100">Notice</p>
                                        <p className="text-rose-300/90 font-normal mt-0.5">{error}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Form */}
                        <form onSubmit={handleAuth} className="space-y-4">
                            {/* Full Name (Sign Up only) */}
                            <AnimatePresence mode="wait">
                                {!isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-1.5 pl-1">
                                            Full Name
                                        </label>
                                        <div className="relative group">
                                            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-400 transition-colors" />
                                            <input
                                                type="text"
                                                placeholder="e.g. Alex Morgan"
                                                value={fullName}
                                                onChange={e => setFullName(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold text-white placeholder:text-white/20 outline-none focus:border-orange-500/60 focus:bg-white/10 transition-all"
                                                required={!isLogin}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-1.5 pl-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-400 transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="you@domain.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold text-white placeholder:text-white/20 outline-none focus:border-orange-500/60 focus:bg-white/10 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5 pl-1 pr-1">
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider">
                                        Password
                                    </label>
                                    {isLogin && (
                                        <AnimatePresence>
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                                {forgotSent ? (
                                                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                                                        <CheckCircle2 size={12} /> Reset email sent!
                                                    </span>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={handleForgotPassword}
                                                        disabled={forgotLoading}
                                                        className="text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors disabled:opacity-50"
                                                    >
                                                        {forgotLoading ? 'Sending link...' : 'Forgot password?'}
                                                    </button>
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    )}
                                </div>
                                <div className="relative group">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-400 transition-colors" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••••••"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-11 py-3.5 text-sm font-semibold text-white placeholder:text-white/20 outline-none focus:border-orange-500/60 focus:bg-white/10 transition-all font-mono"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading || isOffline}
                                    className="w-full relative overflow-hidden rounded-2xl py-4 font-black text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow-[0_8px_30px_rgba(249,115,22,0.4)] hover:brightness-105 transition-all"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow">
                                        {loading ? (
                                            <>
                                                <Loader2 className="animate-spin" size={18} />
                                                <span>Processing Secure Login...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>{isLogin ? 'Sign In Securely' : 'Create My Account'}</span>
                                                <ArrowRight size={18} />
                                            </>
                                        )}
                                    </span>
                                </motion.button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6 flex items-center gap-4">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">or continue with</span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        {/* Social Buttons */}
                        <div className="w-full">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10 py-3 rounded-2xl font-bold text-xs text-white transition-all"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span>Google</span>
                            </motion.button>
                        </div>

                        {/* Switch Mode */}
                        <div className="mt-7 text-center">
                            <p className="text-xs text-white/40 font-medium">
                                {isLogin ? "Don't have an account yet?" : "Already registered?"}{' '}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setError(null);
                                    }}
                                    className="text-orange-400 font-bold hover:text-orange-300 transition-colors ml-1 underline underline-offset-4"
                                >
                                    {isLogin ? 'Sign up free' : 'Sign in instead'}
                                </button>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
