import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import SEO from '../../components/SEO';
import PublicLayout, { CTASection } from '../PublicLayout';
import { posts } from '../../content/posts';
import { renderBlocks, postSchema, formatDate } from './Index';

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const idx = posts.findIndex(p => p.slug === slug);
  const prev = posts[idx - 1];
  const next = posts[idx + 1];
  const related = posts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 2);

  return (
    <PublicLayout>
      <SEO
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        schema={postSchema(post)}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-orange-600 mb-6">
          <ArrowLeft size={15} /> All articles
        </Link>
        <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-3">{post.category}</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 mt-4 pb-6 border-b border-slate-200 text-sm text-slate-500">
          <span className="font-semibold text-slate-700">Srot Finance Team</span>
          <span className="inline-flex items-center gap-1.5"><Calendar size={14} /> {formatDate(post.date)}</span>
          {post.updated && post.updated !== post.date && <span>Updated {formatDate(post.updated)}</span>}
          <span>{post.readMins} min read</span>
        </div>
        <div className="mt-6">
          {renderBlocks(post.blocks)}
        </div>
        {post.calculatorLink && (
          <div className="mt-8">
            <Link to={post.calculatorLink} className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-slate-800 transition-colors">
              Try the {post.calculatorName} <ArrowRight size={15} />
            </Link>
          </div>
        )}
        {related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-lg font-extrabold text-slate-900 mb-4">Keep reading</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map(r => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-1.5">{r.category}</p>
                  <p className="font-bold text-slate-900 leading-snug">{r.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-between mt-10 pt-6 border-t border-slate-200 text-sm font-bold">
          {prev ? <Link to={`/blog/${prev.slug}`} className="text-slate-500 hover:text-orange-600">← {prev.title.slice(0, 40)}…</Link> : <span />}
          {next && <Link to={`/blog/${next.slug}`} className="text-slate-500 hover:text-orange-600 text-right">…{next.title.slice(0, 40)} →</Link>}
        </div>
      </article>
      <CTASection />
    </PublicLayout>
  );
}
