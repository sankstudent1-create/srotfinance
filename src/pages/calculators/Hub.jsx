import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '../../components/SEO';
import PublicLayout, { PageHero, CTASection } from '../PublicLayout';
import { toolsData } from './toolsData';

const ICONS = { sip: '📈', lumpsum: '💰', fd: '🏦', ppf: '🛡️', emi: '🏠', interest: '🧮', age: '🎂' };

export default function CalcHub() {
  return (
    <PublicLayout>
      <SEO
        title="Free Financial Calculators — SIP, EMI, PPF, FD & More"
        description="7 free Indian financial calculators: SIP, lumpsum, FD, PPF, EMI, interest & age. Instant results, no sign-up needed."
        path="/calculators"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Srot Finance Calculators',
          itemListElement: toolsData.map((t, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `https://srotfinance.vercel.app${t.path}`,
            name: t.name,
          })),
        }}
      />
      <PageHero
        eyebrow="Free tools"
        title="Financial calculators for India"
        subtitle="Seven free calculators with instant results — no sign-up, no spam. Built for Indian investors, savers and borrowers."
      />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsData.map(t => (
            <Link key={t.id} to={t.path} className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-0.5 transition-all group">
              <div className="text-4xl mb-4">{ICONS[t.id]}</div>
              <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-orange-700 transition-colors">{t.name}</h2>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{t.tagline}</p>
              <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-orange-600">
                Calculate now <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-14 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2 flex items-center gap-2">
            <Calculator size={22} className="text-orange-500" /> Which calculator do you need?
          </h2>
          <p className="text-slate-500 mb-6">Match your goal to the right tool in seconds.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['I invest monthly in mutual funds', 'sip-calculator', 'SIP Calculator'],
              ['I have a lump sum to invest', 'lumpsum-calculator', 'Lumpsum Calculator'],
              ['I want guaranteed bank returns', 'fd-calculator', 'FD Calculator'],
              ['I want tax-free government savings', 'ppf-calculator', 'PPF Calculator'],
              ['I am taking / repaying a loan', 'emi-calculator', 'EMI Calculator'],
              ['I want to compare interest options', 'interest-calculator', 'Interest Calculator'],
            ].map(([need, slug, name]) => (
              <Link key={slug} to={`/calculators/${slug}`} className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-4 hover:border-orange-300 transition-colors">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                <span className="text-sm"><span className="text-slate-500">{need} → </span><span className="font-bold text-slate-900">{name}</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </PublicLayout>
  );
}
