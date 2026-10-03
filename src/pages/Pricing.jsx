import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Gift, Sparkles, ShieldCheck, BadgeCheck } from 'lucide-react';
import SEO from '../components/SEO';
import PublicLayout, { PageHero, CTASection } from './PublicLayout';

const INCLUDED = [
  'Unlimited expense & income tracking',
  'Monthly budgets with smart alerts',
  'Full transaction history & search',
  'Dashboard with spending analytics',
  'All 7 financial calculators (SIP, Lumpsum, FD, PPF, EMI, Interest, Age)',
  'AI financial advisor with personalised insights',
  'PDF reports — monthly and yearly',
  'Category-wise spending breakdowns',
  'Secure cloud sync of your data',
  'All future features and updates',
];

const FAQS = [
  {
    q: 'Why is Srot Finance free?',
    a: 'Srot Finance is built by Swinfosystems, an independent software studio. Because we are indie — no investors demanding returns, no ad network to feed — we can afford to keep the app free. We would rather have a useful product people love than squeeze revenue out of every feature.',
  },
  {
    q: 'Will it stay free forever?',
    a: 'Yes. Our commitment is free forever with no premium tier. We have no plans to introduce paid plans, lock features behind subscriptions, or add a trial that expires. If that ever changed, we would tell you loudly and well in advance — but we do not intend for it to change.',
  },
  {
    q: 'Do you sell my data?',
    a: 'Never. Your financial data is yours alone. We do not sell it, rent it, or share it with advertisers or data brokers. There are no ads inside the app at all. Read our Privacy Policy for the full details of what we collect and why.',
  },
  {
    q: 'Are there any hidden limits?',
    a: 'No. There are no limits on transactions, budgets, calculators, reports or AI advisor usage in the normal course of use. The free plan is the only plan, and it includes everything.',
  },
  {
    q: 'How do you make money then?',
    a: 'Right now, Srot Finance is a product we build because we believe good money tools should be free for everyone. Swinfosystems funds it as part of its independent software work. Our success metric is people actually improving their finances — not revenue per user.',
  },
];

export default function PricingPage() {
  return (
    <PublicLayout>
      <SEO
        title="Srot Finance Pricing — Free Forever, No Premium Tier"
        description="Srot Finance is completely free: expense tracking, budgets, 7 calculators, AI advisor and PDF reports. No premium tier, no hidden limits."
        path="/pricing"
      />
      <PageHero
        eyebrow="Pricing"
        title="Free. Forever. For everyone."
        subtitle="There is no premium tier, no trial, no paywall. Every feature of Srot Finance is free — today and always."
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="border-2 border-orange-200 bg-orange-50/50 rounded-3xl p-8 sm:p-10 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            <Gift size={14} /> The only plan
          </div>
          <div className="flex items-end justify-center gap-2 mb-2">
            <span className="text-6xl font-extrabold text-slate-900 tracking-tight">₹0</span>
            <span className="text-slate-500 font-semibold mb-2">/ forever</span>
          </div>
          <p className="text-slate-600 leading-relaxed max-w-xl mx-auto">
            One plan, every feature, zero cost. No credit card, no subscription, no "Pro" version hiding the
            good stuff. Just a complete personal finance app, free for every Indian household.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-14">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-6 text-center">
          Everything included, all free
        </h2>
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8">
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {INCLUDED.map(item => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={19} className="text-orange-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-2">
            <ShieldCheck size={14} className="text-orange-600" /> No ads in the app
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-2">
            <BadgeCheck size={14} className="text-orange-600" /> No data selling, ever
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-2">
            <Sparkles size={14} className="text-orange-600" /> Free updates for life
          </span>
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-8 text-center">
            Questions, answered honestly
          </h2>
          <div className="space-y-4">
            {FAQS.map(f => (
              <div key={f.q} className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">{f.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {f.a.includes('Privacy Policy') ? (
                    <>
                      Never. Your financial data is yours alone. We do not sell it, rent it, or share it with
                      advertisers or data brokers. There are no ads inside the app at all. Read our{' '}
                      <Link to="/privacy" className="text-orange-600 font-semibold hover:text-orange-700">Privacy Policy</Link>{' '}
                      for the full details of what we collect and why.
                    </>
                  ) : (
                    f.a
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Start free — stay free"
        subtitle="Join thousands of Indians taking control of their money with Srot Finance. It costs nothing, and it always will."
      />
    </PublicLayout>
  );
}
