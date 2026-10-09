import { useEffect } from 'react';

const SITE_URL = 'https://srotfinance.vercel.app';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  const created = !el;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  return { el, created };
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"][data-seo="1"]`);
  const created = !el;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute('data-seo', '1');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  return { el, created };
}

/**
 * Sets per-page SEO tags. All tags it manages are removed on unmount
 * (only if this component created them, so index.html defaults survive).
 */
export default function SEO({ title, description, path = '/', image, type = 'website', schema }) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    const url = `${SITE_URL}${path}`;
    const img = image || DEFAULT_IMAGE;

    const managed = [];
    managed.push(upsertMeta('name', 'description', description));
    managed.push(upsertMeta('property', 'og:title', title));
    managed.push(upsertMeta('property', 'og:description', description));
    managed.push(upsertMeta('property', 'og:url', url));
    managed.push(upsertMeta('property', 'og:type', type));
    managed.push(upsertMeta('property', 'og:image', img));
    managed.push(upsertMeta('name', 'twitter:card', 'summary_large_image'));
    managed.push(upsertMeta('name', 'twitter:title', title));
    managed.push(upsertMeta('name', 'twitter:description', description));
    managed.push(upsertMeta('name', 'twitter:image', img));
    managed.push(upsertLink('canonical', url));

    let schemaEl = null;
    if (schema) {
      schemaEl = document.createElement('script');
      schemaEl.type = 'application/ld+json';
      schemaEl.setAttribute('data-seo', '1');
      schemaEl.textContent = JSON.stringify(schema);
      document.head.appendChild(schemaEl);
    }

    return () => {
      document.title = prevTitle;
      managed.forEach(({ el, created }) => {
        if (created && el.parentNode) el.parentNode.removeChild(el);
      });
      if (schemaEl && schemaEl.parentNode) schemaEl.parentNode.removeChild(schemaEl);
    };
  }, [title, description, path, image, type, JSON.stringify(schema)]);

  return null;
}

export { SITE_URL };
