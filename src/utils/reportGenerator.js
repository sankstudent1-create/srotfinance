import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// --- BRAND COLOR SYSTEM ---
const BRAND_ORANGE = [249, 115, 22];   // #f97316 (Primary Accent)
const BRAND_ROSE   = [244, 63, 94];    // #f43f5e (Rose Accent)
const BRAND_EMERALD= [16, 185, 129];   // #10b981 (Growth / Returns)
const SLATE_900    = [15, 23, 42];     // #0f172a (Primary Slate)
const SLATE_800    = [30, 41, 59];     // #1e293b
const SLATE_700    = [51, 65, 85];     // #334155
const SLATE_500    = [100, 116, 139];  // #64748b
const SLATE_400    = [148, 163, 184];  // #94a3b8
const SLATE_200    = [226, 232, 240];  // #e2e8f0
const SLATE_50     = [248, 250, 252];  // #f8fafc
const WHITE        = [255, 255, 255];

const fmtINR = (val) => `INR ${Math.round(val || 0).toLocaleString('en-IN')}`;

// --- EXECUTIVE CALCULATOR PDF GENERATOR ---
export const generateCalculatorPDF = (toolName = 'Investment Analysis', inputs = {}, result = {}) => {
    const doc = new jsPDF();
    const width = doc.internal.pageSize.width;
    const height = doc.internal.pageSize.height;

    // Top Brand Gradient Bar
    doc.setFillColor(...BRAND_ORANGE);
    doc.rect(0, 0, width * 0.65, 4, 'F');
    doc.setFillColor(...BRAND_ROSE);
    doc.rect(width * 0.65, 0, width * 0.35, 4, 'F');

    // Logo Monogram
    doc.setFillColor(...SLATE_900);
    doc.roundedRect(18, 14, 14, 14, 3, 3, 'F');
    doc.setFontSize(10);
    doc.setTextColor(...BRAND_ORANGE);
    doc.setFont('helvetica', 'bold');
    doc.text('SF', 25, 23, { align: 'center' });

    // Brand Name
    doc.setFontSize(18);
    doc.setTextColor(...SLATE_900);
    doc.setFont('helvetica', 'bold');
    doc.text('Srot Finance', 36, 22);

    doc.setFontSize(8);
    doc.setTextColor(...BRAND_ORANGE);
    doc.setFont('helvetica', 'bold');
    doc.text('EXECUTIVE FINANCIAL INTELLIGENCE REPORT', 36, 27);

    // Fiscal Year Pill Badge
    doc.setFillColor(...SLATE_900);
    doc.roundedRect(width - 48, 14, 34, 13, 3, 3, 'F');
    doc.setFontSize(8);
    doc.setTextColor(...WHITE);
    doc.setFont('helvetica', 'bold');
    doc.text('FY 2025-26', width - 31, 22, { align: 'center' });

    // Divider Line
    doc.setDrawColor(...SLATE_200);
    doc.setLineWidth(0.4);
    doc.line(18, 33, width - 14, 33);

    // Report Title & Meta
    doc.setFontSize(16);
    doc.setTextColor(...SLATE_900);
    doc.setFont('helvetica', 'bold');
    doc.text(`${toolName} Projection`, 18, 44);

    const generatedDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    doc.setFontSize(8);
    doc.setTextColor(...SLATE_500);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on: ${generatedDate}  •  Source: srotfinance.vercel.app`, 18, 50);

    // ===== RESULTS HERO CARD =====
    const cardY = 56;
    doc.setFillColor(...SLATE_900);
    doc.roundedRect(16, cardY, width - 32, 48, 4, 4, 'F');

    // Accent line inside card
    doc.setFillColor(...BRAND_ORANGE);
    doc.roundedRect(16, cardY, width - 32, 2.5, 1, 1, 'F');

    const heroInnerY = cardY + 12;
    const heroColWidth = (width - 32) / 3;

    // Metric 1: Total Invested
    doc.setFontSize(7.5);
    doc.setTextColor(...SLATE_400);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL CAPITAL INVESTED', 26, heroInnerY);
    doc.setFontSize(14);
    doc.setTextColor(...WHITE);
    doc.text(fmtINR(result.invested || 0), 26, heroInnerY + 8);
    doc.setFontSize(7);
    doc.setTextColor(...SLATE_400);
    doc.text('Principal Input', 26, heroInnerY + 14);

    // Metric 2: Estimated Returns
    const col2X = 16 + heroColWidth;
    doc.setFontSize(7.5);
    doc.setTextColor(...SLATE_400);
    doc.text('PROJECTED WEALTH GAIN', col2X, heroInnerY);
    doc.setFontSize(14);
    doc.setTextColor(...BRAND_EMERALD);
    doc.text(`+ ${fmtINR(result.returns || 0)}`, col2X, heroInnerY + 8);
    const returnPercent = result.invested > 0 ? ((result.returns / result.invested) * 100).toFixed(1) : '0';
    doc.setFontSize(7);
    doc.setTextColor(...BRAND_EMERALD);
    doc.text(`${returnPercent}% Capital Growth`, col2X, heroInnerY + 14);

    // Metric 3: Maturity Value
    const col3X = 16 + heroColWidth * 2;
    doc.setFontSize(7.5);
    doc.setTextColor(...BRAND_ORANGE);
    doc.text('NET MATURITY VALUE', col3X, heroInnerY);
    doc.setFontSize(15);
    doc.setTextColor(...WHITE);
    doc.text(fmtINR(result.netTotal || result.total || 0), col3X, heroInnerY + 8);
    doc.setFontSize(7);
    doc.setTextColor(result.tax > 0 ? BRAND_ROSE : BRAND_EMERALD);
    doc.text(result.tax > 0 ? `Est. Tax: ${fmtINR(result.tax)}` : 'Zero Tax Liability', col3X, heroInnerY + 14);

    // Ratio Progress Bar
    const totalAssets = (result.invested || 0) + (result.returns || 0);
    const ratioPrincipal = totalAssets > 0 ? Math.min(100, Math.max(0, (result.invested / totalAssets) * 100)) : 50;
    const progressW = width - 52;
    const progressY = cardY + 36;

    doc.setFillColor(40, 50, 70);
    doc.roundedRect(26, progressY, progressW, 3.5, 1.5, 1.5, 'F');
    doc.setFillColor(...BRAND_ORANGE);
    doc.roundedRect(26, progressY, (progressW * ratioPrincipal) / 100, 3.5, 1.5, 1.5, 'F');

    doc.setFontSize(6.5);
    doc.setTextColor(...SLATE_400);
    doc.text(`Principal Ratio: ${ratioPrincipal.toFixed(0)}%`, 26, progressY + 8);
    doc.text(`Gain Ratio: ${(100 - ratioPrincipal).toFixed(0)}%`, width - 26, progressY + 8, { align: 'right' });

    // ===== PARAMETERS TABLE =====
    let nextSectionY = cardY + 58;
    doc.setFontSize(10.5);
    doc.setTextColor(...SLATE_900);
    doc.setFont('helvetica', 'bold');
    doc.text('Simulation Parameters', 18, nextSectionY);

    const inputRows = Object.entries(inputs).map(([key, value]) => {
        const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
        const displayVal = typeof value === 'number' && key.toLowerCase().includes('amount') ? fmtINR(value) : String(value);
        return [label, displayVal];
    });

    autoTable(doc, {
        startY: nextSectionY + 4,
        margin: { left: 18, right: 14 },
        head: [['Parameter', 'Configured Value']],
        body: inputRows,
        theme: 'plain',
        styles: { fontSize: 8.5, cellPadding: { top: 3.5, bottom: 3.5, left: 6, right: 6 }, textColor: SLATE_700 },
        headStyles: { fillColor: SLATE_900, textColor: WHITE, fontSize: 8, fontStyle: 'bold' },
        columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 70, textColor: SLATE_900 },
            1: { halign: 'right', fontStyle: 'bold', textColor: BRAND_ORANGE }
        },
        alternateRowStyles: { fillColor: SLATE_50 }
    });

    // ===== YEARLY PROJECTIONS TABLE =====
    let finalTableY = (doc.lastAutoTable?.finalY || nextSectionY + 40) + 10;
    if (result.projections && result.projections.length > 0) {
        if (finalTableY > height - 75) {
            doc.addPage();
            finalTableY = 24;
        }

        doc.setFontSize(10.5);
        doc.setTextColor(...SLATE_900);
        doc.setFont('helvetica', 'bold');
        doc.text('Yearly Wealth Progression', 18, finalTableY);

        const projData = result.projections.slice(0, 15).map(p => [
            `Year ${p.year}`,
            fmtINR(p.invested),
            fmtINR(p.total - p.invested),
            fmtINR(p.total),
            p.invested > 0 ? `+${(((p.total - p.invested) / p.invested) * 100).toFixed(1)}%` : '0%'
        ]);

        autoTable(doc, {
            startY: finalTableY + 4,
            margin: { left: 18, right: 14 },
            head: [['Period', 'Invested Capital', 'Accumulated Profit', 'Net Projected Value', 'Growth %']],
            body: projData,
            theme: 'plain',
            styles: { fontSize: 8, cellPadding: 3, textColor: SLATE_700 },
            headStyles: { fillColor: SLATE_900, textColor: WHITE, fontSize: 7.5, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: SLATE_50 },
            columnStyles: {
                0: { fontStyle: 'bold', textColor: SLATE_900 },
                2: { textColor: BRAND_EMERALD, fontStyle: 'bold' },
                3: { fontStyle: 'bold', textColor: SLATE_900 },
                4: { halign: 'right', textColor: BRAND_EMERALD, fontStyle: 'bold' }
            }
        });
    }

    // ===== DISCLAIMER & FOOTER =====
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);

        // Footer separator line
        doc.setDrawColor(...SLATE_200);
        doc.setLineWidth(0.3);
        doc.line(18, height - 16, width - 14, height - 16);

        // Footer text
        doc.setFontSize(7);
        doc.setTextColor(...SLATE_400);
        doc.setFont('helvetica', 'normal');
        doc.text('CONFIDENTIAL • Srot Finance Autonomous Intelligence Report • Rules as per FY 2025-26', 18, height - 10);
        doc.text(`Page ${i} of ${pageCount}`, width - 14, height - 10, { align: 'right' });
    }

    doc.save(`${toolName.replace(/\s+/g, '_')}_Report.pdf`);
};

export const generateEmailLink = (subject, body) => {
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
