import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, BarChart3, Calculator, FileText, Sparkles, HeartHandshake, IndianRupee, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import PublicLayout, { PageHero, CTASection } from './PublicLayout';

const VALUES = [
  {
    icon: HeartHandshake,
    title: 'Simple first',
    text: 'Money tools should not need a finance degree. Every screen in Srot Finance is designed so that anyone — from a first-time earner to a seasoned saver — can understand their money in seconds.',
  },
  {
    icon: IndianRupee,
    title: 'Built for India',
    text: 'Indian salary cycles, Indian tax-saving instruments like PPF, monthly SIPs, family expenses and festival budgets. Srot Finance speaks the language of Indian households because it is made here.',
  },
  {
    icon: ShieldCheck,
    title: 'Your data stays yours',
    text: 'We never sell your data, never show ads inside the app, and never lock your finances behind a paywall. Trust is the whole business model.',
  },
];

const WHAT_IT_DOES = [
  {
    icon: Wallet,
    title: 'Track income & expenses',
    text: 'Log every transaction in seconds, tag it by category, and always know where your money went this month.',
  },
  {
    icon: BarChart3,
    title: 'Monthly budgets',
    text: 'Set spending limits per category and get gentle warnings before you overshoot, not lectures after.',
  },
  {
    icon: Calculator,
    title: '7 financial calculators',
    text: 'SIP, Lumpsum, FD, PPF, EMI, Interest and Age calculators with plain-English results you can act on.',
  },
  {
    icon: Sparkles,
    title: 'AI financial advisor',
    text: 'Ask questions about your own finances and get personalised, practical guidance based on your real data.',
  },
  {
    icon: FileText,
    title: 'PDF reports',
    text: 'Generate clean monthly or yearly reports you can save, print or share — handy for tax time and loan applications.',
  },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <SEO
        title="About Srot Finance — Free Personal Finance App for India"
        description="Srot Finance is a free personal finance app by Swinfosystems — expense tracking, budgets, 7 calculators, AI advisor and PDF reports for India."
        path="/about"
      />
      <PageHero
        eyebrow="About us"
        title="Money management that finally makes sense"
        subtitle="Srot Finance is a free personal finance app built in India, for India — so that managing money feels calm, not complicated."
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-4">What is Srot Finance?</h2>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            Srot Finance is a personal finance tracker designed around the way Indians actually handle money.
            It brings together everything scattered across bank statements, notebook entries, spreadsheet formulas
            and mental math into one calm, easy-to-use app: daily expense tracking, monthly budgets, transaction
            history, investment calculators, PDF reports and an AI financial advisor that answers questions about
            your own finances.
          </p>
          <p>
            The word "Srot" (स्रोत) means "source" in Sanskrit and Hindi. We chose it because every rupee you
            earn has a source and a destination — and understanding that flow is the first step to financial
            confidence. Srot Finance helps you see the flow, plan it, and stay in control of it.
          </p>
          <p>
            Unlike budgeting apps that drown you in charts or finance apps that push credit cards and loans,
            Srot Finance stays focused on one job: helping you understand and organise your money. No upsells,
            no ads inside the app, no premium tier hiding the useful features. Everything is free, forever.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-4">Our mission</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Most personal finance advice in India is either too complex, too salesy, or written for someone
              else's economy. Our mission is simple: <strong className="text-slate-800">make good money management
              accessible to every Indian household</strong> — with tools that are honest, easy to use, and free.
            </p>
            <p>
              We believe financial confidence does not come from a magic app or a hot stock tip. It comes from
              small, consistent habits: knowing what you spend, spending less than you earn, and giving your
              savings a clear job through instruments like SIPs, PPF and FDs. Srot Finance is built to support
              exactly those habits, day after day.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-8 text-center">What the app does</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {WHAT_IT_DOES.map(f => (
            <div key={f.title} className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
              <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <f.icon size={22} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-8">
          <Link to="/features" className="text-orange-600 font-bold hover:text-orange-700">Explore all features →</Link>
        </p>
      </section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-4">Who builds it</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Srot Finance is built by <strong className="text-slate-800">Swinfosystems</strong>, the indie
              software studio of Sanket Wanve. Swinfosystems is a small, independent team that designs and
              ships software from India — with a bias for clean design, honest pricing and products that
              respect their users.
            </p>
            <p>
              Being independent means nobody is pressuring us to monetise your attention. There is no venture
              funding to justify, no ad network to feed, no premium tier to push you toward. That is exactly
              why we can keep Srot Finance free forever — the app exists to be useful, full stop.
            </p>
            <p>
              We read every message users send. If something in the app confuses you, if a calculator result
              looks off, or if you have an idea for a feature, we genuinely want to hear it:{' '}
              <Link to="/contact" className="text-orange-600 font-semibold hover:text-orange-700">get in touch</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-8 text-center">What we stand for</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {VALUES.map(v => (
            <div key={v.title} className="border border-slate-200 rounded-3xl p-6 bg-white">
              <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <v.icon size={22} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </PublicLayout>
  );
}
