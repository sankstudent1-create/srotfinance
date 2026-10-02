import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  calculateSIP, calculateLumpsum, calculateFD,
  calculatePPF, calculateSimpleInterest, calculateEMI,
} from '../dashboard/Calculators';

const TOOL_META = {
  sip:      { label: 'Monthly Investment', amount: '5000',  duration: '10', rate: '12',  er: '1', durLabel: 'Years', rateLabel: 'Expected Return (% p.a.)' },
  lumpsum:  { label: 'One-time Investment', amount: '100000', duration: '10', rate: '12', er: '1', durLabel: 'Years', rateLabel: 'Expected Return (% p.a.)' },
  fd:       { label: 'Deposit Amount', amount: '100000', duration: '5',  rate: '7',   er: '0', durLabel: 'Years', rateLabel: 'Interest Rate (% p.a.)' },
  ppf:      { label: 'Yearly Deposit', amount: '150000', duration: '15', rate: '7.1', er: '0', durLabel: 'Years', rateLabel: 'Interest Rate (% p.a.)' },
  emi:      { label: 'Loan Amount', amount: '2500000', duration: '20', rate: '9',   er: '0', durLabel: 'Tenure (Years)', rateLabel: 'Interest Rate (% p.a.)' },
  interest: { label: 'Principal Amount', amount: '50000', duration: '3', rate: '10',  er: '0', durLabel: 'Years', rateLabel: 'Interest Rate (% p.a.)' },
  age:      { label: 'Date of Birth', amount: '', duration: '', rate: '', er: '0', durLabel: '', rateLabel: '' },
};

const inr = (n) => '₹' + Math.round(n || 0).toLocaleString('en-IN');

function AgeWidget() {
  const [d, setD] = useState('');
  const [m, setM] = useState('');
  const [y, setY] = useState('');
  const now = new Date();
  const age = useMemo(() => {
    if (!d || !m || !y) return null;
    const birth = new Date(+y, +m - 1, +d);
    if (birth > now) return null;
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    return { years, months, days };
  }, [d, m, y]);
  const years = Array.from({ length: 126 }, (_, i) => now.getFullYear() - i);
  const sel = 'w-full bg-white border border-slate-300 rounded-xl px-3 py-3 font-semibold text-slate-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none';
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        <select value={d} onChange={e => setD(e.target.value)} className={sel} aria-label="Day">
          <option value="">Day</option>
          {Array.from({ length: 31 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
        </select>
        <select value={m} onChange={e => setM(e.target.value)} className={sel} aria-label="Month">
          <option value="">Month</option>
          {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((mo, i) => <option key={mo} value={i + 1}>{mo}</option>)}
        </select>
        <select value={y} onChange={e => setY(e.target.value)} className={sel} aria-label="Year">
          <option value="">Year</option>
          {years.map(yr => <option key={yr} value={yr}>{yr}</option>)}
        </select>
      </div>
      {age && (
        <div className="mt-5 grid grid-cols-3 gap-3 text-center">
          {[['Years', age.years], ['Months', age.months], ['Days', age.days]].map(([l, v]) => (
            <div key={l} className="bg-orange-50 border border-orange-200 rounded-2xl py-4">
              <p className="text-3xl font-extrabold text-orange-600">{v}</p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">{l}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StandaloneCalculator({ toolId }) {
  const meta = TOOL_META[toolId] || TOOL_META.sip;
  const [amount, setAmount] = useState(meta.amount);
  const [duration, setDuration] = useState(meta.duration);
  const [rate, setRate] = useState(meta.rate);
  const [er, setEr] = useState(meta.er);
  const [showTable, setShowTable] = useState(false);

  const result = useMemo(() => {
    const p = parseFloat(amount) || 0;
    const n = parseFloat(duration) || 0;
    const r = parseFloat(rate) || 0;
    const e = parseFloat(er) || 0;
    if (!p || !n) return null;
    try {
      switch (toolId) {
        case 'sip': return calculateSIP(p, n * 12, r, e);
        case 'lumpsum': return calculateLumpsum(p, n, r, e);
        case 'fd': return calculateFD(p, n, r);
        case 'ppf': return calculatePPF(p, n);
        case 'emi': return calculateEMI(p, r, n);
        case 'interest': return calculateSimpleInterest(p, n, r);
        default: return null;
      }
    } catch { return null; }
  }, [toolId, amount, duration, rate, er]);

  const isEMI = toolId === 'emi';
  const inputCls = 'w-full bg-white border border-slate-300 rounded-xl px-4 py-3 font-bold text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none';
  const labelCls = 'block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5';

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
      <div className="p-6 sm:p-8 grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          {toolId === 'age' ? <AgeWidget /> : (
            <>
              <div>
                <label className={labelCls}>{meta.label} (₹)</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className={inputCls} min="0" />
                <input type="range" min="1000" max={toolId === 'emi' ? 10000000 : 1000000} step={toolId === 'emi' ? 10000 : 1000}
                  value={Math.min(parseFloat(amount) || 0, toolId === 'emi' ? 10000000 : 1000000)}
                  onChange={e => setAmount(e.target.value)} className="w-full mt-2 accent-orange-500" />
              </div>
              <div>
                <label className={labelCls}>{meta.durLabel}</label>
                <input type="number" value={duration} onChange={e => setDuration(e.target.value)} className={inputCls} min="1" max="50" />
                <input type="range" min="1" max={toolId === 'ppf' ? 30 : 35} value={duration || 1}
                  onChange={e => setDuration(e.target.value)} className="w-full mt-2 accent-orange-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{meta.rateLabel}</label>
                  <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} className={inputCls} />
                </div>
                {(toolId === 'sip' || toolId === 'lumpsum') && (
                  <div>
                    <label className={labelCls}>Expense Ratio (%)</label>
                    <input type="number" step="0.1" value={er} onChange={e => setEr(e.target.value)} className={inputCls} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
          {toolId === 'age' || !result ? (
            <p className="text-slate-400 text-sm text-center py-10">Enter values to see your calculation instantly.</p>
          ) : (
            <>
              {isEMI && (
                <div className="text-center mb-5 pb-5 border-b border-slate-200">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Monthly EMI</p>
                  <p className="text-4xl font-extrabold text-orange-600 mt-1">{inr(result.emi)}</p>
                </div>
              )}
              <div className="space-y-3">
                {(() => {
                  const rows = isEMI ? [
                    ['Loan Amount', inr(result.invested), 'text-slate-900'],
                    ['Total Interest', inr(result.returns), 'text-rose-600'],
                    ['Total Payable', inr(result.netTotal), 'text-slate-900'],
                  ] : [
                    ['Invested', inr(result.invested), 'text-slate-900'],
                    ['Est. Returns (pre-tax)', '+' + inr(result.returns), 'text-emerald-600'],
                  ];
                  if (!isEMI && result.tax > 0) {
                    rows.push(['Est. Tax', '−' + inr(result.tax), 'text-amber-600']);
                  }
                  if (!isEMI) {
                    rows.push(['Total Value (post-tax)', inr(result.netTotal), 'text-slate-900']);
                  }
                  return rows;
                })().map(([l, v, c]) => (
                  <div key={l} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-slate-200">
                    <span className="text-sm font-semibold text-slate-500">{l}</span>
                    <span className={`text-lg font-extrabold ${c}`}>{v}</span>
                  </div>
                ))}
              </div>
              {result.projections?.length > 0 && (
                <button onClick={() => setShowTable(!showTable)} className="mt-4 text-sm font-bold text-orange-600 hover:text-orange-700">
                  {showTable ? 'Hide' : 'Show'} year-by-year breakdown
                </button>
              )}
              {showTable && result.projections?.length > 0 && (
                <div className="mt-3 max-h-56 overflow-y-auto border border-slate-200 rounded-xl text-sm">
                  <table className="w-full">
                    <thead className="bg-slate-100 sticky top-0">
                      <tr>
                        <th className="text-left px-3 py-2 font-bold text-slate-500 text-xs">Year</th>
                        <th className="text-right px-3 py-2 font-bold text-slate-500 text-xs">{isEMI ? 'Principal' : 'Invested'}</th>
                        <th className="text-right px-3 py-2 font-bold text-slate-500 text-xs">{isEMI ? 'Interest' : 'Value'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.projections.map(p => (
                        <tr key={p.year} className="border-t border-slate-100">
                          <td className="px-3 py-1.5 text-slate-600">{p.year}</td>
                          <td className="px-3 py-1.5 text-right font-semibold text-slate-800">{inr(p.invested)}</td>
                          <td className="px-3 py-1.5 text-right font-semibold text-slate-800">{inr(isEMI ? p.total : p.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="bg-orange-50 border-t border-orange-100 px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-slate-600">Want AI insights, PDF reports &amp; expense tracking too?</p>
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700">
          Try Srot Finance free <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
