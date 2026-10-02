// Landing-page content for all 7 Srot Finance calculator tools.
// Consumed by the /calculators/* route renderer. Keep JS valid — escape apostrophes.

export const toolsData = [
  {
    id: 'sip',
    slug: 'sip-calculator',
    name: 'SIP Calculator',
    tagline: 'See how your monthly investing can compound into real wealth over time.',
    title: 'SIP Calculator — Mutual Fund Returns | Srot Finance',
    description: 'Free SIP calculator: estimate your mutual fund returns with monthly investing. Enter amount, tenure and expected returns to see the power of compounding.',
    path: '/calculators/sip-calculator',
    h1: 'SIP Calculator — See What Your Monthly Investing Can Grow Into',
    intro: 'A Systematic Investment Plan lets you invest a fixed sum in mutual funds every month, turning small, regular contributions into a meaningful corpus. Our SIP calculator shows you how your monthly investment could grow given an expected annual return, splitting the result into what you invested and what compounding earned you. Enter your numbers and get an instant projection.',
    blocks: [
      { t: 'h2', text: 'How the SIP Calculator Works' },
      { t: 'p', html: 'The calculator uses the future-value-of-annuity formula. Because SIPs are usually invested at the <em>beginning</em> of each month, we apply one extra month of compounding:' },
      { t: 'p', html: '<strong>FV = P × [((1+i)<sup>n</sup> − 1) / i] × (1+i)</strong>, where <strong>P</strong> is the monthly SIP amount, <strong>i</strong> is the monthly rate (annual rate ÷ 12 ÷ 100), and <strong>n</strong> is the total number of months.' },
      { t: 'p', html: 'The result is then split into two parts: <strong>total invested</strong> (P × n) and <strong>estimated gains</strong> (FV − invested). This split is the heart of the tool — it makes the cost of waiting visible. A ten-year delay in starting a SIP costs you far more in lost compounding than the skipped contributions themselves.' },
      { t: 'h2', text: 'Worked Example — ₹5,000 per Month for 10 Years at 12%' },
      { t: 'example', title: 'Worked example', html: 'Monthly SIP <strong>P = ₹5,000</strong>, expected annual return <strong>12%</strong>, so i = 0.01 per month, tenure <strong>n = 120 months</strong>. FV ≈ ₹5,000 × [((1.01)<sup>120</sup> − 1)/0.01] × 1.01 ≈ <strong>₹11,61,695</strong>. Total invested = ₹5,000 × 120 = <strong>₹6,00,000</strong>. Estimated gains = <strong>₹5,61,695</strong> — nearly as much as you put in, earned purely by compounding.' },
      { t: 'h2', text: 'Important Notes Before You Invest' },
      { t: 'ul', items: [
        '<strong>Returns are assumptions, not promises.</strong> 12% is a long-term equity-fund assumption; actual returns swing with the market. Try 10% and 14% to see the range of outcomes.',
        '<strong>Watch the expense ratio.</strong> An actively managed fund charging 1.5–2% a year can silently shave 15–20% off your corpus over a decade versus a low-cost index fund.',
        '<strong>Tax on gains:</strong> equity mutual fund gains held over 1 year are long-term capital gains, taxed at <strong>12.5%</strong> above ₹1.25 lakh per year (FY 2025-26 rules). Shorter holding is taxed at slab rates.',
        '<strong>ELSS SIPs</strong> qualify for ₹1.5 lakh/year deduction under Section 80C (old regime) but lock each instalment for 3 years.'
      ] },
      { t: 'h3', text: 'Practical Tips' },
      { t: 'ul', items: [
        'Start the SIP amount small but start <strong>today</strong> — time in the market beats timing the market.',
        'Increase your SIP by 10% every year when your salary rises; this is called a step-up SIP and it supercharges the final corpus.',
        'Never stop SIPs in a falling market — that is when your fixed amount buys the most units.'
      ] },
      { t: 'cta', title: 'Thinking of a lump sum instead?', text: 'If you have a bonus or windfall to invest at once, see how it compounds in one go.', label: 'Try the Lumpsum Calculator', to: '/calculators/lumpsum-calculator' }
    ],
    faqs: [
      { q: 'How accurate is the SIP calculator?', a: 'It gives a mathematical projection based on the expected annual return you enter. Markets are volatile, so treat the number as a planning estimate — run it at 10%, 12% and 14% to see best- and worst-case scenarios.' },
      { q: 'What is the SIP formula used?', a: 'Future value = P × [((1+i)^n − 1)/i] × (1+i), where P is the monthly investment, i is the monthly rate (annual rate ÷ 12), and n is the number of months. The (1+i) factor accounts for investments made at the start of each month.' },
      { q: 'Are SIP returns guaranteed?', a: 'No. SIPs invest in market-linked mutual funds, so returns fluctuate. The calculator projects an average assumed return; actual corpus will differ.' },
      { q: 'How are SIP gains taxed in India?', a: 'Equity fund gains held over 12 months are taxed as LTCG at 12.5% above ₹1.25 lakh per financial year. Gains on units held 12 months or less are taxed at your income slab rate. Debt funds held over 2 years are taxed at slab rates under current rules.' },
      { q: 'Can I pause or stop my SIP?', a: 'Yes — most fund houses let you pause or stop a SIP anytime without penalty. That flexibility is one reason SIPs suit salaried investors.' }
    ],
    relatedPosts: [
      { slug: 'sip-calculator-how-much-5000-month-10-years', title: 'How Much Does a ₹5,000/Month SIP Grow in 10 Years?' },
      { slug: 'step-up-sip-10-percent-annual-hike', title: 'Step-Up SIP: How a 10% Annual Hike Transforms Your Corpus' },
      { slug: 'elss-explained-tax-saving', title: 'ELSS Explained: Tax Saving with Equity SIPs' }
    ]
  },
  {
    id: 'lumpsum',
    slug: 'lumpsum-calculator',
    name: 'Lumpsum Calculator',
    tagline: 'Project how a one-time investment compounds year after year.',
    title: 'Lumpsum Calculator — One-Time Investment | Srot Finance',
    description: 'Free lumpsum calculator: see how a one-time investment grows with compounding. Enter amount, expected return and years to project your future value.',
    path: '/calculators/lumpsum-calculator',
    h1: 'Lumpsum Calculator — Watch a One-Time Investment Compound',
    intro: 'Received a bonus, a maturing deposit, or a gift you want to put to work? A lumpsum investment puts the entire amount into the market at once, so every rupee starts compounding from day one. This calculator applies compound growth to a single deposit and shows your future value, total invested and estimated gains side by side.',
    blocks: [
      { t: 'h2', text: 'How the Lumpsum Calculator Works' },
      { t: 'p', html: 'The math is pure compound interest: <strong>FV = P × (1 + r)<sup>n</sup></strong>, where <strong>P</strong> is the one-time investment, <strong>r</strong> is the annual return (as a decimal), and <strong>n</strong> is the number of years. Unlike a SIP, the full amount earns returns for the entire tenure, which makes the choice of entry point matter — but also gives you the maximum possible compounding time.' },
      { t: 'p', html: 'The tool also shows you <strong>total invested</strong> (just your P) and <strong>estimated gains</strong> (FV − P), so the compounding effect is immediately obvious. At a 12% return, your gains exceed your principal in about 6.5 years — after that point, compounding is doing more work than you did.' },
      { t: 'h2', text: 'Worked Example — ₹1,00,000 for 10 Years at 12%' },
      { t: 'example', title: 'Worked example', html: 'One-time investment <strong>P = ₹1,00,000</strong>, expected return <strong>12% per year</strong>, tenure <strong>n = 10 years</strong>. FV = 1,00,000 × (1.12)<sup>10</sup> ≈ 1,00,000 × 3.1058 ≈ <strong>₹3,10,585</strong>. Estimated gains = <strong>₹2,10,585</strong> on a ₹1,00,000 outlay — the money more than triples.' },
      { t: 'h2', text: 'When Does Lumpsum Beat SIP?' },
      { t: 'ul', items: [
        '<strong>In a steadily rising market</strong>, lumpsum wins because the whole amount is invested from day one.',
        '<strong>Near a market peak</strong>, a SIP (or staggering the lumpsum via STP over 3–6 months) reduces the risk of investing everything at a top.',
        '<strong>For idle cash</strong> — money sitting in a savings account at 3% — a lumpsum into a suitable fund usually beats waiting for the "right time".'
      ] },
      { t: 'h3', text: 'Tax and Practical Notes' },
      { t: 'ul', items: [
        '<strong>Tax:</strong> equity lumpsum gains held over 1 year are LTCG at 12.5% above ₹1.25 lakh/year (FY 2025-26). ELSS lumpsum gets 80C deduction (old regime) with a 3-year lock-in.',
        '<strong>Expense ratios</strong> apply to lumpsum mutual fund investments exactly as they do to SIPs — prefer low-cost options for long horizons.',
        'Match the fund type to your horizon: equity for 5+ years, hybrid or debt for shorter periods.'
      ] },
      { t: 'cta', title: 'Prefer investing monthly instead?', text: 'A SIP spreads the same capital across months and smooths out market timing risk.', label: 'Try the SIP Calculator', to: '/calculators/sip-calculator' }
    ],
    faqs: [
      { q: 'What is the lumpsum formula?', a: 'Future value = P × (1+r)^n, where P is the one-time investment, r is the annual return as a decimal (12% → 0.12), and n is the number of years.' },
      { q: 'Should I invest a lumpsum when the market is high?', a: 'Consider staggering it through a Systematic Transfer Plan (STP) over 3–6 months from a liquid fund. You still deploy the full amount quickly but reduce timing risk.' },
      { q: 'How is lumpsum different from SIP returns?', a: 'In a lumpsum, the entire amount compounds for the full tenure. In a SIP, later instalments compound for less time. In rising markets lumpsum usually wins; in volatile markets SIPs smooth the ride.' },
      { q: 'What return should I assume?', a: 'Be conservative: 10–12% for long-term equity funds, 7–8% for hybrid funds, 6–7% for debt funds. Always test a lower return too.' },
      { q: 'Is there a minimum investment for lumpsum mutual funds?', a: 'Most funds accept lumpsum investments starting at ₹5,000, with many allowing ₹1,000. ELSS funds qualify for 80C deduction with a 3-year lock-in per investment.' }
    ],
    relatedPosts: [
      { slug: 'elss-explained-tax-saving', title: 'ELSS Explained: Tax Saving with Equity Investing' },
      { slug: 'step-up-sip-10-percent-annual-hike', title: 'Step-Up SIP: How a 10% Annual Hike Transforms Your Corpus' },
      { slug: 'retirement-corpus-india-50', title: 'Building a Retirement Corpus in India After 50' }
    ]
  },
  {
    id: 'fd',
    slug: 'fd-calculator',
    name: 'FD Calculator',
    tagline: 'Know your fixed deposit maturity value before you lock in.',
    title: 'FD Calculator — Fixed Deposit Maturity Value | Srot Finance',
    description: 'Free FD calculator: compute your fixed deposit maturity amount with quarterly compounding. Compare tenures and rates to pick the best FD.',
    path: '/calculators/fd-calculator',
    h1: 'FD Calculator — Your Fixed Deposit Maturity, Calculated Instantly',
    intro: 'Fixed deposits remain India\u2019s most trusted savings instrument — capital-safe and predictable. Most Indian banks compound FD interest quarterly, which quietly boosts your maturity value beyond the headline rate. Enter your deposit amount, interest rate and tenure to see the exact maturity value, total interest earned, and the effective annual yield.',
    blocks: [
      { t: 'h2', text: 'How the FD Calculator Works' },
      { t: 'p', html: 'Indian banks typically compound FD interest every quarter. The maturity value is <strong>A = P × (1 + r/4)<sup>4n</sup></strong>, where <strong>P</strong> is the principal, <strong>r</strong> is the annual rate (as a decimal), and <strong>n</strong> is the tenure in years. Quarterly compounding means your effective yield is slightly higher than the quoted rate — a 7% FD actually yields about 7.19% per year.' },
      { t: 'p', html: 'The calculator breaks the result into <strong>principal</strong>, <strong>interest earned</strong> and <strong>maturity value</strong>, and shows the <strong>effective annual yield</strong> so you can compare FDs with different compounding frequencies honestly.' },
      { t: 'p', html: 'When comparing two FD offers, never compare headline rates alone. A 7% FD compounded quarterly beats a 7.05% FD compounded annually, because the effective yield of the first is 7.19% versus 7.05%. Always reduce every offer to its effective annual yield — that is the only number that lets you compare apples to apples. Also note that special "tenure buckets" (like 400-day or 444-day FDs) sometimes carry promotional rates 0.25–0.50% above the standard ladder, so it pays to scan the full rate table rather than defaulting to a round 1-year or 5-year term.' },
      { t: 'h2', text: 'Worked Example — ₹1,00,000 at 7% for 5 Years' },
      { t: 'example', title: 'Worked example', html: 'Deposit <strong>P = ₹1,00,000</strong>, rate <strong>7% p.a.</strong>, tenure <strong>5 years</strong> (20 quarters). A = 1,00,000 × (1 + 0.07/4)<sup>20</sup> = 1,00,000 × (1.0175)<sup>20</sup> ≈ <strong>₹1,41,478</strong>. Interest earned = <strong>₹41,478</strong>; effective annual yield ≈ <strong>7.19%</strong>.' },
      { t: 'h2', text: 'Tax on FD Interest (FY 2025-26)' },
      { t: 'ul', items: [
        '<strong>Fully taxable.</strong> FD interest is taxed at your income-tax slab rate — there is no special concessional rate, unlike equity LTCG.',
        '<strong>TDS:</strong> banks deduct 10% TDS when interest exceeds ₹50,000 per year (₹1,00,000 for senior citizens). TDS is not the final tax — you still owe the slab-rate difference, or can claim a refund if your slab is lower.',
        '<strong>80TTB:</strong> senior citizens can claim a deduction up to ₹50,000 per year on interest income (including FD interest).',
        'For high-bracket investors, a debt mutual fund or PPF may be more tax-efficient than an FD for the same goal.'
      ] },
      { t: 'h3', text: 'Practical Tips' },
      { t: 'table', head: ['Strategy', 'Why it helps'], rows: [
        ['Ladder your FDs', 'Split a large sum across 1, 2 and 3-year FDs so some money frees up every year'],
        ['Check small finance banks', 'They often pay 0.5–1% more than large banks, with the same ₹5 lakh DICGC insurance'],
        ['Avoid premature closure', 'Breaking an FD early usually costs a 1% penalty on the rate — keep an emergency fund in savings instead']
      ] },
      { t: 'cta', title: 'Want guaranteed returns with zero tax?', text: 'PPF pays 7.1% and the interest is completely tax-free. Compare before you lock an FD.', label: 'Try the PPF Calculator', to: '/calculators/ppf-calculator' }
    ],
    faqs: [
      { q: 'How is FD interest compounded in India?', a: 'Most banks compound quarterly. The formula is A = P × (1 + r/4)^(4n). Some banks offer monthly compounding on special deposits — always check the compounding frequency before comparing rates.' },
      { q: 'Is FD interest taxable?', a: 'Yes, fully taxable at your slab rate. Banks deduct 10% TDS above ₹50,000 annual interest (₹1,00,000 for senior citizens), but your final liability depends on your slab.' },
      { q: 'What is the effective yield vs the quoted rate?', a: 'Because of compounding, a 7% quarterly-compounded FD earns about 7.19% per year. The calculator shows this effective yield so you can compare FDs fairly.' },
      { q: 'Are FDs safe?', a: 'Deposits up to ₹5 lakh per bank per depositor are insured by DICGC, a wholly-owned RBI subsidiary. That covers most retail depositors fully.' },
      { q: 'What happens if I break an FD early?', a: 'Banks typically apply a premature-withdrawal penalty of around 1% on the applicable rate, and pay interest only for the completed period. Some FDs (like tax-saving 5-year FDs) cannot be broken at all.' }
    ],
    relatedPosts: [
      { slug: 'fd-interest-rates-compared-2026', title: 'FD Interest Rates Compared: Where to Park Cash in 2026' },
      { slug: 'emergency-fund-how-much-india', title: 'Emergency Fund: How Much Should You Keep in India?' },
      { slug: '50-30-20-budget-rule-india', title: 'The 50-30-20 Budget Rule, Adapted for India' }
    ]
  },
  {
    id: 'ppf',
    slug: 'ppf-calculator',
    name: 'PPF Calculator',
    tagline: 'Project your tax-free PPF corpus over its 15-year journey.',
    title: 'PPF Calculator — Tax-Free Corpus in 15 Years | Srot Finance',
    description: 'Free PPF calculator: project your Public Provident Fund maturity at 7.1% over 15 years. See your tax-free corpus with yearly deposits up to ₹1.5 lakh.',
    path: '/calculators/ppf-calculator',
    h1: 'PPF Calculator — Your Tax-Free 15-Year Corpus, Projected',
    intro: 'The Public Provident Fund is India\u2019s only EEE (exempt-exempt-exempt) instrument: deposits get you a tax deduction, interest is tax-free, and the maturity amount is tax-free. At the current 7.1% rate, disciplined yearly deposits over the 15-year tenure build a surprisingly large, completely tax-free corpus. Enter your annual deposit to see your projected maturity value.',
    blocks: [
      { t: 'h2', text: 'How the PPF Calculator Works' },
      { t: 'p', html: 'PPF interest is compounded annually at the prevailing government rate — currently <strong>7.1% per annum</strong> (as of 2026; the rate is revised quarterly by the government). The calculator compounds each year\u2019s deposit for the remaining tenure: <strong>Maturity = Σ deposit<sub>year</sub> × (1.071)<sup>years remaining</sup></strong>. Interest is credited on the lowest balance between the 5th and the end of each month, so depositing <strong>before April 5th</strong> each year earns you the full year\u2019s interest.' },
      { t: 'p', html: 'Key rules baked in: minimum deposit ₹500/year to keep the account active, maximum <strong>₹1.5 lakh per financial year</strong>, and a fixed <strong>15-year tenure</strong> (extendable in 5-year blocks).' },
      { t: 'h2', text: 'Worked Example — ₹1,50,000 Every Year for 15 Years at 7.1%' },
      { t: 'example', title: 'Worked example', html: 'Annual deposit <strong>₹1,50,000</strong> (the maximum), rate <strong>7.1%</strong>, tenure <strong>15 years</strong>. Total deposited = <strong>₹22,50,000</strong>. Compounded maturity ≈ <strong>₹40,68,000</strong> (approximately ₹40.7 lakh). Interest earned ≈ <strong>₹18,18,000</strong> — and every rupee of it is <strong>tax-free</strong>.' },
      { t: 'h2', text: 'The EEE Tax Advantage (FY 2025-26)' },
      { t: 'ul', items: [
        '<strong>Exempt 1 — deposit:</strong> up to ₹1.5 lakh/year qualifies for deduction under Section 80C (old regime). Under the new regime, no deduction — but the remaining benefits still apply.',
        '<strong>Exempt 2 — interest:</strong> the 7.1% interest is fully tax-free in both regimes.',
        '<strong>Exempt 3 — maturity:</strong> the entire maturity amount is tax-free. No other mainstream instrument offers all three.',
        'Compare with an FD: at a 30% slab, a 7% FD nets ~4.9% post-tax, while PPF\u2019s 7.1% stays 7.1%.'
      ] },
      { t: 'p', html: 'One more comparison worth making: EPF gives a similar government-backed rate with employer matching, but it is tied to your salary; NPS can beat PPF on returns over long horizons, but up to 60% of its maturity is taxable on withdrawal patterns differ and 40% must be annuitised. PPF\u2019s unique selling point is the combination of sovereign safety, a fixed 15-year horizon you can plan around, and complete tax exemption at every stage — no other instrument bundles all three.' },
      { t: 'note', title: 'April 5th rule', html: 'PPF interest for a month is calculated on the <strong>lowest balance between the 5th and the last day</strong> of the month. Deposit your yearly contribution before April 5th to earn interest on it for all 12 months — missing this date by a week costs you a full month\u2019s interest every year.' },
      { t: 'h3', text: 'Practical Tips' },
      { t: 'ul', items: [
        'Use PPF for the debt portion of long-term goals like retirement — it is sovereign-backed and tax-free.',
        'Partial withdrawals are allowed from the 7th year, and loans from the 3rd year — but let it compound untouched if you can.',
        'You can extend in 5-year blocks after 15 years, with or without fresh deposits, to keep the tax-free compounding running.'
      ] },
      { t: 'cta', title: 'Comparing 80C options?', text: 'ELSS can beat PPF on returns but not on safety or tax certainty. Understand the trade-off.', label: 'Read: PPF vs ELSS vs NPS', to: '/calculators/ppf-calculator' }
    ],
    faqs: [
      { q: 'What is the current PPF interest rate?', a: '7.1% per annum as of 2026. The government revises small-savings rates every quarter, so the rate can change — the calculator uses the rate you enter.' },
      { q: 'What does EEE mean for PPF?', a: 'Exempt-Exempt-Exempt: your deposit qualifies for 80C deduction (old regime), the interest earned is tax-free, and the maturity amount is tax-free.' },
      { q: 'What is the maximum I can deposit in PPF per year?', a: '₹1.5 lakh per financial year across all your PPF accounts. The minimum is ₹500 per year to keep the account active.' },
      { q: 'Can I withdraw from PPF before 15 years?', a: 'Partial withdrawals are allowed from the 7th financial year (one per year, capped), loans from the 3rd year, and premature closure is permitted after 5 years only on specific grounds like medical emergency or higher education, with a 1% interest penalty.' },
      { q: 'Is PPF better than an FD?', a: 'For long-term goals, usually yes: the rate is comparable but PPF interest and maturity are tax-free, while FD interest is taxed at your slab. FDs win on liquidity and short tenures.' }
    ],
    relatedPosts: [
      { slug: 'ppf-vs-elss-vs-nps-80c-tax-saving', title: 'PPF vs ELSS vs NPS: Which 80C Option Wins?' },
      { slug: 'retirement-corpus-india-50', title: 'Building a Retirement Corpus in India After 50' },
      { slug: 'elss-explained-tax-saving', title: 'ELSS Explained: Tax Saving with Equity Investing' }
    ]
  },
  {
    id: 'emi',
    slug: 'emi-calculator',
    name: 'EMI Calculator',
    tagline: 'Know your exact loan EMI — and the true cost of borrowing.',
    title: 'EMI Calculator — Home & Personal Loan EMI | Srot Finance',
    description: 'Free EMI calculator: compute your home, car or personal loan EMI instantly. See total interest, amortisation, and how prepayments slash your loan cost.',
    path: '/calculators/emi-calculator',
    h1: 'EMI Calculator — Your Loan\u2019s Real Cost, Down to the Rupee',
    intro: 'Your EMI is not just a monthly bill — it is a 10 or 20-year commitment where interest can rival the principal. Our EMI calculator shows your exact monthly instalment, the total interest you will pay, and how the balance shrinks over time. Use it before signing any loan, and again before making a prepayment, to see how much interest you can wipe out.',
    blocks: [
      { t: 'h2', text: 'How the EMI Calculator Works' },
      { t: 'p', html: 'The EMI formula spreads principal plus interest into equal monthly payments: <strong>EMI = P × r × (1+r)<sup>n</sup> / ((1+r)<sup>n</sup> − 1)</strong>, where <strong>P</strong> is the loan amount, <strong>r</strong> is the monthly interest rate (annual rate ÷ 12 ÷ 100), and <strong>n</strong> is the number of monthly instalments. Early EMIs are mostly interest; the principal portion grows as the balance falls — this is called amortisation.' },
      { t: 'h2', text: 'Worked Example — ₹25 Lakh Home Loan at 9% for 20 Years' },
      { t: 'example', title: 'Worked example', html: 'Loan <strong>P = ₹25,00,000</strong>, rate <strong>9% p.a.</strong> (r = 0.0075/month), tenure <strong>n = 240 months</strong>. EMI = 25,00,000 × 0.0075 × (1.0075)<sup>240</sup> / ((1.0075)<sup>240</sup> − 1) ≈ <strong>₹22,493 per month</strong>. Total paid = ₹22,493 × 240 ≈ <strong>₹53,98,320</strong>; total interest ≈ <strong>₹28,98,320</strong> — more than the loan itself. That is why tenure choice and prepayments matter so much.' },
      { t: 'h2', text: 'The Prepayment Lever' },
      { t: 'p', html: 'One extra EMI per year on the loan above — paid straight against principal — can cut roughly <strong>4–5 years</strong> off the tenure and save over <strong>₹8 lakh</strong> in interest. Because early payments are interest-heavy, every rupee of prepayment in the first half of the loan destroys far more interest than the same rupee later. Check your lender\u2019s prepayment and foreclosure charges first (most floating-rate home loans have none for individuals).' },
      { t: 'h2', text: 'Home Loan Tax Benefits (FY 2025-26)' },
      { t: 'ul', items: [
        '<strong>Section 80C:</strong> principal repayment up to ₹1.5 lakh/year is deductible — but only under the <strong>old regime</strong>.',
        '<strong>Section 24(b):</strong> interest up to ₹2 lakh/year deductible for a self-occupied house — again, <strong>old regime only</strong>.',
        '<strong>New regime:</strong> the default regime for FY 2025-26 offers almost no home-loan deductions, so compare regimes before assuming the tax benefit.',
        'Personal and car loan EMIs get no such deductions — that makes prepaying them (after high-interest debt) attractive.'
      ] },
      { t: 'h3', text: 'Practical Tips' },
      { t: 'ul', items: [
        'Keep total EMIs under <strong>40% of take-home pay</strong>; lenders get nervous beyond 50%.',
        'Choose the shortest tenure whose EMI you can comfortably afford — a 15-year loan at 9% costs dramatically less interest than a 20-year one.',
        'When rates fall, ask for a rate reset or balance transfer instead of just enjoying a longer tenure at the same EMI.'
      ] },
      { t: 'cta', title: 'Saving while you borrow?', text: 'Your emergency fund should cover 6 months of EMIs. Check if yours is big enough.', label: 'Build an Emergency Fund Plan', to: '/calculators/interest-calculator' }
    ],
    faqs: [
      { q: 'What is the EMI formula?', a: 'EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly instalments.' },
      { q: 'Why is my first EMI mostly interest?', a: 'Interest is charged on the outstanding balance, which is largest at the start. As you repay principal, the interest portion of each EMI shrinks and the principal portion grows.' },
      { q: 'Does one extra EMI per year really help?', a: 'Yes. On a typical 20-year home loan, one extra EMI per year against principal can cut 4–5 years off the tenure and save lakhs in interest, because early principal payments kill the most interest.' },
      { q: 'What tax benefits do home loans get?', a: 'Under the old regime: up to ₹1.5 lakh/year principal deduction under 80C and up to ₹2 lakh/year interest deduction under 24(b) for self-occupied property. The new default regime offers neither.' },
      { q: 'Is it better to prepay or invest the surplus?', a: 'Compare post-tax returns. If your investments reliably earn more than the loan\u2019s post-tax cost, investing can win — but prepaying is a guaranteed, risk-free return equal to your loan rate. Many borrowers split the surplus between both.' }
    ],
    relatedPosts: [
      { slug: 'home-loan-emi-extra-emi-per-year', title: 'Home Loan Hack: What One Extra EMI Per Year Does' },
      { slug: 'emergency-fund-how-much-india', title: 'Emergency Fund: How Much Should You Keep in India?' },
      { slug: '50-30-20-budget-rule-india', title: 'The 50-30-20 Budget Rule, Adapted for India' }
    ]
  },
  {
    id: 'interest',
    slug: 'interest-calculator',
    name: 'Interest Calculator',
    tagline: 'Simple interest on loans, deposits and dues — in seconds.',
    title: 'Interest Calculator — Simple Interest Online | Srot Finance',
    description: 'Free simple interest calculator: compute SI = P×R×T/100 on any loan or deposit. Instant interest amount and total payable for Indian borrowers.',
    path: '/calculators/interest-calculator',
    h1: 'Interest Calculator — Simple Interest, Explained and Computed',
    intro: 'Not every interest calculation needs compounding. Personal loans from family, short-term borrowings, late-payment dues and many informal arrangements use simple interest — a flat rate on the original principal. Enter principal, annual rate and time to get the interest amount and the total payable instantly.',
    blocks: [
      { t: 'h2', text: 'How the Interest Calculator Works' },
      { t: 'p', html: 'Simple interest never compounds: <strong>SI = P × R × T / 100</strong>, where <strong>P</strong> is the principal, <strong>R</strong> is the annual rate in percent, and <strong>T</strong> is the time in years. Total payable = <strong>P + SI</strong>. The monthly equivalent is simply SI ÷ (T × 12). Because interest does not earn interest, simple-interest loans are cheaper than compound-interest loans at the same headline rate over long periods.' },
      { t: 'p', html: 'Where you will meet it: loans between family members, employer advances, chit funds and committee savings, penalty interest on delayed payments, and interest on some short-term business credit.' },
      { t: 'h2', text: 'Worked Example — ₹50,000 at 10% for 3 Years' },
      { t: 'example', title: 'Worked example', html: 'Principal <strong>P = ₹50,000</strong>, rate <strong>R = 10% p.a.</strong>, time <strong>T = 3 years</strong>. SI = 50,000 × 10 × 3 / 100 = <strong>₹15,000</strong>. Total payable = <strong>₹65,000</strong>, or about ₹1,806 per month over 36 months.' },
      { t: 'h2', text: 'Simple vs Compound — Why It Matters' },
      { t: 'table', head: ['Feature', 'Simple interest', 'Compound interest'], rows: [
        ['Interest base', 'Original principal only', 'Principal + accumulated interest'],
        ['Growth', 'Linear', 'Exponential'],
        ['Typical use', 'Short-term/personal loans', 'FDs, PPF, home loans, credit cards'],
        ['₹1L @10% for 10 yrs', '₹1,00,000 interest', '₹1,59,374 interest']
      ] },
      { t: 'p', html: 'Notice the last row: over 10 years, compounding earns nearly 60% more interest on the same rate. Always check whether a quoted rate is simple or compound — and for borrowing, prefer simple; for investing, prefer compound.' },
      { t: 'p', html: 'A useful mental check: for <em>compound</em> growth, the Rule of 72 estimates doubling time as 72 ÷ rate — but for simple interest, doubling takes a flat 100 ÷ rate (10 years at 10%), because interest never starts earning its own interest. That gap is itself a good intuition pump for why compounding dominates over long periods, and why you should always confirm which method a quoted rate uses before signing anything.' },
      { t: 'h3', text: 'Practical Tips' },
      { t: 'ul', items: [
        'Get the rate type in writing for informal loans — "10%" means little until everyone agrees simple vs compound.',
        'For late-payment penalties, compute the daily rate (annual ÷ 365) to check whether the penalty is reasonable.',
        'If you are lending to family, a written note with principal, rate, tenure and SI keeps relationships clean.'
      ] },
      { t: 'cta', title: 'Borrowing formally from a bank?', text: 'Bank loans compound monthly and need the full EMI picture, not just simple interest.', label: 'Try the EMI Calculator', to: '/calculators/emi-calculator' }
    ],
    faqs: [
      { q: 'What is the simple interest formula?', a: 'SI = P × R × T / 100, where P is principal, R is the annual rate in percent, and T is time in years. Total amount = P + SI.' },
      { q: 'When is simple interest used instead of compound?', a: 'For short-term and informal arrangements: family loans, employer advances, chit funds, late-payment penalties, and some business credit. Banks use compound interest for FDs and loans.' },
      { q: 'How do I convert an annual rate to a monthly figure?', a: 'For simple interest, divide the total interest by the number of months. For a ₹15,000 interest over 36 months, that is about ₹417/month in interest, plus principal repayment.' },
      { q: 'Is simple interest better for borrowers?', a: 'Yes — at the same headline rate and tenure, simple interest costs less than compound interest because interest never earns interest. The gap widens with longer tenures.' },
      { q: 'Can I use this for credit card dues?', a: 'Credit cards compound monthly at very high rates (often 3–4% per month), so simple interest will understate the cost. Use it only as a rough floor, and clear card dues in full whenever possible.' }
    ],
    relatedPosts: [
      { slug: '50-30-20-budget-rule-india', title: 'The 50-30-20 Budget Rule, Adapted for India' },
      { slug: 'money-leaks-monthly-budget-fix', title: 'Find and Fix the Money Leaks in Your Monthly Budget' },
      { slug: 'emergency-fund-how-much-india', title: 'Emergency Fund: How Much Should You Keep in India?' }
    ]
  },
  {
    id: 'age',
    slug: 'age-calculator',
    name: 'Age Calculator',
    tagline: 'Your exact age in years, months and days — plus the day you were born.',
    title: 'Age Calculator — Exact Age in Years, Months | Srot Finance',
    description: 'Free age calculator: find your exact age in years, months and days, the weekday you were born, and a countdown to your next birthday.',
    path: '/calculators/age-calculator',
    h1: 'Age Calculator — Your Exact Age, Down to the Day',
    intro: 'How old are you, exactly? Not "32", but 32 years, 4 months and 17 days — born on a Tuesday, with 214 days to your next birthday. Our age calculator turns your date of birth into a precise breakdown, shows the day of the week you were born, and counts down to your next birthday. Useful for forms, insurance, retirement planning and pure curiosity.',
    blocks: [
      { t: 'h2', text: 'How the Age Calculator Works' },
      { t: 'p', html: 'Enter your date of birth (and optionally a "calculate age as of" date). The calculator computes the calendar difference — borrowing months and days correctly across month lengths and leap years — to give your age as <strong>years, months and days</strong>. It also derives the <strong>weekday of your birth</strong> from the calendar, your <strong>total days lived</strong>, and the <strong>days remaining until your next birthday</strong>.' },
      { t: 'p', html: 'Leap years are handled properly: someone born on 29 February ages normally, with birthdays observed on 28 February or 1 March in non-leap years depending on convention.' },
      { t: 'p', html: 'Beyond curiosity, the exact day count feeds directly into planning math. Term-insurance quotes, NPS contribution schedules, and EPF interest credits all run on precise dates, not rounded years. A retirement projection that assumes "30 years" when you actually have 31 years and 4 months understates your compounding runway by more than 4% — on a ₹2 crore target, that is an ₹8+ lakh planning error. Precision here is free, so use it.' },
      { t: 'h2', text: 'Worked Example' },
      { t: 'example', title: 'Worked example', html: 'Born <strong>15 August 1994</strong> (a Monday). As of <strong>2 October 2026</strong>, the calculator shows <strong>32 years, 1 month and 17 days</strong> — that is <strong>11,731 days lived</strong>. The next birthday (15 August 2027) is <strong>317 days away</strong>.' },
      { t: 'h2', text: 'Why Exact Age Matters in Personal Finance' },
      { t: 'ul', items: [
        '<strong>Insurance premiums</strong> are priced by exact age — crossing into the next age band can raise term-insurance quotes noticeably.',
        '<strong>Retirement planning</strong> needs your precise horizon: 32 years and 2 months to retirement compounds very differently from "about 30 years".',
        '<strong>PPF, NPS and EPF</strong> withdrawals, and senior-citizen benefits (higher FD rates, 80TTB, higher basic exemption), all trigger at exact ages.',
        '<strong>Loan eligibility:</strong> lenders check age at loan maturity — most want the loan closed by 60–65.'
      ] },
      { t: 'h3', text: 'Practical Tips' },
      { t: 'ul', items: [
        'Use the "as of" date to check your age on a future policy start date or loan maturity date.',
        'Buying term insurance? Every birthday can bump your premium — apply before, not after.',
        'NPS and retirement corpus math both start from your exact age today; plug it into a SIP projection for an honest target.'
      ] },
      { t: 'cta', title: 'Know your horizon? Plan the corpus.', text: 'Your exact years-to-retirement is the key input for building a retirement corpus.', label: 'Project with the SIP Calculator', to: '/calculators/sip-calculator' }
    ],
    faqs: [
      { q: 'How is exact age calculated?', a: 'By calendar subtraction: full years first, then remaining months, then days — correctly accounting for different month lengths and leap years. It is the same method official documents use.' },
      { q: 'How do you know what weekday I was born on?', a: 'The weekday is derived mathematically from your date of birth using the calendar — no database lookup needed. It works for any date in the Gregorian calendar.' },
      { q: 'What about people born on 29 February?', a: 'Age accrues normally; in non-leap years the birthday is observed on 28 February or 1 March by convention. The day count stays exact either way.' },
      { q: 'Can I calculate age as of a future date?', a: 'Yes — set the "as of" date to a policy start date, exam eligibility cutoff, or loan maturity date to see exactly how old you will be then.' },
      { q: 'Why does exact age matter for insurance?', a: 'Term and health insurance premiums are banded by age. Being 35 years and 11 months vs 36 years and 1 month can put you in different pricing bands, so timing an application before a birthday can save money.' }
    ],
    relatedPosts: [
      { slug: 'retirement-corpus-india-50', title: 'Building a Retirement Corpus in India After 50' },
      { slug: 'money-leaks-monthly-budget-fix', title: 'Find and Fix the Money Leaks in Your Monthly Budget' },
      { slug: '50-30-20-budget-rule-india', title: 'The 50-30-20 Budget Rule, Adapted for India' }
    ]
  }
];
