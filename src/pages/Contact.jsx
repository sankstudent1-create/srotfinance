import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Clock, MapPin, Send, MessageCircleQuestion, Bug, Lightbulb, HeartHandshake } from 'lucide-react';
import SEO from '../components/SEO';
import PublicLayout, { PageHero } from './PublicLayout';

const SUPPORT_EMAIL = 'admin@swinfosystems.online';

const TOPICS = [
  { value: 'General question', label: 'General question' },
  { value: 'Bug report', label: 'Report a bug' },
  { value: 'Feature request', label: 'Suggest a feature' },
  { value: 'Account or data help', label: 'Account or data help' },
  { value: 'Feedback', label: 'Feedback' },
];

const CARDS = [
  {
    icon: MessageCircleQuestion,
    title: 'Questions',
    text: 'Confused about a feature, a calculator result, or how budgets work? Ask us anything — we explain things in plain language.',
  },
  {
    icon: Bug,
    title: 'Bug reports',
    text: 'Found something broken or behaving oddly? Tell us what happened and on which screen, and we will get it fixed.',
  },
  {
    icon: Lightbulb,
    title: 'Feature ideas',
    text: 'Srot Finance grows from user ideas. If there is a calculator, report or workflow you wish existed, we want to hear it.',
  },
  {
    icon: HeartHandshake,
    title: 'Partnerships & press',
    text: 'Interested in writing about Srot Finance, partnering with Swinfosystems, or anything else? Start a conversation.',
  },
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(TOPICS[0].value);
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const mailSubject = encodeURIComponent(`[Srot Finance] ${subject} — ${name || 'Website visitor'}`);
    const mailBody = encodeURIComponent(
      `Name: ${name || '—'}\nEmail: ${email || '—'}\nTopic: ${subject}\n\n${message}`
    );
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;
  }

  const inputCls =
    'w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500';

  return (
    <PublicLayout>
      <SEO
        title="Contact Srot Finance — Support & Feedback"
        description="Get in touch with the Srot Finance team: support, bug reports and feature ideas. Email admin@swinfosystems.online — we reply within 2 business days."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title="We actually reply"
        subtitle="Questions, bugs, ideas or just feedback — every message is read by a real person on the Swinfosystems team."
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-4">Send us a message</h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-sm">
              Fill in the form and your email app will open with everything pre-filled — just hit send.
              We read every message and reply within <strong className="text-slate-800">2 business days</strong>.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700 mb-1.5">Your name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your full name"
                  className={inputCls}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-semibold text-slate-700 mb-1.5">Topic</label>
                <select
                  id="contact-subject"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className={inputCls}
                >
                  {TOPICS.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700 mb-1.5">Message</label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind…"
                  rows={5}
                  className={`${inputCls} resize-y`}
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                <Send size={16} /> Send message
              </button>
            </form>
          </div>

          <div className="space-y-5">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <h3 className="font-bold text-slate-900">Email us directly</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">
                Prefer your own email app? Write to us at:
              </p>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-orange-600 font-bold hover:text-orange-700 break-all">
                {SUPPORT_EMAIL}
              </a>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <h3 className="font-bold text-slate-900">Response time</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                We reply to every message within <strong className="text-slate-800">2 business days</strong>,
                usually much sooner. Bug reports affecting your data get priority attention.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <h3 className="font-bold text-slate-900">Who you are talking to</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Srot Finance is built and supported by <strong className="text-slate-800">Swinfosystems</strong>,
                an independent software studio based in India. You are talking to the people who actually build
                the app — not a support queue.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-8 text-center">
            What can we help with?
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {CARDS.map(c => (
              <div key={c.title} className="bg-white border border-slate-200 rounded-3xl p-6">
                <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <c.icon size={22} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{c.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-8">
            For privacy-related requests, see our{' '}
            <Link to="/privacy" className="text-orange-600 font-semibold hover:text-orange-700">Privacy Policy</Link>;
            for the rules of using the app, see our{' '}
            <Link to="/terms" className="text-orange-600 font-semibold hover:text-orange-700">Terms of Service</Link>.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
