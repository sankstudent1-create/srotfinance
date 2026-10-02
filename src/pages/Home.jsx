import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wallet, PieChart, Calculator, FileText, Sparkles, ShieldCheck,
  ArrowRight, Check, IndianRupee, Smartphone, Lock, Zap
} from 'lucide-react';
import SEO from '../components/SEO';
import PublicLayout, { CTASection } from './PublicLayout';
import { posts } from '../content/posts';

const CALCS = [
  { to: '/calculators/sip-calculator', label: 'SIP Calculator', desc: 'Project your SIP wealth' },
  { to: '/calculators/emi-calculator', label: 'EMI Calculator', desc: 'True cost of any loan' },
  { to: '/calculators/ppf-calculator', label: 'PPF Calculator', desc: 'Your tax-free corpus' },
  { to: '/calculators/fd-calculator', label: 'FD Calculator', desc: 'Maturity with quarterly compounding' },
  { to: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator', desc: 'One-time investment growth' },
  { to: '/calculators/interest-calculator', label: 'Interest Calculator', desc: 'Simple interest, explained' },
  { to: '/calculators/age-calculator', label: 'Age Calculator', desc: 'Your exact age to the day' },
];

const FEATURES = [
  { icon: Wallet, title: 'Track every rupee', text: 'Log income and expenses in seconds with smart categories made for Indian households — from rent and SIPs to festival shopping.' },
  { icon: PieChart, title: 'Budgets that guide you', text: 'Set monthly budgets per category and watch your spending pace in real time, before the month runs away from you.' },
  { icon: Calculator, title: '7 financial calculators', text: 'SIP, EMI, PPF, FD, lumpsum, interest and age — free, instant, and explained in plain language with Indian examples.' },
  { icon: FileText, title: 'Beautiful PDF reports', text: 'Download crisp, branded monthly reports with charts and insights. Share them, file them, or just admire them.' },
  { icon: Sparkles, title: 'AI money advisor', text: 'Ask plain-English questions about your spending and get practical, personalised guidance — like a friend who is good with money.' },
  { icon: ShieldCheck, title: 'Private by design', text: 'Your data is encrypted and never sold. No ads inside the app, no paywall on your own finances. Free forever.' },
];

const STEPS = [
  { n: '1', title: 'Create your free account', text: 'Sign up in under a minute with your email. No card, no trial clock, no catch.' },
  { n: '2', title: 'Log your money', text: 'Add income and expenses as they happen. Set budgets for the categories that matter to you.' },
  { n: '3', title: 'See the full picture', text: 'Charts, trends, calculators and AI insights turn raw entries into decisions you can act on.' },
];

const FAQS = [
  { q: 'Is Srot Finance really free?', a: 'Yes — free forever, for everyone. There is no premium tier and no paywall on any feature. The project is built and maintained by Swinfosystems.' },
  { q: 'Do I need to connect my bank account?', a: 'No. Srot Finance is a manual tracker — you log transactions yourself, which keeps your bank credentials completely out of the picture and your data fully in your control.' },
  { q: 'Is my financial data safe?', a: 'Your data is stored securely with encryption, and we never sell it or show ads inside the app. You can export or delete your data at any time.' },
  { q: 'Which calculators are included?', a: 'Seven: SIP, lumpsum, FD, PPF, EMI, simple interest and age calculators — each with formulas explained, Indian worked examples and FAQs.' },
  { q: 'Can I download reports of my finances?', a: 'Yes. Generate polished PDF reports of your income, expenses, budgets and calculator projections any time, with charts and summaries included.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Srot Finance',
  url: 'https://srotfinance.vercel.app/',
  description: 'Free personal finance tracker for India — budgets, expenses, 7 financial calculators, PDF reports and AI money guidance.',
  publisher: { '@type': 'Organization', name: 'Srot Finance by Swinfosystems', url: 'https://srotfinance.vercel.app/' },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://srotfinance.vercel.app/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function Home() {
  const latestPosts = posts.slice(0, 3);
  return (
    <PublicLayout>
      <SEO
        title="Srot Finance — Free Money Tracker & Calculators for India"
        description="Track expenses, plan budgets, run SIP/EMI/PPF/FD calculators and get AI money guidance. Free forever, made for Indian households."
        path="/"
        schema={schema}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-12 text-center">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-100/70 border border-orange-200 rounded-full px-4 py-1.5 mb-6">
            <Zap size={13} /> Free forever · Made in India
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
            Your money,<br className="hidden sm:block" /> finally making sense.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Srot Finance is the calm, free way to track expenses, plan budgets, run financial
            calculators and understand your money — built for how India actually earns and spends.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/login" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-2xl transition-colors shadow-lg shadow-orange-500/25 text-base">
              Start tracking free <ArrowRight size={17} />
            </Link>
            <Link to="/calculators" className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-orange-400 text-slate-700 font-bold px-7 py-3.5 rounded-2xl transition-colors text-base">
              <Calculator size={17} /> Try the calculators
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            {['No credit card needed', '7 free calculators', '10+ money guides', 'PDF reports included'].map(t => (
              <span key={t} className="inline-flex items-center gap-1.5 font-medium">
                <Check size={15} className="text-emerald-500" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Everything your money needs, in one calm app</h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">No clutter, no jargon, no dark patterns. Just clear tools that respect your attention.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100/50 transition-all">
              <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <f.icon size={22} />
              </div>
              <h3 className="font-extrabold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALCULATORS BAND */}
      <section className="bg-slate-900 text-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Free financial calculators</h2>
              <p className="mt-2 text-slate-400 text-sm sm:text-base">Instant answers, Indian examples, formulas explained. No sign-up needed.</p>
            </div>
            <Link to="/calculators" className="inline-flex items-center gap-1.5 text-orange-400 font-bold text-sm hover:text-orange-300 shrink-0">
              All calculators <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CALCS.map(c => (
              <Link key={c.to} to={c.to} className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 hover:border-orange-500/50 hover:bg-slate-800 transition-all group">
                <p className="font-bold text-sm text-white group-hover:text-orange-300">{c.label}</p>
                <p className="text-xs text-slate-400 mt-1">{c.desc}</p>
              </Link>
            ))}
            <Link to="/calculators" className="rounded-2xl p-4 border border-dashed border-slate-600 text-slate-400 hover:text-orange-300 hover:border-orange-500/50 transition-all flex items-center justify-center gap-1.5 text-sm font-bold">
              View all 7 <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Up and running in minutes</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {STEPS.map(s => (
            <div key={s.n} className="relative bg-orange-50/60 border border-orange-100 rounded-3xl p-6">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-orange-500 text-white font-extrabold text-sm mb-4">{s.n}</span>
              <h3 className="font-extrabold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Money guides for Indian savers</h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base">Practical, jargon-free explainers on SIPs, taxes, budgeting and more.</p>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-orange-600 font-bold text-sm hover:text-orange-700 shrink-0">
            All articles <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {latestPosts.map(p => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-orange-300 hover:shadow-lg transition-all group">
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-600 mb-2">{p.category || 'Guide'}</p>
              <h3 className="font-extrabold text-slate-900 leading-snug group-hover:text-orange-700 mb-2">{p.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{p.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 mt-4">Read guide <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-14">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-center mb-8">Questions, answered</h2>
        <div className="space-y-3">
          {FAQS.map(f => (
            <details key={f.q} className="bg-white border border-slate-200 rounded-2xl px-5 py-4 group">
              <summary className="font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center gap-3">
                {f.q}<span className="text-orange-500 group-open:rotate-45 transition-transform text-xl leading-none shrink-0">+</span>
              </summary>
              <p className="text-slate-600 text-sm leading-relaxed mt-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14">
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { icon: IndianRupee, t: 'Built for India', d: 'SIPs, PPF, Indian tax rules' },
            { icon: Lock, t: 'Private by design', d: 'Encrypted, never sold' },
            { icon: Smartphone, t: 'Works everywhere', d: 'Phone, tablet, desktop' },
          ].map(b => (
            <div key={b.t} className="py-2">
              <b.icon size={22} className="mx-auto text-orange-500 mb-2" />
              <p className="font-extrabold text-slate-900 text-sm">{b.t}</p>
              <p className="text-xs text-slate-500 mt-0.5">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Ready to take control of your money?"
        subtitle="Join free today — track expenses, plan with calculators and get AI guidance. Free forever."
      />
    </PublicLayout>
  );
}
