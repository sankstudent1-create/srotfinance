import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';

const FORMAT_INR = (v) => {
    const n = Math.abs(v || 0);
    if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)}Cr`;
    if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)}L`;
    return `₹${n.toLocaleString('en-IN')}`;
};

const CONFIGS = {
    income: {
        gradient: 'from-amber-400 via-orange-500 to-emerald-500',
        light: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        text: 'text-emerald-400',
        glow: 'rgba(16, 185, 129, 0.25)',
        label: 'Total Income',
        trendIcon: ArrowUpRight,
    },
    expense: {
        gradient: 'from-rose-500 via-pink-500 to-red-500',
        light: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        text: 'text-rose-400',
        glow: 'rgba(244, 63, 94, 0.25)',
        label: 'Total Expense',
        trendIcon: ArrowDownRight,
    },
    balance: {
        gradient: 'from-orange-500 via-amber-400 to-rose-500',
        light: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        text: 'text-orange-400',
        glow: 'rgba(249, 115, 22, 0.28)',
        label: 'Net Balance',
        trendIcon: Sparkles,
    },
};

export const StatCard = ({ label, value = 0, icon: Icon, type = 'balance', subtitle, onClick }) => {
    const cfg = CONFIGS[type] || CONFIGS.balance;
    const isNeg = value < 0;
    const Trend = cfg.trendIcon;

    // Interactive spotlight tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            className="group relative rounded-3xl glass-panel border border-[var(--border-main)] hover:border-[var(--border-highlight)] overflow-hidden p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[var(--card-shadow)]"
        >
            {/* Dynamic Spotlight Glow */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            280px circle at ${mouseX}px ${mouseY}px,
                            ${cfg.glow},
                            transparent 80%
                        )
                    `,
                }}
            />

            {/* Top row: Icon and Trend Pill */}
            <div className="flex items-center justify-between relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${cfg.gradient} shadow-[0_4px_20px_${cfg.glow}] group-hover:scale-105 transition-transform duration-300`}>
                    <Icon size={22} className="text-white drop-shadow-sm" strokeWidth={2.5} />
                </div>

                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border backdrop-blur-md ${cfg.light}`}>
                    <Trend size={14} />
                    <span>{type === 'balance' ? 'Live' : type === 'income' ? 'Inflow' : 'Outflow'}</span>
                </div>
            </div>

            {/* Bottom row: Value and Label */}
            <div className="relative z-10 mt-6">
                <p className="text-[11px] font-extrabold text-[var(--text-dim)] uppercase tracking-[0.16em] mb-1.5 flex items-center justify-between">
                    <span>{label || cfg.label}</span>
                    {subtitle && <span className="text-[10px] text-[var(--text-muted)] lowercase font-normal">{subtitle}</span>}
                </p>
                <div className="flex items-baseline gap-1">
                    <span className={`font-mono font-black text-3xl sm:text-4xl tracking-tight transition-colors ${
                        isNeg ? 'text-rose-500' : 'text-[var(--text-main)]'
                    }`}>
                        {isNeg ? '-' : ''}{FORMAT_INR(Math.abs(value))}
                    </span>
                </div>
            </div>

            {/* Subtle bottom accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${cfg.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />
        </motion.div>
    );
};
