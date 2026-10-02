import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wallet, PieChart, Calculator, FileText, Sparkles, ShieldCheck,
  ArrowRight, Check, Zap
} from 'lucide-react';
import SEO from '../components/SEO';
import PublicLayout, { CTASection } from './PublicLayout';
import { posts } from '../content/posts';

const CALCS = [
  { to: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { to: '/calculators/emi-calculator', label: 'EMI Calculator' },
  { to: '/calculators/ppf-calculator', label: 'PPF Calculator' },
  { to: '/calculators/fd-calculator', label: 'FD Calculator' },
  { to: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  { to: '/calculators/interest-calculator', label: 'Interest Calculator' },
  { to: '/calculators/age-calculator', label: 'Age Calculator' },
];

const FEATURES = [
  { icon: Wallet, title: 'Track every rupee', text: 'Log income and expenses in seconds, with categories made for Indian households.' },
  { icon: PieChart, title: 'Budgets that guide you', text: 'Set monthly budgets per category and see your pace before the month runs out.' },
  { icon: Calculator, title: '7 financial calculators', text: 'SIP, EMI, PPF, FD, lumpsum, interest and age — free, instant, explained plainly.' },
  { icon: FileText, title: 'Beautiful PDF reports', text: 'Crisp branded monthly reports with charts and insights, ready to share.' },
  { icon: Sparkles, title: 'AI money advisor', text: 'Ask plain-English questions about your spending and get practical guidance.' },
  { icon: ShieldCheck, title: 'Private by design', text: 'Encrypted, never sold, no ads in the app. Free forever — no paywall.' },
];

const FAQS = [
  { q: 'Is Srot Finance really free?', a: 'Yes — free forever, for everyone. No premium tier, no paywall on any feature. Built and maintained by Swinfosystems.' },
  { q: 'Do I need to connect my bank account?', a: 'No. You log transactions yourself, so your bank credentials stay completely out of the picture and your data stays in your control.' },
  { q: 'Is my financial data safe?', a: 'Your data is stored securely with encryption. We never sell it and never show ads inside the app. Export or delete it any time.' },
  { q: 'Which calculators are included?', a: 'Seven: SIP, lumpsum, FD, PPF, EMI, simple interest and age — each with formulas explained, Indian worked examples and FAQs.' },
  { q: 'Can I download reports of my finances?', a: 'Yes — polished PDF reports of income, expenses, budgets and calculator projections, with charts and summaries included.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'Srot Finance',
      url: 'https://srotfinance.vercel.app/',
      description: 'Free personal finance tracker for India — budgets, expenses, 7 financial calculators, PDF reports and AI money guidance.',
      publisher: {
        '@type': 'Organization',
        name: 'Srot Finance by Swinfosystems',
        url: 'https://srotfinance.vercel.app/',
        logo: 'https://srotfinance.vercel.app/logo.png',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
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

      {/* HERO — one idea, one action */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-12 text-center">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-100/70 border border-orange-200 rounded-full px-4 py-1.5 mb-6">
            <Zap size={13} /> Free forever · Made in India
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
            Know exactly where<br className="hidden sm:block" /> your money goes.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto">
            Track expenses, plan budgets and run financial calculators — free,
            private, and built for how India earns and spends.
          </p>
          <div className="mt-8">
            <Link to="/login" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl transition-colors shadow-lg shadow-orange-500/25 text-base">
              Start tracking — it's free <ArrowRight size={17} />
            </Link>
            <p className="mt-3 text-xs text-slate-400 font-medium">No credit card · No ads in the app · 60-second setup</p>
          </div>
        </div>
      </section>

      {/* CALCULATORS — the no-signup hook, right up front */}
      <section className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Try a calculator — no sign-up needed</h2>
              <p className="mt-1.5 text-slate-400 text-sm">Instant answers with Indian examples and formulas explained.</p>
            </div>
            <Link to="/calculators" className="inline-flex items-center gap-1.5 text-orange-400 font-bold text-sm hover:text-orange-300 shrink-0">
              All calculators <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CALCS.slice(0, 7).map(c => (
              <Link key={c.to} to={c.to} className="bg-slate-800/80 border border-slate-700/60 rounded-2xl px-4 py-3.5 hover:border-orange-500/50 hover:bg-slate-800 transition-all group">
                <p className="font-bold text-sm text-white group-hover:text-orange-300">{c.label}</p>
              </Link>
            ))}
            <Link to="/calculators" className="rounded-2xl px-4 py-3.5 border border-dashed border-slate-600 text-slate-400 hover:text-orange-300 hover:border-orange-500/50 transition-all flex items-center justify-center gap-1.5 text-sm font-bold">
              View all <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES — compact proof */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-9">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">One calm app for your entire money life</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="flex gap-4 bg-white border border-slate-200 rounded-2xl p-5 hover:border-orange-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <f.icon size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-[15px] mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
          {['Free forever', 'No bank connection needed', '10+ money guides', 'PDF reports included'].map(t => (
            <span key={t} className="inline-flex items-center gap-1.5 font-medium">
              <Check size={15} className="text-emerald-500" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — low-effort strip */}
      <section className="border-y border-slate-100 bg-slate-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left">
          {[
            ['Create your free account', '60 seconds, email only'],
            ['Log your money', 'Income & expenses as they happen'],
            ['See the full picture', 'Charts, budgets & AI insights'],
          ].map(([t, d], i) => (
            <div key={t} className="flex items-center gap-4">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-orange-500 text-white font-extrabold text-sm shrink-0">{i + 1}</span>
              <div>
                <p className="font-extrabold text-slate-900 text-sm">{t}</p>
                <p className="text-xs text-slate-500">{d}</p>
              </div>
            </div>
          ))}
          <Link to="/login" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm shrink-0">
            Get started <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between gap-4 mb-7">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Learn how money works</h2>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-orange-600 font-bold text-sm hover:text-orange-700 shrink-0">
            All articles <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {latestPosts.map(p => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-orange-300 hover:shadow-lg transition-all group">
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-600 mb-2">{p.category || 'Guide'}</p>
              <h3 className="font-extrabold text-slate-900 leading-snug group-hover:text-orange-700 mb-2 text-[15px]">{p.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{p.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ — objection handling */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-14">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-center mb-7">Questions, answered</h2>
        <div className="space-y-3">
          {FAQS.map(f => (
            <details key={f.q} className="bg-white border border-slate-200 rounded-2xl px-5 py-4 group">
              <summary className="font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center gap-3 text-[15px]">
                {f.q}<span className="text-orange-500 group-open:rotate-45 transition-transform text-xl leading-none shrink-0">+</span>
              </summary>
              <p className="text-slate-600 text-sm leading-relaxed mt-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <CTASection
        title="Ready to know where your money goes?"
        subtitle="Join free today — track expenses, plan with calculators and get AI guidance. Free forever."
      />
    </PublicLayout>
  );
}
