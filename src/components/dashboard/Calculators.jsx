import React, { useState, useEffect } from 'react';
import {
    TrendingUp, Coins, Lock, ShieldCheck, Percent, RotateCcw,
    Download, Mail, Share2, Loader2, X, Info, ChevronDown, ChevronUp,
    IndianRupee, Scale, FileText, Calendar, Sparkles, ArrowRight, Landmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TRANSLATIONS (English Fallback) ---
const EN_Translations = {
    tool_sip: "SIP Calculator",
    tool_lumpsum: "Lumpsum Calculator",
    tool_fd: "Fixed Deposit (FD)",
    tool_ppf: "PPF Scheme",
    tool_interest: "Interest Calculator",
    tool_age: "Age Calculator",
    tool_emi: "EMI Calculator",
    emi_desc: "Home / Personal / Auto Loans",
    sip_desc: "Equity Mutual Funds (SIP)",
    lumpsum_desc: "One-time Mutual Fund Investment",
    fd_desc: "Guaranteed Bank Savings",
    ppf_desc: "Tax-Free Govt Scheme (15 Yrs)",
    interest_desc: "Simple Loan & Deposit Interest",
    age_desc: "Precise Age & Life Milestones",
    monthly_invest: "Monthly Investment (₹)",
    yearly_invest: "Yearly Investment (₹)",
    invest_amt: "Investment Amount (₹)",
    loan_amount: "Loan Amount (₹)",
    loan_rate: "Interest Rate (% p.a)",
    loan_tenure: "Loan Tenure (Years)",
    emi_result: "Monthly EMI",
    time_period: "Time Period (Years)",
    exp_ratio: "Expense Ratio (%)",
    return_rate: "Expected Return Rate (% p.a)",
    ppf_info: "PPF uses guaranteed Govt interest ~7.1% compounded annually",
    projection: "Year-by-Year Growth",
    reset: "Reset Defaults",
    pdf_report: "Download PDF Report",
    est_tax: "Est. Tax Impact",
    calc_subject: "Financial Projection",
    calc_share_text: "I calculated my investment return on Srot Finance.",
    analysis_projections: "Investment Analysis & Projections",
    report_generated: "Report Generated",
    invested: "Total Invested",
    wealth_created: "Estimated Gains",
    net_value: "Net Maturity Value",
    calculate: "Recalculate",
    detailed_report: "Detailed Projections",
    share: "Share",
    generating: "Generating..."
};

const t = (key) => EN_Translations[key] || key;

// --- INDIAN TAX INFO FOR EACH SCHEME (FY 2025-26) ---
const SCHEME_TAX_INFO = {
    sip: {
        name: "SIP (Systematic Investment Plan)",
        section: "Equity Mutual Funds",
        taxRules: [
            { label: "LTCG Holding Period", value: "> 12 months per installment" },
            { label: "LTCG Tax Rate", value: "12.5% (on gains > ₹1.25L/year)" },
            { label: "STCG Tax Rate", value: "20% (if redeemed within 12 months)" },
            { label: "Indexation Benefit", value: "Not applicable on Equity MFs" },
            { label: "TDS", value: "Zero TDS on resident Indian redemptions" },
        ],
        exemptions: [
            "First ₹1,25,000 of LTCG per financial year is completely tax-exempt.",
            "Each SIP monthly installment counts as an independent purchase for holding duration.",
            "No dividend distribution tax at source; dividend income is taxed at slab rates.",
            "Switching between schemes (regular to direct or growth to IDCW) triggers a capital gains event.",
        ],
        tip: "💡 Hold your equity SIP units for more than 12 months so gains qualify for the 12.5% LTCG rate rather than the 20% STCG rate."
    },
    lumpsum: {
        name: "Lumpsum Investment",
        section: "Equity Mutual Funds (One-time)",
        taxRules: [
            { label: "LTCG Holding Period", value: "> 12 months" },
            { label: "LTCG Tax Rate", value: "12.5% (gains > ₹1.25L)" },
            { label: "STCG Tax Rate", value: "20% (< 12 months)" },
            { label: "Indexation Benefit", value: "Not Available" },
            { label: "Surcharge / Cess", value: "4% Health & Education cess applicable" },
        ],
        exemptions: [
            "First ₹1,25,000 of total equity LTCG across all funds is fully tax-free per year.",
            "Debt mutual funds bought after 1 April 2023 are taxed at income tax slab rate regardless of tenure.",
            "Hybrid funds with >35% and <65% equity qualify for indexation if acquired before April 2023.",
        ],
        tip: "💡 Harvest capital gains annually up to ₹1.25L tax-free limit to legally reduce long-term tax liabilities."
    },
    fd: {
        name: "Fixed Deposit (FD)",
        section: "Bank / Corporate Deposits",
        taxRules: [
            { label: "Interest Taxation", value: "Taxed at applicable slab rate" },
            { label: "TDS Threshold", value: "₹40,000/year (₹50,000 for senior citizens)" },
            { label: "TDS Rate", value: "10% with PAN (20% without PAN)" },
            { label: "Tax Saver FD Lock-in", value: "5 Years mandatory" },
        ],
        exemptions: [
            "5-Year Tax Saver FDs qualify for Section 80C deduction up to ₹1.5L (Old Regime).",
            "Senior citizens enjoy ₹50,000 interest deduction under Section 80TTB.",
            "Submit Form 15G / 15H to your bank at the start of FY if your total income is below the taxable threshold.",
            "Under the New Tax Regime, Section 80C deduction is not available.",
        ],
        tip: "💡 Submit Form 15G/15H to prevent banks from deducting 10% TDS if your estimated annual income is within the non-taxable slab."
    },
    ppf: {
        name: "Public Provident Fund (PPF)",
        section: "Govt Scheme — Exempt-Exempt-Exempt (EEE)",
        taxRules: [
            { label: "Contribution Deduction", value: "Sec 80C up to ₹1.5L/year (Old Regime)" },
            { label: "Interest Earned", value: "100% Tax Free" },
            { label: "Maturity Amount", value: "100% Tax Free" },
            { label: "Current Rate (2025-26)", value: "7.1% p.a. compounded yearly" },
            { label: "Tenure", value: "15 years (extendable in 5-yr blocks)" },
        ],
        exemptions: [
            "PPF holds highest EEE status — investment, accrual, and withdrawal are 100% tax-free.",
            "Investment up to ₹1,50,000/year deductible under Section 80C (Old Regime).",
            "Interest earned is exempt under Section 10(11) of the Income Tax Act.",
            "PPF balance cannot be attached by courts or creditors for debt settlements.",
        ],
        tip: "💡 Deposit your PPF amount on or before the 5th of each month to maximize monthly interest calculation."
    },
    interest: {
        name: "Simple Interest Calculator",
        section: "Income from Other Sources",
        taxRules: [
            { label: "Tax Rate", value: "Added to total income and taxed at slab rate" },
            { label: "Sec 80TTA (Savings)", value: "Up to ₹10,000 exempt (non-seniors)" },
            { label: "Sec 80TTB (Senior)", value: "Up to ₹50,000 exempt (age 60+)" },
        ],
        exemptions: [
            "Interest from savings accounts up to ₹10,000 is deductible under 80TTA.",
            "Senior citizens enjoy ₹50,000 deduction on both savings & FD interest under 80TTB.",
            "Interest from Govt Tax-Free Bonds is 100% exempt from income tax.",
        ],
        tip: "💡 Always report all interest income in your annual ITR under 'Income from Other Sources'."
    },
    emi: {
        name: "EMI / Loan Calculator",
        section: "Loans — Home, Personal, Auto",
        taxRules: [
            { label: "Home Loan Principal", value: "80C deduction up to ₹1.5L/year" },
            { label: "Home Loan Interest", value: "Sec 24(b) up to ₹2L/year (self-occupied)" },
            { label: "Personal / Auto Loan", value: "No tax deduction on EMI" },
            { label: "Prepayment", value: "Allowed; check foreclosure charges" },
        ],
        exemptions: [
            "Home loan principal repaid qualifies for Section 80C deduction up to ₹1.5L per year (Old Regime).",
            "Home loan interest up to ₹2L per year is deductible under Section 24(b) for a self-occupied house.",
            "No tax benefit on personal, auto or consumer-durable loan EMIs.",
            "Part-prepayments directly cut the principal and reduce total interest — prepay early in the tenure for maximum saving.",
        ],
        tip: "💡 Even one extra EMI per year as prepayment can shave years off a home loan and save lakhs in interest."
    }
};

// --- Math Formulas ---
export const calculateSIP = (p, n, r, er = 0) => {
    const netR = Math.max(0.1, r - er);
    const i = netR / 100 / 12;
    const invested = p * n;
    const total = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const returns = Math.max(0, total - invested);
    const taxableGains = Math.max(0, returns - 125000);
    const tax = taxableGains * 0.125;

    const projections = [];
    const totalYears = Math.ceil(n / 12);
    for (let y = 1; y <= totalYears; y++) {
        const months = y * 12;
        const currentTotal = p * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
        projections.push({ year: y, invested: p * months, total: currentTotal });
    }

    return { invested, total, returns, tax, netTotal: total - tax, projections };
};

export const calculateLumpsum = (p, n, r, er = 0) => {
    const netR = Math.max(0.1, r - er);
    const total = p * Math.pow(1 + netR / 100, n);
    const returns = Math.max(0, total - p);
    const taxableGains = Math.max(0, returns - 125000);
    const tax = taxableGains * 0.125;

    const projections = [];
    for (let y = 1; y <= n; y++) {
        projections.push({ year: y, invested: p, total: p * Math.pow(1 + netR / 100, y) });
    }

    return { invested: p, total, returns, tax, netTotal: total - tax, projections };
};

export const calculateFD = (p, n, r) => {
    const total = p * Math.pow(1 + r / 100, n);
    const returns = Math.max(0, total - p);
    const tax = returns * 0.10; // Estimated 10% TDS

    const projections = [];
    for (let y = 1; y <= n; y++) {
        projections.push({ year: y, invested: p, total: p * Math.pow(1 + r / 100, y) });
    }

    return { invested: p, total, returns, tax, netTotal: total - tax, projections };
};

export const calculatePPF = (p, n) => {
    const r = 7.1;
    let total = 0;
    let invested = 0;
    const projections = [];
    for (let y = 1; y <= n; y++) {
        total = (total + p) * (1 + r / 100);
        invested += p;
        projections.push({ year: y, invested, total });
    }
    return { invested, total, returns: total - invested, tax: 0, netTotal: total, projections };
};

export const calculateSimpleInterest = (p, n, r) => {
    const interest = (p * r * n) / 100;
    const projections = [];
    for (let y = 1; y <= n; y++) {
        const curInt = (p * r * y) / 100;
        projections.push({ year: y, invested: p, total: p + curInt });
    }
    const tax = interest * 0.10;
    return { invested: p, total: p + interest, returns: interest, tax, netTotal: (p + interest) - tax, projections };
};

// EMI = P * r * (1+r)^n / ((1+r)^n - 1), r = monthly rate, n = months
export const calculateEMI = (p, annualRate, years) => {
    const n = Math.max(1, Math.round((years || 5) * 12));
    const r = Math.max(0, annualRate || 0) / 100 / 12;
    let emi;
    if (r === 0) {
        emi = p / n;
    } else {
        const pow = Math.pow(1 + r, n);
        emi = p * r * pow / (pow - 1);
    }
    const total = emi * n;
    const interest = Math.max(0, total - p);

    // Year-by-year amortisation: principal paid, interest paid, balance
    const projections = [];
    let balance = p;
    const totalYears = Math.ceil(n / 12);
    for (let y = 1; y <= totalYears; y++) {
        let yInt = 0, yPrin = 0;
        for (let m = 1; m <= 12 && (y - 1) * 12 + m <= n; m++) {
            const intPart = balance * r;
            const prinPart = Math.min(emi - intPart, balance);
            yInt += intPart;
            yPrin += prinPart;
            balance = Math.max(0, balance - prinPart);
        }
        projections.push({ year: y, invested: yPrin, total: yInt, balance });
    }

    return { invested: p, total, returns: interest, tax: 0, netTotal: total, emi, projections, isEMI: true };
};

// --- TAX INFO ACCORDION COMPONENT ---
const TaxInfoCard = ({ toolId }) => {
    const [expanded, setExpanded] = useState(false);
    const info = SCHEME_TAX_INFO[toolId];
    if (!info) return null;

    return (
        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 overflow-hidden transition-all">
            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-indigo-500/10 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                        <Scale size={16} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-indigo-400 uppercase tracking-wider">Indian Tax Rules (FY 2025-26)</p>
                        <p className="text-[10px] text-[var(--text-muted)] font-semibold">{info.section}</p>
                    </div>
                </div>
                {expanded ? <ChevronUp size={16} className="text-indigo-400" /> : <ChevronDown size={16} className="text-indigo-400" />}
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 space-y-3 border-t border-indigo-500/15 pt-3"
                    >
                        {/* Rules table */}
                        <div className="rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-main)] p-3 space-y-2">
                            {info.taxRules.map((rule, i) => (
                                <div key={i} className="flex justify-between items-center text-xs border-b border-[var(--border-subtle)] pb-1.5 last:border-0 last:pb-0">
                                    <span className="text-[var(--text-dim)] font-medium">{rule.label}</span>
                                    <span className="text-[var(--text-main)] font-black text-right">{rule.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Exemptions */}
                        <div className="rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-main)] p-3">
                            <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                <ShieldCheck size={13} /> Exemptions & Benefits
                            </h4>
                            <ul className="space-y-1.5">
                                {info.exemptions.map((ex, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[11px] text-[var(--text-dim)] leading-relaxed">
                                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                                        {ex}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Pro tip */}
                        <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 text-[11px] font-medium text-amber-300 leading-relaxed">
                            {info.tip}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- AGE CALCULATOR SUB-COMPONENT ---
const ZODIAC = [
    { sign: 'Capricorn', emoji: '♑', from: [12, 22], to: [1, 19] },
    { sign: 'Aquarius', emoji: '♒', from: [1, 20], to: [2, 18] },
    { sign: 'Pisces', emoji: '♓', from: [2, 19], to: [3, 20] },
    { sign: 'Aries', emoji: '♈', from: [3, 21], to: [4, 19] },
    { sign: 'Taurus', emoji: '♉', from: [4, 20], to: [5, 20] },
    { sign: 'Gemini', emoji: '♊', from: [5, 21], to: [6, 20] },
    { sign: 'Cancer', emoji: '♋', from: [6, 21], to: [7, 22] },
    { sign: 'Leo', emoji: '♌', from: [7, 23], to: [8, 22] },
    { sign: 'Virgo', emoji: '♍', from: [8, 23], to: [9, 22] },
    { sign: 'Libra', emoji: '♎', from: [9, 23], to: [10, 22] },
    { sign: 'Scorpio', emoji: '♏', from: [10, 23], to: [11, 21] },
    { sign: 'Sagittarius', emoji: '♐', from: [11, 22], to: [12, 21] },
];

const getZodiac = (month, day) => {
    for (const z of ZODIAC) {
        const [fm, fd] = z.from;
        const [tm, td] = z.to;
        if (fm <= tm) {
            if ((month === fm && day >= fd) || (month === tm && day <= td)) return z;
        } else {
            if ((month === fm && day >= fd) || (month === tm && day <= td)) return z;
        }
    }
    return ZODIAC[0];
};

const AgeCalculator = ({ onPrint, onDownload, onShare, isSharing, translate }) => {
    const [dob, setDob] = useState('');
    const [birthY, setBirthY] = useState('');
    const [birthM, setBirthM] = useState('');
    const [birthD, setBirthD] = useState('');
    const [ageData, setAgeData] = useState(null);
    const [now, setNow] = useState(new Date());

    const currentYear = new Date().getFullYear();
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Combine dropdowns into an ISO date; clamps day to the month's length
    useEffect(() => {
        if (birthY && birthM && birthD) {
            const maxD = new Date(parseInt(birthY, 10), parseInt(birthM, 10), 0).getDate();
            const d = Math.min(parseInt(birthD, 10), maxD);
            setDob(`${birthY}-${birthM}-${String(d).padStart(2, '0')}`);
        } else {
            setDob('');
        }
    }, [birthY, birthM, birthD]);

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (!dob) { setAgeData(null); return; }
        const birth = new Date(dob);
        if (isNaN(birth) || birth > now) { setAgeData(null); return; }

        let years = now.getFullYear() - birth.getFullYear();
        let months = now.getMonth() - birth.getMonth();
        let days = now.getDate() - birth.getDate();
        if (days < 0) {
            months--;
            days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        const diff = now - birth;
        const totalDays = Math.floor(diff / 86400000);
        const totalWeeks = Math.floor(totalDays / 7);
        const totalHours = Math.floor(diff / 3600000);
        const totalMonths = years * 12 + months;
        const totalSeconds = Math.floor(diff / 1000);

        const nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBday <= now) nextBday.setFullYear(now.getFullYear() + 1);
        const daysLeft = Math.ceil((nextBday - now) / 86400000);
        const isBirthday = birth.getDate() === now.getDate() && birth.getMonth() === now.getMonth();
        const zodiac = getZodiac(birth.getMonth() + 1, birth.getDate());

        setAgeData({
            years, months, days, totalDays, totalWeeks, totalHours,
            totalMonths, totalSeconds, daysLeft: isBirthday ? 0 : daysLeft,
            isBirthday, zodiac, birth
        });
    }, [dob, now]);

    return (
        <div className="p-6 pb-8 space-y-6">
            <div>
                <label className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest mb-2 block">
                    Date of Birth
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                    <select
                        value={birthD}
                        onChange={e => setBirthD(e.target.value)}
                        className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl px-3 py-4 font-bold text-[var(--text-main)] text-base outline-none focus:border-pink-500 transition-all appearance-none text-center"
                        aria-label="Birth day"
                    >
                        <option value="">Day</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                            <option key={d} value={String(d).padStart(2, '0')}>{d}</option>
                        ))}
                    </select>
                    <select
                        value={birthM}
                        onChange={e => setBirthM(e.target.value)}
                        className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl px-3 py-4 font-bold text-[var(--text-main)] text-base outline-none focus:border-pink-500 transition-all appearance-none text-center"
                        aria-label="Birth month"
                    >
                        <option value="">Month</option>
                        {MONTHS.map((m, i) => (
                            <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
                        ))}
                    </select>
                    <select
                        value={birthY}
                        onChange={e => setBirthY(e.target.value)}
                        className="bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl px-3 py-4 font-bold text-[var(--text-main)] text-base outline-none focus:border-pink-500 transition-all appearance-none text-center"
                        aria-label="Birth year"
                    >
                        <option value="">Year</option>
                        {Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i).map(y => (
                            <option key={y} value={String(y)}>{y}</option>
                        ))}
                    </select>
                </div>
            </div>

            {ageData ? (
                <div className="space-y-4">
                    {ageData.isBirthday && (
                        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-2xl text-center font-black text-sm shadow-lg shadow-pink-500/25 animate-pulse">
                            🎉 Happy Birthday! Wishing you an incredible year ahead!
                        </div>
                    )}

                    {/* Exact Age Hero */}
                    <div className="glass-panel p-6 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400" />
                        <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mb-3">Your Exact Age</p>
                        <div className="flex items-baseline justify-center gap-3 sm:gap-6">
                            <div>
                                <p className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-[var(--text-main)]">{ageData.years}</p>
                                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold mt-1">Years</p>
                            </div>
                            <span className="text-2xl text-[var(--text-muted)]">•</span>
                            <div>
                                <p className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-pink-400">{ageData.months}</p>
                                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold mt-1">Months</p>
                            </div>
                            <span className="text-2xl text-[var(--text-muted)]">•</span>
                            <div>
                                <p className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-rose-400">{ageData.days}</p>
                                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold mt-1">Days</p>
                            </div>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-4 font-medium">
                            Born on {ageData.birth.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { label: 'Total Days', value: ageData.totalDays.toLocaleString('en-IN'), color: 'text-indigo-400' },
                            { label: 'Total Weeks', value: ageData.totalWeeks.toLocaleString('en-IN'), color: 'text-emerald-400' },
                            { label: 'Total Hours', value: ageData.totalHours.toLocaleString('en-IN'), color: 'text-amber-400' },
                            { label: 'Total Months', value: ageData.totalMonths.toLocaleString('en-IN'), color: 'text-cyan-400' },
                        ].map(({ label, value, color }) => (
                            <div key={label} className="glass-panel p-3.5 text-center">
                                <p className={`text-base sm:text-lg font-black font-mono ${color}`}>{value}</p>
                                <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider mt-0.5">{label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Birthday & Zodiac */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="glass-panel p-4 text-center">
                            <p className="text-2xl font-black text-rose-400 font-mono">
                                {ageData.isBirthday ? '🎂 Today!' : `${ageData.daysLeft}d`}
                            </p>
                            <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider mt-1">Days to Next Birthday</p>
                        </div>
                        <div className="glass-panel p-4 text-center">
                            <p className="text-2xl">{ageData.zodiac.emoji}</p>
                            <p className="text-xs font-black text-violet-400 mt-0.5">{ageData.zodiac.sign}</p>
                            <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Zodiac Sign</p>
                        </div>
                    </div>

                    {/* Live seconds */}
                    <div className="glass-panel px-4 py-3 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[var(--text-muted)] flex items-center gap-1.5">
                            <Sparkles size={14} className="text-pink-400" />
                            Seconds on Earth
                        </span>
                        <span className="text-sm font-black text-[var(--text-main)] font-mono">{ageData.totalSeconds.toLocaleString('en-IN')}</span>
                    </div>

                    {/* Age Actions */}
                    <div className="flex gap-2.5 pt-2">
                        <button
                            type="button"
                            onClick={() => onDownload?.('Age Report', { 'Date of Birth': dob }, ageData)}
                            disabled={isSharing}
                            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3.5 rounded-2xl text-xs font-black shadow-lg shadow-pink-500/25 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isSharing ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                            {isSharing ? 'Generating...' : 'Download PDF Report'}
                        </button>
                        <button
                            type="button"
                            onClick={() => onShare?.('Age Report', { 'Date of Birth': dob }, ageData)}
                            disabled={isSharing}
                            className="w-12 rounded-2xl glass-panel border border-[var(--border-main)] flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text-main)] transition-all"
                        >
                            <Share2 size={16} />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12 glass-panel">
                    <div className="text-4xl mb-3">🎂</div>
                    <p className="text-sm font-bold text-[var(--text-main)]">Select your date of birth above</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Discover your exact age, milestones, and zodiac sign</p>
                </div>
            )}
        </div>
    );
};

// --- MAIN CALCULATOR MODAL ---
export const CalculatorModal = ({
    toolId,
    onClose,
    onPrint,
    onDownload,
    onShare,
    isSharing,
    showToast,
    t: propT
}) => {
    const [data, setData] = useState({
        amount: toolId === 'age' ? '' : '5000',
        duration: toolId === 'age' ? '' : '10',
        rate: '12',
        expense_ratio: '1'
    });
    const [result, setResult] = useState(null);
    const [showDetailed, setShowDetailed] = useState(false);
    const [showProjections, setShowProjections] = useState(false);

    const translate = propT || t;

    const tools = {
        sip: { name: 'SIP Calculator', icon: TrendingUp, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', desc: 'Equity Mutual Fund' },
        lumpsum: { name: 'Lumpsum Calculator', icon: Coins, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', desc: 'One-time Investment' },
        fd: { name: 'Fixed Deposit', icon: Lock, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', desc: 'Guaranteed Bank Savings' },
        ppf: { name: 'PPF Scheme', icon: ShieldCheck, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20', desc: 'Tax-Free Govt Scheme' },
        interest: { name: 'Interest Calculator', icon: Percent, color: 'text-orange-400 bg-orange-500/10 border-orange-500/20', desc: 'Simple Loan & Deposit' },
        emi: { name: 'EMI Calculator', icon: Landmark, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', desc: 'Home / Personal / Auto Loans' },
        age: { name: 'Age Calculator', icon: Calendar, color: 'text-pink-400 bg-pink-500/10 border-pink-500/20', desc: 'Birthday & Milestones' },
    };

    const currentTool = tools[toolId] || tools.sip;

    // Recalculates from EXPLICIT values (not stale state) so typed input,
    // sliders and result labels always stay in sync.
    const recalc = (d = data) => {
        const p = parseFloat(d.amount) || 0;
        const n = parseFloat(d.duration) || 0;
        const r = parseFloat(d.rate) || 0;
        const er = parseFloat(d.expense_ratio) || 0;

        let res = null;
        switch (toolId) {
            case 'sip':
                res = calculateSIP(p, (n || 10) * 12, r || 12, er);
                break;
            case 'lumpsum':
                res = calculateLumpsum(p, n || 10, r || 12, er);
                break;
            case 'fd':
                res = calculateFD(p, n || 5, r || 6.5);
                break;
            case 'ppf':
                res = calculatePPF(p, n || 15);
                break;
            case 'interest':
                res = calculateSimpleInterest(p, n || 1, r || 10);
                break;
            case 'emi':
                res = calculateEMI(p, r || 9, n || 5);
                break;
            default:
                break;
        }
        if (res) {
            setResult({ ...res, detailed: showDetailed });
        }
    };

    useEffect(() => {
        setResult(null);
        if (toolId !== 'age') {
            const defaults = {
                sip: { amount: '5000', duration: '10', rate: '12', expense_ratio: '1' },
                lumpsum: { amount: '50000', duration: '10', rate: '12', expense_ratio: '1' },
                fd: { amount: '100000', duration: '5', rate: '7.1', expense_ratio: '0' },
                ppf: { amount: '150000', duration: '15', rate: '7.1', expense_ratio: '0' },
                interest: { amount: '50000', duration: '2', rate: '10', expense_ratio: '0' },
                emi: { amount: '1000000', duration: '20', rate: '9', expense_ratio: '0' },
            };
            const currentDefaults = defaults[toolId] || defaults.sip;
            setData(currentDefaults);
            setTimeout(() => {
                const p = parseFloat(currentDefaults.amount);
                const n = parseFloat(currentDefaults.duration);
                const r = parseFloat(currentDefaults.rate);
                const er = parseFloat(currentDefaults.expense_ratio);
                if (toolId === 'sip') setResult(calculateSIP(p, n * 12, r, er));
                else if (toolId === 'lumpsum') setResult(calculateLumpsum(p, n, r, er));
                else if (toolId === 'fd') setResult(calculateFD(p, n, r));
                else if (toolId === 'ppf') setResult(calculatePPF(p, n));
                else if (toolId === 'interest') setResult(calculateSimpleInterest(p, n, r));
                else if (toolId === 'emi') setResult(calculateEMI(p, r, n));
            }, 60);
        }
    }, [toolId]);

    if (!currentTool) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div
                className="w-full max-w-xl glass-panel border border-[var(--border-main)] rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-y-auto max-h-[92vh] hide-scrollbar"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 z-20 bg-[var(--bg-secondary)]/95 backdrop-blur-xl p-5 sm:p-6 flex items-center justify-between border-b border-[var(--border-main)]">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`p-3 rounded-2xl border ${currentTool.color}`}>
                            <currentTool.icon size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl font-black text-[var(--text-main)] tracking-tight">{translate(`tool_${toolId}`)}</h3>
                            <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">{translate(`${toolId}_desc`)}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-active)] flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors border border-[var(--border-main)]"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* AGE CALCULATOR */}
                {toolId === 'age' ? (
                    <AgeCalculator
                        onPrint={onPrint}
                        onDownload={onDownload}
                        translate={translate}
                        onShare={onShare}
                        isSharing={isSharing}
                    />
                ) : (
                    <div className="p-6 sm:p-8 space-y-6">
                        {toolId === 'ppf' && (
                            <div className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-2xl flex items-center gap-2">
                                <ShieldCheck size={16} className="text-indigo-400 shrink-0" />
                                <span>{translate('ppf_info')} • EEE Status (100% Tax Free)</span>
                            </div>
                        )}

                        {/* Indian Tax Rules Info */}
                        <TaxInfoCard toolId={toolId} />

                        {/* Input Controls */}
                        <div className="space-y-5">
                            {/* Investment Amount */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-black text-[var(--text-muted)] uppercase tracking-wider">
                                        {toolId === 'sip' ? translate('monthly_invest') : toolId === 'ppf' ? translate('yearly_invest') : toolId === 'emi' ? translate('loan_amount') : translate('invest_amt')}
                                    </label>
                                    <span className="font-mono font-bold text-sm text-orange-400">
                                        ₹{parseFloat(data.amount || 0).toLocaleString('en-IN')}
                                    </span>
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] font-black text-sm">₹</span>
                                    <input
                                        type="number"
                                        value={data.amount}
                                        onChange={e => {
                                            const next = { ...data, amount: e.target.value };
                                            setData(next);
                                            recalc(next);
                                        }}
                                        className="w-full bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl pl-10 pr-4 py-3.5 font-bold text-[var(--text-main)] text-base outline-none focus:border-orange-500 transition-all"
                                        placeholder="5000"
                                    />
                                </div>
                                <input
                                    type="range"
                                    min={toolId === 'ppf' ? 500 : 500}
                                    max={toolId === 'emi' ? 10000000 : toolId === 'ppf' ? 150000 : 500000}
                                    step={toolId === 'emi' ? 10000 : 500}
                                    value={Math.min(parseFloat(data.amount) || 500, toolId === 'emi' ? 10000000 : toolId === 'ppf' ? 150000 : 500000)}
                                    onChange={e => {
                                        const next = { ...data, amount: e.target.value };
                                        setData(next);
                                        recalc(next);
                                    }}
                                    className="w-full"
                                />
                            </div>

                            {/* Duration Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-black text-[var(--text-muted)] uppercase tracking-wider">
                                        {toolId === 'emi' ? translate('loan_tenure') : translate('time_period')}
                                    </label>
                                    <span className="font-mono font-bold text-sm text-[var(--text-main)]">
                                        {data.duration} Years
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min={1}
                                    max={toolId === 'ppf' ? 30 : 35}
                                    value={data.duration || 1}
                                    onChange={e => {
                                        const next = { ...data, duration: e.target.value };
                                        setData(next);
                                        recalc(next);
                                    }}
                                    className="w-full"
                                />
                            </div>

                            {/* Return Rate & Expense Ratio */}
                            {toolId !== 'ppf' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs font-black text-[var(--text-muted)] uppercase tracking-wider">
                                                {toolId === 'emi' ? translate('loan_rate') : 'Return Rate (%)'}
                                            </label>
                                            <span className="font-mono font-bold text-sm text-emerald-400">{data.rate}%</span>
                                        </div>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={data.rate}
                                            onChange={e => {
                                                const next = { ...data, rate: e.target.value };
                                                setData(next);
                                                recalc(next);
                                            }}
                                            className="w-full bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl px-4 py-3 font-bold text-[var(--text-main)] text-sm outline-none focus:border-orange-500 transition-all"
                                        />
                                    </div>

                                    {(toolId === 'sip' || toolId === 'lumpsum') && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-xs font-black text-[var(--text-muted)] uppercase tracking-wider">
                                                    Expense Ratio (%)
                                                </label>
                                                <span className="font-mono font-bold text-sm text-[var(--text-muted)]">{data.expense_ratio}%</span>
                                            </div>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={data.expense_ratio}
                                                onChange={e => {
                                                    const next = { ...data, expense_ratio: e.target.value };
                                                    setData(next);
                                                    recalc(next);
                                                }}
                                                className="w-full bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl px-4 py-3 font-bold text-[var(--text-main)] text-sm outline-none focus:border-orange-500 transition-all"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Projections & Results */}
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6 pt-4 border-t border-[var(--border-main)]"
                            >
                                {/* Key Metrics Cards */}
                                {result.isEMI && (
                                    <div className="glass-panel p-6 text-center border-rose-500/30 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-400" />
                                        <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mb-2">{translate('emi_result')}</p>
                                        <p className="text-4xl font-black font-mono text-rose-400">
                                            ₹{Math.round(result.emi).toLocaleString('en-IN')}
                                        </p>
                                        <p className="text-xs text-[var(--text-muted)] mt-2 font-medium">
                                            Total Interest ₹{Math.round(result.returns).toLocaleString('en-IN')} • Total Payment ₹{Math.round(result.total).toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="glass-panel p-4 text-center">
                                        <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">{result.isEMI ? 'Loan Amount' : translate('invested')}</p>
                                        <p className="text-base sm:text-lg font-black font-mono text-[var(--text-main)] mt-1">
                                            ₹{Math.round(result.invested).toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                    <div className="glass-panel p-4 text-center">
                                        <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">{result.isEMI ? 'Total Interest' : translate('wealth_created')}</p>
                                        <p className={`text-base sm:text-lg font-black font-mono mt-1 ${result.isEMI ? 'text-rose-400' : 'text-emerald-400'}`}>
                                            {result.isEMI ? '' : '+'}₹{Math.round(result.returns).toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                    <div className="glass-panel p-4 text-center border-orange-500/30">
                                        <p className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">{result.isEMI ? 'Total Payment' : translate('net_value')}</p>
                                        <p className="text-base sm:text-lg font-black font-mono text-orange-400 mt-1 break-all leading-tight">
                                            ₹{Math.round(result.netTotal).toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                </div>

                                {/* Visual Progress Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="text-[var(--text-dim)]">
                                            {result.isEMI ? 'Principal' : 'Invested'}: {((result.invested / result.total) * 100).toFixed(0)}%
                                        </span>
                                        <span className="text-emerald-400">
                                            {result.isEMI ? 'Interest' : 'Gains'}: {((result.returns / result.total) * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                    <div className="w-full h-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-main)] overflow-hidden flex">
                                        <div
                                            className="h-full bg-slate-500"
                                            style={{ width: `${(result.invested / result.total) * 100}%` }}
                                        />
                                        <div
                                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                                            style={{ width: `${(result.returns / result.total) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Estimated Tax Impact Badge */}
                                {result.tax > 0 && (
                                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold">
                                        <span className="text-amber-400 flex items-center gap-1.5">
                                            <Info size={14} /> Est. Capital Gains Tax (LTCG 12.5%):
                                        </span>
                                        <span className="font-mono text-amber-300">₹{Math.round(result.tax).toLocaleString('en-IN')}</span>
                                    </div>
                                )}

                                {/* Year-by-year projections toggle */}
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => setShowProjections(!showProjections)}
                                        className="w-full py-3 px-4 rounded-2xl glass-panel border border-[var(--border-main)] flex items-center justify-between text-xs font-bold text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors"
                                    >
                                        <span>{result.isEMI ? 'View Year-by-Year Amortisation' : 'View Year-by-Year Growth Table'}</span>
                                        {showProjections ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>

                                    {showProjections && result.projections && (
                                        <div className="mt-3 max-h-56 overflow-y-auto glass-panel p-3 rounded-2xl border border-[var(--border-main)] space-y-1.5 hide-scrollbar">
                                            <div className="grid grid-cols-3 text-[10px] font-black uppercase text-[var(--text-muted)] pb-1 border-b border-[var(--border-main)]">
                                                <span>Year</span>
                                                <span className="text-right">{result.isEMI ? 'Principal Paid' : 'Invested'}</span>
                                                <span className="text-right">{result.isEMI ? 'Interest Paid' : 'Maturity'}</span>
                                            </div>
                                            {result.projections.map((p) => (
                                                <div key={p.year} className="grid grid-cols-3 text-xs font-mono py-1 border-b border-[var(--border-subtle)] last:border-0">
                                                    <span className="text-[var(--text-dim)] font-bold">Year {p.year}</span>
                                                    <span className="text-right text-[var(--text-dim)]">₹{Math.round(p.invested).toLocaleString('en-IN')}</span>
                                                    <span className="text-right font-black text-emerald-400">₹{Math.round(p.total).toLocaleString('en-IN')}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Export & Share Actions */}
                                <div className="flex gap-2.5 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => onDownload?.(currentTool.name, data, result)}
                                        disabled={isSharing}
                                        className="flex-1 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white py-3.5 rounded-2xl text-xs font-black shadow-lg shadow-orange-500/25 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isSharing ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                                        {isSharing ? 'Generating...' : 'Download PDF Report'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onShare?.(currentTool.name, data, result)}
                                        disabled={isSharing}
                                        className="w-12 rounded-2xl glass-panel border border-[var(--border-main)] flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text-main)] transition-all"
                                        title="Share Report"
                                    >
                                        <Share2 size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
