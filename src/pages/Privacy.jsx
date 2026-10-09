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

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <SEO
        title="Srot Finance Privacy Policy — Your Data Stays Yours"
        description="Srot Finance privacy policy: what data we collect, how it's stored, never sold, Google sign-in, cookies, data deletion and children's privacy."
        path="/privacy"
      />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Last updated: October 2026. Plain-English summary first, full details below — your data is yours, and we keep it that way."
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <P>
          This Privacy Policy explains how Srot Finance ("we", "our", "us"), a product of Swinfosystems,
          collects, uses, stores and protects your information when you use the Srot Finance app and website
          at srotfinance.vercel.app. By using Srot Finance, you agree to this policy.
        </P>

        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-extrabold text-slate-900 mb-2">The short version</h2>
          <Ul
            items={[
              'We collect only what the app needs to work: your account email and the financial data you enter.',
              'Your data is stored securely on Supabase infrastructure. It is never sold, rented, or shared with advertisers.',
              'There are no ads inside the app, and no ad trackers.',
              'You can ask us to delete your data at any time by emailing admin@swinfosystems.online.',
            ]}
          />
        </div>

        <H>1. Information we collect</H>
        <P>We collect the following categories of information:</P>
        <Ul
          items={[
            'Account information: your email address and basic profile details (such as your name) when you sign up, including via Google sign-in.',
            'Financial data you enter: transactions, income, expenses, categories, monthly budgets and notes you create in the app.',
            'App usage data: calculator inputs you enter while using the app, AI advisor conversations, and PDF reports you generate.',
            'Device information: a push notification token if you enable notifications, plus basic device and app version details used for debugging.',
            'Contact information: the contents of messages you send us, for example through the contact form or email.',
          ]}
        />

        <H>2. How we use your information</H>
        <P>We use your information only for these purposes:</P>
        <Ul
          items={[
            'To provide and maintain the app — syncing your transactions, budgets and settings across your sessions.',
            'To power features you use, such as the AI financial advisor (which needs your financial data to give personalised answers) and PDF report generation.',
            'To communicate with you about your account, support requests, security notices and important policy changes.',
            'To detect, prevent and fix bugs, abuse and security issues.',
          ]}
        />
        <P>
          We do not use your information for advertising, we do not build advertising profiles, and we do not
          sell your personal or financial data to anyone — ever.
        </P>

        <H>3. Where your data is stored</H>
        <P>
          Your data is stored on Supabase, our backend database and authentication provider, on its cloud
          infrastructure. Data in transit is encrypted with TLS, and access to production data is restricted
          to authorised Swinfosystems personnel who need it to operate the service. We do not keep copies of
          your financial data on any other systems except for routine encrypted backups used for disaster
          recovery.
        </P>

        <H>4. Google sign-in</H>
        <P>
          If you sign in with Google, Google shares with us your email address, name and profile picture, as
          permitted by the scopes you approve. We use this only to create and secure your account. We do not
          access your Gmail, Google Drive or any other Google data. You can revoke Srot Finance's access at
          any time from your Google account settings; doing so will prevent future sign-ins but will not
          delete data already stored — contact us for deletion as described below.
        </P>

        <H>5. Cookies and local storage</H>
        <P>
          The Srot Finance website and app use browser local storage and cookies for essential functions:
          keeping you signed in, remembering your preferences (such as theme or currency format), and securing
          your session. We do not use third-party advertising or cross-site tracking cookies. The calculators
          on the public pages work without an account and do not transmit your inputs anywhere unless you
          are signed in and choose to save them.
        </P>

        <H>6. AI advisor data handling</H>
        <P>
          When you use the AI financial advisor, your question and the relevant financial data needed to
          answer it are processed by our AI provider to generate a response. Conversations are stored in your
          account so you can revisit them. We do not feed your personal financial data into model training,
          and we do not share advisor conversations with advertisers or data brokers.
        </P>

        <H>7. Data sharing</H>
        <P>
          We share your information only in these limited situations: with Supabase as our infrastructure
          provider (bound by its own data processing terms); with our AI provider solely to fulfil your
          advisor requests; if required by law or a valid legal process in India; or to protect the safety
          and security of our users and service. We never share data for marketing purposes.
        </P>

        <H>8. Data retention and deletion</H>
        <P>
          We keep your data for as long as your account is active. You can request complete deletion of your
          account and all associated data at any time by emailing{' '}
          <a href="mailto:admin@swinfosystems.online" className="text-orange-600 font-semibold hover:text-orange-700">
            admin@swinfosystems.online
          </a>{' '}
          from your account email. We will confirm and complete deletion within 30 days, except where we are
          legally required to retain certain records. Deleted data is removed from active systems and purged
          from backups on their normal rotation cycle.
        </P>

        <H>9. Children's privacy</H>
        <P>
          Srot Finance is not directed at children under 13, and we do not knowingly collect personal
          information from children under 13. If you believe a child has provided us with personal
          information, please contact us and we will delete it promptly.
        </P>

        <H>10. Security</H>
        <P>
          We use industry-standard measures to protect your data: encrypted connections, secure authentication,
          and restricted access to production systems. However, no method of transmission or storage is
          completely secure, and we cannot guarantee absolute security. You are responsible for keeping your
          account credentials confidential.
        </P>

        <H>11. Changes to this policy</H>
        <P>
          We may update this Privacy Policy from time to time. When we do, we will update the "Last updated"
          date above and, for material changes, notify you in the app or by email before the changes take
          effect. Continued use of Srot Finance after changes take effect means you accept the updated policy.
        </P>

        <H>12. Contact us</H>
        <P>
          For any privacy questions, data requests or complaints, contact us at{' '}
          <a href="mailto:admin@swinfosystems.online" className="text-orange-600 font-semibold hover:text-orange-700">
            admin@swinfosystems.online
          </a>. Srot Finance is operated by Swinfosystems, India.
        </P>

        <p className="mt-10 text-sm text-slate-500">
          Related: <Link to="/terms" className="text-orange-600 font-semibold hover:text-orange-700">Terms of Service</Link>
          {' '}·{' '}
          <Link to="/contact" className="text-orange-600 font-semibold hover:text-orange-700">Contact us</Link>
        </p>
      </article>
    </PublicLayout>
  );
}
