/* Vector analytics report — summary cards, savings band, category bars and a
   paginated transaction log. Real text throughout. */
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { C, FONT, pageStyle, Watermark, ReportHeader, ReportFooter, Eyebrow } from './chrome.jsx';
import { fmt, fmtNum, fmtDate } from './assets.js';

const s = StyleSheet.create({
    cards: { flexDirection: 'row', marginBottom: 16 },
    card: { borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, width: '32%', borderWidth: 1 },
    cardLabel: { fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5 },
    cardValue: { fontSize: 18, fontWeight: 700, color: C.ink, letterSpacing: -0.4 },
    cardNote: { fontSize: 7.5, color: C.red, fontWeight: 400, marginTop: 2 },
    band: {
        backgroundColor: C.dark, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 18,
        marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    },
    bandLabel: { fontSize: 7.5, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 },
    bandValue: { fontSize: 20, fontWeight: 700, letterSpacing: -0.4 },
    bandCount: { fontSize: 20, fontWeight: 700, color: '#ffffff', letterSpacing: -0.4, textAlign: 'right' },
    breakdowns: { flexDirection: 'row', marginBottom: 8 },
    breakdown: { borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, width: '100%', borderWidth: 1 },
    bdTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    bdBar: { width: 3, height: 13, borderRadius: 4, marginRight: 7 },
    bdTitle: { fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 },
    bdRow: { marginBottom: 8 },
    bdRowTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
    bdName: { fontSize: 9, fontWeight: 400, color: '#374151' },
    bdVal: { fontSize: 9, fontWeight: 700 },
    bdPct: { fontSize: 8, color: '#9ca3af', fontWeight: 400 },
    bdTrack: { height: 5, backgroundColor: 'rgba(0,0,0,0.07)', borderRadius: 99 },
    bdFill: { height: 5, borderRadius: 99 },
    /* Log */
    logHead: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 14, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: C.line,
    },
    logTitle: { fontSize: 15, fontWeight: 700, color: C.ink, letterSpacing: -0.4 },
    logMeta: { fontSize: 7.5, color: C.faint, fontWeight: 400, textTransform: 'uppercase', letterSpacing: 0.8 },
    tableWrap: { borderWidth: 1, borderColor: C.line, borderRadius: 10, overflow: 'hidden' },
    thRow: { flexDirection: 'row', backgroundColor: C.dark, paddingVertical: 8, paddingHorizontal: 10 },
    th: { fontSize: 7, fontWeight: 700, color: C.faint, textTransform: 'uppercase', letterSpacing: 0.8 },
    tdRow: { flexDirection: 'row', paddingVertical: 6, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', alignItems: 'center' },
    tdDate: { fontSize: 8.5, color: C.muted, fontWeight: 400 },
    tdTitle: { fontSize: 9.5, fontWeight: 700, color: C.ink },
    tdCat: { fontSize: 7.5, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.4 },
    typePill: {
        fontSize: 7, fontWeight: 700, borderRadius: 99, paddingVertical: 2,
        paddingHorizontal: 7, textTransform: 'uppercase', letterSpacing: 0.5,
    },
    tdAmt: { fontSize: 10.5, fontWeight: 700, textAlign: 'right' },
    tfoot: {
        flexDirection: 'row', backgroundColor: '#f8fafc', paddingVertical: 9,
        paddingHorizontal: 10, borderTopWidth: 2, borderTopColor: C.line, alignItems: 'center',
    },
    tfootLabel: { fontSize: 9, fontWeight: 700, color: '#374151' },
    tfootVal: { fontSize: 12, fontWeight: 700, textAlign: 'right' },
    emptyNote: { textAlign: 'center', paddingVertical: 40, color: C.faint, fontSize: 11 },
});

const breakdownData = (transactions, type) => {
    const grouped = {};
    transactions.filter(t => t.type === type).forEach(t => {
        grouped[t.category] = (grouped[t.category] || 0) + Number(t.amount);
    });
    const total = Object.values(grouped).reduce((a, b) => a + b, 0);
    const sorted = Object.entries(grouped).sort((a, b) => b[1] - a[1]).slice(0, 6);
    return { sorted, total };
};

const CategoryBreakdown = ({ transactions, type }) => {
    const isIncome = type === 'income';
    const { sorted, total } = breakdownData(transactions, type);
    if (sorted.length === 0) return null;
    const bg = isIncome ? '#ecfdf5' : '#fff1f2';
    const barColor = isIncome ? '#10b981' : '#f43f5e';
    const textColor = isIncome ? '#065f46' : '#881337';
    const border = isIncome ? '#a7f3d0' : '#fecdd3';
    return (
        <View style={[s.breakdown, { backgroundColor: bg, borderColor: border }]}>
            <View style={s.bdTitleRow}>
                <View style={[s.bdBar, { backgroundColor: barColor }]} />
                <Text style={[s.bdTitle, { color: textColor }]}>
                    {isIncome ? 'Income' : 'Expense'} Breakdown
                </Text>
            </View>
            {sorted.map(([name, val], i) => {
                const pct = total > 0 ? (val / total) * 100 : 0;
                return (
                    <View key={i} style={s.bdRow}>
                        <View style={s.bdRowTop}>
                            <Text style={s.bdName}>{name}</Text>
                            <Text style={[s.bdVal, { color: textColor }]}>
                                {fmt(val)} <Text style={s.bdPct}>({pct.toFixed(0)}%)</Text>
                            </Text>
                        </View>
                        <View style={s.bdTrack}>
                            <View style={[s.bdFill, { width: `${pct}%`, backgroundColor: barColor }]} />
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

const colW = ['15%', '32%', '20%', '13%', '20%'];

const LogPage = ({ transactions, chunk, isFirst, isLast, stats, filterLabel, user, logo, qr }) => (
    <Page size="A4" style={pageStyle} wrap={false}>
        <Watermark logo={logo} />
        <ReportHeader logo={logo} user={user} subtitle="Financial Report" />
        {isFirst && (
            <View style={s.logHead}>
                <Text style={s.logTitle}>Transaction Log</Text>
                <Text style={s.logMeta}>
                    {filterLabel || 'All Time'} · {transactions.length} records
                </Text>
            </View>
        )}
        {chunk.length > 0 ? (
            <View style={s.tableWrap}>
                <View style={s.thRow}>
                    <Text style={[s.th, { width: colW[0] }]}>Date</Text>
                    <Text style={[s.th, { width: colW[1] }]}>Description</Text>
                    <Text style={[s.th, { width: colW[2] }]}>Category</Text>
                    <Text style={[s.th, { width: colW[3] }]}>Type</Text>
                    <Text style={[s.th, { width: colW[4], textAlign: 'right' }]}>Amount</Text>
                </View>
                {chunk.map((t, i) => {
                    const isInc = t.type === 'income';
                    return (
                        <View key={i} style={[s.tdRow, { backgroundColor: i % 2 === 0 ? '#ffffff' : '#fafafa' }]}>
                            <Text style={[s.tdDate, { width: colW[0] }]}>{fmtDate(t.date)}</Text>
                            <Text style={[s.tdTitle, { width: colW[1] }]}>{t.title}</Text>
                            <Text style={[s.tdCat, { width: colW[2] }]}>{t.category}</Text>
                            <View style={{ width: colW[3] }}>
                                <Text style={[s.typePill, {
                                    backgroundColor: isInc ? '#ecfdf5' : '#fff1f2',
                                    color: isInc ? '#065f46' : '#881337',
                                }]}>
                                    {t.type}
                                </Text>
                            </View>
                            <Text style={[s.tdAmt, { width: colW[4], color: isInc ? '#10b981' : '#f43f5e' }]}>
                                {isInc ? '+' : '-'}{fmt(t.amount)}
                            </Text>
                        </View>
                    );
                })}
                {isLast && (
                    <View style={s.tfoot}>
                        <Text style={[s.tfootLabel, { width: '80%' }]}>Net Balance</Text>
                        <Text style={[s.tfootVal, {
                            width: '20%', color: stats.balance >= 0 ? '#10b981' : '#f43f5e',
                        }]}>
                            {stats.balance >= 0 ? '+' : ''}{fmt(stats.balance)}
                        </Text>
                    </View>
                )}
            </View>
        ) : (
            <Text style={s.emptyNote}>No transactions in this period.</Text>
        )}
        <ReportFooter qr={qr} />
    </Page>
);

export const AnalyticsDoc = ({ user, stats, transactions, filterLabel, logo, qr }) => {
    const ROWS = 30;
    const chunks = [];
    for (let i = 0; i < transactions.length; i += ROWS) chunks.push(transactions.slice(i, i + ROWS));
    if (chunks.length === 0) chunks.push([]);
    const savingsPct = stats.income > 0 ? ((stats.balance / stats.income) * 100).toFixed(1) : '0';
    const expensePct = stats.income > 0 ? ((stats.expense / stats.income) * 100).toFixed(1) : '0';

    return (
        <Document title="Spending Analysis — Srot Finance" author="Srot Finance">
            <Page size="A4" style={pageStyle} wrap={false}>
                <Watermark logo={logo} />
                <ReportHeader logo={logo} user={user} subtitle="Financial Report" />
                {filterLabel ? (
                    <Text style={{
                        fontSize: 8.5, color: C.orange, fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: 1.2, marginBottom: 4,
                    }}>
                        Period: {filterLabel}
                    </Text>
                ) : null}
                <Text style={{ fontSize: 24, fontWeight: 700, color: C.ink, letterSpacing: -0.6, marginBottom: 18 }}>
                    Spending Analysis
                </Text>

                {/* Summary cards */}
                <View style={s.cards}>
                    {[
                        { label: 'Net Balance', value: stats.balance, color: C.indigo, bg: '#eef2ff', border: '#c7d2fe' },
                        { label: 'Total Income', value: stats.income, color: C.green, bg: '#ecfdf5', border: '#a7f3d0' },
                        { label: 'Total Expense', value: stats.expense, color: C.red, bg: '#fff1f2', border: '#fecdd3' },
                    ].map(({ label, value, color, bg, border }) => (
                        <View key={label} style={[s.card, { backgroundColor: bg, borderColor: border, marginRight: 12 }]}>
                            <Text style={[s.cardLabel, { color }]}>{label}</Text>
                            <Text style={s.cardValue}>{fmt(Math.abs(value))}</Text>
                            {value < 0 && <Text style={s.cardNote}>Deficit</Text>}
                        </View>
                    ))}
                </View>

                {/* Savings band */}
                {stats.income > 0 && (
                    <View style={s.band}>
                        <View>
                            <Text style={s.bandLabel}>Savings Rate</Text>
                            <Text style={[s.bandValue, { color: stats.balance >= 0 ? '#34d399' : '#f87171' }]}>
                                {savingsPct}%
                            </Text>
                        </View>
                        <View>
                            <Text style={s.bandLabel}>Expense Ratio</Text>
                            <Text style={[s.bandValue, { color: '#f87171' }]}>{expensePct}%</Text>
                        </View>
                        <View>
                            <Text style={[s.bandLabel, { textAlign: 'right' }]}>Transactions</Text>
                            <Text style={s.bandCount}>{fmtNum(transactions.length)}</Text>
                        </View>
                    </View>
                )}

                {/* Category breakdowns */}
                <View style={s.breakdowns}>
                    <View style={{ width: '48.5%', marginRight: 14 }}>
                        <CategoryBreakdown transactions={transactions} type="income" />
                    </View>
                    <View style={{ width: '48.5%' }}>
                        <CategoryBreakdown transactions={transactions} type="expense" />
                    </View>
                </View>

                <ReportFooter qr={qr} />
            </Page>

            {chunks.map((chunk, i) => (
                <LogPage
                    key={i} transactions={transactions} chunk={chunk}
                    isFirst={i === 0} isLast={i === chunks.length - 1}
                    stats={stats} filterLabel={filterLabel}
                    user={user} logo={logo} qr={qr}
                />
            ))}
        </Document>
    );
};
