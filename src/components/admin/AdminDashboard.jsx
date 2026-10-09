import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { LogOut, Users, FileText, Database, ShieldCheck, Search, Loader2, Trash2, Mail, Send, CheckCircle, AlertTriangle, MonitorSmartphone, Activity, BarChart2, CheckSquare, Image as ImageIcon, Crown, UserCog, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminCampaigns } from './AdminCampaigns';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminCategories } from './AdminCategories';
import { AdminGallery } from './AdminGallery';
import { AdminPush } from './AdminPush';

export const AdminDashboard = ({ session, onLogout }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [toast, setToast] = useState(null);

    // Master Navigation
    const [activeMasterTab, setActiveMasterTab] = useState('directory'); // 'directory' | 'campaigns'

    // Selected user tabs
    const [activeUserTab, setActiveUserTab] = useState('data'); // 'data' | 'actions' | 'tracking'
    const [userTransactions, setUserTransactions] = useState([]);
    const [userDevices, setUserDevices] = useState([]);
    const [userSessions, setUserSessions] = useState([]);
    const [loadingTx, setLoadingTx] = useState(false);
    const [pushModalOpen, setPushModalOpen] = useState(false);
    const [pushMessage, setPushMessage] = useState('');

    // Role management (requires admin_roles_setup.sql)
    const [myRole, setMyRole] = useState(null);
    const [changingRole, setChangingRole] = useState(false);

    useEffect(() => {
        loadUsers();
        loadMyRole();
    }, []);

    const loadMyRole = async () => {
        try {
            const { data } = await supabase.rpc('admin_get_my_role');
            setMyRole(data || null);
        } catch (err) {
            // RPC missing (migration not run yet) — role features stay hidden
            setMyRole(null);
        }
    };

    const loadUsers = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.rpc('admin_get_all_users');
            if (error) throw error;
            setUsers(data || []);
        } catch (err) {
            console.error('Failed to load users:', err);
            showToast('Failed to load users', 'error');
        } finally {
            setLoading(false);
        }
    };

    const loadUserTransactions = async (userId) => {
        setLoadingTx(true);
        try {
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', userId)
                .order('date', { ascending: false });
            if (error) throw error;
            setUserTransactions(data || []);
        } catch (err) {
            showToast('Failed to load transactions', 'error');
        } finally {
            setLoadingTx(false);
        }
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setActiveUserTab('data');
        loadUserTransactions(user.id);
        loadUserTracking(user.id);
    };

    const loadUserTracking = async (userId) => {
        const { data: devices } = await supabase.from('user_devices').select('*').eq('user_id', userId).order('last_active', { ascending: false });
        const { data: sessions } = await supabase.from('app_sessions').select('*').eq('user_id', userId).order('session_start', { ascending: false });
        setUserDevices(devices || []);
        setUserSessions(sessions || []);
    };

    const handleSetRole = async (userId, newRole) => {
        const roleLabel = newRole === 'none' ? 'remove admin access from' : `promote to ${newRole}`;
        if (!window.confirm(`Are you sure you want to ${roleLabel} this user?`)) return;
        setChangingRole(true);
        try {
            const { error } = await supabase.rpc('admin_set_role', { target_user_id: userId, new_role: newRole });
            if (error) throw error;
            showToast(newRole === 'none' ? 'Admin access removed' : `User promoted to ${newRole}`, 'success');
            loadUsers();
        } catch (err) {
            showToast(err.message || 'Failed to update role', 'error');
        } finally {
            setChangingRole(false);
        }
    };

    // Build a minimal valid one-page PDF (no dependency) for the account summary email
    const buildSummaryPdfBase64 = (user, totals, topCats) => {
        const esc = (s) => String(s ?? '').replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
        const rows = [
            [20, 'Srot Finance - Account Summary'],
            [11, `Prepared for ${user.full_name || 'Member'} (${user.email})`],
            [11, `Generated ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`],
            [11, ''],
            [13, 'Totals'],
            [11, `Total Income: Rs. ${(totals.income || 0).toLocaleString('en-IN')}`],
            [11, `Total Expense: Rs. ${(totals.expense || 0).toLocaleString('en-IN')}`],
            [11, `Net Balance: Rs. ${((totals.income || 0) - (totals.expense || 0)).toLocaleString('en-IN')}`],
            [11, `Transactions: ${totals.count || 0}`],
            [11, ''],
            [13, 'Top Expense Categories'],
            ...topCats.map(([name, amt]) => [11, `${name}: Rs. ${amt.toLocaleString('en-IN')}`]),
        ];
        let y = 760;
        let stream = '';
        rows.forEach(([size, text]) => {
            if (!text) { y -= 10; return; }
            stream += `BT /F1 ${size} Tf 50 ${y} Td (${esc(text)}) Tj ET\n`;
            y -= size + 8;
        });
        const objects = [
            '<< /Type /Catalog /Pages 2 0 R >>',
            '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
            '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
            '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
            `<< /Length ${stream.length} >>\nstream\n${stream}endstream`,
        ];
        let pdf = '%PDF-1.4\n';
        const offsets = [];
        objects.forEach((body, i) => {
            offsets.push(pdf.length);
            pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
        });
        const xrefPos = pdf.length;
        pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
        offsets.forEach(o => { pdf += `${String(o).padStart(10, '0')} 00000 n \n`; });
        pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;
        return btoa(unescape(encodeURIComponent(pdf)));
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("CRITICAL WARNING: This will permanently delete the user and ALL their data! Proceed?")) return;
        try {
            const { error } = await supabase.rpc('admin_delete_user', { target_user_id: userId });
            if (error) throw error;
            showToast('User deleted permanently', 'success');
            setSelectedUser(null);
            loadUsers();
        } catch (err) {
            showToast(err.message || 'Failed to delete user', 'error');
        }
    };

    const handleDeleteTransaction = async (txId) => {
        if (!window.confirm("Delete this transaction?")) return;
        try {
            const { error } = await supabase.from('transactions').delete().eq('id', txId);
            if (error) throw error;
            setUserTransactions(prev => prev.filter(t => t.id !== txId));
            showToast('Transaction deleted', 'success');
        } catch (err) {
            showToast('Failed to delete transaction', 'error');
        }
    };

    const handleGenerateUserReport = async () => {
        // Sends a REAL account summary: totals computed from the user's loaded
        // transactions + a minimal valid PDF attachment (no fabricated data).
        if (!window.confirm(`Send an account summary email to ${selectedUser.email}?`)) return;
        try {
            setLoadingTx(true);
            const totals = userTransactions.reduce((acc, tx) => {
                const amt = Number(tx.amount) || 0;
                if (tx.type === 'income') acc.income += amt; else acc.expense += amt;
                acc.count += 1;
                return acc;
            }, { income: 0, expense: 0, count: 0 });
            const catTotals = {};
            userTransactions.forEach(tx => {
                if (tx.type !== 'income') catTotals[tx.category || 'Other'] = (catTotals[tx.category || 'Other'] || 0) + (Number(tx.amount) || 0);
            });
            const topCats = Object.entries(catTotals).sort((a, b) => b[1] - a[1]).slice(0, 5);
            const pdfBase64 = buildSummaryPdfBase64(selectedUser, totals, topCats);
            const res = await fetch('/api/send-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: selectedUser.email,
                    subject: 'Your Srot Finance Account Summary',
                    reportName: 'SrotFinance_Summary.pdf',
                    filterLabel: 'Account Summary',
                    stats: { income: totals.income, expense: totals.expense, balance: totals.income - totals.expense },
                    customMessage: `Hi ${selectedUser.full_name || 'there'},\n\nHere is a summary of your Srot Finance account activity.\n\nTotal Income: Rs.${totals.income.toLocaleString('en-IN')}\nTotal Expense: Rs.${totals.expense.toLocaleString('en-IN')}\nNet Balance: Rs.${(totals.income - totals.expense).toLocaleString('en-IN')}\n\nSent by the Srot Finance admin team.`,
                    pdfBase64
                })
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error);
            showToast('Summary email sent to user', 'success');
        } catch (err) {
            showToast('Failed to send email. Check API logs.', 'error');
        } finally {
            setLoadingTx(false);
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const filteredUsers = users.filter(u =>
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.full_name && u.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-slate-50 font-['Outfit']">
            {/* Topbar */}
            <div className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                            <ShieldCheck size={20} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight flex items-center gap-2 text-white">
                                Admin <span className="hidden sm:inline">Console</span> {myRole === 'superuser' ? (
                                    <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-black border border-amber-500/30">SuperUser</span>
                                ) : (
                                    <span className="bg-blue-500/20 text-blue-300 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-black border border-blue-500/30">Admin</span>
                                )}
                            </h1>
                            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Logged in as {session.user.email}</p>
                        </div>

                        {/* Master Navigation */}
                        <div className="hidden md:flex gap-1 p-1 bg-slate-800/50 border border-slate-700 rounded-xl ml-4 sm:ml-8">
                            <button
                                onClick={() => setActiveMasterTab('directory')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeMasterTab === 'directory' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                            >
                                <Users size={14} /> Directory
                            </button>
                            <button
                                onClick={() => setActiveMasterTab('campaigns')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeMasterTab === 'campaigns' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                            >
                                <Mail size={14} /> Campaigns
                            </button>
                            <button
                                onClick={() => setActiveMasterTab('analytics')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeMasterTab === 'analytics' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                            >
                                <Activity size={14} /> Analytics
                            </button>
                            <button
                                onClick={() => setActiveMasterTab('push')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeMasterTab === 'push' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                            >
                                <MonitorSmartphone size={14} /> Push Alerts
                            </button>
                            <button
                                onClick={() => setActiveMasterTab('categories')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeMasterTab === 'categories' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                            >
                                <CheckSquare size={14} /> Categories
                            </button>
                            <button
                                onClick={() => setActiveMasterTab('gallery')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeMasterTab === 'gallery' ? 'bg-pink-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                            >
                                <ImageIcon size={14} /> Gallery
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Mobile view dropdown */}
                        <div className="md:hidden">
                            <select
                                value={activeMasterTab}
                                onChange={(e) => setActiveMasterTab(e.target.value)}
                                className="bg-slate-800 text-slate-300 px-3 py-2 rounded-xl text-xs font-bold border border-slate-700 outline-none focus:border-orange-500 appearance-none"
                            >
                                <option value="directory">Directory</option>
                                <option value="campaigns">Campaigns</option>
                                <option value="analytics">Analytics</option>
                                <option value="push">Push Alerts</option>
                                <option value="categories">Categories</option>
                                <option value="gallery">Gallery</option>
                            </select>
                        </div>
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700 hover:border-rose-500/30"
                        >
                            <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {activeMasterTab === 'directory' ? (
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
                    {/* Users List Sidebar */}
                    <div className="w-full md:w-[350px] flex flex-col gap-4">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

                            <div className="flex items-center gap-2 mb-4">
                                <button
                                    onClick={() => {
                                        setSelectedUser(null);
                                        setPushModalOpen(true);
                                    }}
                                    className="px-4 py-3 bg-rose-50 text-rose-600 rounded-2xl text-xs font-bold hover:bg-rose-100 transition-all flex items-center gap-2 shrink-0"
                                    title="Broadcast push notification to everyone"
                                >
                                    <MonitorSmartphone size={16} /> Broadcast
                                </button>
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search users by email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-slate-700"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-2 px-2">
                                <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">Total Users</span>
                                <span className="text-xs font-black text-slate-700">{users.length}</span>
                            </div>

                            {loading ? (
                                <div className="py-12 flex justify-center"><Loader2 size={24} className="animate-spin text-slate-400" /></div>
                            ) : (
                                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {filteredUsers.map(u => (
                                        <button
                                            key={u.id}
                                            onClick={() => handleSelectUser(u)}
                                            className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all border text-left ${selectedUser?.id === u.id
                                                ? 'bg-slate-900 border-slate-800 shadow-md transform scale-[1.02]'
                                                : 'bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm bg-gradient-to-tr flex-shrink-0 ${selectedUser?.id === u.id ? 'from-orange-500 to-rose-500 text-white' : 'from-slate-200 to-slate-100 text-slate-600'}`}>
                                                {u.full_name?.charAt(0) || u.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="truncate">
                                                <p className={`text-sm font-bold truncate flex items-center gap-1.5 ${selectedUser?.id === u.id ? 'text-white' : 'text-slate-900'}`}>
                                                    <span className="truncate">{u.full_name || 'No Name'}</span>
                                                    {u.admin_role === 'superuser' && (
                                                        <span className="shrink-0 text-[8px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-600 border border-amber-500/30 px-1.5 py-0.5 rounded-full flex items-center gap-0.5"><Crown size={8} /> Super</span>
                                                    )}
                                                    {u.admin_role === 'admin' && (
                                                        <span className="shrink-0 text-[8px] font-black uppercase tracking-wider bg-blue-500/15 text-blue-600 border border-blue-500/30 px-1.5 py-0.5 rounded-full flex items-center gap-0.5"><Shield size={8} /> Admin</span>
                                                    )}
                                                </p>
                                                <p className={`text-[10px] font-semibold truncate ${selectedUser?.id === u.id ? 'text-slate-400' : 'text-slate-500'}`}>{u.email}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {selectedUser ? (
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                                {/* User Profile Header */}
                                <div className="flex items-start justify-between border-b border-slate-100 pb-6 mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-tr from-slate-100 to-slate-200 rounded-2xl border-2 border-white shadow-md overflow-hidden">
                                            {selectedUser.avatar_url ? (
                                                <img src={selectedUser.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center font-black text-2xl text-slate-400">
                                                    {selectedUser.full_name?.charAt(0) || selectedUser.email.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2 flex-wrap">
                                                {selectedUser.full_name || 'Anonymous User'}
                                                {selectedUser.admin_role === 'superuser' && (
                                                    <span className="text-[10px] font-black uppercase tracking-widest bg-amber-100 text-amber-700 border border-amber-300 px-2.5 py-1 rounded-full flex items-center gap-1"><Crown size={11} /> Superuser</span>
                                                )}
                                                {selectedUser.admin_role === 'admin' && (
                                                    <span className="text-[10px] font-black uppercase tracking-widest bg-blue-100 text-blue-700 border border-blue-300 px-2.5 py-1 rounded-full flex items-center gap-1"><Shield size={11} /> Admin</span>
                                                )}
                                            </h2>
                                            <p className="text-sm font-semibold text-slate-500">{selectedUser.email}</p>
                                            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">
                                                Joined {new Date(selectedUser.created_at).toLocaleDateString()}
                                                {selectedUser.last_sign_in_at && (
                                                    <span className="normal-case tracking-normal"> • Last active {new Date(selectedUser.last_sign_in_at).toLocaleDateString()}</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDeleteUser(selectedUser.id)}
                                        className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                    >
                                        <Trash2 size={14} /> Delete User
                                    </button>
                                </div>

                                {/* Tabs */}
                                <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit mb-6">
                                    <button
                                        onClick={() => setActiveUserTab('data')}
                                        className={`px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeUserTab === 'data' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        <Database size={14} /> Finance Data
                                    </button>
                                    <button
                                        onClick={() => setActiveUserTab('actions')}
                                        className={`px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeUserTab === 'actions' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        <Send size={14} /> Admin Actions
                                    </button>
                                    <button
                                        onClick={() => setActiveUserTab('tracking')}
                                        className={`px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeUserTab === 'tracking' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        <MonitorSmartphone size={14} /> Sessions & Devices
                                    </button>
                                </div>

                                {/* Tab Content */}
                                {activeUserTab === 'data' && (
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Transaction History</h3>
                                            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{userTransactions.length} Total</span>
                                        </div>

                                        {loadingTx ? (
                                            <div className="py-12 flex justify-center"><Loader2 size={24} className="animate-spin text-slate-400" /></div>
                                        ) : userTransactions.length === 0 ? (
                                            <div className="text-center py-12 bg-slate-50 border border-slate-100 rounded-2xl">
                                                <p className="text-sm font-bold text-slate-400">No transactions recorded by this user.</p>
                                            </div>
                                        ) : (
                                            <div className="border border-slate-200 rounded-2xl overflow-hidden">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="bg-slate-900 text-white text-[10px] uppercase tracking-widest">
                                                            <th className="p-3 font-black">Date</th>
                                                            <th className="p-3 font-black">Title</th>
                                                            <th className="p-3 font-black">Category</th>
                                                            <th className="p-3 font-black text-right">Amount</th>
                                                            <th className="p-3 font-black text-center">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {userTransactions.map((tx, i) => (
                                                            <tr key={tx.id} className={`text-xs font-bold border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                                                                <td className="p-3 text-slate-500">{new Date(tx.date).toLocaleDateString()}</td>
                                                                <td className="p-3 text-slate-900 truncate max-w-[150px]">{tx.title}</td>
                                                                <td className="p-3 text-slate-600">{tx.category}</td>
                                                                <td className={`p-3 text-right font-black font-mono ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                                    {tx.type === 'income' ? '+' : '-'}₹{tx.amount}
                                                                </td>
                                                                <td className="p-3 text-center">
                                                                    <button onClick={() => handleDeleteTransaction(tx.id)} className="text-slate-400 hover:text-rose-500 transition-colors p-2 bg-white rounded-lg shadow-sm border border-slate-200 hover:border-rose-200">
                                                                        <Trash2 size={12} />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeUserTab === 'actions' && (
                                    <div className="space-y-4">
                                        {/* Access Control — superusers only */}
                                        {myRole === 'superuser' ? (
                                            <div className="p-5 border border-violet-200 rounded-2xl bg-violet-50">
                                                <div className="flex gap-4 items-center mb-4">
                                                    <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center">
                                                        <UserCog size={20} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-black text-violet-900">Access Control</h4>
                                                        <p className="text-xs font-medium text-violet-700 mt-0.5">
                                                            Current role: <span className="font-black uppercase">{selectedUser.admin_role || 'regular user'}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                {selectedUser.id === session.user.id ? (
                                                    <p className="text-xs font-bold text-violet-500 italic">You cannot change your own role. Ask another superuser.</p>
                                                ) : (
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedUser.admin_role !== 'admin' && (
                                                            <button
                                                                onClick={() => handleSetRole(selectedUser.id, 'admin')}
                                                                disabled={changingRole}
                                                                className="px-4 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50"
                                                            >
                                                                <Shield size={14} /> Make Admin
                                                            </button>
                                                        )}
                                                        {selectedUser.admin_role !== 'superuser' && (
                                                            <button
                                                                onClick={() => handleSetRole(selectedUser.id, 'superuser')}
                                                                disabled={changingRole}
                                                                className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs rounded-xl shadow-md hover:brightness-105 transition-all flex items-center gap-2 disabled:opacity-50"
                                                            >
                                                                <Crown size={14} /> Make Superuser
                                                            </button>
                                                        )}
                                                        {selectedUser.admin_role && (
                                                            <button
                                                                onClick={() => handleSetRole(selectedUser.id, 'none')}
                                                                disabled={changingRole}
                                                                className="px-4 py-2.5 bg-white text-slate-600 border border-slate-300 font-bold text-xs rounded-xl hover:bg-slate-100 transition-all disabled:opacity-50"
                                                            >
                                                                Remove Admin Access
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ) : myRole === 'admin' ? (
                                            <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50 flex items-center gap-3">
                                                <ShieldCheck size={18} className="text-slate-400 shrink-0" />
                                                <p className="text-xs font-medium text-slate-500">Role changes require a <span className="font-bold text-slate-700">superuser</span>. Your role: <span className="font-bold text-slate-700 uppercase">admin</span>.</p>
                                            </div>
                                        ) : null}
                                        <div className="p-5 border border-slate-200 rounded-2xl flex items-center justify-between bg-slate-50">
                                            <div className="flex gap-4 items-center">
                                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                                    <Mail size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-slate-900">Email Account Summary</h4>
                                                    <p className="text-xs font-medium text-slate-500 mt-0.5">Send this user a real summary of their income, expenses and top categories.</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleGenerateUserReport}
                                                className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md hover:bg-slate-800 transition-all flex items-center gap-2"
                                            >
                                                <Send size={14} /> Send Email
                                            </button>
                                        </div>
                                        <div className="p-5 border border-yellow-200 rounded-2xl flex items-center justify-between bg-yellow-50">
                                            <div className="flex gap-4 items-center">
                                                <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center">
                                                    <AlertTriangle size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-yellow-900">Force Password Reset</h4>
                                                    <p className="text-xs font-medium text-yellow-700 mt-0.5">Send password reset instructions via email.</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={async () => {
                                                    if (window.confirm("Send reset password email?")) {
                                                        const { error } = await supabase.auth.resetPasswordForEmail(selectedUser.email);
                                                        if (error) showToast("Failed to send reset email.", "error");
                                                        else showToast("Reset email sent.", "success");
                                                    }
                                                }}
                                                className="px-5 py-2.5 bg-yellow-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-yellow-700 transition-all"
                                            >
                                                Send Reset
                                            </button>
                                        </div>

                                        <div className="p-5 border border-orange-200 rounded-2xl flex items-center justify-between bg-orange-50">
                                            <div className="flex gap-4 items-center">
                                                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                                                    <MonitorSmartphone size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-orange-900">Direct Push Notification</h4>
                                                    <p className="text-xs font-medium text-orange-700 mt-0.5">Send a real-time system alert directly to their device screen.</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setPushModalOpen(true)}
                                                className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-xs rounded-xl shadow-md hover:from-orange-600 hover:to-rose-600 transition-all flex items-center gap-2"
                                            >
                                                <Send size={14} /> Send Alert
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeUserTab === 'tracking' && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Devices Used</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {userDevices.map(device => (
                                                    <div key={device.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-bold">
                                                            <MonitorSmartphone size={16} />
                                                        </div>
                                                        <div className="flex-1 truncate">
                                                            <p className="text-xs font-black text-slate-900 truncate">{device.device_name || 'Unknown Device'}</p>
                                                            <p className="text-[10px] text-slate-500 font-bold tracking-wider">{device.browser} • {device.os}</p>
                                                            <p className="text-[10px] text-slate-400 mt-1">Last active: {new Date(device.last_active).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {userDevices.length === 0 && <p className="text-xs text-slate-500 italic">No device data logged yet.</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Login Sessions</h3>
                                            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="bg-slate-900 text-white text-[10px] uppercase tracking-widest">
                                                            <th className="p-3 font-black">Date & Time</th>
                                                            <th className="p-3 font-black">IP Address</th>
                                                            <th className="p-3 font-black">Location</th>
                                                            <th className="p-3 font-black text-right">Time Spent</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {userSessions.map((session, i) => (
                                                            <tr key={session.id} className={`text-xs font-bold border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                                                                <td className="p-3 text-slate-600">{new Date(session.session_start).toLocaleString()}</td>
                                                                <td className="p-3 text-slate-600 font-mono text-[10px]">{session.ip_address || '—'}</td>
                                                                <td className="p-3 text-slate-600 truncate max-w-[120px]">{session.geo_location || '—'}</td>
                                                                <td className="p-3 text-right text-slate-600 font-mono">
                                                                    {session.time_spent_seconds
                                                                        ? `${Math.floor(session.time_spent_seconds / 60)}m ${session.time_spent_seconds % 60}s`
                                                                        : '< 1m'}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        {userSessions.length === 0 && (
                                                            <tr><td colSpan="4" className="text-center p-4 text-xs text-slate-500">No session data logged yet.</td></tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="h-full bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-12 min-h-[500px]">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                                    <Users size={32} className="text-slate-300" />
                                </div>
                                <h3 className="text-lg font-black text-slate-500 mb-2">No User Selected</h3>
                                <p className="text-sm font-medium text-slate-400 max-w-sm">
                                    Search and select a user from the sidebar to view their full data, manage transactions, and execute administrative actions.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ) : activeMasterTab === 'campaigns' ? (
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <AdminCampaigns users={users} showToast={showToast} />
                </div>
            ) : activeMasterTab === 'analytics' ? (
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <AdminAnalytics showToast={showToast} />
                </div>
            ) : activeMasterTab === 'push' ? (
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <AdminPush users={users} showToast={showToast} />
                </div>
            ) : activeMasterTab === 'categories' ? (
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <AdminCategories />
                </div>
            ) : activeMasterTab === 'gallery' ? (
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <AdminGallery />
                </div>
            ) : null
            }

            {/* Push Notification Modal */}
            <AnimatePresence>
                {pushModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setPushModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shrink-0">
                                    <MonitorSmartphone size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 leading-tight">{selectedUser ? 'Send Push Alert' : 'Broadcast to All'}</h2>
                                    <p className="text-xs font-bold text-slate-500 mt-1 truncate">
                                        {selectedUser ? `To: ${selectedUser.email}` : `To: All Registered Users (${users.length})`}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6">
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-3">Notification Message</label>
                                <textarea
                                    className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none transition-all"
                                    placeholder="Type the alert message to broadcast directly to their screens..."
                                    value={pushMessage}
                                    onChange={(e) => setPushMessage(e.target.value)}
                                    autoFocus
                                />

                                <div className="flex items-center justify-end gap-3 mt-6">
                                    <button
                                        onClick={() => { setPushModalOpen(false); setPushMessage(''); }}
                                        className="px-6 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={!pushMessage.trim() || loadingTx}
                                        onClick={async () => {
                                            setLoadingTx(true);
                                            try {
                                                const res = await fetch('/api/send-push', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
                                                    },
                                                    body: JSON.stringify({
                                                        title: 'Message from Srot Finance HQ',
                                                        body: pushMessage.trim(),
                                                        targetUserIds: selectedUser ? [selectedUser.id] : users.map(u => u.id)
                                                    })
                                                });
                                                const data = await res.json();
                                                if (!data.success) throw new Error(data.error || 'Push unacknowledged');
                                                showToast(`Push Delivered (${data.sentCount} devices reached).`, 'success');
                                                setPushModalOpen(false);
                                                setPushMessage('');
                                            } catch (err) {
                                                showToast(err.message || "Failed to trigger push.", "error");
                                            }
                                            setLoadingTx(false);
                                        }}
                                        className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {loadingTx ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                        Broadcast Alert
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl z-50 text-sm font-bold ${toast.type === 'error' ? 'bg-rose-500 text-white' : 'bg-slate-900 text-emerald-400'
                            }`}
                    >
                        {toast.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};
