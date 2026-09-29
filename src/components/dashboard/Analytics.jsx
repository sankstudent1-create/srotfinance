import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp, TrendingDown, Target, Shield,
    ArrowUpRight, ArrowDownRight, BarChart3, Zap, Sparkles, PieChart
} from 'lucide-react';
import { TrendBarChart } from './TrendBarChart';

const PALETTE = [
    '#f97316', '#6366f1', '#10b981', '#ec4899', '#f59e0b',
    '#3b82f6', '#14b8a6', '#8b5cf6', '#ef4444', '#06b6d4'
];

const DonutChart = ({ segments, size = 150, thickness = 22, label, sub }) => {
    const R = (size - thickness) / 2;
    const C = size / 2;
    const cir = 2 * Math.PI * R;

    const total = segments.reduce((s, g) => s + g.value, 0);
    let offset = 0;

    return (
        <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                {/* Track */}
                <circle
                    cx={C} cy={C} r={R}
                    fill="none"
                    stroke="var(--border-main)"
                    strokeWidth={thickness}
                />
                {/* Segments */}
                {segments.map((seg, i) => {
                    const pct = total > 0 ? seg.value / total : 0;
                    const dash = pct * cir;
                    const gap = cir - dash;
                    const el = (
                        <circle
                            key={i}
                            cx={C} cy={C} r={R}
                            fill="none"
                            stroke={PALETTE[i % PALETTE.length]}
                            strokeWidth={thickness}
                            strokeDasharray={`${dash} ${gap}`}
                            strokeDashoffset={-offset}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                        />
                    );
                    offset += dash;
                    return el;
                })}
            </svg>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                <span className="text-[var(--text-main)] font-black text-sm leading-tight">{label}</span>
                {sub && <span className="text-[var(--text-muted)] text-[10px] font-semibold mt-0.5">{sub}</span>}
            </div>
        </div>
    );
};

const fmt = (v) => {
    const n = Math.abs(v || 0);
    if (n >= 1e7) return `₹${(n / 1e7).toFixed(1)}Cr`;
    if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)}L`;
    if (n >= 1e3) return `₹${(n / 1e3).toFixed(0)}K`;
    return `₹${Math.round(n).toLocaleString('en-IN')}`;
};

export const AnalyticsDashboard = ({ transactions = [] }) => {
    const a = useMemo(() => {
        const income = transactions.filter(t => t.type === 'income');
        const expenses = transactions.filter(t => t.type === 'expense');

        const totalIncome = income.reduce((s, t) => s + parseFloat(t.amount || 0), 0);
        const totalExpense = expenses.reduce((s, t) => s + parseFloat(t.amount || 0), 0);
        const savings = totalIncome - totalExpense;
        const savingsRate = totalIncome > 0 ? Math.max(0, (savings / totalIncome) * 100) : 0;

        const expByCat = {};
        expenses.forEach(t => {
            expByCat[t.category] = (expByCat[t.category] || 0) + parseFloat(t.amount || 0);
        });
        const sortedExp = Object.entries(expByCat).sort((x, y) => y[1] - x[1]);

        const incByCat = {};
        income.forEach(t => {
            incByCat[t.category] = (incByCat[t.category] || 0) + parseFloat(t.amount || 0);
        });
        const sortedInc = Object.entries(incByCat).sort((x, y) => y[1] - x[1]);

        // Smart financial health score
        let healthScore = 50;
        if (savingsRate > 30) healthScore += 25;
        else if (savingsRate > 15) healthScore += 15;
        else if (savingsRate > 0) healthScore += 5;
        else healthScore -= 20;

        if (totalIncome > totalExpense) healthScore += 15;
        if (expenses.length > 0 && totalExpense / expenses.length < totalIncome * 0.1) healthScore += 10;
        healthScore = Math.min(100, Math.max(10, healthScore));

        const healthColor = healthScore >= 80 ? '#10b981' : healthScore >= 60 ? '#6366f1' : healthScore >= 40 ? '#f59e0b' : '#f43f5e';
        const healthLabel = healthScore >= 80 ? 'Excellent' : healthScore >= 60 ? 'Strong' : healthScore >= 40 ? 'Moderate' : 'Needs Care';

        return {
            totalIncome,
            totalExpense,
            savings,
            savingsRate,
            sortedExp,
            sortedInc,
            healthScore,
            healthColor,
            healthLabel,
            donutSegments: sortedExp.map(([name, value]) => ({ name, value })),
        };
    }, [transactions]);

    return (
        <div className="space-y-6">
            {/* Top row: Health score banner + Key metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Health Score Card */}
                <motion.div
                    whileHover={{ y: -2 }}
                    className="glass-panel relative overflow-hidden p-6 flex flex-col justify-between"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-[var(--text-main)] text-sm">Health Score</h3>
                                <p className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider">Financial Fitness</p>
                            </div>
                        </div>
                        <span
                            className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border"
                            style={{ color: a.healthColor, borderColor: `${a.healthColor}40`, backgroundColor: `${a.healthColor}15` }}
                        >
                            {a.healthLabel}
                        </span>
                    </div>

                    <div className="my-6">
                        <div className="flex items-baseline justify-between mb-2">
                            <span className="font-mono font-black text-4xl text-[var(--text-main)]">
                                {a.healthScore}<span className="text-lg text-[var(--text-muted)] font-normal">/100</span>
                            </span>
                            <span className="text-xs font-bold text-[var(--text-dim)]">
                                {a.savingsRate.toFixed(0)}% Savings Rate
                            </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-main)] overflow-hidden p-0.5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${a.healthScore}%` }}
                                transition={{ duration: 1, type: 'spring' }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: a.healthColor, boxShadow: `0 0 12px ${a.healthColor}80` }}
                            />
                        </div>
                    </div>

                    <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
                        {a.savingsRate > 25
                            ? '🚀 Superb! You are saving over 25% of your income. Ready for wealth building.'
                            : a.savingsRate > 10
                            ? '👍 Good trajectory. Aim to lower discretionary spends to push savings above 20%.'
                            : '⚠️ High cash outflow compared to income. Review your top expense categories.'}
                    </p>
                </motion.div>

                {/* Savings & Cash Flow Card */}
                <motion.div
                    whileHover={{ y: -2 }}
                    className="glass-panel relative overflow-hidden p-6 flex flex-col justify-between"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-[var(--text-main)] text-sm">Net Savings</h3>
                                <p className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider">Period Surplus</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
                            <ArrowUpRight size={14} />
                            <span>{a.savings >= 0 ? 'Surplus' : 'Deficit'}</span>
                        </div>
                    </div>

                    <div className="my-6">
                        <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Retained Capital</p>
                        <p className={`font-mono font-black text-3xl sm:text-4xl mt-1 tracking-tight ${a.savings >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {fmt(a.savings)}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--border-main)]">
                        <div>
                            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase">Income</span>
                            <p className="font-mono font-bold text-sm text-[var(--text-main)] mt-0.5">{fmt(a.totalIncome)}</p>
                        </div>
                        <div>
                            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase">Expenses</span>
                            <p className="font-mono font-bold text-sm text-[var(--text-main)] mt-0.5">{fmt(a.totalExpense)}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Spending Category Donut */}
                <motion.div
                    whileHover={{ y: -2 }}
                    className="glass-panel p-6 flex flex-col justify-between"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                <PieChart size={20} />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-[var(--text-main)] text-sm">Expenses Split</h3>
                                <p className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider">By Category</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center py-2">
                        {a.donutSegments.length > 0 ? (
                            <DonutChart
                                segments={a.donutSegments}
                                size={145}
                                thickness={20}
                                label={fmt(a.totalExpense)}
                                sub="Total Spend"
                            />
                        ) : (
                            <div className="h-36 flex flex-col items-center justify-center text-[var(--text-muted)] text-xs font-semibold">
                                No expense data yet
                            </div>
                        )}
                    </div>

                    {/* Quick top 3 categories legend */}
                    <div className="space-y-1.5 pt-3 border-t border-[var(--border-main)]">
                        {a.sortedExp.slice(0, 3).map(([cat, val], i) => (
                            <div key={cat} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PALETTE[i % PALETTE.length] }} />
                                    <span className="font-bold text-[var(--text-dim)] truncate max-w-[120px]">{cat}</span>
                                </div>
                                <span className="font-mono font-semibold text-[var(--text-main)]">{fmt(val)}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom row: Spending Trend Chart + Category ranking */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* 7-Day / Daily Spending Bar Chart */}
                <div className="lg:col-span-2 glass-panel p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-extrabold text-[var(--text-main)] text-base">Expense Velocity</h3>
                            <p className="text-xs text-[var(--text-muted)] font-medium mt-0.5">Daily cash outflow trend</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-xl border border-orange-500/20">
                            <BarChart3 size={14} />
                            <span>Last 7 Days</span>
                        </div>
                    </div>
                    <TrendBarChart transactions={transactions} type="expense" range={7} />
                </div>

                {/* Top Categories breakdown list */}
                <div className="glass-panel p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="font-extrabold text-[var(--text-main)] text-base mb-1">Top Outflows</h3>
                        <p className="text-xs text-[var(--text-muted)] font-medium mb-4">Highest expense areas</p>

                        <div className="space-y-3">
                            {a.sortedExp.slice(0, 5).map(([cat, val], i) => {
                                const pct = a.totalExpense > 0 ? (val / a.totalExpense) * 100 : 0;
                                return (
                                    <div key={cat} className="space-y-1">
                                        <div className="flex items-center justify-between text-xs font-bold">
                                            <span className="text-[var(--text-main)]">{cat}</span>
                                            <span className="font-mono text-[var(--text-dim)]">{fmt(val)} ({pct.toFixed(0)}%)</span>
                                        </div>
                                        <div className="w-full h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${pct}%`,
                                                    backgroundColor: PALETTE[i % PALETTE.length],
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            {a.sortedExp.length === 0 && (
                                <p className="text-xs text-[var(--text-muted)] py-6 text-center font-medium">
                                    No categorized expenses yet.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[var(--border-main)] flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
                        <span>Total Categories</span>
                        <span className="font-mono font-bold text-[var(--text-main)]">{a.sortedExp.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
