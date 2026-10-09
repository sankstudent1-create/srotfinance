import React from 'react';
import { Link } from 'react-router-dom';
import SEO, { SITE_URL } from '../../components/SEO';
import PublicLayout, { PageHero, CTASection } from '../PublicLayout';
import { posts } from '../../content/posts';

export function formatDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function renderBlocks(blocks) {
  return blocks.map((b, i) => {
    switch (b.t) {
      case 'h2':
        return <h2 key={i} className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 tracking-tight">{b.text}</h2>;
      case 'h3':
        return <h3 key={i} className="text-xl font-bold text-slate-900 mt-8 mb-3">{b.text}</h3>;
      case 'p':
        return <p key={i} className="text-slate-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: b.html || b.text }} />;
      case 'ul':
        return (
          <ul key={i} className="list-disc pl-6 space-y-2 mb-5 text-slate-600">
            {b.items.map((it, j) => <li key={j} dangerouslySetInnerHTML={{ __html: it }} />)}
          </ul>
        );
      case 'ol':
        return (
          <ol key={i} className="list-decimal pl-6 space-y-2 mb-5 text-slate-600">
            {b.items.map((it, j) => <li key={j} dangerouslySetInnerHTML={{ __html: it }} />)}
          </ol>
        );
      case 'table':
        return (
          <div key={i} className="overflow-x-auto mb-6 border border-slate-200 rounded-2xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  {b.head.map((h, j) => <th key={j} className="text-left px-4 py-3 font-bold text-slate-700">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, j) => (
                  <tr key={j} className="border-t border-slate-100">
                    {r.map((c, k) => <td key={k} className="px-4 py-2.5 text-slate-600" dangerouslySetInnerHTML={{ __html: c }} />)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'note':
        return (
          <div key={i} className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-6">
            <p className="text-sm font-bold text-orange-700 mb-1">{b.title || 'Note'}</p>
            <p className="text-slate-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: b.html || b.text }} />
          </div>
        );
      case 'example':
        return (
          <div key={i} className="bg-slate-900 text-slate-100 rounded-2xl p-6 mb-6">
            <p className="text-sm font-bold text-orange-300 mb-2 uppercase tracking-wider">{b.title || 'Worked Example'}</p>
            <div className="text-sm leading-relaxed space-y-2" dangerouslySetInnerHTML={{ __html: b.html }} />
          </div>
        );
      case 'faq':
        return (
          <div key={i} className="mt-8 mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {b.items.map((f, j) => (
                <details key={j} className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 group">
                  <summary className="font-bold text-slate-800 cursor-pointer list-none flex justify-between items-center">
                    {f.q}<span className="text-orange-500 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                  </summary>
                  <p className="text-slate-600 text-sm leading-relaxed mt-2" dangerouslySetInnerHTML={{ __html: f.a }} />
                </details>
              ))}
            </div>
          </div>
        );
      case 'cta':
        return (
          <div key={i} className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 my-8 text-white text-center">
            <p className="font-extrabold text-lg">{b.title}</p>
            <p className="text-orange-50 text-sm mt-1 mb-4">{b.text}</p>
            <Link to={b.to || '/'} className="inline-block bg-white text-orange-600 font-bold text-sm px-5 py-2.5 rounded-xl">{b.label || 'Try it free'}</Link>
          </div>
        );
      default:
        return null;
    }
  });
}

export function postSchema(post) {
  const faqs = post.blocks.find(b => b.t === 'faq');
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Organization', name: 'Srot Finance Team' },
    publisher: { '@type': 'Organization', name: 'Srot Finance', logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
  if (faqs) {
    schema.mainEntity = faqs.items.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]*>/g, '') },
    }));
  }
  return schema;
}

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <PublicLayout>
      <SEO
        title="Srot Finance Blog — Personal Finance Guides for India"
        description="Practical guides on SIPs, PPF, budgeting, taxes and retirement for Indian savers. Written by the Srot Finance Team."
        path="/blog"
      />
      <PageHero
        eyebrow="Blog"
        title="Money guides for Indian savers"
        subtitle="Practical, numbers-first explainers on investing, budgeting, taxes and retirement — no jargon, no hype."
      />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map(p => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-0.5 transition-all group">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">{p.category}</p>
              <h2 className="text-lg font-extrabold text-slate-900 leading-snug group-hover:text-orange-700 transition-colors">{p.title}</h2>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed line-clamp-3">{p.description}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400">{formatDate(p.date)} · {p.readMins} min read</span>
                <span className="text-xs font-bold text-orange-600">Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CTASection />
    </PublicLayout>
  );
}
