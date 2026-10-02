/* Shared asset helpers for the vector PDF engine.
   Kept dependency-free so Dashboard can import the tiny bits without
   pulling in @react-pdf/renderer. */

export const SITE = 'https://srotfinance.vercel.app';

export const toolPathFor = (toolName) => {
    const t = (toolName || '').toLowerCase();
    if (t.includes('sip')) return '/calculators/sip-calculator';
    if (t.includes('lump')) return '/calculators/lumpsum-calculator';
    if (t.includes('emi') || t.includes('loan')) return '/calculators/emi-calculator';
    if (t.includes('ppf')) return '/calculators/ppf-calculator';
    if (t.includes('fixed') || t.includes('fd')) return '/calculators/fd-calculator';
    if (t.includes('interest')) return '/calculators/interest-calculator';
    if (t.includes('age')) return '/calculators/age-calculator';
    return '/calculators';
};

export const fmt = (v) => `₹${Math.round(v || 0).toLocaleString('en-IN')}`;
export const fmtNum = (v) => Number(v || 0).toLocaleString('en-IN');
export const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

/* Brand logo as a data URL (cached). The file is named .png but holds JPEG
   bytes — reading it as a blob keeps the real mime type. */
let logoPromise = null;
export const getLogoDataUrl = () => {
    if (!logoPromise) {
        logoPromise = fetch('/logo.png')
            .then((r) => { if (!r.ok) throw new Error('logo fetch failed'); return r.blob(); })
            .then((blob) => new Promise((resolve, reject) => {
                const fr = new FileReader();
                fr.onload = () => resolve(fr.result);
                fr.onerror = reject;
                fr.readAsDataURL(blob);
            }))
            .catch(() => { logoPromise = null; return null; });
    }
    return logoPromise;
};

/* QR code as a data URL (cached per URL). qrcode is dynamically imported so
   it stays out of the main bundle. */
const qrCache = {};
export const getQrDataUrl = async (url) => {
    if (qrCache[url]) return qrCache[url];
    try {
        const m = await import('qrcode');
        const gen = m.default || m;
        const d = await gen.toDataURL(url, {
            width: 200, margin: 1, color: { dark: '#0f172a', light: '#ffffff' },
        });
        qrCache[url] = d;
        return d;
    } catch (e) {
        return null;
    }
};
