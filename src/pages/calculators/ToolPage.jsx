import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SEO, { SITE_URL } from '../../components/SEO';
import PublicLayout, { CTASection } from '../PublicLayout';
import StandaloneCalculator from '../../components/seo/StandaloneCalculator';
import { toolsData } from './toolsData';
import { renderBlocks } from '../blog/Index';

export default function ToolPage() {
  const { tool } = useParams();
  const data = toolsData.find(t => t.slug === tool);
  if (!data) return <Navigate to="/calculators" replace />;

  const related = toolsData.filter(t => t.id !== data.id).slice(0, 3);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: data.name,
    description: data.description,
    url: `${SITE_URL}${data.path}`,
    provider: { '@type': 'Organization', name: 'Srot Finance', url: SITE_URL },
    ...(data.faqs?.length
      ? {
          mainEntity: data.faqs.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]*>/g, '') },
          })),
        }
      : {}),
  };

  return (
    <PublicLayout>
      <SEO title={data.title} description={data.description} path={data.path} schema={schema} />
      <section className="bg-gradient-to-b from-orange-50 to-white border-b border-orange-100/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <Link to="/calculators" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-orange-600 mb-5">
            <ArrowLeft size={15} /> All calculators
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{data.h1}</h1>
          <p className="mt-3 text-slate-500 text-base sm:text-lg leading-relaxed">{data.intro}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <StandaloneCalculator toolId={data.id} />
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-4">
        {renderBlocks(data.blocks)}
        {data.relatedPosts?.length > 0 && (
          <div className="mt-10 pt-8 border-t border-slate-200">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">Learn more</h2>
            <div className="space-y-3">
              {data.relatedPosts.map(p => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="flex items-center justify-between border border-slate-200 rounded-2xl p-4 hover:border-orange-300 transition-colors group">
                  <span className="font-bold text-slate-800 group-hover:text-orange-700 text-sm">{p.title}</span>
                  <ArrowRight size={16} className="text-orange-500 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
        {related.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">Other calculators</h2>
            <div className="flex flex-wrap gap-2.5">
              {related.map(r => (
                <Link key={r.id} to={r.path} className="text-sm font-bold text-slate-600 bg-slate-100 hover:bg-orange-100 hover:text-orange-700 px-4 py-2 rounded-full transition-colors">
                  {r.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
      <CTASection />
    </PublicLayout>
  );
}
