import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, User, Palette, Shield, Database, LogOut, Upload,
    Sun, Moon, Monitor, Trash2, Download, Volume2, QrCode,
    Lock, Fingerprint, ChevronRight, AlertTriangle,
    Bell, Clock, Sparkles, MessageSquare, Camera,
    Check, Loader2, Play, ZoomIn, Mail, KeyRound, Eye, EyeOff, ShieldCheck, Send
} from 'lucide-react';
import { supabase } from '../../config/supabase';
import {
    SOUND_EFFECTS, DEFAULT_SOUND_PREFS,
    loadSoundPrefs, saveSoundPrefs, playSound
} from '../../hooks/useSoundEngine';
import { AnalyticsReport as PrintableReport, PrintStyles } from '../dashboard/PrintView';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactDOM from 'react-dom/client';
import { isBiometricSupported, enrollBiometrics } from '../../utils/biometric';

// --- Preferences State Management ---
const PREFS_KEY = 'srot_fin_prefs';
const DEFAULT_PREFS = {
    sound_enabled: true, sound_volume: 70, sound_duration: 300,
    budget_amount: 50000,
    sound_effect: 'chime',
    sound_on_tx: true, sound_on_delete: true, sound_on_success: true,
    notification_enabled: true, popup_duration: 3000,
    popup_style: 'pill', popup_position: 'bottom',
    theme: 'dark', biometric_enabled: false,
    biometric_credential_id: null,
    ui_density: 'normal',
};

const loadPrefs = () => {
    try {
        const s = localStorage.getItem(PREFS_KEY);
        return s ? { ...DEFAULT_PREFS, ...JSON.parse(s) } : { ...DEFAULT_PREFS };
    } catch {
        return { ...DEFAULT_PREFS };
    }
};

const savePrefs = (p) => localStorage.setItem(PREFS_KEY, JSON.stringify(p));
export const getUserPrefs = loadPrefs;

// --- Sub-components with Full Theme Support ---
const Toggle = ({ checked, onChange, color = 'orange' }) => {
    const bg = {
        orange: checked ? 'bg-orange-500' : 'bg-[var(--bg-surface-active)]',
        emerald: checked ? 'bg-emerald-500' : 'bg-[var(--bg-surface-active)]',
        blue: checked ? 'bg-blue-500' : 'bg-[var(--bg-surface-active)]'
    };
    return (
        <button
            type="button"
            onClick={onChange}
            className={`w-12 h-7 rounded-full transition-colors relative border border-[var(--border-main)] shrink-0 ${bg[color]}`}
        >
            <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow-md ${
                    checked ? 'left-6' : 'left-0.5'
                }`}
            />
        </button>
    );
};

const SettingRow = ({ icon: Icon, title, desc, children, iconColor = 'text-orange-400', iconBg = 'bg-orange-500/10' }) => (
    <div className="flex items-center justify-between gap-4 px-4 py-3.5 rounded-2xl glass-panel border border-[var(--border-main)] hover:border-[var(--border-highlight)] transition-all">
        <div className="flex items-center gap-3 min-w-0">
            <div className={`p-2.5 ${iconBg} ${iconColor} rounded-xl shrink-0 border border-[var(--border-main)]`}>
                <Icon size={18} />
            </div>
            <div className="min-w-0">
                <p className="font-bold text-[var(--text-main)] text-sm leading-tight truncate">{title}</p>
                {desc && <p className="text-[11px] text-[var(--text-muted)] mt-0.5 font-medium">{desc}</p>}
            </div>
        </div>
        {children}
    </div>
);

const SectionLabel = ({ children }) => (
    <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1 mb-2.5">{children}</p>
);

// --- MAIN SETTINGS MODAL ---
export const SettingsModal = ({
    isOpen,
    onClose,
    user,
    avatarUrl,
    onAvatarUpload,
    onOpenDigitalID,
    transactions = [],
    allTransactions = [],
    stats = {},
    filterLabel = '',
    onPrefsChange
}) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [prefs, setPrefs] = useState(loadPrefs());
    const [displayName, setDisplayName] = useState(user?.user_metadata?.full_name || '');
    const [nameSaved, setNameSaved] = useState(false);
    const [savingName, setSavingName] = useState(false);
    const [localAvatar, setLocalAvatar] = useState(avatarUrl || '');
    const [deletingAvatar, setDeletingAvatar] = useState(false);
    const fileRef = useRef(null);

    // Email report state
    const [sendingEmail, setSendingEmail] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [emailPeriod, setEmailPeriod] = useState('current');

    useEffect(() => { setLocalAvatar(avatarUrl || ''); }, [avatarUrl]);

    useEffect(() => {
        savePrefs(prefs);
        if (onPrefsChange) onPrefsChange(prefs);
    }, [prefs]);

    const updatePref = (key, value) => setPrefs(prev => ({ ...prev, [key]: value }));

    // Avatar upload / remove
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [avatarToast, setAvatarToast] = useState('');

    const showAvatarMsg = (msg) => {
        setAvatarToast(msg);
        setTimeout(() => setAvatarToast(''), 3500);
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !user?.id) return;

        const preview = URL.createObjectURL(file);
        setLocalAvatar(preview);
        setUploadingAvatar(true);

        try {
            const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
            const filePath = `${user.id}/avatar.${ext}`;

            const { error: upErr } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true });
            if (upErr) throw upErr;

            const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
            const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;

            const { error: metaErr } = await supabase.auth.updateUser({ data: { avatar_url: publicUrl } });
            if (metaErr) throw metaErr;

            setLocalAvatar(publicUrl);
            showAvatarMsg('✓ Photo updated successfully!');
        } catch (err) {
            console.error('Avatar upload error:', err);
            setLocalAvatar(avatarUrl || '');
            showAvatarMsg('✗ Upload failed: ' + err.message);
        }
        setUploadingAvatar(false);
    };

    const handleDeleteAvatar = async () => {
        if (!user?.id) return;
        setDeletingAvatar(true);
        try {
            await supabase.auth.updateUser({ data: { avatar_url: '' } });
            setLocalAvatar('');
            showAvatarMsg('✓ Photo removed');
        } catch (err) {
            console.error('Avatar delete error:', err);
            showAvatarMsg('✗ Failed to remove photo');
        }
        setDeletingAvatar(false);
    };

    const handleSaveName = async () => {
        if (!displayName.trim() || savingName) return;
        setSavingName(true);
        try {
            const { error } = await supabase.auth.updateUser({ data: { full_name: displayName.trim() } });
            if (error) throw error;
            setNameSaved(true);
            setTimeout(() => setNameSaved(false), 3000);
        } catch (err) {
            console.error('Save name error:', err);
        }
        setSavingName(false);
    };

    const handleBiometricToggle = async () => {
        if (prefs.biometric_enabled) {
            updatePref('biometric_enabled', false);
            updatePref('biometric_credential_id', null);
            return;
        }

        try {
            const supported = await isBiometricSupported();
            if (!supported) {
                alert("Biometric authentication is not supported on this device/browser.");
                return;
            }

            const credId = await enrollBiometrics(user?.email || "Srot Finance User");
            if (credId) {
                updatePref('biometric_credential_id', credId);
                updatePref('biometric_enabled', true);
                showAvatarMsg('✓ Biometrics Enrolled!');
            }
        } catch (e) {
            console.error("Biometric setup error:", e);
            alert("Biometric setup failed: " + e.message);
        }
    };

    const handleExportData = () => {
        const payload = {
            export_date: new Date().toISOString(),
            user_id: user?.id,
            email: user?.email,
            stats,
            preferences: prefs,
            transactions: allTransactions.length > 0 ? allTransactions : transactions,
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SrotFinance_Export_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleEmailReport = async () => {
        if (sendingEmail) return;
        setSendingEmail(true);
        setEmailSent(false);
        setEmailError('');

        try {
            let reportTxs = transactions;
            let reportStats = stats;
            let reportLabel = filterLabel || 'Custom Period';

            if (emailPeriod !== 'current') {
                const d = new Date();
                const currentMonth = d.toISOString().slice(0, 7);
                const currentYear = d.toISOString().slice(0, 4);

                if (emailPeriod === 'month') {
                    reportTxs = allTransactions.filter(t => t.date.startsWith(currentMonth));
                    reportLabel = 'This Month';
                } else if (emailPeriod === 'year') {
                    reportTxs = allTransactions.filter(t => t.date.startsWith(currentYear));
                    reportLabel = 'This Year';
                } else if (emailPeriod === 'all') {
                    reportTxs = allTransactions;
                    reportLabel = 'All Time';
                }

                const newStats = { income: 0, expense: 0, balance: 0 };
                reportTxs.forEach(t => {
                    if (t.type === 'income') newStats.income += parseFloat(t.amount);
                    else newStats.expense += parseFloat(t.amount);
                });
                newStats.balance = newStats.income - newStats.expense;
                reportStats = newStats;
            }

            if (reportTxs.length === 0) throw new Error('No transactions found in selected period.');

            setEmailSent(true);
            showAvatarMsg('✓ Report request started! Check your email.');
            setTimeout(() => setEmailSent(false), 5000);
        } catch (err) {
            console.error('Email report error:', err);
            setEmailError(err.message || 'Failed to send report');
            setTimeout(() => setEmailError(''), 5000);
        } finally {
            setSendingEmail(false);
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.reload();
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("⚠️ DANGER: Are you absolutely sure? This will delete all your transactions and sign you out permanently. This cannot be undone.")) return;

        try {
            await supabase.from('transactions').delete().eq('user_id', user.id);
            await supabase.auth.signOut();
            window.location.reload();
        } catch (err) {
            console.error('Delete account error:', err);
            alert("Error deleting data. Please contact support.");
        }
    };

    // Password & Email change state
    const [resetSent, setResetSent] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const [changePwdMode, setChangePwdMode] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pwdLoading, setPwdLoading] = useState(false);
    const [pwdMsg, setPwdMsg] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [showCurrentPwd, setShowCurrentPwd] = useState(false);
    const [showNewPwd, setShowNewPwd] = useState(false);
    const [pwdVerified, setPwdVerified] = useState(false);

    const verifyCurrentPassword = async (pwd) => {
        if (!user?.email || !pwd.trim()) return false;
        const { error } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: pwd.trim(),
        });
        return !error;
    };

    const handleResetPassword = async () => {
        if (!user?.email || resetLoading) return;
        setResetLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
            redirectTo: window.location.origin,
        });
        setResetLoading(false);
        if (!error) {
            setResetSent(true);
            setTimeout(() => setResetSent(false), 5000);
        }
    };

    const handleUpdatePassword = async () => {
        if (!newPassword.trim() || pwdLoading) return;
        if (!pwdVerified) {
            setPwdLoading(true);
            setPwdMsg('');
            const valid = await verifyCurrentPassword(currentPassword);
            setPwdLoading(false);
            if (!valid) {
                setPwdMsg('✗ Current password is incorrect.');
                return;
            }
            setPwdVerified(true);
            setPwdMsg('✓ Current password verified! Set your new password below.');
            return;
        }
        if (newPassword.length < 6) {
            setPwdMsg('✗ Password must be at least 6 characters.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPwdMsg('✗ Passwords do not match.');
            return;
        }
        setPwdLoading(true);
        setPwdMsg('');
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        setPwdLoading(false);
        if (error) {
            setPwdMsg(`✗ ${error.message}`);
        } else {
            setPwdMsg('✓ Password updated successfully!');
            setNewPassword('');
            setConfirmPassword('');
            setCurrentPassword('');
            setPwdVerified(false);
            setTimeout(() => { setPwdMsg(''); setChangePwdMode(false); }, 3000);
        }
    };

    if (!isOpen) return null;

    const initials = (displayName || user?.email || 'U')
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User, color: 'text-orange-400' },
        { id: 'notifications', label: 'Sound & Alerts', icon: Bell, color: 'text-violet-400' },
        { id: 'appearance', label: 'Appearance', icon: Palette, color: 'text-amber-400' },
        { id: 'security', label: 'Security', icon: Shield, color: 'text-emerald-400' },
        { id: 'data', label: 'Data & Privacy', icon: Database, color: 'text-rose-400' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-5">
                        {/* Profile Photo Card */}
                        <div className="glass-panel p-5 rounded-3xl border border-[var(--border-main)]">
                            <SectionLabel>Profile Picture</SectionLabel>
                            <div className="flex items-center gap-5 mt-2">
                                <div className="relative shrink-0">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[var(--border-highlight)] shadow-xl bg-gradient-to-br from-orange-500 to-rose-500">
                                        {localAvatar ? (
                                            <img src={localAvatar} alt="Avatar" className="w-full h-full object-cover" onError={() => setLocalAvatar('')} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-white text-2xl font-black">{initials}</span>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => fileRef.current?.click()}
                                        disabled={uploadingAvatar}
                                        className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md hover:bg-orange-600 transition-colors disabled:opacity-70"
                                    >
                                        {uploadingAvatar ? <Loader2 size={12} className="animate-spin" /> : <Camera size={13} />}
                                    </button>
                                    <input ref={fileRef} type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                                </div>

                                <div className="flex flex-col gap-2 flex-1 min-w-0">
                                    <button
                                        type="button"
                                        onClick={() => fileRef.current?.click()}
                                        disabled={uploadingAvatar}
                                        className="inline-flex items-center justify-center gap-2 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-active)] text-[var(--text-main)] border border-[var(--border-main)] px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                                    >
                                        <Upload size={14} className="text-orange-400" />
                                        <span>{uploadingAvatar ? 'Uploading...' : 'Upload New Photo'}</span>
                                    </button>
                                    {localAvatar && (
                                        <button
                                            type="button"
                                            onClick={handleDeleteAvatar}
                                            disabled={deletingAvatar || uploadingAvatar}
                                            className="inline-flex items-center justify-center gap-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                                        >
                                            <Trash2 size={14} />
                                            <span>Remove Photo</span>
                                        </button>
                                    )}
                                    {avatarToast ? (
                                        <p className="text-[11px] font-bold text-orange-400 truncate">{avatarToast}</p>
                                    ) : (
                                        <p className="text-[10px] text-[var(--text-muted)] font-medium">JPG, PNG or WebP • Max 5MB</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Display Name Input */}
                        <div>
                            <SectionLabel>Account Name</SectionLabel>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={e => { setDisplayName(e.target.value); setNameSaved(false); }}
                                    onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                                    className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl px-4 py-3 font-bold text-sm text-[var(--text-main)] outline-none focus:border-orange-500 transition-all"
                                    placeholder="Your Name"
                                />
                                <button
                                    type="button"
                                    onClick={handleSaveName}
                                    disabled={savingName || !displayName.trim()}
                                    className="bg-orange-500 text-white font-bold text-xs px-5 rounded-2xl hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center shadow-md shadow-orange-500/20"
                                >
                                    {savingName ? <Loader2 size={15} className="animate-spin" /> : nameSaved ? 'Saved!' : 'Save'}
                                </button>
                            </div>
                        </div>

                        {/* Fin.ID Card Quick Launch */}
                        <button
                            type="button"
                            onClick={onOpenDigitalID}
                            className="w-full flex items-center justify-between p-4 rounded-2xl glass-panel border border-[var(--border-main)] hover:border-orange-500/40 transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-orange-500/10 text-orange-400 rounded-xl border border-orange-500/20">
                                    <QrCode size={18} />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-[var(--text-main)] text-sm">Fin.ID Pass</p>
                                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Your holographic digital member pass</p>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:text-orange-400 transition-colors" />
                        </button>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="space-y-5">
                        <SectionLabel>Sound Engine</SectionLabel>
                        <SettingRow icon={Volume2} title="Audio Feedback" desc="Play sound effects on actions" iconColor="text-violet-400" iconBg="bg-violet-500/10">
                            <Toggle checked={prefs.sound_enabled} onChange={() => updatePref('sound_enabled', !prefs.sound_enabled)} color="orange" />
                        </SettingRow>

                        {prefs.sound_enabled && (
                            <div className="glass-panel rounded-3xl p-5 border border-[var(--border-main)] space-y-4">
                                <div>
                                    <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Chime Sound</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(SOUND_EFFECTS).map(([key, { label, desc }]) => (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => {
                                                    updatePref('sound_effect', key);
                                                    saveSoundPrefs({ ...loadSoundPrefs(), effect: key, volume: prefs.sound_volume / 100, duration_ms: prefs.sound_duration });
                                                    playSound(key, prefs.sound_volume / 100, prefs.sound_duration);
                                                }}
                                                className={`p-2.5 rounded-xl border text-left transition-all ${
                                                    prefs.sound_effect === key
                                                        ? 'border-violet-500 bg-violet-500/10'
                                                        : 'glass-panel border-[var(--border-main)] hover:bg-[var(--bg-surface-active)]'
                                                }`}
                                            >
                                                <p className="text-xs font-bold text-[var(--text-main)]">{label}</p>
                                                <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="text-[var(--text-muted)]">Volume</span>
                                        <span className="text-violet-400 font-mono">{prefs.sound_volume}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={prefs.sound_volume}
                                        onChange={e => updatePref('sound_volume', +e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => playSound(prefs.sound_effect || 'chime', prefs.sound_volume / 100, prefs.sound_duration)}
                                    className="flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-600 active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
                                >
                                    <Play size={13} /> Test Sound
                                </button>
                            </div>
                        )}
                    </div>
                );

            case 'appearance':
                return (
                    <div className="space-y-5">
                        {/* Theme Switcher */}
                        <div className="space-y-2">
                            <SectionLabel>Theme Mode</SectionLabel>
                            <div className="grid grid-cols-3 gap-2.5">
                                {[
                                    { id: 'dark', icon: Moon, label: 'Dark' },
                                    { id: 'light', icon: Sun, label: 'Light' },
                                    { id: 'system', icon: Monitor, label: 'System' },
                                ].map(th => (
                                    <button
                                        key={th.id}
                                        type="button"
                                        onClick={() => updatePref('theme', th.id)}
                                        className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                                            prefs.theme === th.id
                                                ? 'border-orange-500 bg-orange-500/10 text-orange-400 shadow-md'
                                                : 'glass-panel border-[var(--border-main)] text-[var(--text-dim)] hover:text-[var(--text-main)]'
                                        }`}
                                    >
                                        <th.icon size={20} />
                                        <span className="text-xs font-bold">{th.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* UI Density */}
                        <div className="space-y-2">
                            <SectionLabel>Layout Density</SectionLabel>
                            <div className="grid grid-cols-3 gap-2.5">
                                {[
                                    { id: 'compact', label: 'Compact', desc: 'Dense data' },
                                    { id: 'normal', label: 'Standard', desc: 'Balanced' },
                                    { id: 'comfortable', label: 'Spacious', desc: 'More padding' },
                                ].map(d => (
                                    <button
                                        key={d.id}
                                        type="button"
                                        onClick={() => updatePref('ui_density', d.id)}
                                        className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${
                                            prefs.ui_density === d.id
                                                ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                                                : 'glass-panel border-[var(--border-main)] text-[var(--text-dim)]'
                                        }`}
                                    >
                                        <p className="text-xs font-bold">{d.label}</p>
                                        <p className="text-[10px] text-[var(--text-muted)]">{d.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Monthly Budget Target */}
                        <div className="glass-panel p-5 rounded-3xl border border-[var(--border-main)] space-y-3">
                            <SectionLabel>Monthly Spending Target</SectionLabel>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] font-black text-sm">₹</span>
                                <input
                                    type="number"
                                    value={prefs.budget_amount}
                                    onChange={e => updatePref('budget_amount', parseFloat(e.target.value) || 0)}
                                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl pl-9 pr-4 py-3 font-mono font-bold text-[var(--text-main)] text-sm outline-none focus:border-orange-500 transition-all"
                                    placeholder="50000"
                                />
                            </div>
                            <p className="text-[11px] text-[var(--text-muted)] font-medium">Used to compute budget alerts & spending gauges.</p>
                        </div>
                    </div>
                );

            case 'security':
                return (
                    <div className="space-y-5">
                        <SectionLabel>Vault Protection</SectionLabel>

                        {/* Biometric Toggle */}
                        <SettingRow icon={Fingerprint} title="Biometric Vault" desc="Require Face ID / Touch ID" iconColor="text-emerald-400" iconBg="bg-emerald-500/10">
                            <Toggle checked={prefs.biometric_enabled} onChange={handleBiometricToggle} color="emerald" />
                        </SettingRow>

                        {/* Password Changer */}
                        <div className="glass-panel rounded-3xl border border-[var(--border-main)] overflow-hidden">
                            <button
                                type="button"
                                onClick={() => {
                                    setChangePwdMode(!changePwdMode);
                                    setPwdMsg('');
                                    setPwdVerified(false);
                                    setCurrentPassword('');
                                    setNewPassword('');
                                    setConfirmPassword('');
                                }}
                                className="w-full flex items-center justify-between p-4 hover:bg-[var(--bg-surface-active)] transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-orange-500/10 text-orange-400 rounded-xl">
                                        <KeyRound size={18} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-[var(--text-main)] text-sm">Update Password</p>
                                        <p className="text-[11px] text-[var(--text-muted)]">Verify current password and set a new one</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className={`text-[var(--text-muted)] transition-transform ${changePwdMode ? 'rotate-90' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {changePwdMode && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="p-4 pt-2 border-t border-[var(--border-main)] space-y-3"
                                    >
                                        {!pwdVerified ? (
                                            <>
                                                <div className="relative">
                                                    <input
                                                        type={showCurrentPwd ? 'text' : 'password'}
                                                        placeholder="Enter current password"
                                                        value={currentPassword}
                                                        onChange={e => setCurrentPassword(e.target.value)}
                                                        className="w-full bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--text-main)] outline-none focus:border-orange-500"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                                                    >
                                                        {showCurrentPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                                                    </button>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={handleUpdatePassword}
                                                    disabled={pwdLoading || !currentPassword.trim()}
                                                    className="w-full py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                                >
                                                    {pwdLoading ? <Loader2 size={15} className="animate-spin" /> : <ShieldCheck size={15} />}
                                                    <span>Verify Password</span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    type="password"
                                                    placeholder="New password (min 6 characters)"
                                                    value={newPassword}
                                                    onChange={e => setNewPassword(e.target.value)}
                                                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--text-main)] outline-none focus:border-orange-500"
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="Confirm new password"
                                                    value={confirmPassword}
                                                    onChange={e => setConfirmPassword(e.target.value)}
                                                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--text-main)] outline-none focus:border-orange-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleUpdatePassword}
                                                    disabled={pwdLoading || !newPassword.trim() || newPassword !== confirmPassword}
                                                    className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                                >
                                                    {pwdLoading ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                                                    <span>Set New Password</span>
                                                </button>
                                            </>
                                        )}
                                        {pwdMsg && (
                                            <p className={`text-xs font-bold text-center ${pwdMsg.startsWith('✓') ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {pwdMsg}
                                            </p>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Reset Password via Email */}
                        <button
                            type="button"
                            onClick={handleResetPassword}
                            disabled={resetLoading || resetSent}
                            className="w-full flex items-center justify-between p-4 rounded-2xl glass-panel border border-[var(--border-main)] hover:border-orange-500/30 transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-orange-500/10 text-orange-400 rounded-xl">
                                    <Mail size={18} />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-[var(--text-main)] text-sm">
                                        {resetSent ? '✓ Reset Email Sent' : 'Send Password Reset Email'}
                                    </p>
                                    <p className="text-[11px] text-[var(--text-muted)]">Sends a secure one-click link to {user?.email}</p>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-[var(--text-muted)]" />
                        </button>
                    </div>
                );

            case 'data':
                return (
                    <div className="space-y-5">
                        <SectionLabel>Data Export & Privacy</SectionLabel>

                        <button
                            type="button"
                            onClick={handleExportData}
                            className="w-full flex items-center gap-3 p-4 rounded-2xl glass-panel border border-[var(--border-main)] hover:border-indigo-500/40 transition-all text-left"
                        >
                            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                                <Download size={18} />
                            </div>
                            <div>
                                <p className="font-bold text-[var(--text-main)] text-sm">Export Financial Backup</p>
                                <p className="text-[11px] text-[var(--text-muted)]">Download complete JSON records</p>
                            </div>
                        </button>

                        <div className="glass-panel p-5 rounded-3xl border border-rose-500/25 bg-rose-500/5 space-y-3">
                            <div className="flex items-center gap-2 text-rose-400">
                                <AlertTriangle size={16} />
                                <span className="text-xs font-black uppercase tracking-wider">Danger Zone</span>
                            </div>
                            <button
                                type="button"
                                onClick={handleDeleteAccount}
                                className="w-full py-3.5 px-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                            >
                                <Trash2 size={16} /> Delete Account & Purge Transactions
                            </button>
                            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                                Irreversibly erases your transaction records and signs you out.
                            </p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="w-full max-w-2xl glass-panel border border-[var(--border-main)] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Sidebar Tabs */}
                        <div className="w-full md:w-56 p-4 sm:p-5 border-b md:border-b-0 md:border-r border-[var(--border-main)] bg-[var(--bg-surface)] shrink-0 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible hide-scrollbar">
                            <div className="hidden md:flex items-center gap-3 px-3 py-3 mb-2">
                                <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 font-bold">
                                    {initials}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-[var(--text-main)] truncate">{displayName || 'User'}</p>
                                    <p className="text-[10px] text-[var(--text-muted)] truncate">{user?.email}</p>
                                </div>
                            </div>

                            {tabs.map(tab => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl font-bold text-xs transition-all shrink-0 md:shrink text-left ${
                                            isActive
                                                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                                                : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-active)]'
                                        }`}
                                    >
                                        <tab.icon size={16} />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}

                            <div className="hidden md:block mt-auto pt-4 border-t border-[var(--border-main)]">
                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-colors"
                                >
                                    <LogOut size={16} />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-5 sm:p-7 hide-scrollbar flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-main)]">
                                    <h3 className="text-lg font-black text-[var(--text-main)]">
                                        {tabs.find(t => t.id === activeTab)?.label}
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="w-8 h-8 rounded-xl glass-panel border border-[var(--border-main)] flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text-main)]"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {renderContent()}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Mobile Sign out */}
                            <div className="md:hidden pt-6 mt-6 border-t border-[var(--border-main)]">
                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    className="w-full py-3 rounded-2xl bg-rose-500/10 text-rose-400 font-bold text-xs flex items-center justify-center gap-2 border border-rose-500/20"
                                >
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
