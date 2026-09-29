import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Pencil, Trash2, Check, ChevronLeft, Loader2, Tag, Smile } from 'lucide-react';
import { DEFAULT_CATEGORIES, ICON_MAP, AVAILABLE_ICONS, CATEGORY_COLORS } from '../../config/constants';
import { supabase } from '../../config/supabase';

/**
 * Default category objects
 */
const DEFAULT_CAT_OBJECTS = DEFAULT_CATEGORIES.map(name => ({
    name,
    icon_key: name,
    type: ['Salary', 'Investment'].includes(name) ? 'income' : 'expense',
    usage_count: 5,
    is_emoji: false,
}));

/**
 * Get the icon component for a category name
 */
export const getCategoryIcon = (name, categories = []) => {
    const match = categories.find(c => c.name === name);
    if (match) {
        if (match.is_emoji) return null;
        if (ICON_MAP[match.icon_key]) return ICON_MAP[match.icon_key];
    }
    if (ICON_MAP[name]) return ICON_MAP[name];
    return ICON_MAP['Other'];
};

/**
 * Get color config for a category
 */
export const getCategoryColor = (name) => {
    const colorMap = {
        Shopping: 'rose', Food: 'orange', Transport: 'blue', Bills: 'amber',
        Health: 'emerald', Travel: 'indigo', Entertainment: 'purple', Salary: 'emerald',
        Investment: 'teal', Other: 'slate',
    };
    const colorId = colorMap[name] || 'orange';
    return CATEGORY_COLORS.find(c => c.id === colorId) || CATEGORY_COLORS[1] || { bg: 'bg-orange-500/10', text: 'text-orange-400' };
};

/**
 * Fetch categories from Supabase with offline caching
 */
export const fetchCategories = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('usage_count', { ascending: false });

        if (!error && data && data.length > 0) {
            const customNames = data.map(c => c.name);
            const missingDefaults = DEFAULT_CAT_OBJECTS.filter(d => !customNames.includes(d.name));
            const merged = [...data, ...missingDefaults];
            localStorage.setItem(`cached_cat_${userId}`, JSON.stringify(merged));
            return merged;
        }
    } catch (e) {
        console.error('Category fetch error:', e);
    }

    try {
        const cached = localStorage.getItem(`cached_cat_${userId}`);
        if (cached) return JSON.parse(cached);
    } catch { /* ignore */ }

    return [...DEFAULT_CAT_OBJECTS];
};

const COMMON_EMOJIS = ['🛒', '🍕', '🚗', '⚡', '💊', '✈️', '🎮', '💼', '📈', '🏷️', '☕', '🎁', '🏋️', '📚', '🎵', '🎬', '🏠', '🐾', '💈', '🎂'];

export const CategoryManager = ({ isOpen, onClose, onCategoriesChange, userId }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [editingCat, setEditingCat] = useState(null);

    // Form state
    const [editName, setEditName] = useState('');
    const [editIcon, setEditIcon] = useState('Tag');
    const [editType, setEditType] = useState('expense');
    const [editIsEmoji, setEditIsEmoji] = useState(false);

    useEffect(() => {
        if (isOpen && userId) {
            setLoading(true);
            fetchCategories(userId).then(cats => {
                setCategories(cats);
                setLoading(false);
            });
        }
    }, [isOpen, userId]);

    const sortedCategories = useMemo(() => {
        return [...categories].sort((a, b) => (b.usage_count || 0) - (a.usage_count || 0));
    }, [categories]);

    const startAdd = () => {
        setEditName('');
        setEditIcon('Tag');
        setEditType('expense');
        setEditIsEmoji(false);
        setEditingCat(null);
        setShowAdd(true);
    };

    const startEdit = (cat) => {
        setEditName(cat.name);
        setEditIcon(cat.icon_key || cat.name);
        setEditType(cat.type || 'expense');
        setEditIsEmoji(cat.is_emoji || false);
        setEditingCat(cat);
        setShowAdd(true);
    };

    const confirmAddEdit = async () => {
        if (!editName.trim() || saving) return;
        setSaving(true);

        const catData = {
            name: editName.trim(),
            icon_key: editIcon,
            type: editType,
            is_emoji: editIsEmoji,
        };

        try {
            if (editingCat?.id) {
                const { error } = await supabase
                    .from('categories')
                    .update(catData)
                    .eq('id', editingCat.id);

                if (!error) {
                    const updated = categories.map(c =>
                        c.id === editingCat.id ? { ...c, ...catData } : c
                    );
                    setCategories(updated);
                    onCategoriesChange?.(updated);
                }
            } else {
                if (categories.some(c => c.name.toLowerCase() === editName.trim().toLowerCase())) {
                    setSaving(false);
                    return;
                }

                const { data, error } = await supabase
                    .from('categories')
                    .insert([{
                        user_id: userId,
                        ...catData,
                        usage_count: 0,
                    }])
                    .select();

                if (!error && data?.[0]) {
                    const updated = [...categories, data[0]];
                    setCategories(updated);
                    onCategoriesChange?.(updated);
                }
            }
        } catch (e) {
            console.error('Category save error:', e);
        }

        setSaving(false);
        setShowAdd(false);
        setEditingCat(null);
    };

    const handleDelete = async (cat) => {
        if (!cat.id) {
            const updated = categories.filter(c => c.name !== cat.name);
            setCategories(updated);
            onCategoriesChange?.(updated);
            return;
        }

        try {
            const { error } = await supabase.from('categories').delete().eq('id', cat.id);
            if (!error) {
                const updated = categories.filter(c => c.id !== cat.id);
                setCategories(updated);
                onCategoriesChange?.(updated);
            }
        } catch (e) {
            console.error('Category delete error:', e);
        }
    };

    if (!isOpen) return null;

    const getIconComponent = (iconKey) => {
        if (ICON_MAP[iconKey]) return ICON_MAP[iconKey];
        const match = AVAILABLE_ICONS.find(i => i.name === iconKey);
        if (match) return match.component;
        return ICON_MAP['Other'];
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                className="w-full sm:max-w-md glass-panel border border-[var(--border-main)] sm:rounded-[2.5rem] rounded-t-[2.5rem] shadow-2xl max-h-[88vh] flex flex-col overflow-hidden relative"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 pb-3 border-b border-[var(--border-main)]">
                    <div>
                        <h3 className="text-xl font-black text-[var(--text-main)]">Categories Manager</h3>
                        <p className="text-[11px] text-[var(--text-muted)] font-medium mt-0.5">Customize transaction classification</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-2xl glass-panel flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors border border-[var(--border-main)]"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Category List */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2 hide-scrollbar">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="animate-spin text-orange-400" size={28} />
                        </div>
                    ) : sortedCategories.map((cat, i) => {
                        const IconComp = cat.is_emoji ? null : getIconComponent(cat.icon_key || cat.name);
                        const catColor = getCategoryColor(cat.name);
                        return (
                            <motion.div
                                key={`${cat.name}-${cat.id || i}`}
                                layout
                                className="flex items-center gap-3 p-3 rounded-2xl glass-panel border border-[var(--border-main)] hover:border-[var(--border-highlight)] transition-all group"
                            >
                                <div className={`w-10 h-10 rounded-xl ${catColor.bg} ${catColor.text} flex items-center justify-center shrink-0 text-lg border border-[var(--border-main)]`}>
                                    {cat.is_emoji ? cat.icon_key : (IconComp && <IconComp size={18} />)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-sm font-bold text-[var(--text-main)] truncate block">{cat.name}</span>
                                    <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">
                                        {cat.type} • {cat.usage_count || 0} uses
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => startEdit(cat)}
                                        className="w-8 h-8 rounded-xl bg-[var(--bg-surface)] hover:bg-orange-500/20 text-orange-400 border border-[var(--border-main)] flex items-center justify-center transition-all"
                                    >
                                        <Pencil size={13} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(cat)}
                                        className="w-8 h-8 rounded-xl bg-[var(--bg-surface)] hover:bg-rose-500/20 text-rose-400 border border-[var(--border-main)] flex items-center justify-center transition-all"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Add Action */}
                <div className="p-6 pt-3 border-t border-[var(--border-main)]">
                    <button
                        type="button"
                        onClick={startAdd}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-orange-500/25 hover:brightness-105 active:scale-[0.98] transition-all"
                    >
                        <Plus size={18} /> Add New Category
                    </button>
                </div>

                {/* Add/Edit Sub-Sheet */}
                <AnimatePresence>
                    {showAdd && (
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
                            className="absolute inset-0 bg-[var(--bg-secondary)] sm:rounded-[2.5rem] rounded-t-[2.5rem] z-20 flex flex-col"
                        >
                            <div className="flex items-center gap-3 p-6 pb-4 border-b border-[var(--border-main)]">
                                <button
                                    onClick={() => setShowAdd(false)}
                                    className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text-main)]"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <h4 className="text-lg font-black text-[var(--text-main)]">
                                    {editingCat ? 'Edit Category' : 'Create Category'}
                                </h4>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-5 hide-scrollbar">
                                {/* Type Selector */}
                                <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                                    <button
                                        type="button"
                                        onClick={() => setEditType('expense')}
                                        className={`py-2 text-xs font-bold rounded-xl transition-all ${
                                            editType === 'expense' ? 'bg-rose-500 text-white shadow-md' : 'text-[var(--text-dim)]'
                                        }`}
                                    >
                                        Expense
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditType('income')}
                                        className={`py-2 text-xs font-bold rounded-xl transition-all ${
                                            editType === 'income' ? 'bg-emerald-500 text-white shadow-md' : 'text-[var(--text-dim)]'
                                        }`}
                                    >
                                        Income
                                    </button>
                                </div>

                                {/* Category Name */}
                                <div>
                                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 block">
                                        Category Title
                                    </label>
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={e => setEditName(e.target.value)}
                                        placeholder="e.g. Subscriptions, Gym"
                                        className="w-full bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl px-4 py-3 font-bold text-sm text-[var(--text-main)] outline-none focus:border-orange-500 transition-all"
                                    />
                                </div>

                                {/* Icon Mode Switch */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                                            Choose Icon or Emoji
                                        </label>
                                        <div className="flex gap-1 text-[11px] font-bold">
                                            <button
                                                type="button"
                                                onClick={() => setEditIsEmoji(false)}
                                                className={`px-2.5 py-1 rounded-lg ${!editIsEmoji ? 'bg-orange-500/20 text-orange-400' : 'text-[var(--text-muted)]'}`}
                                            >
                                                Icons
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setEditIsEmoji(true)}
                                                className={`px-2.5 py-1 rounded-lg ${editIsEmoji ? 'bg-orange-500/20 text-orange-400' : 'text-[var(--text-muted)]'}`}
                                            >
                                                Emojis
                                            </button>
                                        </div>
                                    </div>

                                    {editIsEmoji ? (
                                        <div className="grid grid-cols-5 gap-2 max-h-44 overflow-y-auto p-1 hide-scrollbar">
                                            {COMMON_EMOJIS.map(em => (
                                                <button
                                                    key={em}
                                                    type="button"
                                                    onClick={() => setEditIcon(em)}
                                                    className={`h-11 rounded-xl text-xl flex items-center justify-center transition-all ${
                                                        editIcon === em ? 'bg-orange-500/20 border-2 border-orange-500 scale-105' : 'glass-panel border border-[var(--border-main)] hover:bg-[var(--bg-surface-active)]'
                                                    }`}
                                                >
                                                    {em}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-5 gap-2 max-h-44 overflow-y-auto p-1 hide-scrollbar">
                                            {AVAILABLE_ICONS.map(({ name, component: Comp }) => (
                                                <button
                                                    key={name}
                                                    type="button"
                                                    onClick={() => setEditIcon(name)}
                                                    className={`h-11 rounded-xl flex items-center justify-center transition-all ${
                                                        editIcon === name ? 'bg-orange-500 text-white shadow-md scale-105' : 'glass-panel border border-[var(--border-main)] text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-active)]'
                                                    }`}
                                                >
                                                    <Comp size={18} />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 border-t border-[var(--border-main)]">
                                <button
                                    type="button"
                                    onClick={confirmAddEdit}
                                    disabled={!editName.trim() || saving}
                                    className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-orange-500/25 hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                                    <span>{editingCat ? 'Save Changes' : 'Create Category'}</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};
