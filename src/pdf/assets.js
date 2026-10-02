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

/* Brand logo as a data URL (cached). The declared Content-Type can't always be
   trusted (a misnamed file once served JPEG bytes as image/png, which made
   the PDF renderer drop the image), so the real format is sniffed from the
   file's magic bytes. */
const sniffMime = (b) => {
    if (b[0] === 0xFF && b[1] === 0xD8 && b[2] === 0xFF) return 'image/jpeg';
    if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4E && b[3] === 0x47) return 'image/png';
    if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return 'image/gif';
    if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46) return 'image/webp';
    return null;
};
let logoPromise = null;
export const getLogoDataUrl = () => {
    if (!logoPromise) {
        logoPromise = (async () => {
            const r = await fetch('/logo.png');
            if (!r.ok) throw new Error('logo fetch failed');
            const buf = await r.arrayBuffer();
            const bytes = new Uint8Array(buf);
            const mime = sniffMime(bytes) || 'image/png';
            let bin = '';
            for (let i = 0; i < bytes.length; i += 8192) {
                bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192));
            }
            return `data:${mime};base64,${btoa(bin)}`;
        })().catch(() => { logoPromise = null; return null; });
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
