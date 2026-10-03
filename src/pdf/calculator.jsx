/* Vector calculator report — mirrors the HTML report design, but every glyph
   is real text: infinitely sharp, selectable, tiny file size. */
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { C, FONT, pageStyle, Watermark, ReportHeader, ReportFooter, Eyebrow, Rich } from './chrome.jsx';
import { fmt, fmtNum } from './assets.js';

const s = StyleSheet.create({
    /* Dark hero card */
    hero: {
        backgroundColor: C.dark, borderRadius: 18, padding: 24, marginBottom: 18,
        position: 'relative', overflow: 'hidden',
    },
    heroMark: {
        position: 'absolute', top: -18, right: 6, fontSize: 96, fontWeight: 700,
        color: 'rgba(255,255,255,0.03)',
    },
    heroGrid: { flexDirection: 'row', marginBottom: 20 },
    maturityCard: {
        backgroundColor: 'rgba(249,115,22,0.15)',
        borderWidth: 1, borderColor: 'rgba(249,115,22,0.35)',
        borderRadius: 14, padding: 16, marginRight: 14, width: '38%',
    },
    heroStat: { paddingVertical: 6, paddingHorizontal: 2, width: '31%' },
    heroLabel: {
        fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: 1, marginBottom: 6,
    },
    heroValue: { fontSize: 24, fontWeight: 700, letterSpacing: -0.5 },
    heroSub: { fontSize: 9, marginTop: 4 },
    pill: {
        fontSize: 8, fontWeight: 700, borderRadius: 99, paddingVertical: 2,
        paddingHorizontal: 8, color: '#ffffff', backgroundColor: C.orange, marginTop: 8,
    },
    pillText: { fontSize: 8, fontWeight: 700, color: '#ffffff' },
    splitTop: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)', paddingTop: 16 },
    legendRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    legend: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
    dot: { width: 8, height: 8, borderRadius: 2, marginRight: 5 },
    legendText: { fontSize: 8.5, color: '#cbd5e1', fontWeight: 400 },
    legendTitle: { fontSize: 8, color: '#64748b', fontWeight: 700 },
    barTrack: { height: 12, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 99, flexDirection: 'row', overflow: 'hidden' },
    /* Two-column boxes */
    twoCol: { flexDirection: 'row', marginBottom: 18 },
    box: { borderRadius: 16, padding: 20, width: '48.5%' },
    boxTitle: { fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 },
    inputRow: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
        borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 7, marginBottom: 9,
    },
    inputLabel: { fontSize: 9, color: C.faint, fontWeight: 400 },
    inputValue: { fontSize: 14, fontWeight: 700, color: C.ink },
    insightCard: {
        backgroundColor: '#ffffff', borderRadius: 10, paddingVertical: 10,
        paddingHorizontal: 14, borderWidth: 1, borderColor: '#dee5ff', marginBottom: 8,
    },
    insightLabel: { fontSize: 8, color: C.muted, fontWeight: 700, marginBottom: 3 },
    insightValue: { fontSize: 20, fontWeight: 700, color: C.ink },
    insightNote: { fontSize: 10, color: C.green },
    /* Disclaimer */
    disclaimer: {
        backgroundColor: '#fffbeb', borderWidth: 1, borderColor: '#fef3c7',
        borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14, marginBottom: 8,
    },
    disclaimerText: { fontSize: 7.5, color: '#92400e', lineHeight: 1.5 },
    /* Breakdown table */
    tableWrap: { borderWidth: 1, borderColor: C.line, borderRadius: 12, overflow: 'hidden', marginBottom: 4 },
    thRow: { flexDirection: 'row', backgroundColor: C.dark, paddingVertical: 9, paddingHorizontal: 12 },
    th: { fontSize: 7.5, fontWeight: 700, color: C.faint, textTransform: 'uppercase', letterSpacing: 0.7 },
    tdRow: { flexDirection: 'row', paddingVertical: 7, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    td: { fontSize: 10 },
    tdYear: { fontSize: 10.5, fontWeight: 700, color: '#374151' },
    tdMoney: { fontSize: 10, color: C.muted, textAlign: 'right', fontWeight: 400 },
    tdProfit: { fontSize: 10, color: C.green, fontWeight: 700, textAlign: 'right' },
    tdTotal: { fontSize: 11, fontWeight: 700, color: C.ink, textAlign: 'right' },
    pctPill: {
        fontSize: 8, fontWeight: 700, borderRadius: 99, paddingVertical: 2, paddingHorizontal: 7,
        backgroundColor: '#ecfdf5', color: C.greenDark, textAlign: 'right',
    },
    tfoot: { flexDirection: 'row', backgroundColor: C.orange, paddingVertical: 10, paddingHorizontal: 12, alignItems: 'center' },
    tfootLabel: { fontSize: 9, fontWeight: 700, color: '#ffffff' },
    tfootMid: { fontSize: 9.5, fontWeight: 700, color: '#ffffff', textAlign: 'right' },
    tfootPct: { fontSize: 8.5, fontWeight: 400, color: 'rgba(255,255,255,0.8)', textAlign: 'right' },
    tfootTotal: { fontSize: 13, fontWeight: 700, color: '#ffffff', textAlign: 'right' },
    /* Tax box */
    taxBox: { backgroundColor: '#f8fafc', borderRadius: 10, borderWidth: 1, borderColor: C.line, padding: 14, marginBottom: 14 },
    taxTitle: { fontSize: 10.5, fontWeight: 700, color: C.ink, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
    taxGrid: { flexDirection: 'row' },
    taxColTitle: { fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 },
    taxRuleRow: {
        flexDirection: 'row', justifyContent: 'space-between',
        borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 4, marginBottom: 4,
    },
    taxRuleLabel: { fontSize: 7.5, color: C.muted, paddingRight: 8, width: '55%' },
    taxRuleValue: { fontSize: 7.5, color: C.ink, fontWeight: 700, textAlign: 'right', width: '45%' },
    taxBenefit: { fontSize: 7.5, color: '#475569', marginBottom: 4 },
    /* Final summary cards */
    finalCards: { flexDirection: 'row', marginTop: 16 },
    finalCard: { borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, textAlign: 'center', width: '32%', borderWidth: 1 },
    finalLabel: { fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 },
    finalValue: { fontSize: 15, fontWeight: 700, color: C.ink, letterSpacing: -0.3 },
    sectionLabel: {
        fontSize: 7.5, color: C.orange, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: 1.2, marginBottom: 12,
    },
    emptyNote: { textAlign: 'center', paddingVertical: 40, color: C.faint, fontSize: 11 },
});

const inputDisplay = (label, val) => {
    const num = parseFloat(String(val).replace(/,/g, ''));
    if (label.includes('(₹)') && !isNaN(num)) return `₹${Math.round(num).toLocaleString('en-IN')}`;
    return String(val);
};

const SummaryPage = ({ data, user, logo, qr }) => {
    const { toolName, inputs, result } = data;
    const netTotal = result.netTotal || 0;
    const invested = result.invested || 0;
    const returns = result.returns || 0;
    const tax = result.tax || 0;
    const isEMI = !!result.isEMI;
    const emi = result.emi || 0;
    const multiplier = invested > 0 ? (netTotal / invested).toFixed(2) : '—';
    const gainPct = invested > 0 ? ((returns / invested) * 100).toFixed(1) : '0';
    const invPct = (invested + returns) > 0 ? (invested / (invested + returns) * 100) : 50;
    const retPct = 100 - invPct;
    const years = parseFloat(inputs['Time Period (Years)']) || 10;

    return (
        <Page size="A4" style={pageStyle}>
            <Watermark logo={logo} />
            <ReportHeader logo={logo} user={user} subtitle={`${toolName} Report`} />
            <Eyebrow color={C.orange}>{toolName} Analysis</Eyebrow>
            <Text style={{ fontSize: 26, fontWeight: 700, color: C.ink, letterSpacing: -0.8, marginBottom: 18 }}>
                Projection Summary
            </Text>

            {/* Dark hero card */}
            <View style={s.hero}>
                <Text style={s.heroMark}>FIN</Text>
                <View style={s.heroGrid}>
                    <View style={s.maturityCard}>
                        <Text style={[s.heroLabel, { color: '#fdb777' }]}>
                            {isEMI ? 'Total Repayment' : 'Net Maturity Value'}
                        </Text>
                        <Text style={[s.heroValue, { color: '#ffffff' }]}>{fmt(netTotal)}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                            {!isEMI && (
                                <View style={s.pill}><Text style={s.pillText}>High Growth</Text></View>
                            )}
                            {isEMI && emi > 0 && (
                                <View style={s.pill}><Text style={s.pillText}>{fmt(Math.round(emi))}/month EMI</Text></View>
                            )}
                            {tax > 0 && (
                                <Text style={{ fontSize: 8, color: '#fca5a5', fontWeight: 400, marginLeft: 6, marginTop: 8 }}>
                                    Net after tax
                                </Text>
                            )}
                        </View>
                    </View>
                    <View style={[s.heroStat, { marginRight: 14 }]}>
                        <Text style={[s.heroLabel, { color: '#94a3b8' }]}>
                            {isEMI ? 'Loan Amount' : 'Total Capital'}
                        </Text>
                        <Text style={[s.heroValue, { color: '#ffffff', fontSize: 20 }]}>{fmt(invested)}</Text>
                        <Text style={[s.heroSub, { color: '#64748b' }]}>Principal amount</Text>
                    </View>
                    <View style={s.heroStat}>
                        <Text style={[s.heroLabel, { color: '#34d399' }]}>
                            {isEMI ? 'Total Interest' : 'Wealth Gain'}
                        </Text>
                        <Text style={[s.heroValue, { color: '#34d399', fontSize: 20 }]}>
                            {isEMI ? '' : '+'}{fmt(returns)}
                        </Text>
                        <Text style={[s.heroSub, { color: '#10b981', fontWeight: 700 }]}>
                            {gainPct}% {isEMI ? 'of loan' : 'ROI'}
                        </Text>
                    </View>
                </View>
                <View style={s.splitTop}>
                    <View style={s.legendRow}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={s.legend}>
                                <View style={[s.dot, { backgroundColor: C.orange }]} />
                                <Text style={s.legendText}>Principal ({invPct.toFixed(0)}%)</Text>
                            </View>
                            <View style={s.legend}>
                                <View style={[s.dot, { backgroundColor: '#34d399' }]} />
                                <Text style={s.legendText}>{isEMI ? 'Interest' : 'Profit'} ({retPct.toFixed(0)}%)</Text>
                            </View>
                        </View>
                        <Text style={s.legendTitle}>CAPITAL SPLIT</Text>
                    </View>
                    <View style={s.barTrack}>
                        <View style={{ width: `${invPct}%`, backgroundColor: C.orange }} />
                        <View style={{ width: `${retPct}%`, backgroundColor: '#34d399' }} />
                    </View>
                </View>
            </View>

            {/* Inputs + insights */}
            <View style={s.twoCol}>
                <View style={[s.box, { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: C.line, marginRight: 14 }]}>
                    <Text style={[s.boxTitle, { color: C.muted }]}>Input Parameters</Text>
                    {Object.entries(inputs).map(([label, val]) => (
                        <View key={label} style={s.inputRow}>
                            <Text style={s.inputLabel}>{label}</Text>
                            <Text style={s.inputValue}>{inputDisplay(label, val)}</Text>
                        </View>
                    ))}
                </View>
                <View style={[s.box, { backgroundColor: '#eef2ff', borderWidth: 1, borderColor: '#c7d2fe' }]}>
                    <Text style={[s.boxTitle, { color: '#4338ca' }]}>
                        {isEMI ? 'Loan Insights' : 'Investment Insights'}
                    </Text>
                    <View style={s.insightCard}>
                        <Text style={s.insightLabel}>{isEMI ? 'INTEREST BURDEN' : 'WEALTH MULTIPLIER'}</Text>
                        <Text style={s.insightValue}>
                            {isEMI ? `${gainPct}%` : `${multiplier}×`}
                            <Text style={{ fontSize: 10, color: C.green, fontWeight: 400 }}>
                                {'  '}{isEMI ? 'of loan amount' : 'growth on principal'}
                            </Text>
                        </Text>
                    </View>
                    <View style={s.insightCard}>
                        <Text style={s.insightLabel}>{isEMI ? 'TOTAL REPAYMENT' : 'MONTHLY AVG GROWTH'}</Text>
                        <Text style={[s.insightValue, { fontSize: 16 }]}>
                            {isEMI ? fmt(netTotal) : `${fmt(returns / (years * 12 || 120))}/mo`}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Disclaimer */}
            <View style={s.disclaimer}>
                <Rich
                    style={s.disclaimerText}
                    text={isEMI
                        ? '**Disclaimer:** This amortisation schedule is an estimate based on your inputs at a fixed interest rate. Actual EMI schedules vary with floating rates, part-prepayments, and lender terms. Tax benefits mentioned apply per current Income Tax rules; consult a tax advisor.'
                        : `**Disclaimer:** This report is for informational purposes. Market investments are subject to risk. Returns projected are estimated based on your inputs and do not guarantee future performance. Tax estimates follow FY ${new Date().getFullYear()}-${String(new Date().getFullYear() + 1).slice(2)} guidelines.`}
                />
            </View>

            <ReportFooter qr={qr} />
        </Page>
    );
};

const BreakdownPage = ({ data, chunk, chunkIndex, isLastChunk, pageNum, totalPages, user, logo, qr }) => {
    const { toolName, result } = data;
    const isEMI = !!result.isEMI;
    const invested = result.invested || 0;
    const returns = result.returns || 0;
    const netTotal = result.netTotal || 0;
    const taxInfo = result.taxInfo || null;
    const multiplier = invested > 0 ? (netTotal / invested).toFixed(2) : '—';
    const gainPct = invested > 0 ? ((returns / invested) * 100).toFixed(1) : '0';
    const isFirstChunk = chunkIndex === 0;
    const headers = isEMI
        ? ['Year', 'Principal Paid (₹)', 'Interest Paid (₹)', 'Interest %', 'Total Paid (₹)']
        : ['Year', 'Invested (₹)', 'Profit / Returns (₹)', 'Growth %', 'Total Value (₹)'];
    const colW = ['16%', '22%', '24%', '14%', '24%'];

    return (
        <Page size="A4" style={pageStyle}>
            <Watermark logo={logo} />
            <ReportHeader
                logo={logo} user={user}
                subtitle={isFirstChunk ? 'Tax & Breakdown' : 'Yearly Breakdown'}
            />
            {isFirstChunk && (
                <View>
                    <Text style={{ fontSize: 18, fontWeight: 700, color: C.ink, letterSpacing: -0.5, marginBottom: 8 }}>
                        {isEMI ? 'Amortisation Schedule' : 'Growth Trajectory'}
                    </Text>
                    <Text style={s.sectionLabel}>
                        {isEMI
                            ? `Amortisation schedule — ${gainPct}% interest on loan`
                            : `Compounding at work — ${gainPct}% total returns · ${multiplier}× multiplier`}
                    </Text>
                    {taxInfo && (
                        <View style={s.taxBox}>
                            <Text style={s.taxTitle}>{taxInfo.name} — Tax Treatment</Text>
                            <View style={s.taxGrid}>
                                <View style={{ width: '46%', marginRight: 16 }}>
                                    <Text style={[s.taxColTitle, { color: C.muted }]}>Tax Rules</Text>
                                    {(taxInfo.taxRules || []).map((rule, idx) => (
                                        <View key={idx} style={s.taxRuleRow}>
                                            <Text style={s.taxRuleLabel}>{rule.label}</Text>
                                            <Text style={s.taxRuleValue}>{rule.value}</Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={[s.taxColTitle, { color: C.green }]}>Key Benefits</Text>
                                    {(taxInfo.exemptions || []).slice(0, 4).map((ex, idx) => (
                                        <Text key={idx} style={s.taxBenefit}>•  {ex}</Text>
                                    ))}
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            )}

            {chunk.length > 0 ? (
                <View style={s.tableWrap}>
                    <View style={s.thRow}>
                        {headers.map((h, i) => (
                            <Text key={h} style={[s.th, { width: colW[i], textAlign: i === 0 ? 'left' : 'right' }]}>{h}</Text>
                        ))}
                    </View>
                    {chunk.map((p, i) => {
                        const profit = isEMI ? p.total : p.total - p.invested;
                        const rowTotal = isEMI ? p.invested + p.total : p.total;
                        const growthPct = p.invested > 0 ? ((profit / p.invested) * 100).toFixed(1) : '0';
                        return (
                            <View key={i} style={[s.tdRow, { backgroundColor: i % 2 === 0 ? '#ffffff' : '#fafafa' }]}>
                                <Text style={[s.tdYear, { width: colW[0] }]}>Year {p.year}</Text>
                                <Text style={[s.tdMoney, { width: colW[1] }]}>{fmt(p.invested)}</Text>
                                <Text style={[s.tdProfit, { width: colW[2] }]}>{isEMI ? '' : '+'}{fmt(profit)}</Text>
                                <Text style={[{ width: colW[3] }]}>
                                    <Text style={s.pctPill}>{isEMI ? '' : '+'}{growthPct}%</Text>
                                </Text>
                                <Text style={[s.tdTotal, { width: colW[4] }]}>{fmt(rowTotal)}</Text>
                            </View>
                        );
                    })}
                    {isLastChunk && (
                        <View style={s.tfoot}>
                            <Text style={[s.tfootLabel, { width: '38%' }]}>
                                {isEMI ? 'Final Repayment' : 'Final Maturity'}
                            </Text>
                            <Text style={[s.tfootMid, { width: '24%' }]}>
                                {isEMI ? `${fmt(returns)} interest` : `+${fmt(returns)} profit`}
                            </Text>
                            <Text style={[s.tfootPct, { width: '14%' }]}>{gainPct}%</Text>
                            <Text style={[s.tfootTotal, { width: '24%' }]}>{fmt(netTotal)}</Text>
                        </View>
                    )}
                </View>
            ) : (
                <Text style={s.emptyNote}>No year-wise projections available for this tool.</Text>
            )}

            {isLastChunk && (
                <View style={s.finalCards}>
                    {[
                        { label: isEMI ? 'Loan Amount' : 'Total Invested', value: fmt(invested), color: C.indigo, bg: '#eef2ff', border: '#c7d2fe' },
                        { label: isEMI ? 'Total Interest' : 'Wealth Created', value: `${isEMI ? '' : '+'}${fmt(returns)}`, color: C.green, bg: '#ecfdf5', border: '#a7f3d0' },
                        { label: isEMI ? 'Total Repayment' : 'Net Maturity', value: fmt(netTotal), color: C.orange, bg: C.orangeSoft, border: '#fed7aa' },
                    ].map(({ label, value, color, bg, border }) => (
                        <View key={label} style={[s.finalCard, { backgroundColor: bg, borderColor: border, marginRight: 12 }]}>
                            <Text style={[s.finalLabel, { color }]}>{label}</Text>
                            <Text style={s.finalValue}>{value}</Text>
                        </View>
                    ))}
                </View>
            )}

            <ReportFooter qr={qr} />
        </Page>
    );
};

export const CalculatorDoc = ({ data, user, logo, qr }) => {
    const projs = data?.result?.projections || [];
    const taxInfo = data?.result?.taxInfo || null;
    const chunks = [];
    if (projs.length > 0) {
        const firstChunkSize = taxInfo ? 12 : 18;
        chunks.push(projs.slice(0, firstChunkSize));
        let remaining = projs.slice(firstChunkSize);
        while (remaining.length > 0) {
            chunks.push(remaining.slice(0, 25));
            remaining = remaining.slice(25);
        }
    } else {
        chunks.push([]);
    }
    const totalPages = 1 + chunks.length;

    return (
        <Document title={`${data.toolName} Report — Srot Finance`} author="Srot Finance">
            <SummaryPage data={data} user={user} logo={logo} qr={qr} />
            {chunks.map((chunk, i) => (
                <BreakdownPage
                    key={i} data={data} chunk={chunk} chunkIndex={i}
                    isLastChunk={i === chunks.length - 1}
                    pageNum={2 + i} totalPages={totalPages}
                    user={user} logo={logo} qr={qr}
                />
            ))}
        </Document>
    );
};
