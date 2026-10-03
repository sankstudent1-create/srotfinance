import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Receipt, PiggyBank, Calculator, FileText, Sparkles,
  TrendingUp, BellRing, Search, Download, ArrowRight, CheckCircle2,
} from 'lucide-react';
import SEO from '../components/SEO';
import PublicLayout, { PageHero, CTASection } from './PublicLayout';

const CALCULATORS = [
  { to: '/calculators/sip-calculator', name: 'SIP Calculator', text: 'See how monthly mutual fund investments grow over time with step-up options and projected returns.' },
  { to: '/calculators/lumpsum-calculator', name: 'Lumpsum Calculator', text: 'Project the future value of a one-time investment across any horizon and expected return.' },
  { to: '/calculators/fd-calculator', name: 'FD Calculator', text: 'Compare fixed deposit returns across tenures and interest rates before you lock money in.' },
  { to: '/calculators/ppf-calculator', name: 'PPF Calculator', text: 'Plan your Public Provident Fund with yearly deposits, the 15-year lock-in and extension rules.' },
  { to: '/calculators/emi-calculator', name: 'EMI Calculator', text: 'Know your exact monthly EMI for home, car or personal loans — plus total interest you will pay.' },
  { to: '/calculators/interest-calculator', name: 'Interest Calculator', text: 'Simple and compound interest made visual — for loans, savings and everything between.' },
  { to: '/calculators/age-calculator', name: 'Age Calculator', text: 'Find exact age in years, months and days — handy for forms, insurance and investment KYC.' },
];

function Section({ icon: Icon, eyebrow, title, children, flip }) {
  return (
    <section className={`max-w-4xl mx-auto px-4 sm:px-6 py-12 ${flip ? '' : ''}`}>
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <Icon size={22} />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-orange-600">{eyebrow}</p>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-4">{title}</h2>
        <div className="space-y-4 text-slate-600 leading-relaxed">{children}</div>
      </div>
    </section>
  );
}

const bullets = [
  { icon: Search, text: 'Instant search across every transaction you have ever recorded.' },
  { icon: TrendingUp, text: 'Category-wise breakdowns that show where your money really goes.' },
  { icon: BellRing, text: 'Budget alerts that warn you gently before you overspend.' },
  { icon: Download, text: 'Export your data to PDF reports for taxes, loans and record-keeping.' },
];

export default function FeaturesPage() {
  return (
    <PublicLayout>
      <SEO
        title="Srot Finance Features — Expense Tracker, Budgets & Calculators"
        description="Track expenses, set monthly budgets, use 7 free financial calculators, generate PDF reports and ask the AI advisor — all free in Srot Finance."
        path="/features"
      />
      <PageHero
        eyebrow="Features"
        title="Everything your money needs, in one calm app"
        subtitle="Expense tracking, budgets, calculators, reports and an AI advisor — designed for Indian households, free forever."
      />

      <Section icon={LayoutDashboard} eyebrow="Dashboard & analytics" title="Your money at a glance">
        <p>
          Open the app and immediately see what matters: how much you earned, how much you spent, and how
          much is left this month. The dashboard turns your raw transactions into clean, visual summaries —
          monthly trends, top spending categories and savings rate — so you never have to guess where you stand.
        </p>
        <p>
          Analytics go deeper when you need them to. Compare months side by side, spot spending spikes, and
          see which categories quietly eat your budget. Everything is presented in plain language, not finance jargon.
        </p>
      </Section>

      <Section icon={Receipt} eyebrow="Transactions" title="Log expenses in seconds">
        <p>
          Recording a transaction takes seconds: pick a category, enter the amount, add an optional note, and
          you are done. Income and expenses are tracked separately, and every entry is editable — so a typo or
          a wrong date never corrupts your records.
        </p>
        <p>
          Your full history stays searchable and organised. Filter by category, date range or amount, and pull
          up any transaction from any month in moments. It is your money's diary — complete, private and always
          at your fingertips.
        </p>
      </Section>

      <Section icon={PiggyBank} eyebrow="Monthly budgets" title="Budgets that actually keep you on track">
        <p>
          Set monthly spending limits for the categories that matter — groceries, dining, transport, shopping,
          or anything custom. Srot Finance tracks your pace automatically and warns you when you are spending
          too fast, while there is still time to adjust.
        </p>
        <p>
          Budgets reset each month, and you can review how well you stuck to them over time. It is not about
          guilt or restriction; it is about making deliberate choices with your money instead of wondering
          where it went.
        </p>
      </Section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <Calculator size={22} />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-orange-600">Calculators</p>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-4">7 free financial calculators</h2>
        <p className="text-slate-600 leading-relaxed mb-8 max-w-3xl">
          Big financial decisions — starting a SIP, opening a PPF account, taking a loan — deserve real numbers,
          not guesswork. Srot Finance includes seven calculators with results explained in plain English, so you
          can plan with confidence before you commit a single rupee.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {CALCULATORS.map(c => (
            <Link
              key={c.to}
              to={c.to}
              className="group bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:border-orange-300 hover:bg-orange-50/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 group-hover:text-orange-700">{c.name}</h3>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{c.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <Section icon={FileText} eyebrow="PDF reports" title="Reports you can actually use">
        <p>
          Generate clean PDF reports of your income, expenses and budgets for any month or the full year.
          They are formatted to be genuinely useful: share them with your accountant at tax time, attach them
          to a loan application, or just keep them as a record of your financial journey.
        </p>
        <p>
          Reports are generated on demand from your own data — nothing is sent to third parties, and the
          document belongs entirely to you.
        </p>
      </Section>

      <Section icon={Sparkles} eyebrow="AI financial advisor" title="Ask questions, get personal guidance">
        <p>
          The AI financial advisor answers questions about your own money using your actual transactions and
          budgets — not generic tips copied from the internet. Ask things like "Am I spending too much on
          dining out?" or "How can I save more for my SIP?" and get practical, personalised answers.
        </p>
        <p>
          It is designed to be a thoughtful guide, not a salesperson: it never pushes products, never gives
          regulated investment advice, and always explains its reasoning in simple terms.
        </p>
      </Section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-6 text-center">And the little things</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {bullets.map(b => (
            <div key={b.text} className="flex items-start gap-3 bg-white border border-slate-200 rounded-2xl p-5">
              <CheckCircle2 size={20} className="text-orange-600 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Try every feature free"
        subtitle="No sign-up fees, no premium tier, no trial that expires. Just open the app and start managing your money."
      />
    </PublicLayout>
  );
}
