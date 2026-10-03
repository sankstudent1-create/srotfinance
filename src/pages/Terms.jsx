import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PublicLayout, { PageHero } from './PublicLayout';

function H({ children }) {
  return <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-10 mb-3">{children}</h2>;
}

function P({ children }) {
  return <p className="text-slate-600 leading-relaxed mb-4">{children}</p>;
}

function Ul({ items }) {
  return (
    <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed mb-4">
      {items.map(i => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

export default function TermsPage() {
  return (
    <PublicLayout>
      <SEO
        title="Srot Finance Terms of Service — Free Finance App Terms"
        description="Srot Finance terms of service: free service, user responsibilities, calculators and AI are estimates not financial advice, acceptable use, India law."
        path="/terms"
      />
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Last updated: October 2026. The rules for using Srot Finance, written in language a human can actually read."
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <P>
          These Terms of Service ("Terms") form an agreement between you and Swinfosystems ("we", "our", "us")
          governing your use of the Srot Finance app and website at srotfinance.vercel.app ("the Service").
          By creating an account or using the Service, you agree to these Terms.
        </P>

        <H>1. The Service</H>
        <P>
          Srot Finance is a personal finance management app that lets you track income and expenses, set
          monthly budgets, use financial calculators (SIP, Lumpsum, FD, PPF, EMI, Interest and Age), generate
          PDF reports, and interact with an AI financial advisor. The Service is provided free of charge —
          there is no premium tier, no subscription and no paywall. We may add, modify or remove features
          over time as the product evolves.
        </P>

        <H>2. Eligibility and accounts</H>
        <Ul
          items={[
            'You must be at least 13 years old to use the Service. If you are under 18, you should use it with a parent or guardian\'s involvement.',
            'You may sign up with an email address or Google sign-in. You must provide accurate registration information.',
            'You are responsible for keeping your account credentials confidential and for all activity under your account.',
            'One account per person for personal use. Accounts are non-transferable.',
          ]}
        />

        <H>3. Your responsibilities</H>
        <Ul
          items={[
            'Enter accurate data. Budgets, reports and AI answers are only as good as the transactions and figures you provide.',
            'Keep your sign-in credentials secure and notify us promptly at admin@swinfosystems.online if you suspect unauthorised access.',
            'Back up anything critical. While we maintain backups of our systems, you remain responsible for records you need for tax or legal purposes.',
            'Use the Service only for lawful personal finance management.',
          ]}
        />

        <H>4. Calculators and AI advisor are estimates, not financial advice</H>
        <P>
          This is important, so please read it carefully:
        </P>
        <Ul
          items={[
            'All calculators (SIP, Lumpsum, FD, PPF, EMI, Interest, Age) produce estimates and projections based on the inputs you provide and standard formulas. Actual results will differ due to market movements, taxes, fees and changing interest rates.',
            'The AI financial advisor provides general educational information and personalised guidance based on your data. It is not a registered investment adviser, and its responses are not financial, investment, tax or legal advice.',
            'Nothing in the Service should be taken as a recommendation to buy, sell or hold any financial product.',
            'For decisions involving significant money — investments, loans, insurance, retirement planning — consult a qualified, SEBI-registered financial adviser or other licensed professional.',
          ]}
        />

        <H>5. No liability for financial decisions</H>
        <P>
          To the maximum extent permitted by law, Swinfosystems and its team are not liable for any loss,
          damage or missed opportunity arising from your use of the Service — including investment decisions
          made based on calculator projections, reports or AI advisor responses. You use the Service and act
          on its outputs at your own risk. The Service is provided "as is" without warranties of any kind,
          express or implied.
        </P>

        <H>6. Acceptable use</H>
        <P>You agree not to:</P>
        <Ul
          items={[
            'Use the Service for any unlawful purpose or in violation of any applicable law.',
            'Attempt to gain unauthorised access to the Service, other users\' accounts, or our systems.',
            'Interfere with or disrupt the Service, including through automated scraping, bots or denial-of-service activity, beyond reasonable personal use.',
            'Reverse-engineer, copy or resell the Service or its underlying software, except as permitted by law.',
            'Upload malicious content or use the Service to harass, defame or harm others.',
          ]}
        />
        <P>
          We may suspend or terminate accounts that violate these Terms, engage in abuse or fraud, or pose a
          security risk to the Service or other users.
        </P>

        <H>7. Your data</H>
        <P>
          The financial data you enter remains yours. We process it only to operate the Service, as described
          in our{' '}
          <Link to="/privacy" className="text-orange-600 font-semibold hover:text-orange-700">Privacy Policy</Link>.
          You may request deletion of your account and data at any time by emailing{' '}
          <a href="mailto:admin@swinfosystems.online" className="text-orange-600 font-semibold hover:text-orange-700">
            admin@swinfosystems.online
          </a>.
        </P>

        <H>8. Service availability</H>
        <P>
          We aim to keep Srot Finance available and reliable, but we do not guarantee uninterrupted or
          error-free operation. We may perform maintenance, updates or changes that temporarily affect
          availability, and we will try to keep disruption minimal.
        </P>

        <H>9. Changes to these Terms</H>
        <P>
          We may update these Terms from time to time. We will update the "Last updated" date above and, for
          material changes, notify you in the app or by email before they take effect. Continued use of the
          Service after changes take effect means you accept the updated Terms.
        </P>

        <H>10. Governing law</H>
        <P>
          These Terms are governed by the laws of India. Any disputes arising from or relating to the Service
          or these Terms shall be subject to the exclusive jurisdiction of the courts of India. If any
          provision of these Terms is found unenforceable, the remaining provisions continue in full effect.
        </P>

        <H>11. Contact</H>
        <P>
          Questions about these Terms? Contact us at{' '}
          <a href="mailto:admin@swinfosystems.online" className="text-orange-600 font-semibold hover:text-orange-700">
            admin@swinfosystems.online
          </a>. Srot Finance is operated by Swinfosystems, India.
        </P>

        <p className="mt-10 text-sm text-slate-500">
          Related: <Link to="/privacy" className="text-orange-600 font-semibold hover:text-orange-700">Privacy Policy</Link>
          {' '}·{' '}
          <Link to="/contact" className="text-orange-600 font-semibold hover:text-orange-700">Contact us</Link>
        </p>
      </article>
    </PublicLayout>
  );
}
