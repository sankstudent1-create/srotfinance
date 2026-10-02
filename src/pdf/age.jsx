/* Vector age report — single page. Zodiac emoji is dropped (no emoji glyphs in
   PDF fonts); the sign name carries the meaning. */
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { C, FONT, pageStyle, Watermark, ReportHeader, ReportFooter, Eyebrow } from './chrome.jsx';
import { fmtNum } from './assets.js';

const PINK = '#ec4899';

const s = StyleSheet.create({
    hero: {
        backgroundColor: C.dark, borderRadius: 18, padding: 26, marginBottom: 18,
        position: 'relative', overflow: 'hidden',
    },
    heroMark: {
        position: 'absolute', top: -18, right: 6, fontSize: 96, fontWeight: 700,
        color: 'rgba(255,255,255,0.03)',
    },
    heroRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    heroLabel: {
        fontSize: 8, color: '#fdb777', fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: 1, marginBottom: 8,
    },
    ageRow: { flexDirection: 'row', alignItems: 'flex-end' },
    ageNum: { fontSize: 44, fontWeight: 700, color: '#ffffff', letterSpacing: -1 },
    ageUnit: { fontSize: 13, color: '#94a3b8', fontWeight: 700, marginLeft: 3, marginRight: 14, marginBottom: 6 },
    born: { fontSize: 11, color: '#cbd5e1', marginTop: 8, fontWeight: 400 },
    zodiacBox: {
        textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.05)',
        paddingVertical: 14, paddingHorizontal: 22, borderRadius: 14,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    },
    zodiacSign: { fontSize: 15, fontWeight: 700, color: '#ffffff', marginTop: 6 },
    zodiacLabel: {
        fontSize: 7.5, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: 1, marginTop: 2,
    },
    statGrid: { flexDirection: 'row', marginBottom: 18 },
    statCard: { borderRadius: 14, paddingVertical: 14, paddingHorizontal: 8, textAlign: 'center', width: '23.5%', borderWidth: 1 },
    statValue: { fontSize: 18, fontWeight: 700, color: C.ink },
    statLabel: {
        fontSize: 8, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: 0.5, marginTop: 4,
    },
    twoCol: { flexDirection: 'row' },
    bdayBox: {
        backgroundColor: '#fdf2f8', borderWidth: 1, borderColor: '#fbcfe8',
        borderRadius: 14, padding: 22, textAlign: 'center', width: '48.5%', marginRight: 14,
    },
    bdayLabel: {
        fontSize: 9, color: '#db2777', fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: 1, marginBottom: 8,
    },
    bdayValue: { fontSize: 32, fontWeight: 700, color: '#be185d' },
    secBox: {
        backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0',
        borderRadius: 14, padding: 22, width: '48.5%', justifyContent: 'center',
    },
    secRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    secLabel: {
        fontSize: 9, color: C.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1,
    },
    secValue: { fontSize: 22, fontWeight: 700, color: C.ink },
});

export const AgeDoc = ({ data, user, logo, qr }) => {
    const result = data?.result || {};
    const bornStr = result.birth
        ? new Date(result.birth).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        : '';

    return (
        <Document title="Age & Life Report — Srot Finance" author="Srot Finance">
            <Page size="A4" style={pageStyle} wrap={false}>
                <Watermark logo={logo} />
                <ReportHeader logo={logo} user={user} subtitle="Age & Life Report" />
                <Eyebrow color={PINK}>Life Milestones Analysis</Eyebrow>
                <Text style={{ fontSize: 26, fontWeight: 700, color: C.ink, letterSpacing: -0.8, marginBottom: 18 }}>
                    Personal Timeline
                </Text>

                {/* Hero */}
                <View style={s.hero}>
                    <Text style={s.heroMark}>AGE</Text>
                    <View style={s.heroRow}>
                        <View>
                            <Text style={s.heroLabel}>Your Exact Age</Text>
                            <View style={s.ageRow}>
                                <Text style={s.ageNum}>{result.years}</Text>
                                <Text style={s.ageUnit}>Yrs</Text>
                                <Text style={[s.ageNum, { fontSize: 30, color: '#f472b6' }]}>{result.months}</Text>
                                <Text style={[s.ageUnit, { fontSize: 11 }]}>Mos</Text>
                                <Text style={[s.ageNum, { fontSize: 30, color: '#f9a8d4' }]}>{result.days}</Text>
                                <Text style={[s.ageUnit, { fontSize: 11 }]}>Days</Text>
                            </View>
                            <Text style={s.born}>Born on {bornStr}</Text>
                        </View>
                        <View style={s.zodiacBox}>
                            <Text style={s.zodiacSign}>{result.zodiac?.sign || '—'}</Text>
                            <Text style={s.zodiacLabel}>Zodiac</Text>
                        </View>
                    </View>
                </View>

                {/* Stat cards */}
                <View style={s.statGrid}>
                    {[
                        { label: 'Total Months', value: result.totalMonths, color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
                        { label: 'Total Weeks', value: result.totalWeeks, color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0' },
                        { label: 'Total Days', value: result.totalDays, color: '#6366f1', bg: '#eef2ff', border: '#c7d2fe' },
                        { label: 'Total Hours', value: result.totalHours, color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
                    ].map(({ label, value, color, bg, border }, i, arr) => (
                        <View key={label} style={[s.statCard, {
                            backgroundColor: bg, borderColor: border,
                            marginRight: i === arr.length - 1 ? 0 : 12,
                        }]}>
                            <Text style={s.statValue}>{fmtNum(value)}</Text>
                            <Text style={[s.statLabel, { color }]}>{label}</Text>
                        </View>
                    ))}
                </View>

                {/* Birthday + seconds */}
                <View style={s.twoCol}>
                    <View style={s.bdayBox}>
                        <Text style={s.bdayLabel}>Next Birthday</Text>
                        <Text style={s.bdayValue}>
                            {result.isBirthday ? 'Today!' : `${fmtNum(result.daysLeft)} Days`}
                        </Text>
                    </View>
                    <View style={s.secBox}>
                        <Text style={[s.secLabel, { marginBottom: 6 }]}>Seconds Alive</Text>
                        <Text style={s.secValue}>{fmtNum(result.totalSeconds)}</Text>
                    </View>
                </View>

                <ReportFooter qr={qr} />
            </Page>
        </Document>
    );
};
