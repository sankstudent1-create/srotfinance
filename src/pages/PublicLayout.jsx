import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Calculator, ArrowRight } from 'lucide-react';

const NAV = [
  { to: '/features', label: 'Features' },
  { to: '/calculators', label: 'Calculators' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Srot Finance logo" className="w-9 h-9 rounded-xl" />
          <span className="font-extrabold text-lg text-slate-900 tracking-tight">Srot Finance</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map(n => (
            <Link key={n.to} to={n.to} className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors">
              {n.label}
            </Link>
          ))}
          <Link to="/" className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors">
            Open App <ArrowRight size={15} />
          </Link>
        </nav>
        <button className="md:hidden p-2 text-slate-700" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-slate-200 bg-white px-4 py-3 flex flex-col gap-1">
          {NAV.map(n => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2.5 px-2 text-sm font-semibold text-slate-700 hover:text-orange-600 border-b border-slate-100 last:border-0">
              {n.label}
            </Link>
          ))}
          <Link to="/" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-1.5 bg-orange-500 text-white text-sm font-bold px-4 py-3 rounded-xl">
            Open App <ArrowRight size={15} />
          </Link>
        </nav>
      )}
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-3">
            <img src="/logo.png" alt="Srot Finance logo" className="w-8 h-8 rounded-lg" />
            <span className="font-extrabold text-slate-900">Srot Finance</span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            Smart personal finance tracker for India — budgets, expenses, investments and calculators, free forever.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/features" className="text-slate-600 hover:text-orange-600">Features</Link></li>
            <li><Link to="/calculators" className="text-slate-600 hover:text-orange-600">Calculators</Link></li>
            <li><Link to="/pricing" className="text-slate-600 hover:text-orange-600">Pricing</Link></li>
            <li><Link to="/blog" className="text-slate-600 hover:text-orange-600">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Calculators</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/calculators/sip-calculator" className="text-slate-600 hover:text-orange-600">SIP Calculator</Link></li>
            <li><Link to="/calculators/emi-calculator" className="text-slate-600 hover:text-orange-600">EMI Calculator</Link></li>
            <li><Link to="/calculators/ppf-calculator" className="text-slate-600 hover:text-orange-600">PPF Calculator</Link></li>
            <li><Link to="/calculators/fd-calculator" className="text-slate-600 hover:text-orange-600">FD Calculator</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="text-slate-600 hover:text-orange-600">About</Link></li>
            <li><Link to="/contact" className="text-slate-600 hover:text-orange-600">Contact</Link></li>
            <li><Link to="/privacy" className="text-slate-600 hover:text-orange-600">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-slate-600 hover:text-orange-600">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>© 2026 Srot Finance by Swinfosystems. All rights reserved.</p>
          <p>Made for smart money management in India.</p>
        </div>
      </div>
    </footer>
  );
}

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased">
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white border-b border-orange-100/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
        {eyebrow && <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-3">{eyebrow}</p>}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">{title}</h1>
        {subtitle && <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </section>
  );
}

export function CTASection({ title = 'Start managing your money smarter', subtitle = 'Free forever. Track expenses, plan investments and get AI-powered insights.' }) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
      <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl shadow-orange-500/20">
        <Calculator className="mx-auto mb-4 opacity-90" size={36} />
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h2>
        <p className="mt-3 text-orange-50 max-w-xl mx-auto">{subtitle}</p>
        <Link to="/" className="inline-flex items-center gap-2 mt-6 bg-white text-orange-600 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors">
          Open Srot Finance <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
