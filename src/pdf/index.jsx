/* Vector PDF engine entry point.
   Imported dynamically by Dashboard so @react-pdf/renderer + fonts stay out
   of the main bundle and only load when a PDF is generated. */
import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { CalculatorDoc } from './calculator.jsx';
import { AnalyticsDoc } from './analytics.jsx';
import { AgeDoc } from './age.jsx';
import { registerPdfFonts } from './chrome.jsx';
import { SITE, toolPathFor, getLogoDataUrl, getQrDataUrl } from './assets.js';

/**
 * Build a true vector PDF (text stays as text: sharp at any zoom,
 * selectable, small file) and return it as a Blob.
 *
 * kind: 'calculator' | 'analytics' | 'age'
 */
export async function buildReportBlob({ kind, calcData, user, stats, transactions, filterLabel }) {
    registerPdfFonts();
    const logo = await getLogoDataUrl().catch(() => null);

    let element;
    let qrUrl;
    if (kind === 'calculator') {
        qrUrl = SITE + toolPathFor(calcData?.toolName);
        const qr = await getQrDataUrl(qrUrl);
        element = <CalculatorDoc data={calcData} user={user} logo={logo} qr={qr} />;
    } else if (kind === 'age') {
        qrUrl = SITE + '/calculators/age-calculator';
        const qr = await getQrDataUrl(qrUrl);
        element = <AgeDoc data={calcData} user={user} logo={logo} qr={qr} />;
    } else {
        qrUrl = SITE + '/';
        const qr = await getQrDataUrl(qrUrl);
        element = (
            <AnalyticsDoc
                user={user} stats={stats} transactions={transactions}
                filterLabel={filterLabel} logo={logo} qr={qr}
            />
        );
    }

    const blob = await pdf(element).toBlob();
    return blob;
}
