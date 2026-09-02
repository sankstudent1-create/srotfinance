
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Mail, Lock, ArrowRight, Loader2, Sparkles, User, AlertCircle, WifiOff, RefreshCw, BarChart3, Shield, Zap } from 'lucide-react';
import { supabase } from '../config/supabase';

const FEATURES = [
    { icon: BarChart3, label: 'Smart Analytics', desc: 'Real-time insights into your spending & investments' },
    { icon: TrendingUp, label: 'Growth Tracking', desc: 'Watch your net worth grow with smart forecasting' },
    { icon: Shield, label: 'Bank-Grade Security', desc: 'Biometric auth & end-to-end encrypted data' },
    { icon: Zap, label: 'AI Advisor', desc: 'Personal AI that gives tailored financial advice' },
];

export const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
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
        return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
    }, []);

    useEffect(() => {
        const t = setInterval(() => setActiveFeature(p => (p + 1) % FEATURES.length), 3000);
        return () => clearInterval(t);
    }, []);

    const friendlyError = (err) => {
        const msg = err?.message || '';
        console.error('%c?? Auth Error', 'color:#ef4444;font-weight:bold', { message: msg, code: err?.code, status: err?.status, raw: err });
        if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('TIMEOUT') || msg.includes('ERR_CONNECTION')) {
            setSupabaseDown(true); return null;
        }
        if (msg.includes('Invalid login credentials')) return 'Wrong email or password. Please try again.';
        if (msg.includes('Email not confirmed')) return 'Please confirm your email first. Check your inbox for the verification link.';
        if (msg.includes('User already registered')) return 'An account with this email already exists. Try signing in instead.';
        if (msg.includes('Password should be')) return 'Password must be at least 6 characters.';
        if (msg.includes('rate limit') || msg.includes('429')) return 'Too many attempts. Please wait a minute before trying again.';
        if (msg.includes('signup is disabled')) return 'New sign-ups are currently disabled. Contact the administrator.';
        return msg || 'An unexpected error occurred. See browser console for details.';
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        if (isOffline) return;
        setLoading(true); setError(null); setSupabaseDown(false);
        console.group('%c?? Auth Attempt', 'color:#f97316;font-weight:bold');
        try {
            if (isLogin) {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                console.log('%c? Sign In OK', 'color:#16a34a;font-weight:bold', data?.user?.email);
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email, password,
                    options: { data: { full_name: fullName, avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}` } },
                });
                if (error) throw error;
                console.log('%c? Sign Up OK', 'color:#16a34a;font-weight:bold', data?.user?.email);
                alert('Account created! Check your email for the confirmation link.');
            }
        } catch (err) {
            const msg = friendlyError(err);
            if (msg) setError(msg);
        } finally {
            console.groupEnd();
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
        if (!email.trim()) { setError('Please enter your email address first, then click Forgot Password.'); return; }
        setForgotLoading(true); setError(null);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
                redirectTo: 'https://srotfinance.vercel.app',
            });
            if (error) throw error;
            setForgotSent(true);
            setTimeout(() => setForgotSent(false), 8000);
        } catch (err) {
            const msg = friendlyError(err);
            if (msg) setError(msg);
        }
        setForgotLoading(false);
    };

    return (
        <div className="min-h-screen w-full font-sans overflow-hidden bg-[#07080D] flex lg:grid lg:grid-cols-2 text-white antialiased">

            {/* LEFT PANEL */}
            <div className="hidden lg:flex relative flex-col justify-between p-14 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(ellipse 80% 80% at 50% -20%, rgba(249,115,22,0.15), transparent), radial-gradient(ellipse 60% 50% at -10% 80%, rgba(244,63,94,0.1), transparent)`,
                    }} />
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-1/4 -right-1/4 w-[700px] h-[700px] rounded-full"
                        style={{ background: 'conic-gradient(from 0deg, transparent, rgba(249,115,22,0.08), transparent, rgba(251,146,60,0.06), transparent)' }}
                    />
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }} />
                </div>

                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white overflow-hidden shadow-[0_0_40px_rgba(249,115,22,0.4)] border border-orange-500/20">
                        <img src="/logo.png" alt="Srot Finance" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white">Srot <span className="font-light text-white/50">Finance</span></h1>
                        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Smart Money Platform</p>
                    </div>
                </div>

                <div className="relative z-10 space-y-8 max-w-lg">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
                            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Your Financial OS</span>
                        </div>
                        <h2 className="text-5xl xl:text-6xl font-black leading-[1.05] tracking-tighter">
                            Take control of{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400">every rupee.</span>
                        </h2>
                        <p className="mt-5 text-lg text-white/50 font-medium leading-relaxed">
                            Enterprise-grade analytics, AI-powered advice, and beautiful insights — all in one place.
                        </p>
                    </motion.div>

                    <div className="space-y-3">
                        {FEATURES.map((f, i) => (
                            <motion.div key={i}
                                animate={{ opacity: activeFeature === i ? 1 : 0.35, x: activeFeature === i ? 0 : -6 }}
                                transition={{ duration: 0.4 }}
                                className="flex items-center gap-4 cursor-pointer"
                                onClick={() => setActiveFeature(i)}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${activeFeature === i ? 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]' : 'bg-white/5 border border-white/10'}`}>
                                    <f.icon size={18} className={activeFeature === i ? 'text-white' : 'text-white/40'} />
                                </div>
                                <div>
                                    <p className={`text-sm font-bold transition-colors ${activeFeature === i ? 'text-white' : 'text-white/40'}`}>{f.label}</p>
                                    <p className={`text-xs transition-colors ${activeFeature === i ? 'text-white/60' : 'text-white/20'}`}>{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                        <div className="flex -space-x-3">
                            {[1,2,3,4,5].map(i => (
                                <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=sf${i*13}`}
                                    className="w-10 h-10 rounded-full border-2 border-[#07080D] bg-[#14161A]" alt="user" />
                            ))}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">10,000+ active users</p>
                            <p className="text-xs text-orange-400 font-semibold">????? 4.9 avg rating</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-white/20 text-xs font-medium">
                    © {new Date().getFullYear()} Srot Finance by Swinfosystems ·{' '}
                    <a href="https://srotfinance.vercel.app" className="hover:text-orange-500 transition-colors">srotfinance.vercel.app</a>
                </div>
            </div>

            {/* RIGHT AUTH PANEL */}
            <div className="w-full flex items-center justify-center p-4 sm:p-8 relative z-10 bg-[#0C0D14] lg:border-l border-white/5">
                <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(249,115,22,0.12), transparent)` }} />
                </div>

                <div className="w-full max-w-[420px] relative z-10">
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-xl bg-white overflow-hidden shadow-[0_0_30px_rgba(249,115,22,0.4)]">
                            <img src="/logo.png" alt="Srot Finance" className="w-full h-full object-contain" />
                        </div>
                        <h1 className="text-xl font-black">Srot <span className="font-light text-white/40">Finance</span></h1>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}>
                        <div className="relative w-full rounded-3xl overflow-hidden" style={{
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
                        }}>
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-orange-500/10 blur-3xl pointer-events-none" />

                            <div className="p-8 sm:p-10">
                                <div className="mb-8 text-center">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
                                        className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white overflow-hidden shadow-[0_0_30px_rgba(249,115,22,0.35)]"
                                    >
                                        <img src="/logo.png" alt="Srot Finance" className="w-full h-full object-contain" />
                                    </motion.div>
                                    <AnimatePresence mode="wait">
                                        <motion.div key={isLogin ? 'login' : 'signup'}
                                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                                            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                                {isLogin ? 'Welcome back' : 'Create account'}
                                            </h2>
                                            <p className="text-sm text-white/40 font-medium mt-1.5">
                                                {isLogin ? 'Sign in to your Srot Finance dashboard' : 'Start your journey to financial freedom'}
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <AnimatePresence>
                                    {isOffline && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                            className="flex items-center gap-3 bg-rose-500/15 border border-rose-500/25 text-rose-200 px-4 py-3 rounded-2xl text-xs font-semibold mb-5">
                                            <WifiOff size={16} className="text-rose-400 shrink-0" />
                                            <div><p className="font-bold text-rose-100">You're offline</p><p className="text-rose-300/70 font-normal">Reconnect to access your account.</p></div>
                                        </motion.div>
                                    )}
                                    {supabaseDown && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                            className="bg-orange-500/15 border border-orange-500/25 px-4 py-3 rounded-2xl text-xs mb-5">
                                            <div className="flex items-start gap-3">
                                                <AlertCircle size={16} className="text-orange-400 shrink-0 mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="font-bold text-orange-200">Backend Unreachable</p>
                                                    <p className="text-orange-300/60 mt-0.5">The server is starting up or unresponsive.</p>
                                                    <button onClick={() => { setSupabaseDown(false); setError(null); }}
                                                        className="mt-2 text-[11px] font-bold bg-orange-500/25 text-orange-200 px-3 py-1 rounded-lg flex items-center gap-1.5 hover:bg-orange-500/40 transition-colors">
                                                        <RefreshCw size={11} /> Retry Connection
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                    {error && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                            className="bg-rose-500/15 border border-rose-500/25 text-rose-200 px-4 py-3 rounded-2xl text-xs font-semibold flex items-start gap-3 mb-5">
                                            <AlertCircle size={16} className="mt-0.5 shrink-0 text-rose-400" />
                                            <div><p className="font-bold text-rose-100">Authentication Failed</p><p className="text-rose-300/80 font-normal mt-0.5">{error}</p></div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form onSubmit={handleAuth} className="space-y-3">
                                    <AnimatePresence mode="wait">
                                        {!isLogin && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
                                                <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-1.5 pl-1">Full Name</label>
                                                <div className="relative group">
                                                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-orange-400 transition-colors" />
                                                    <input type="text" placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold text-white placeholder:text-white/20 outline-none focus:border-orange-500/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] transition-all"
                                                        required={!isLogin} />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div>
                                        <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-1.5 pl-1">Email Address</label>
                                        <div className="relative group">
                                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-orange-400 transition-colors" />
                                            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold text-white placeholder:text-white/20 outline-none focus:border-orange-500/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] transition-all"
                                                required />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1.5 pl-1 pr-1">
                                            <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Password</label>
                                            {isLogin && (
                                                <AnimatePresence>
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                                        {forgotSent
                                                            ? <span className="text-xs font-bold text-emerald-400">? Reset link sent!</span>
                                                            : <button type="button" onClick={handleForgotPassword} disabled={forgotLoading}
                                                                className="text-xs font-bold text-orange-400/70 hover:text-orange-400 transition-colors disabled:opacity-50">
                                                                {forgotLoading ? 'Sending...' : 'Forgot password?'}
                                                              </button>
                                                        }
                                                    </motion.div>
                                                </AnimatePresence>
                                            )}
                                        </div>
                                        <div className="relative group">
                                            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-orange-400 transition-colors" />
                                            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold text-white placeholder:text-white/20 outline-none focus:border-orange-500/50 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] transition-all"
                                                required />
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                                            type="submit" disabled={loading || isOffline}
                                            className="w-full relative overflow-hidden rounded-2xl py-4 font-black text-base tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
                                            style={{ background: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #f43f5e 100%)', boxShadow: '0 8px 32px rgba(249,115,22,0.4), 0 1px 0 rgba(255,255,255,0.2) inset' }}
                                        >
                                            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                            <span className="relative z-10 flex items-center justify-center gap-2 text-white drop-shadow">
                                                {loading ? <><Loader2 className="animate-spin" size={18} /> Processing...</>
                                                    : <>{isLogin ? 'Sign In Securely' : 'Create My Account'} <ArrowRight size={18} /></>}
                                            </span>
                                        </motion.button>
                                    </div>
                                </form>

                                <div className="relative my-6 flex items-center gap-4">
                                    <div className="flex-1 h-px bg-white/10" />
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">or continue with</span>
                                    <div className="flex-1 h-px bg-white/10" />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                        type="button" onClick={handleGoogleLogin}
                                        className="flex items-center justify-center gap-2.5 bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10 py-3 rounded-2xl font-bold text-sm text-white transition-all">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Google
                                    </motion.button>
                                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                        type="button" onClick={() => alert("Guest mode coming soon!")}
                                        className="flex items-center justify-center gap-2.5 bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10 py-3 rounded-2xl font-bold text-sm text-white transition-all">
                                        <Sparkles size={16} className="text-orange-400" />
                                        Guest
                                    </motion.button>
                                </div>

                                <div className="mt-7 text-center">
                                    <p className="text-sm text-white/30 font-medium">
                                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                                        <button onClick={() => { setIsLogin(!isLogin); setError(null); }}
                                            className="text-orange-400 font-bold hover:text-orange-300 transition-colors ml-1 underline underline-offset-2">
                                            {isLogin ? 'Sign up free' : 'Sign in instead'}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-6 mt-6">
                            {['Encrypted', 'No Ads', 'Open Source'].map(b => (
                                <div key={b} className="flex items-center gap-1.5 text-white/25 text-xs font-bold">
                                    <Shield size={11} className="text-orange-500/50" />
                                    {b}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};