import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Trash2, Pencil, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ICON_MAP, AVAILABLE_ICONS } from '../../config/constants';

// Resolve any icon_key to a Lucide icon component
const resolveIcon = (iconKey) => {
    if (!iconKey) return Coins;
    if (ICON_MAP[iconKey]) return ICON_MAP[iconKey];
    const found = AVAILABLE_ICONS.find(i => i.name === iconKey);
    return found?.component || Coins;
};

// Theme-safe vibrant category palette with distinct badges
const CATEGORY_COLORS = {
    Shopping: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20', dot: 'bg-rose-500' },
    Food: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', dot: 'bg-orange-500' },
    Transport: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', dot: 'bg-blue-500' },
    Bills: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', dot: 'bg-amber-500' },
    Health: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
    Travel: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20', dot: 'bg-indigo-500' },
    Entertainment: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', dot: 'bg-purple-500' },
    Salary: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
    Investment: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20', dot: 'bg-cyan-500' },
    Other: { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/20', dot: 'bg-slate-500' },
};

const getCategoryStyle = (catName = 'Other') => {
    return CATEGORY_COLORS[catName] || CATEGORY_COLORS.Other;
};

export const TransactionItem = ({ transaction, categories = [], onEdit, onDelete }) => {
    const catObj = categories.find(c => c.name === transaction.category);
    const isEmoji = catObj?.is_emoji || false;
    const iconKey = catObj?.icon_key || transaction.category;
    const Icon = isEmoji ? null : resolveIcon(iconKey);
    const style = getCategoryStyle(transaction.category);
    const isExpense = transaction.type === 'expense';

    // Format relative date nicely
    const formatTxDate = (d) => {
        if (!d) return '';
        const txDate = new Date(d);
        const today = new Date();
        const diffDays = Math.floor((today - txDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return txDate.toLocaleDateString('en-IN', { weekday: 'short' });
        return txDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    };

    const numAmount = parseFloat(transaction.amount) || 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -2 }}
            onClick={() => onEdit && onEdit(transaction)}
            className="group relative flex items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl glass-panel border border-[var(--border-main)] hover:border-[var(--border-highlight)] hover:bg-[var(--bg-surface-active)] transition-all cursor-pointer overflow-hidden shadow-sm"
        >
            {/* Left: Category Icon + Title + Meta */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 border ${style.border} ${style.bg} ${style.text} shadow-inner transition-transform group-hover:scale-105 duration-200`}>
                    {isEmoji ? (
                        <span className="text-xl sm:text-2xl leading-none">{iconKey}</span>
                    ) : (
                        Icon && <Icon size={20} strokeWidth={2.2} />
                    )}
                </div>

                <div className="min-w-0">
                    <p className="font-bold text-[var(--text-main)] text-sm sm:text-base truncate tracking-tight group-hover:text-orange-400 transition-colors">
                        {transaction.title || 'Untitled Transaction'}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${style.bg} ${style.text} ${style.border} uppercase tracking-wider`}>
                            <span className={`w-1 h-1 rounded-full ${style.dot}`} />
                            {transaction.category}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] font-medium">•</span>
                        <span className="text-[11px] font-medium text-[var(--text-muted)] flex items-center gap-1">
                            <Calendar size={11} className="opacity-70" />
                            {formatTxDate(transaction.date)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Right: Amount + Action Slide-over */}
            <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                    <p className={`font-mono font-bold text-base sm:text-lg tracking-tight flex items-center justify-end gap-1 ${
                        isExpense ? 'text-[var(--text-main)]' : 'text-emerald-500 font-extrabold'
                    }`}>
                        <span className="text-xs sm:text-sm opacity-80">{isExpense ? '-' : '+'}</span>
                        <span>₹{numAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                        {isExpense ? 'Expense' : 'Income'}
                    </p>
                </div>

                {/* Desktop hover actions drawer */}
                <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pl-2">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit && onEdit(transaction);
                        }}
                        className="w-8 h-8 rounded-xl bg-[var(--bg-surface)] hover:bg-orange-500/20 text-orange-400 border border-[var(--border-main)] hover:border-orange-500/30 flex items-center justify-center transition-all hover:scale-105"
                        title="Edit transaction"
                    >
                        <Pencil size={13} />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete && onDelete(transaction.id);
                        }}
                        className="w-8 h-8 rounded-xl bg-[var(--bg-surface)] hover:bg-rose-500/20 text-rose-400 border border-[var(--border-main)] hover:border-rose-500/30 flex items-center justify-center transition-all hover:scale-105"
                        title="Delete transaction"
                    >
                        <Trash2 size={13} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
