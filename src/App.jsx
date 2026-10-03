import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { supabase } from './config/supabase';
import { AuthScreen } from './screens/AuthScreen';
import { ResetPasswordScreen } from './screens/ResetPasswordScreen';
import { Dashboard } from './screens/Dashboard';
import { SupportModal } from './components/modals/SupportModal';
import { BannerModal } from './components/modals/BannerModal';

import { AdminScreen } from './screens/admin/AdminScreen';
import { BiometricLock } from './components/modals/BiometricLock';
import { getUserPrefs } from './components/modals/SettingsModal';

// Public SEO pages (light-themed, indexable)
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import FeaturesPage from './pages/Features';
import PricingPage from './pages/Pricing';
import ContactPage from './pages/Contact';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';
import CalcHubPage from './pages/calculators/Hub';
import CalcToolPage from './pages/calculators/ToolPage';
import BlogIndexPage from './pages/blog/Index';
import BlogPostPage from './pages/blog/Post';

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- SYSTEM MANAGER (PWA & SETUP) ---
const SystemSetup = () => {
  useEffect(() => {
    // 1. Google Fonts
    if (!document.getElementById('google-fonts')) {
      const link = document.createElement('link');
      link.id = 'google-fonts';
      link.rel = 'stylesheet';
      link.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap";
      document.head.appendChild(link);
    }

    // 2. Service Worker Registration
    if ('serviceWorker' in navigator && !window.location.href.includes('blob:')) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW Registered:', reg))
        .catch(err => console.log('SW Fail:', err));
    }

    // 3. PWA Meta Tags
    document.title = "Srot Finance | Swinfosystems";
    let metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      metaViewport = document.createElement('meta');
      metaViewport.name = "viewport";
      document.head.appendChild(metaViewport);
    }
    metaViewport.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover";

  }, []);
  return null;
};


// The original app shell (auth / dashboard / admin). Rendered for `/`
// and as the catch-all so unknown paths behave exactly as before.
function LegacyApp() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  
  // App-wide biometric lock state
  const [appLocked, setAppLocked] = useState(getUserPrefs().biometric_enabled);

  useEffect(() => {
    // Check if we are on the admin path
    if (window.location.pathname.startsWith('/admin')) {
      setIsAdminRoute(true);
    }

    // Check for cached session first for instant offline access
    const cachedSession = localStorage.getItem('supabase.auth.token');
    if (cachedSession) {
      try {
        const sessionData = JSON.parse(cachedSession);
        if (sessionData && sessionData.currentSession) {
          setSession(sessionData.currentSession);
          setLoading(false);
        }
      } catch (e) { console.error("Session parse error:", e); }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        localStorage.setItem('supabase.auth.token', JSON.stringify({ currentSession: session }));
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('%c🔄 Auth Event:', 'color:#f97316;font-weight:bold', event);

      // PASSWORD_RECOVERY: user clicked reset link → show "Set New Password" screen
      if (event === 'PASSWORD_RECOVERY') {
        setSession(session);
        setRecoveryMode(true);
        setLoading(false);
        return; // Don't go to dashboard, stay on reset screen
      }

      setSession(session);
      if (session) {
        localStorage.setItem('supabase.auth.token', JSON.stringify({ currentSession: session }));
      } else {
        localStorage.removeItem('supabase.auth.token');
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const [showSupport, setShowSupport] = useState(false);

  useEffect(() => {
    if (session && !recoveryMode && !isAdminRoute) {
      const hasSeenSupport = localStorage.getItem(`support_seen_${session.user.id}`);
      if (!hasSeenSupport) {
        setShowSupport(true);
        localStorage.setItem(`support_seen_${session.user.id}`, 'true');
      }
    }
  }, [session, recoveryMode, isAdminRoute]);

  // Handle recovery complete → go to dashboard
  const handleRecoveryComplete = () => {
    setRecoveryMode(false);
    // Clean up the URL hash fragments Supabase adds
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  // Skip rendering the normal app if we are exactly on the admin route
  if (isAdminRoute) {
    return (
      <>
        <SystemSetup />
        <AdminScreen />
      </>
    );
  }

  // App-wide Biometric Lock interception
  if (appLocked && session && !recoveryMode && !isAdminRoute) {
    const prefs = getUserPrefs();
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <SystemSetup />
        <BiometricLock
            isOpen={true}
            credentialId={prefs.biometric_credential_id}
            onUnlock={() => setAppLocked(false)}
            onCancel={async () => {
                await supabase.auth.signOut();
                setAppLocked(true); // stay locked until signed out propagates
            }}
            title="App Vault Locked"
            inline={false}
        />
      </div>
    );
  }

  return (
    <>
      <SystemSetup />
      <AnimatePresence>
        {showSupport && session && !recoveryMode && (
          <BannerModal isOpen={showSupport} onClose={() => setShowSupport(false)} />
        )}
      </AnimatePresence>
      {loading && !session ? (
        <div
          className="min-h-screen flex flex-col items-center justify-center bg-bg-base transition-all"
        >
          <div className="w-20 h-20 bg-gradient-to-tr from-orange-500 to-rose-500 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse mb-6">
            <Loader2 className="animate-spin text-white" size={40} />
          </div>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest animate-pulse">Initializing Fin...</p>
        </div>
      ) : recoveryMode && session ? (
        <ResetPasswordScreen onComplete={handleRecoveryComplete} />
      ) : (
        !session ? <AuthScreen supabase={supabase} /> : <Dashboard session={session} supabase={supabase} />
      )}
    </>
  );
}

// Routed app shell: public SEO pages get their own routes;
// `/` shows the public landing page to logged-out visitors (and the
// dashboard to logged-in users); `/login` is the sign-in screen;
// everything else renders the original app shell via the catch-all.
function SplashLoader() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#07080D]">
            <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-rose-500 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse mb-6">
                <Loader2 className="animate-spin text-white" size={32} />
            </div>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest animate-pulse">Srot Finance</p>
        </div>
    );
}

// `/`: landing page for visitors, full app for signed-in users.
// Password-recovery hashes always go to the app shell.
function HomeRoute() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recovery, setRecovery] = useState(false);

    useEffect(() => {
        if (window.location.hash.includes('type=recovery')) {
            setRecovery(true);
            setLoading(false);
            return;
        }
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, s) => {
            if (event === 'PASSWORD_RECOVERY') { setRecovery(true); return; }
            setSession(s);
            setLoading(false);
        });
        return () => subscription.unsubscribe();
    }, []);

    if (loading) return <SplashLoader />;
    if (recovery) return <LegacyApp />;
    return session ? <LegacyApp /> : <HomePage />;
}

// `/login`: sign-in screen. Signed-in users bounce to the dashboard.
function LoginRoute() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
            setSession(s);
            setLoading(false);
        });
        return () => subscription.unsubscribe();
    }, []);

    if (loading) return <SplashLoader />;
    if (session) return <Navigate to="/" replace />;
    return (<><SystemSetup /><AuthScreen /></>);
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/calculators" element={<CalcHubPage />} />
        <Route path="/calculators/:tool" element={<CalcToolPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="*" element={<LegacyApp />} />
      </Routes>
    </>
  );
}
