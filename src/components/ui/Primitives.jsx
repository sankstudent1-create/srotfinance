import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    icon: Icon,
    iconPosition = 'left',
    disabled = false,
    loading = false,
    ...props
}) => {
    const sizeStyles = {
        sm: 'px-3.5 py-1.5 text-xs rounded-xl gap-1.5',
        md: 'px-5 py-2.5 text-sm rounded-2xl gap-2 font-bold',
        lg: 'px-6 py-3.5 text-base rounded-2xl gap-2.5 font-extrabold',
        icon: 'p-2.5 rounded-2xl',
    };

    const variantStyles = {
        primary: 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow-[0_8px_25px_rgba(249,115,22,0.35)] hover:shadow-[0_12px_32px_rgba(249,115,22,0.5)] hover:brightness-105 active:scale-[0.98]',
        secondary: 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-active)] text-[var(--text-main)] border border-[var(--border-main)] hover:border-[var(--border-highlight)] active:scale-[0.98]',
        outline: 'border border-[var(--border-main)] text-[var(--text-main)] hover:bg-[var(--bg-surface)] hover:border-orange-500/50 active:scale-[0.98]',
        ghost: 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] active:scale-[0.98]',
        danger: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 active:scale-[0.98]',
        success: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 active:scale-[0.98]',
    };

    return (
        <motion.button
            whileTap={{ scale: disabled ? 1 : 0.97 }}
            disabled={disabled || loading}
            className={`inline-flex items-center justify-center transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className={loading ? 'animate-spin' : ''} />}
            {children}
            {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
        </motion.button>
    );
};

export const Card = ({
    children,
    className = '',
    interactive = false,
    highlight = false,
    ...props
}) => {
    return (
        <div
            className={`glass-panel relative overflow-hidden ${interactive ? 'glass-panel-hover glass-panel-interactive' : ''} ${highlight ? 'border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.12)]' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export const Badge = ({
    children,
    variant = 'neutral',
    size = 'sm',
    dot = false,
    className = ''
}) => {
    const variants = {
        primary: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        info: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        neutral: 'bg-[var(--bg-surface)] text-[var(--text-dim)] border-[var(--border-main)]',
    };

    const dotColors = {
        primary: 'bg-orange-400',
        success: 'bg-emerald-400',
        danger: 'bg-rose-400',
        warning: 'bg-amber-400',
        info: 'bg-sky-400',
        indigo: 'bg-indigo-400',
        neutral: 'bg-slate-400',
    };

    const sizes = {
        sm: 'px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase',
        md: 'px-3 py-1 text-xs font-bold tracking-wide',
    };

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border ${sizes[size]} ${variants[variant]} ${className}`}>
            {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} animate-pulse`} />}
            {children}
        </span>
    );
};

export const SegmentedControl = ({ options, value, onChange, className = '' }) => {
    return (
        <div className={`relative p-1 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl flex items-center gap-1 ${className}`}>
            {options.map((opt) => {
                const isActive = value === opt.id;
                return (
                    <button
                        key={opt.id}
                        type="button"
                        onClick={() => onChange(opt.id)}
                        className={`relative flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all duration-200 z-10 flex items-center justify-center gap-2 select-none ${
                            isActive ? 'text-white' : 'text-[var(--text-dim)] hover:text-[var(--text-main)]'
                        }`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="segmentPill"
                                transition={{ type: 'spring', damping: 24, stiffness: 280 }}
                                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl shadow-[0_4px_16px_rgba(249,115,22,0.35)] -z-10"
                            />
                        )}
                        {opt.icon && <opt.icon size={14} />}
                        <span>{opt.label}</span>
                    </button>
                );
            })}
        </div>
    );
};
