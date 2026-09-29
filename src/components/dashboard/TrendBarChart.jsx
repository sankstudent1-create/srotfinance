import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TrendBarChart = ({ transactions = [], type = 'expense', range = 7 }) => {
    const [hoveredBar, setHoveredBar] = useState(null);

    // Build day buckets based on selected range
    const dailyData = [];
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    for (let i = range - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        d.setHours(0, 0, 0, 0);
        dailyData.push({
            date: new Date(d),
            label: range <= 7
                ? d.toLocaleDateString('en-IN', { weekday: 'short' })
                : d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
            val: 0
        });
    }

    // Aggregate amounts
    transactions.filter(t => t.type === type).forEach(t => {
        const tDate = new Date(t.date);
        tDate.setHours(0, 0, 0, 0);
        const dayRecord = dailyData.find(d => d.date.toDateString() === tDate.toDateString());
        if (dayRecord) {
            dayRecord.val += parseFloat(t.amount) || 0;
        }
    });

    const maxVal = Math.max(...dailyData.map(d => d.val), 1);
    const hasData = dailyData.some(d => d.val > 0);

    const isExpense = type === 'expense';
    const barGradient = isExpense
        ? 'from-rose-500 to-orange-500'
        : 'from-emerald-400 to-teal-500';

    return (
        <div className="h-56 w-full relative pt-6 flex flex-col justify-between">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
                {[1, 0.75, 0.5, 0.25, 0].map((tick, i) => (
                    <div key={i} className="w-full border-t border-dashed border-[var(--border-main)] relative">
                        {i < 4 && (
                            <span className="absolute -top-3 right-0 text-[10px] font-mono text-[var(--text-muted)] select-none">
                                ₹{Math.round(maxVal * tick).toLocaleString('en-IN')}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* Bars container */}
            <div className="relative z-10 flex items-end justify-between gap-1 sm:gap-2 h-40 px-2 sm:px-4">
                {dailyData.map((d, i) => {
                    const heightPct = Math.max(hasData && d.val > 0 ? (d.val / maxVal) * 100 : 4, 4);
                    const isHovered = hoveredBar === i;

                    return (
                        <div
                            key={i}
                            className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
                            onMouseEnter={() => setHoveredBar(i)}
                            onMouseLeave={() => setHoveredBar(null)}
                        >
                            {/* Hover Tooltip */}
                            <AnimatePresence>
                                {isHovered && d.val > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                                        animate={{ opacity: 1, y: -6, scale: 1 }}
                                        exit={{ opacity: 0, y: 4, scale: 0.9 }}
                                        className="absolute -top-12 z-30 px-3 py-1.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-highlight)] shadow-xl text-center pointer-events-none whitespace-nowrap"
                                    >
                                        <p className="text-[10px] text-[var(--text-muted)] font-semibold">{d.label}</p>
                                        <p className="text-xs font-mono font-black text-[var(--text-main)]">
                                            ₹{Math.round(d.val).toLocaleString('en-IN')}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Bar Pill */}
                            <div className="w-full max-w-[28px] h-full flex items-end">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${heightPct}%` }}
                                    transition={{ duration: 0.6, delay: i * 0.03, type: 'spring', damping: 20 }}
                                    className={`w-full rounded-t-xl bg-gradient-to-t ${barGradient} transition-all duration-200 relative ${
                                        d.val > 0 ? 'opacity-90 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'opacity-20'
                                    }`}
                                >
                                    {isHovered && d.val > 0 && (
                                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/70 rounded-t-xl" />
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* X-axis Labels */}
            <div className="flex justify-between items-center px-2 sm:px-4 pt-2 border-t border-[var(--border-main)]">
                {dailyData.map((d, i) => (
                    <div key={i} className="flex-1 text-center">
                        <span className={`text-[10px] sm:text-[11px] font-bold tracking-tight select-none transition-colors ${
                            hoveredBar === i ? 'text-orange-400' : 'text-[var(--text-muted)]'
                        }`}>
                            {d.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
