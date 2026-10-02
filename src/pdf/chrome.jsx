/* Shared vector-PDF chrome: fonts, watermark, header, footer.
   This module pulls in @react-pdf/renderer and is code-split away from the
   main bundle (only loaded when a PDF is generated). */
import React from 'react';
import { Font, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

/* Poppins ships the ₹ glyph (Outfit/Helvetica do not). Subset to ~16KB.
   Registered lazily so Node-based tests can point at local file paths. */
let fontsRegistered = false;
export const registerPdfFonts = (base = '') => {
    if (fontsRegistered) return;
    fontsRegistered = true;
    Font.register({
        family: 'Poppins',
        fonts: [
            { src: `${base}/fonts/Poppins-Regular.ttf`, fontWeight: 400 },
            { src: `${base}/fonts/Poppins-Bold.ttf`, fontWeight: 700 },
        ],
    });
};

export const C = {
    ink: '#0f172a',
    muted: '#64748b',
    faint: '#94a3b8',
    line: '#e2e8f0',
    orange: '#f97316',
    orangeSoft: '#fff7ed',
    green: '#10b981',
    greenDark: '#065f46',
    red: '#f43f5e',
    indigo: '#6366f1',
    dark: '#0f172a',
};

export const FONT = 'Poppins';

/* A4 = 595.28 x 841.89 pt. Header ~52pt, footer ~40pt. */
export const pageStyle = {
    fontFamily: FONT,
    fontSize: 9,
    color: C.ink,
    paddingTop: 78,
    paddingBottom: 62,
    paddingHorizontal: 40,
    backgroundColor: '#ffffff',
};

const styles = StyleSheet.create({
    /* Ghost logo watermark, repeated on every page.
       NOTE: `fixed` must sit on the wrapping View (like header/footer) —
       a fixed+absolute Image itself does not render in the browser build. */
    watermarkWrap: {
        position: 'absolute',
        top: 290,
        left: 158,
        width: 280,
        height: 280,
    },
    watermarkImg: {
        width: 280,
        height: 280,
        opacity: 0.07,
        transform: 'rotate(-18deg)',
    },
    /* Fixed header */
    header: {
        position: 'absolute',
        top: 26,
        left: 40,
        right: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderBottomWidth: 1.5,
        borderBottomColor: C.dark,
        paddingBottom: 10,
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    logo: { width: 32, height: 32, borderRadius: 8, marginRight: 10 },
    wordmark: { fontSize: 16, fontWeight: 700, color: C.ink, letterSpacing: -0.5 },
    subtitle: { fontSize: 8, color: C.faint, fontWeight: 400, marginTop: 1 },
    preparedLabel: {
        fontSize: 7, color: C.faint, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: 1.2, textAlign: 'right',
    },
    preparedName: { fontSize: 10, fontWeight: 700, color: C.ink, textAlign: 'right', marginTop: 2 },
    /* Fixed footer */
    footer: {
        position: 'absolute',
        bottom: 26,
        left: 40,
        right: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: C.line,
        paddingTop: 8,
    },
    footerLeft: { flexDirection: 'row', alignItems: 'center' },
    footerBrand: {
        fontSize: 8, fontWeight: 700, color: C.orange,
        textTransform: 'uppercase', letterSpacing: 1,
    },
    footerSep: { fontSize: 8, color: '#cbd5e1', marginHorizontal: 8 },
    footerConf: { fontSize: 7.5, color: C.faint, fontWeight: 400 },
    footerRight: { flexDirection: 'row', alignItems: 'center' },
    qr: { width: 30, height: 30, borderRadius: 4, marginRight: 6 },
    scanLabel: {
        fontSize: 6.5, color: C.faint, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: 0.8, marginRight: 10,
    },
    pageNum: { fontSize: 7.5, color: C.faint, fontWeight: 400 },
    /* Shared bits */
    eyebrowRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    eyebrowBar: { width: 4, height: 16, borderRadius: 4, marginRight: 7 },
    eyebrowText: {
        fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5,
    },
    h1: { fontSize: 26, fontWeight: 700, color: C.ink, letterSpacing: -0.8, marginBottom: 18 },
    h2: { fontSize: 18, fontWeight: 700, color: C.ink, letterSpacing: -0.5, marginBottom: 10 },
    label: {
        fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1,
    },
});

export const Watermark = ({ logo }) =>
    logo ? (
        <View fixed style={styles.watermarkWrap}>
            <Image src={logo} style={styles.watermarkImg} />
        </View>
    ) : null;

export const ReportHeader = ({ logo, user, subtitle }) => (
    <View fixed style={styles.header}>
        <View style={styles.headerLeft}>
            {logo ? <Image src={logo} style={styles.logo} /> : null}
            <View>
                <Text style={styles.wordmark}>Srot Finance</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>
        <View>
            <Text style={styles.preparedLabel}>Prepared for</Text>
            <Text style={styles.preparedName}>
                {user?.name || user?.email || 'Member'}
            </Text>
        </View>
    </View>
);

export const ReportFooter = ({ qr }) => (
    <View fixed style={styles.footer}>
        <View style={styles.footerLeft}>
            <Text style={styles.footerBrand}>Srot Finance</Text>
            <Text style={styles.footerSep}>|</Text>
            <Text style={styles.footerConf}>CONFIDENTIAL</Text>
        </View>
        <View style={styles.footerRight}>
            {qr ? (
                <>
                    <Image src={qr} style={styles.qr} />
                    <Text style={styles.scanLabel}>Scan to open</Text>
                </>
            ) : null}
            <Text
                style={styles.pageNum}
                render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
            />
        </View>
    </View>
);

export const Eyebrow = ({ color, children }) => (
    <View style={styles.eyebrowRow}>
        <View style={[styles.eyebrowBar, { backgroundColor: color }]} />
        <Text style={[styles.eyebrowText, { color }]}>{children}</Text>
    </View>
);

/* Renders **bold** segments inside plain text */
export const Rich = ({ text, style }) => {
    const parts = String(text || '').split('**');
    return (
        <Text style={style}>
            {parts.map((p, i) =>
                i % 2 === 1 ? <Text key={i} style={{ fontWeight: 700 }}>{p}</Text> : p
            )}
        </Text>
    );
};

export { styles as chromeStyles };
