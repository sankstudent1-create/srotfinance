// Srot Finance blog posts — Indian personal-finance guides with worked math.
// Renderer supports block types: h2, h3, p (html), ul, ol, table, note, example, faq, cta.

export const posts = [
  {
  slug: "rbi-repo-rate-october-2026-emi-impact",
  title: "RBI Repo Rate October 2026: What a Hike to 5.50% Does to Your EMI",
  description: "RBI's MPC hiked the repo rate 25 bps to 5.50% on Oct 7, 2026 — the first increase since February 2023. Here is the exact EMI and FD math under the new rate, and what to do before your loan resets.",
  date: "2026-10-06",
  updated: "2026-10-07",
  author: "Srot Finance Team",
  category: "Interest Rates",
  readMins: 7,
  keywords: ["rbi repo rate october 2026", "rbi mpc meeting october 2026", "repo rate hike emi impact", "emi increase calculator", "fd rates after repo hike"],
  calculatorLink: "/calculators/emi-calculator",
  calculatorName: "EMI Calculator",
  blocks: [
    { t: "h2", text: "The short answer" },
    { t: "p", html: "<strong>Update (Oct 7, 2026):</strong> The RBI hiked the repo rate by 25 bps to <strong>5.50%</strong> — the first increase since February 2023. The EMI numbers below are now live policy: on a ₹50 lakh home loan over 20 years, that's roughly <strong>₹795 extra per month</strong>. The RBI's six-member Monetary Policy Committee <strong>met October 5–7 and hiked the repo rate to 5.50% on Wednesday, October 7</strong>. The repo rate has sat at <strong>5.25%</strong> through the last four reviews. This time, most economists expect a <strong>25 basis-point hike to 5.50%</strong> — the first increase since February 2023. On a ₹50 lakh home loan over 20 years, that hike adds roughly <strong>₹795 to your monthly EMI</strong>. Fixed-rate loans do not move; floating-rate loans reset on their review dates, usually with a 1–3 month lag." },
    { t: "h2", text: "Why a hike is on the table" },
    { t: "p", html: "Three forces are pushing the RBI toward a hike. <strong>August CPI inflation hit 4.82%</strong>, above the RBI's 4% medium-term target for the third straight month — and broadening, with nearly half of the CPI basket now running at 4% or more, up from a third in March. The <strong>re-escalation of the West Asia conflict</strong> has pushed up crude oil and commodity prices. And the <strong>rupee has slid about 6% this year</strong>, with global central banks — including the US Fed — raising rates again, pressuring the RBI to defend the currency with a hike of its own." },
    { t: "ul", items: [
      "<strong>Reuters poll (61 economists):</strong> 35 expect a 25 bps hike to 5.50% at this meeting, with another hike likely in December.",
      "<strong>Business Standard poll:</strong> 8 of 10 economists expect the 25 bps increase.",
      "<strong>Bank economists' poll (businessline):</strong> 11 of the 12 chief economists at major banks expect the hike — the very people who set home-loan rates. Seven expect the RBI to keep a neutral stance; two see a shift to 'withdrawal of accommodation'.",
      "<strong>The dissenters:</strong> some, like L&amp;T's chief economist and Bank of Baroda's Madan Sabnavis, expect the RBI to hold — arguing there is no demand-led inflation or overheating yet.",
      "<strong>This may be just the start:</strong> most bank economists see 50–75 bps of cumulative tightening by the end of FY27 (repo ending at 6.00%), and Bank of America has doubled its call to a full 100 bps cycle — 25 bps in October, 50 bps across Q4 2026, and 50 bps in H1 2027, ending at 6.25%.",
      "<strong>Context:</strong> the RBI cut 125 bps through 2025 (last cut: December 2025 to 5.25%) and has paused through all of 2026 so far."
    ] },
    { t: "h2", text: "The EMI math: what 25 bps actually costs you" },
    { t: "p", html: "A quarter-point sounds small. Over a long tenure it is not. Here is the worked EMI math (EMI = P × r × (1+r)<sup>n</sup> / ((1+r)<sup>n</sup> − 1)) for common loans:" },
    { t: "table", head: ["Loan", "Rate now", "EMI now", "EMI at +25 bps", "Extra per month"], rows: [
      ["₹50 lakh home loan, 20 years", "8.50%", "₹43,391", "₹44,186", "₹795"],
      ["₹30 lakh home loan, 20 years", "9.00%", "₹26,992", "₹27,476", "₹484"],
      ["₹10 lakh personal loan, 5 years", "13.00%", "₹22,753", "₹22,881", "₹128"]
    ] },
    { t: "example", title: "The compounding sting", html: "On the ₹50 lakh loan, that ₹795/month over 20 years is <strong>₹1,90,800 in extra interest</strong> — nearly 4% of the loan amount, paid purely because of a 0.25% rate move. Shorten the tenure by prepaying and most of it disappears; keep the EMI and stretch the tenure and you pay it all." },
    { t: "h2", text: "The other side: FD savers finally get a win" },
    { t: "p", html: "A repo hike is bad news for borrowers and <strong>good news for savers</strong>. Banks typically pass higher policy rates to deposit rates within weeks. If you have been waiting to lock in an FD, a hike is your cue: long-tenure FDs booked right after a hike capture the higher rate for years. Ladder across 1, 3 and 5-year tenures instead of betting everything on one maturity." },
    { t: "cta", title: "Check your FD options", text: "See what your deposit earns at today's rates — then compare again after October 7.", label: "Open FD Calculator", to: "/calculators/fd-calculator" },
    { t: "h2", text: "What to do before your loan resets" },
    { t: "ul", items: [
      "<strong>Floating-rate borrowers:</strong> your EMI changes only on the loan's reset date — check whether yours is 3, 6 or 12 months away. The hike reaches you with a lag, so you have time to act.",
      "<strong>Prepay into tenure, not EMI.</strong> When you prepay, ask the bank to reduce the tenure and keep the EMI. On long loans this saves far more interest than lowering the EMI.",
      "<strong>Check your spread.</strong> Banks add their own margin over the repo-linked rate. If your spread looks rich versus current offers, ask for a reset or refinance — a hike meeting is exactly when banks compete for good borrowers.",
      "<strong>Fixed-rate loans:</strong> nothing changes. Your rate is locked for the full tenure.",
      "<strong>New borrowers:</strong> if the hike lands on Oct 7, borrowing gets more expensive from then. Sanctioned-but-undisbursed loans usually move to the new rate — disburse before the reset if you can."
    ] },
    { t: "note", title: "After the decision", html: "This post will be updated on October 7 with the actual RBI decision and revised numbers. Bookmark it — or better, run your own loan through the calculator below with both rate scenarios." },
    { t: "faq", items: [
      { q: "Will my EMI rise immediately if RBI hikes on October 7?", a: "No. Floating-rate home loans reset on fixed review dates (typically every 3, 6 or 12 months), so the hike reaches your EMI with a lag of 1–3 months. Fixed-rate loans never change." },
      { q: "How much does a 25 bps hike add to a home loan EMI?", a: "Roughly ₹795/month on a ₹50 lakh, 20-year loan at 8.50%, and about ₹484/month on a ₹30 lakh loan at 9.00%. The longer your tenure, the larger the total extra interest." },
      { q: "Is a repo rate hike good for FD investors?", a: "Yes. Banks usually raise FD rates within weeks of a repo hike. It is a good time to lock in longer-tenure FDs at the higher rate." },
      { q: "Should I prepay my home loan before the hike?", a: "Prepaying always helps, but the hike itself is not a deadline — your reset date is. When you prepay, reduce the tenure rather than the EMI to maximise interest saved." },
      { q: "What is the current repo rate?", a: "5.50%, after the RBI's 25 bps hike on October 7, 2026 — the first increase since February 2023." }
    ] },
    { t: "cta", title: "Run your own numbers", text: "Plug in your loan amount, rate and tenure to see your exact EMI — then add 0.25% to preview the hike.", label: "Open EMI Calculator", to: "/calculators/emi-calculator" }
  ]
},
  {
    slug: "sip-calculator-how-much-5000-month-10-years",
    title: "SIP Calculator: What ₹5,000/Month Becomes in 10 Years",
    description: "How much does a ₹5,000 monthly SIP grow to in 10 years? Worked math at 8–15% returns, year-by-year table, LTCG tax rules and calculator tips.",
    date: "2026-10-03",
    updated: "2026-10-03",
    author: "Srot Finance Team",
    category: "Investing",
    readMins: 8,
    keywords: ["sip calculator", "sip returns", "5000 sip 10 years", "sip investment", "mutual fund sip india"],
    calculatorLink: "/calculators/sip-calculator",
    calculatorName: "SIP Calculator",
    blocks: [
      { t: "h2", text: "The short answer" },
      { t: "p", html: "A <strong>₹5,000 monthly SIP for 10 years at 12% annual returns grows to roughly ₹11.6 lakh</strong>. You invest ₹6,00,000 of your own money; compounding adds about ₹5.6 lakh on top. That is the number most Indian investors are really asking for when they open a <a href=\"/calculators/sip-calculator\">SIP calculator</a> — and this post shows exactly how it is computed, what changes it, and what the taxman takes at the end." },
      { t: "example", title: "The math, step by step", html: "SIP future value uses the annuity formula:<br><strong>FV = P × [((1 + i)<sup>n</sup> − 1) / i] × (1 + i)</strong><br>Here P = ₹5,000, i = 12%/12 = 1% per month, n = 120 months.<br>(1.01)<sup>120</sup> = 3.3004, so FV = 5,000 × 230.04 × 1.01 = <strong>₹11,61,695</strong>.<br>Invested: ₹6,00,000. Gains: ₹5,61,695. That is 93% of your contributions earned back as growth — the quiet power of staying invested for a full decade." },
      { t: "h2", text: "Year-by-year growth at 12%" },
      { t: "p", html: "Compounding looks boring for the first three years and then starts doing the heavy lifting. Notice how gains overtake your yearly contributions around year 7:" },
      { t: "table", head: ["Year", "You invested", "Value at 12%", "Gains"], rows: [
        ["1", "₹60,000", "₹64,047", "₹4,047"],
        ["3", "₹1,80,000", "₹2,17,538", "₹37,538"],
        ["5", "₹3,00,000", "₹4,12,431", "₹1,12,431"],
        ["7", "₹4,20,000", "₹6,59,895", "₹2,39,895"],
        ["10", "₹6,00,000", "₹11,61,695", "₹5,61,695"]
      ] },
      { t: "h2", text: "What if returns are 8%, 10% or 15%?" },
      { t: "p", html: "Nobody gets a smooth 12% every year. Equity SIPs in India have historically delivered 10–14% over long periods, but your actual outcome depends on entry and exit timing. Here is the same ₹5,000 SIP across return scenarios:" },
      { t: "table", head: ["Annual return", "Value after 10 years", "Gains"], rows: [
        ["8%", "₹9,20,828", "₹3,20,828"],
        ["10%", "₹10,32,760", "₹4,32,760"],
        ["12%", "₹11,61,695", "₹5,61,695"],
        ["15%", "₹13,93,286", "₹7,93,286"]
      ] },
      { t: "p", html: "The gap between 10% and 12% is nearly ₹1.3 lakh — which is why fund selection and, more importantly, <em>not stopping the SIP in a downturn</em> matter far more than timing the perfect entry." },
      { t: "h2", text: "Three levers that change the number more than you think" },
      { t: "ul", items: [
        "<strong>Tenure beats timing.</strong> Extending this SIP to 15 years at 12% takes it to roughly ₹24.9 lakh on ₹9 lakh invested. Every extra year matters more than the last.",
        "<strong>A yearly step-up is a cheat code.</strong> Raising the SIP 10% each year turns a ₹10,000 SIP over 15 years from ₹50.5 lakh into ₹91.7 lakh. We worked the full comparison in <a href=\"/blog/step-up-sip-10-percent-annual-hike\">our step-up SIP guide</a>.",
        "<strong>Costs and gaps leak returns.</strong> A 1% higher expense ratio or pausing the SIP for 6 months during a correction quietly shaves lakhs off the final figure. Automate the debit and forget it."
      ] },
      { t: "h2", text: "Taxes: what you actually keep" },
      { t: "p", html: "Equity mutual fund gains held over 12 months face <strong>LTCG tax of 12.5% on gains above ₹1.25 lakh per financial year</strong> (FY 2025-26 rules). On our ₹5.6 lakh gain, roughly ₹4.37 lakh is taxable after the exemption — about ₹54,600 in tax if redeemed in one year. Spreading redemption across two financial years can use the ₹1.25 lakh exemption twice. Gains withdrawn within 12 months face 20% STCG instead, which is why SIPs should be treated as long-term money." },
      { t: "note", title: "A realistic expectation", html: "Treat 10–12% as a planning assumption, not a promise. Run the <a href=\"/calculators/sip-calculator\">SIP calculator</a> at 10% for a conservative plan and 12% for your base case. If the conservative number still meets your goal, your plan is robust." },
      { t: "h2", text: "How to use the SIP calculator properly" },
      { t: "p", html: "Most people type one set of numbers, see a big corpus, and stop. Run three scenarios instead: a conservative 10%, a base 12%, and your goal's required return worked backwards. If the 10% scenario still funds the goal, the plan survives a bad decade. Also test tenure — adding two years often beats chasing two extra percentage points of return, with far less risk." },
      { t: "ul", items: [
        "<strong>Enter the real monthly amount</strong> you can sustain on your worst month, not your best — consistency beats ambition.",
        "<strong>Use XIRR thinking:</strong> the calculator shows point-to-point returns; real SIPs earn the internal rate across uneven markets, so treat the output as a centre line, not a promise.",
        "<strong>Revisit yearly:</strong> bump the amount with every salary hike and the 10-year number in this post starts looking like the floor, not the ceiling."
      ] },
      { t: "faq", items: [
        { q: "Is ₹5,000 per month enough for a SIP?", a: "It is an excellent starting point. ₹5,000/month for 10 years at 12% builds about ₹11.6 lakh, and the habit matters more than the amount. Increase it 10% yearly as your salary grows and the same SIP can cross ₹20 lakh." },
        { q: "What is a good return assumption for a SIP calculator?", a: "For equity SIPs over 10+ years, 10–12% is the standard planning range in India. Use 10% for conservative planning and 12% as the base case. For goals under 5 years, use debt-fund assumptions of 6–7% instead." },
        { q: "Are SIP returns taxable in India?", a: "Yes. Equity fund gains held over 12 months are taxed as LTCG at 12.5% above the ₹1.25 lakh annual exemption. Gains within 12 months are taxed at 20% STCG." },
        { q: "Should I pause my SIP when markets fall?", a: "No — downturns are when SIPs buy the most units per rupee, which is exactly what powers long-term returns. Pausing during corrections is the single most common way investors sabotage their own SIP math." },
        { q: "SIP or lump sum — which grows more?", a: "Lump sum wins if markets rise steadily from day one, but SIP wins on risk-adjusted discipline for salaried investors. Most people do not have ₹6 lakh idle, which makes the SIP the practical choice." }
      ] },
      { t: "cta", title: "Run your own numbers", text: "Plug in your monthly amount, expected return and tenure to see your projected corpus instantly.", label: "Open SIP Calculator", to: "/calculators/sip-calculator" }
    ]
  },
  {
    slug: "ppf-vs-elss-vs-nps-80c-tax-saving",
    title: "PPF vs ELSS vs NPS: Best 80C Tax-Saving Option in 2026?",
    description: "Compare PPF, ELSS and NPS on returns, lock-in, liquidity and post-tax gains. ₹1.5L/year for 15 years worked out, plus old vs new regime guidance.",
    date: "2026-10-04",
    updated: "2026-10-04",
    author: "Srot Finance Team",
    category: "Tax Saving",
    readMins: 8,
    keywords: ["ppf vs elss", "nps vs ppf", "80c tax saving", "best tax saving investment india", "elss vs ppf returns"],
    calculatorLink: "/calculators/ppf-calculator",
    calculatorName: "PPF Calculator",
    blocks: [
      { t: "h2", text: "The 15-year math: ₹1.5 lakh a year" },
      { t: "p", html: "Section 80C lets you deduct up to <strong>₹1.5 lakh per year</strong> (FY 2025-26) — but only if you file under the <strong>old tax regime</strong>. The three heavyweights competing for that ₹1.5 lakh are PPF, ELSS and NPS. Here is what ₹1.5 lakh invested at the start of each year for 15 years becomes in each:" },
      { t: "table", head: ["Option", "Assumed return", "Value after 15 years", "Tax on withdrawal"], rows: [
        ["PPF", "7.1% (govt-fixed)", "₹37.99 lakh", "Fully tax-free (EEE)"],
        ["ELSS", "12% (market-linked)", "₹55.92 lakh", "LTCG 12.5% above ₹1.25L/yr"],
        ["NPS", "10% (blended)", "₹47.66 lakh", "60% lump sum tax-free; 40% annuity taxable"]
      ] },
      { t: "p", html: "On paper, ELSS wins by a wide margin — roughly ₹18 lakh more than PPF. But the table hides three things that matter: risk, lock-in and liquidity. PPF's 7.1% is sovereign-guaranteed and tax-free at every stage; ELSS's 12% is a hope, not a promise. Run your own PPF projections with the <a href=\"/calculators/ppf-calculator\">PPF calculator</a> before deciding." },
      { t: "example", title: "Post-tax reality check on ELSS", html: "ELSS value after 15 years: ₹55.92 lakh. Invested: ₹22.5 lakh. Gain: ₹33.42 lakh. If you redeem it all in one financial year, LTCG applies to gains above ₹1.25 lakh: 12.5% × ₹32.17 lakh ≈ <strong>₹4.02 lakh tax</strong>, leaving ~₹51.9 lakh. Still well ahead of PPF — but spread the redemption across financial years and you keep more of it." },
      { t: "h2", text: "Head-to-head comparison" },
      { t: "table", head: ["Feature", "PPF", "ELSS", "NPS"], rows: [
        ["Lock-in", "15 years", "3 years (per instalment)", "Till age 60"],
        ["Liquidity", "Partial withdrawal from year 7", "Full exit after 3 years", "Very restricted"],
        ["Risk", "Zero (govt-backed)", "High (equity)", "Moderate (auto asset mix)"],
        ["80C deduction", "Yes, up to ₹1.5L", "Yes, up to ₹1.5L", "Yes, plus extra ₹50k under 80CCD(1B)"],
        ["Min. investment", "₹500/year", "₹500 (no upper limit)", "₹1,000/year"],
        ["Best for", "Zero-risk, tax-free compounding", "Wealth creation with tax saving", "Retirement corpus discipline"]
      ] },
      { t: "h2", text: "The regime question: old vs new" },
      { t: "p", html: "This is the decision most articles skip. Under the <strong>new tax regime</strong> (the default since FY 2023-24), there is <strong>no 80C deduction at all</strong> — so PPF, ELSS and NPS lose their upfront tax edge entirely. The math:" },
      { t: "ul", items: [
        "<strong>Old regime + 30% slab:</strong> ₹1.5L in ELSS/PPF saves ~₹46,800 in tax upfront. That is a guaranteed 31% head start on day one.",
        "<strong>New regime:</strong> zero upfront saving. Judge each option purely on post-tax returns and liquidity — ELSS usually still wins for long horizons, PPF for safety.",
        "<strong>NPS bonus:</strong> the extra ₹50,000 deduction under 80CCD(1B) is available in the old regime over and above the ₹1.5L 80C limit — the only one of the three with this perk."
      ] },
      { t: "h2", text: "Who should pick what" },
      { t: "ul", items: [
        "<strong>Pick PPF</strong> if you want guaranteed, tax-free returns and sleep-well money — ideal for the debt portion of your portfolio or if you are close to retirement.",
        "<strong>Pick ELSS</strong> if you are under 45, in the old regime, and can stomach equity volatility for at least 5–7 years. Read our full <a href=\"/blog/elss-explained-tax-saving\">ELSS explained guide</a> for the SIP-vs-lumpsum math.",
        "<strong>Pick NPS</strong> if retirement discipline is your problem — the till-60 lock-in is a feature, not a bug — and you want the extra ₹50k deduction.",
        "<strong>Best of all worlds:</strong> many investors split ₹1.5L as ₹50k PPF + ₹1L ELSS, or add NPS's ₹50k on top. Diversification across tax treatments beats betting on one horse."
      ] },
      { t: "note", title: "Don't invest just for 80C", html: "A tax deduction is a discount, not a reason. ELSS at a 30% loss still beats PPF with a 31% tax saving if held long enough — but buying an unsuitable product in March to save tax is the oldest mistake in Indian personal finance." },
      { t: "h2", text: "A practical allocation for FY 2025-26" },
      { t: "p", html: "If you are in the old regime and under 40, a common split is ₹1,00,000 in ELSS via monthly SIP (₹8,333/month) for growth and ₹50,000 in PPF for the guaranteed, tax-free anchor. Add NPS's extra ₹50,000 under 80CCD(1B) only after the core ₹1.5L is placed — its till-60 lock-in makes it the last rupee in, not the first. In the new regime, skip the 80C framing entirely and allocate purely on goal horizon: equity funds for 7+ years, PPF or FDs for capital safety." },
      { t: "faq", items: [
        { q: "Which gives higher returns, PPF or ELSS?", a: "Historically ELSS, by a wide margin — 12% vs 7.1% over 15 years turns ₹1.5L/year into ~₹56 lakh vs ~₹38 lakh. But ELSS returns are market-linked and volatile; PPF's are guaranteed and fully tax-free." },
        { q: "Is NPS better than PPF for tax saving?", a: "NPS offers an extra ₹50,000 deduction under 80CCD(1B) beyond 80C, which PPF does not. But NPS locks money till age 60 with mandatory annuity purchase, while PPF matures in 15 years with full tax-free withdrawal." },
        { q: "Can I claim 80C in the new tax regime?", a: "No. The new regime does not allow 80C, 80CCD or most other deductions. If your deductions are small, the new regime's lower slab rates usually still win — compare both before choosing." },
        { q: "Is PPF interest still tax-free?", a: "Yes. PPF enjoys EEE status — exempt on investment (under old regime), exempt on interest accrual, and exempt on withdrawal." },
        { q: "Should I put my entire 80C in ELSS?", a: "Only if you have a 7+ year horizon and can handle equity swings. A common split is part ELSS for growth and part PPF for stability, matched to your age and risk appetite." }
      ] },
      { t: "cta", title: "Project your PPF growth", text: "See what your yearly PPF deposits become over 15, 20 or 25 years at current rates.", label: "Open PPF Calculator", to: "/calculators/ppf-calculator" }
    ]
  },
  {
    slug: "step-up-sip-10-percent-annual-hike",
    title: "Step-Up SIP: Why a 10% Annual Hike Beats a Flat SIP",
    description: "A ₹10,000 SIP with a 10% yearly step-up grows to ₹91.7L vs ₹50.5L flat over 15 years. See the math, comparison tables and how to set one up.",
    date: "2026-10-05",
    updated: "2026-10-05",
    author: "Srot Finance Team",
    category: "Investing",
    readMins: 8,
    keywords: ["step up sip", "sip step up calculator", "annual sip increase", "top up sip", "sip calculator"],
    calculatorLink: "/calculators/sip-calculator",
    calculatorName: "SIP Calculator",
    blocks: [
      { t: "h2", text: "Flat vs step-up: the headline numbers" },
      { t: "p", html: "Take a ₹10,000 monthly SIP at 12% annual returns. Now compare keeping it flat versus raising it 10% every year — roughly matching a typical Indian salary hike:" },
      { t: "table", head: ["Tenure", "Flat ₹10k SIP", "Step-up 10% yearly", "Extra wealth"], rows: [
        ["5 years", "₹8.25 lakh", "₹10.39 lakh", "+₹2.14 lakh"],
        ["10 years", "₹23.23 lakh", "₹35.62 lakh", "+₹12.39 lakh"],
        ["15 years", "₹50.46 lakh", "₹91.67 lakh", "+₹41.21 lakh"]
      ] },
      { t: "p", html: "Over 15 years the step-up SIP builds <strong>82% more wealth</strong> — ₹91.67 lakh versus ₹50.46 lakh. You invest ₹38.1 lakh instead of ₹18 lakh, so part of the gap is just higher contributions. But the real story is that those extra contributions arrive early enough to compound for years." },
      { t: "example", title: "Why early hikes compound hardest", html: "Year 1 extra of ₹12,000 (the first 10% hike on ₹10k/month) compounds at 12% for 14 more years: ₹12,000 × 1.12<sup>14</sup> ≈ <strong>₹58,700</strong>. The same ₹12,000 added in year 14 grows for just 1 year: ≈ ₹13,440. A hike in year 1 is worth <strong>4.4× more</strong> than the same hike in year 14. Start the step-up on day one, not <em>someday</em>." },
      { t: "h2", text: "Match the hike to your salary growth" },
      { t: "p", html: "The 10% figure is not magic — it mirrors average Indian private-sector increments of 8–12%. The rule of thumb: <strong>step up your SIP at the same rate your income grows</strong>. Got a 15% hike? Raise the SIP 15%. This keeps your savings rate constant instead of letting lifestyle inflation eat every raise." },
      { t: "ul", items: [
        "<strong>8–10% step-up:</strong> the safe default. Barely felt in monthly cash flow, massive over a decade.",
        "<strong>15% step-up:</strong> aggressive but powerful — a ₹10k SIP becomes ~₹1.22L/month by year 18. Only for rapidly rising incomes.",
        "<strong>Fixed-amount step-up:</strong> simpler alternative — add ₹2,000 every year. Less elegant, equally effective.",
        "<strong>Bonus investing:</strong> route annual bonuses as lump sums alongside the step-up. One ₹1L bonus invested yearly at 12% for 15 years adds ~₹37 lakh."
      ] },
      { t: "h2", text: "How to actually set one up" },
      { t: "ol", items: [
        "<strong>Check your fund house's option:</strong> most AMCs (HDFC, ICICI, SBI, Parag Parikh) offer a <em>SIP Top-up</em> or <em>Step-up</em> facility when registering the SIP — set the percentage and frequency once.",
        "<strong>Pick annual frequency:</strong> yearly step-ups aligned with your appraisal cycle are easiest to sustain.",
        "<strong>Set a cap if offered:</strong> some platforms let you cap the maximum monthly amount so a decade of hikes never exceeds your budget.",
        "<strong>Review yearly, don't micro-manage:</strong> if income stalls, pause the hike — never the SIP itself. See our <a href=\"/blog/sip-calculator-how-much-5000-month-10-years\">₹5,000 SIP breakdown</a> for why stopping is the costliest move."
      ] },
      { t: "note", title: "The one risk", html: "A step-up SIP assumes rising income. If you switch to a lower-paying role or freelancing, reduce the hike to 0% rather than stopping the SIP. Consistency of the base amount matters more than the growth rate of the top-up." },
      { t: "h2", text: "Model it before you commit" },
      { t: "p", html: "The <a href=\"/calculators/sip-calculator\">SIP calculator</a> lets you sanity-check any step-up plan in seconds: run your current SIP flat, then re-run with the hiked amount you expect in year 3 or 5 to bracket the outcome. Two scenarios worth testing are a 10% step-up at 12% returns (the optimistic case above) and the same step-up at 10% returns — if the conservative run still hits your goal, the plan is robust to a mediocre market decade." },
      { t: "ul", items: [
        "<strong>Salary hike season:</strong> the week your increment letter arrives, raise the SIP before lifestyle absorbs the raise. Automation beats willpower.",
        "<strong>Job change:</strong> carry the step-up habit to the new salary — reset the base higher rather than restarting small.",
        "<strong>Windfalls:</strong> bonuses and arrears make excellent one-time top-ups alongside the annual hike; they compound from the earliest possible date."
      ] },
      { t: "faq", items: [
        { q: "What is a step-up SIP?", a: "A SIP where the monthly amount automatically increases by a fixed percentage or amount at set intervals — typically 10% every year — so your investments grow alongside your income." },
        { q: "Is 10% annual step-up too aggressive?", a: "For most salaried Indians with 8–12% annual increments, 10% is comfortable because the hike is funded by the raise itself. If increments are uncertain, start with 5%." },
        { q: "Can I add step-up to an existing SIP?", a: "Usually not mid-way — most AMCs require step-up to be set at SIP registration. The workaround is to start a second SIP for the incremental amount each year, or cancel and re-register with top-up enabled." },
        { q: "Does step-up SIP beat a higher flat SIP?", a: "A flat ₹15,000 SIP beats a ₹10,000 SIP with 10% step-up for the first ~7 years, but the step-up overtakes it after that because later contributions are much larger. Either way, both crush a flat ₹10,000 SIP." },
        { q: "What happens if I can't afford the hiked amount?", a: "Most platforms let you modify or pause the top-up without touching the base SIP. Drop the hike to zero for a year — protecting the base SIP is the priority." }
      ] },
      { t: "cta", title: "Model your step-up", text: "Use the SIP calculator to compare flat vs stepped-up contributions for your own monthly amount and tenure.", label: "Open SIP Calculator", to: "/calculators/sip-calculator" }
    ]
  },
  {
    slug: "emergency-fund-how-much-india",
    title: "Emergency Fund: How Much Do You Really Need in India?",
    description: "The 3-6-12 month rule explained by job type: salaried, freelancer, business owner. Where to park it, with worked examples for Indian households.",
    date: "2026-10-06",
    updated: "2026-10-06",
    author: "Srot Finance Team",
    category: "Budgeting",
    readMins: 8,
    keywords: ["emergency fund india", "how much emergency fund", "emergency fund calculator", "contingency fund", "liquid fund vs fd"],
    calculatorLink: "/calculators/fd-calculator",
    calculatorName: "FD Calculator",
    blocks: [
      { t: "h2", text: "The 3/6/12-month rule" },
      { t: "p", html: "An emergency fund is <strong>3 to 12 months of essential expenses</strong> kept liquid and separate from investments. The exact number depends on how stable your income is — a government employee and a freelance designer face very different risks:" },
      { t: "table", head: ["Your situation", "Recommended cover", "Why"], rows: [
        ["Salaried, dual-income household", "3–6 months", "Second income is a built-in shock absorber"],
        ["Salaried, single income", "6 months", "One job loss = zero household income"],
        ["Freelancer / gig worker", "9 months", "Irregular income + no paid leave or severance"],
        ["Business owner / self-employed", "9–12 months", "Revenue swings + personal guarantees on loans"],
        ["Single income + dependents + home loan", "12 months", "Fixed EMIs continue even when income stops"]
      ] },
      { t: "h2", text: "Do the math for your household" },
      { t: "p", html: "Count <strong>essential</strong> monthly expenses: rent/EMI, groceries, utilities, school fees, insurance premiums, transport and minimum debt payments. Exclude dining out, shopping and vacations — in a true emergency those stop. Then multiply:" },
      { t: "example", title: "Worked example: the Sharma household", html: "Monthly essentials: home loan EMI ₹28,000 + groceries ₹15,000 + school fees ₹12,000 + utilities/transport ₹12,000 + insurance ₹8,000 = <strong>₹75,000/month</strong>.<br>Single-income family → 6-month rule → target = 6 × ₹75,000 = <strong>₹4.5 lakh</strong>.<br>They currently have ₹1.2 lakh saved → shortfall ₹3.3 lakh → saving ₹27,500/month closes the gap in 12 months." },
      { t: "table", head: ["Monthly essentials", "3 months", "6 months", "12 months"], rows: [
        ["₹40,000", "₹1.2 lakh", "₹2.4 lakh", "₹4.8 lakh"],
        ["₹75,000", "₹2.25 lakh", "₹4.5 lakh", "₹9 lakh"],
        ["₹1,50,000", "₹4.5 lakh", "₹9 lakh", "₹18 lakh"]
      ] },
      { t: "h2", text: "Where to park it (and where not to)" },
      { t: "ul", items: [
        "<strong>Sweep-in FD (40–50%):</strong> auto-sweep savings accounts or short FDs earn ~6.5–7% while staying withdrawable. Use the <a href=\"/calculators/fd-calculator\">FD calculator</a> to see what your parked amount earns.",
        "<strong>Liquid / overnight mutual funds (40–50%):</strong> redeemable in 1 working day, returns slightly above savings accounts, no lock-in.",
        "<strong>Savings account (1 month of expenses):</strong> instant access for the first 48 hours of any crisis.",
        "<strong>Never in:</strong> equity funds (can be down 20% exactly when you lose your job), PPF/ELSS (locked in), or <em>invested</em> FDs you would break at a penalty."
      ] },
      { t: "note", title: "Keep it boring on purpose", html: "An emergency fund is insurance, not an investment. If it earns 7% instead of 12%, that is fine — its job is to be there on the worst day of your financial life, not to grow." },
      { t: "h2", text: "Build it in 6 steps" },
      { t: "ol", items: [
        "Calculate your monthly essentials honestly — most people underestimate by 20%.",
        "Pick your cover level from the table above based on income stability.",
        "Open a <strong>separate</strong> savings account or liquid fund labelled <em>Emergency</em> — separation prevents accidental spending.",
        "Automate a monthly transfer on salary day until the target is hit.",
        "Revisit yearly: a new EMI, a child, or a job change resets the target.",
        "Replenish immediately after any withdrawal — treat it like a loan to yourself."
      ] },
      { t: "p", html: "Once the fund is full, redirect that monthly amount into long-term investing. A good next step is structuring the rest of your budget — our <a href=\"/blog/50-30-20-budget-rule-india\">50/30/20 budget guide</a> shows exactly how at Indian salary levels." },
      { t: "h2", text: "What about gold, chit funds or cash at home?" },
      { t: "p", html: "Gold jewellery is an emergency fund of last resort — selling it in a crisis means distress pricing and making charges lost forever. Chit funds and committees carry default risk exactly when the economy is stressed. Cash at home beyond a week's expenses earns nothing and is unsafe. The sweep-in FD plus liquid fund combination remains the cleanest answer: regulated, liquid within a day, and earning 6.5–7% while it waits." },
      { t: "h2", text: "Rebuilding after you use it" },
      { t: "p", html: "The fund fails most often <em>after</em> it works — you handle the emergency brilliantly, then never refill the account. Treat any withdrawal as a zero-interest loan from your future self: set the SIP back to the emergency account the very next month, before lifestyle spending expands into the gap. Households that automate the rebuild typically restore the fund within 6–9 months; those that <em>plan to rebuild soon</em> often take two years." },
      { t: "faq", items: [
        { q: "Is 6 months of expenses enough for an emergency fund in India?", a: "For a single-income salaried household, 6 months is the standard recommendation. Dual-income families can manage with 3–6 months; freelancers and business owners should target 9–12 months." },
        { q: "Should I count my salary or my expenses?", a: "Always expenses — and only essential ones. A ₹1L salary with ₹60k essential expenses needs a ₹3.6L fund (6 months), not ₹6L." },
        { q: "Can I keep my emergency fund in a fixed deposit?", a: "Yes, sweep-in FDs and short-tenure FDs are ideal: better rates than savings accounts with quick withdrawal. Keep one month of expenses in the savings account itself for instant access." },
        { q: "Should I invest my emergency fund in mutual funds?", a: "Only in liquid or overnight funds, never equity. Equity can fall 20–30% in a crisis — precisely when job losses spike and you are most likely to need the money." },
        { q: "What counts as an emergency?", a: "Job loss, medical crises, urgent home/car repairs, or a family emergency. A sale, a vacation, or a new phone does not — raiding the fund for wants defeats its purpose." }
      ] },
      { t: "cta", title: "See what your safety net earns", text: "Park it smart — check how much a sweep-in FD on your emergency fund grows over a year.", label: "Open FD Calculator", to: "/calculators/fd-calculator" }
    ]
  },
  {
    slug: "fd-interest-rates-compared-2026",
    title: "FD Interest Rates Compared (2026): Banks, Laddering & Tips",
    description: "Compare 2026 FD rates across major and small finance banks, learn FD laddering with a ₹5L example, and avoid the TDS trap on interest income.",
    date: "2026-10-07",
    updated: "2026-10-07",
    author: "Srot Finance Team",
    category: "Saving",
    readMins: 8,
    keywords: ["fd interest rates", "best fd rates 2026", "fixed deposit rates india", "fd laddering", "fd calculator"],
    calculatorLink: "/calculators/fd-calculator",
    calculatorName: "FD Calculator",
    blocks: [
      { t: "h2", text: "Indicative FD rates in 2026" },
      { t: "p", html: "After the rate-cut cycle, FD rates have settled lower than the 2023–24 peaks but remain respectable. Indicative ranges for regular (non-senior) depositors:" },
      { t: "table", head: ["Bank type", "1-year FD", "3-year FD", "5-year FD", "Senior citizen extra"], rows: [
        ["Large private (HDFC, ICICI, Axis)", "6.75–7.00%", "7.00–7.25%", "7.00–7.10%", "+0.50%"],
        ["PSU banks (SBI, Bank of Baroda)", "6.50–6.80%", "6.75–7.00%", "6.75–7.00%", "+0.50%"],
        ["Small finance banks (AU, Equitas, Ujjivan)", "7.50–8.00%", "8.00–8.50%", "7.75–8.25%", "+0.50%"]
      ] },
      { t: "note", title: "Rates move — verify before investing", html: "These are indicative ranges, not live quotes. Banks revise rates frequently and run limited-period special FDs. Always check the bank's official FD rates page on the day you invest, and confirm whether the rate is for the general or senior-citizen category." },
      { t: "h2", text: "FD laddering: the ₹5 lakh example" },
      { t: "p", html: "Locking all ₹5 lakh in one 5-year FD maximises the rate but kills flexibility — break it early and you pay a ~1% penalty. <strong>Laddering</strong> splits the money across maturities so something is always maturing soon:" },
      { t: "table", head: ["FD", "Amount", "Tenure", "Indicative rate", "Maturity value"], rows: [
        ["FD 1", "₹1,00,000", "1 year", "7.00%", "₹1,07,000"],
        ["FD 2", "₹1,00,000", "2 years", "7.10%", "₹1,14,710"],
        ["FD 3", "₹1,00,000", "3 years", "7.25%", "₹1,23,359"],
        ["FD 4", "₹1,00,000", "4 years", "7.20%", "₹1,31,995"],
        ["FD 5", "₹1,00,000", "5 years", "7.10%", "₹1,40,974"]
      ] },
      { t: "p", html: "Every year one FD matures — renew it as a new 5-year FD at the prevailing rate and the ladder becomes self-perpetuating. You get near-5-year rates with 1-year liquidity. This is also a clean way to park an <a href=\"/blog/emergency-fund-how-much-india\">emergency fund</a>: ladder the 6-month portion so it stays accessible." },
      { t: "example", title: "What ₹2 lakh earns in 3 years at 7.1%", html: "Maturity = 2,00,000 × (1.071)<sup>3</sup> = <strong>₹2,45,696</strong>.<br>Interest earned: ₹45,696. Try the <a href=\"/calculators/fd-calculator\">FD calculator</a> with quarterly compounding (the bank standard) to get the figure to the rupee — it comes out marginally higher than annual compounding." },
      { t: "h2", text: "The TDS trap on FD interest" },
      { t: "p", html: "Banks deduct <strong>10% TDS</strong> when your interest from that bank crosses <strong>₹50,000 in a financial year</strong> (₹1,00,000 for senior citizens, per Budget 2025 changes). TDS is not your final tax — FD interest is taxed at your slab rate, so a 30%-slab investor owes more at filing time. Two defences:" },
      { t: "ul", items: [
        "<strong>Form 15G/15H:</strong> submit at the start of the financial year if your total income is below the taxable limit — the bank then deducts zero TDS.",
        "<strong>Split across banks:</strong> the ₹50,000 threshold applies per bank, per PAN. Spreading large deposits also keeps you within the ₹5 lakh DICGC deposit-insurance cover per bank."
      ] },
      { t: "h2", text: "When an FD beats the alternatives" },
      { t: "ul", items: [
        "<strong>Goals under 3 years:</strong> down payment, wedding, fees — equity is too volatile; FDs and the goal timeline match.",
        "<strong>Emergency funds:</strong> sweep-in FDs beat savings accounts by 3–4 percentage points with similar access.",
        "<strong>Senior citizens:</strong> 8%+ at small finance banks with monthly payout options is hard to beat for risk-free income.",
        "<strong>When to skip:</strong> goals 7+ years away. Post-tax FD returns (~5% for the 30% slab) lose to inflation over long horizons — equity SIPs are the right vehicle there."
      ] },
      { t: "h2", text: "Special FDs and timing tricks" },
      { t: "p", html: "Banks periodically launch limited-period special FDs — 444-day or 555-day tenures at 0.25–0.50% above card rates. They are genuine deals, not gimmicks, provided the tenure suits your goal. Two more timing notes: book FDs early in a rate-cut cycle to lock higher rates for longer, and prefer cumulative (reinvestment) FDs over payout options unless you need the monthly income — quarterly compounding on a cumulative FD quietly adds ~0.15–0.30% effective yield over simple annual interest." },
      { t: "ul", items: [
        "<strong>Senior citizens:</strong> the extra 0.50% plus the higher TDS threshold (₹1 lakh) makes FDs genuinely attractive post-retirement.",
        "<strong>Tax-saver FDs:</strong> 5-year lock-in with 80C benefit, but post-tax returns usually lose to ELSS — pick them only for the guaranteed portion of your 80C."
      ] },
      { t: "faq", items: [
        { q: "Which bank gives the highest FD interest rate in 2026?", a: "Small finance banks (AU, Equitas, Ujjivan and peers) typically offer 8–8.5% on 2–3 year FDs, roughly 1–1.5 points above large private and PSU banks. Rates change often, so verify on the bank's site before investing." },
        { q: "What is FD laddering?", a: "Splitting a lump sum into multiple FDs with staggered maturities (e.g., 1–5 years). One FD matures each year, giving regular liquidity while most of the money still earns long-tenure rates." },
        { q: "Is FD interest taxable in India?", a: "Yes, fully taxable at your income-tax slab rate. Banks deduct 10% TDS above ₹50,000 annual interest per bank (₹1 lakh for seniors); you settle the balance when filing returns." },
        { q: "Are small finance bank FDs safe?", a: "Deposits up to ₹5 lakh per depositor per bank are insured by DICGC, which covers small finance banks too. Stay within that limit per bank and the safety is identical to large banks." },
        { q: "FD or liquid fund for short-term money?", a: "Liquid funds usually edge out FDs post-tax for 30%-slab investors and redeem in a day, but FDs (especially sweep-in) are simpler and have zero market risk. For under 1 year, either works — pick on convenience." }
      ] },
      { t: "cta", title: "Calculate your FD maturity", text: "Enter amount, rate and tenure to see maturity value and interest earned with quarterly compounding.", label: "Open FD Calculator", to: "/calculators/fd-calculator" }
    ]
  },
  {
    slug: "50-30-20-budget-rule-india",
    title: "50/30/20 Budget Rule in India: Examples at ₹50k, ₹1L, ₹2L",
    description: "Apply the 50/30/20 rule to Indian salaries with worked budgets at ₹50,000, ₹1 lakh and ₹2 lakh — plus India-specific tweaks for rent and family.",
    date: "2026-10-08",
    updated: "2026-10-08",
    author: "Srot Finance Team",
    category: "Budgeting",
    readMins: 8,
    keywords: ["50 30 20 rule", "budget rule india", "monthly budget plan", "how to budget salary", "budgeting tips india"],
    calculatorLink: "/calculators/interest-calculator",
    calculatorName: "Interest Calculator",
    blocks: [
      { t: "h2", text: "The rule in one minute" },
      { t: "p", html: "Split your <strong>in-hand (post-tax, post-EPF) salary</strong> three ways: <strong>50% needs</strong> (rent, groceries, EMIs, bills, transport), <strong>30% wants</strong> (dining out, shopping, travel, subscriptions) and <strong>20% savings</strong> (emergency fund, SIPs, PPF). It is a starting template, not a law — but it forces the one question most budgets dodge: <em>are you actually saving a fixed fifth of your income?</em>" },
      { t: "table", head: ["In-hand salary", "Needs (50%)", "Wants (30%)", "Save (20%)"], rows: [
        ["₹50,000", "₹25,000", "₹15,000", "₹10,000"],
        ["₹1,00,000", "₹50,000", "₹30,000", "₹20,000"],
        ["₹2,00,000", "₹1,00,000", "₹60,000", "₹40,000"]
      ] },
      { t: "h2", text: "India-specific tweaks" },
      { t: "ul", items: [
        "<strong>Metro rent breaks the 50%:</strong> a ₹35,000 rent on a ₹1L salary is 35% on housing alone. In Mumbai/Bengaluru/Delhi, allow needs to run to 55–60% temporarily — and steal the difference from <em>wants</em>, never from savings.",
        "<strong>EMIs: split them honestly.</strong> Home-loan principal is really savings (it builds an asset); the interest is a need. Car and personal-loan EMIs are needs. Credit-card rollovers are a fire — kill them before budgeting anything else.",
        "<strong>Family support counts:</strong> money sent home monthly is a need, not savings, even if it feels virtuous. Budget it in the 50%.",
        "<strong>At ₹50k, 20% saving is hard:</strong> if needs genuinely exceed 50%, protect a <em>minimum</em> 10% savings floor and grow it with every increment — the <a href=\"/blog/step-up-sip-10-percent-annual-hike\">step-up SIP approach</a> works for budgets too."
      ] },
      { t: "example", title: "Worked example: ₹1,00,000 in-hand in Pune", html: "<strong>Needs ₹50,000:</strong> rent ₹22,000 + groceries ₹12,000 + utilities/internet ₹4,000 + transport ₹6,000 + parents ₹6,000.<br><strong>Wants ₹30,000:</strong> dining out ₹8,000 + shopping ₹10,000 + travel fund ₹7,000 + subscriptions ₹5,000.<br><strong>Save ₹20,000:</strong> emergency fund ₹5,000 (till full) + equity SIP ₹10,000 + PPF ₹5,000.<br>Reality check: if wants are currently ₹38,000, the fix is not a new app — it is moving ₹8,000 of <em>wants</em> back. Our <a href=\"/blog/money-leaks-monthly-budget-fix\">money-leaks checklist</a> finds that ₹8,000 in under 30 minutes for most people." },
      { t: "h2", text: "Common failure points" },
      { t: "ol", items: [
        "<strong>Budgeting gross salary:</strong> always use in-hand pay. Budgeting ₹1.2L gross when ₹1L hits the account guarantees a 20% overshoot.",
        "<strong>No separate savings account:</strong> savings left in the spending account get spent. Move the 20% out on salary day — automate it.",
        "<strong>Treating credit cards as extra income:</strong> card spending is just deferred spending from the same three buckets. Track it weekly, not monthly.",
        "<strong>Skipping the review:</strong> one 20-minute review on the 1st of each month beats any budgeting app. Compare actuals vs the three buckets and adjust once."
      ] },
      { t: "note", title: "The interest angle", html: "Every rupee leaking from the 20% savings bucket has a compounding cost. ₹5,000/month diverted from wants to savings for 10 years at 12% is ₹11.6 lakh. Check the <a href=\"/calculators/interest-calculator\">interest calculator</a> to see what your own <em>wants</em> spending would become if invested instead." },
      { t: "h2", text: "Automating the 20% so willpower is irrelevant" },
      { t: "p", html: "The 50/30/20 rule fails most often at the transfer step — the 20% sits in the salary account <em>until</em> it gets spent. Fix it with salary-day automation: a SIP dated the 2nd, a recurring deposit or PPF transfer dated the 3rd, and whatever remains of the 20% swept to a separate savings account the same week. Money you never see, you never miss; after two months the reduced balance simply becomes your new normal." },
      { t: "ul", items: [
        "<strong>Order matters:</strong> automate savings before setting spending budgets — pay yourself first is a sequencing trick, not a slogan.",
        "<strong>One account per job:</strong> salary in, bills out, spending and savings in separate accounts makes leaks visible instantly.",
        "<strong>Raise the rate, not just the amount:</strong> when income jumps 20%, push the savings rate from 20% to 25% — lifestyle upgrades funded from the remaining 75% still feel generous."
      ] },
      { t: "h2", text: "When to break the rule" },
      { t: "p", html: "50/30/20 is training wheels, not a religion. Aggressive debt payoff (avalanche mode) justifies a temporary 60/20/20; a low-income starter household may need 70/20/10 until the next increment. The rule earns its keep in exactly one situation: the comfortable middle, where lifestyle quietly expands to consume every raise. If your savings rate has a fixed floor and rises with income, you are following the spirit of 50/30/20 whatever the exact split." },
      { t: "faq", items: [
        { q: "Does the 50/30/20 rule work in India?", a: "Yes, as a template — with tweaks. Metro rents often push needs above 50%, so Indian households commonly run 55/25/20 or 60/20/20. The non-negotiable part is the fixed savings percentage." },
        { q: "Should I use gross or in-hand salary for 50/30/20?", a: "Always in-hand (take-home) salary. Using gross salary inflates every bucket with money that actually goes to tax and EPF." },
        { q: "Where do EMIs fit in 50/30/20?", a: "Home and car loan EMIs go in needs (50%). Home-loan principal technically builds wealth, but for budgeting simplicity keep the full EMI in needs and treat extra prepayments as savings." },
        { q: "What if my rent alone is 40% of salary?", a: "Then needs will exceed 50% — accept 60/20/20 temporarily, cut wants to 20%, and protect savings at all costs. Alternatively, the cheapest fix is usually housing: a flatmate or a slightly farther locality." },
        { q: "How is 50/30/20 different from zero-based budgeting?", a: "Zero-based budgeting assigns every rupee a job; 50/30/20 just caps three buckets. 50/30/20 is far easier to sustain — most people who try zero-based budgeting quit within three months." }
      ] },
      { t: "cta", title: "See what your savings could earn", text: "Plug your 20% savings amount into the interest calculator and watch compounding do its work.", label: "Open Interest Calculator", to: "/calculators/interest-calculator" }
    ]
  },
  {
    slug: "home-loan-emi-extra-emi-per-year",
    title: "Home Loan: How One Extra EMI Per Year Saves Lakhs",
    description: "On a ₹50L, 20-year loan at 9%, one extra EMI a year cuts 3.5 years and saves ₹11.6L interest. Full amortization math and prepayment tips.",
    date: "2026-10-09",
    updated: "2026-10-09",
    author: "Srot Finance Team",
    category: "Loans",
    readMins: 8,
    keywords: ["home loan emi", "loan prepayment", "extra emi home loan", "home loan interest calculator", "emi calculator"],
    calculatorLink: "/calculators/emi-calculator",
    calculatorName: "EMI Calculator",
    blocks: [
      { t: "h2", text: "The headline numbers" },
      { t: "p", html: "Take a <strong>₹50 lakh home loan, 20 years, 9% interest</strong>. The EMI works out to <strong>₹44,986</strong>, and over 20 years you pay <strong>₹57.97 lakh in interest alone</strong> — more than the loan itself. Now pay just <strong>one extra EMI every year</strong> (about ₹45,000 from your bonus):" },
      { t: "table", head: ["Scenario", "Tenure", "Total interest paid", "Interest saved"], rows: [
        ["Regular EMIs only", "240 months (20 yrs)", "₹57.97 lakh", "—"],
        ["One extra EMI per year", "198 months (16.5 yrs)", "₹46.39 lakh", "₹11.58 lakh"],
        ["Difference", "42 months sooner", "—", "3.5 years + ₹11.6L"]
      ] },
      { t: "p", html: "You pay ₹7.2 lakh extra over the loan's life and save ₹11.6 lakh in interest — a net gain of over ₹4 lakh, plus you are debt-free 3.5 years early. Verify it yourself on the <a href=\"/calculators/emi-calculator\">EMI calculator</a>." },
      { t: "example", title: "Why a small extra pays so much", html: "In year 1, roughly ₹37,000 of your ₹44,986 EMI is pure interest — only ~₹8,000 touches principal. An extra ₹44,986 paid in month 12 goes <strong>100% toward principal</strong>.<br>That single payment saves interest on ₹44,986 for the remaining ~19 years: ₹44,986 × 9% × 19 ≈ <strong>₹77,000 in avoided interest</strong> from one extra EMI. Early principal payments are the highest-return <em>rupees</em> in the entire loan." },
      { t: "h2", text: "Prepayment vs investing the surplus" },
      { t: "p", html: "The honest counter-argument: investing that ₹45,000 yearly in equity at 12% for 16.5 years grows to about ₹19.7 lakh, versus ₹11.6 lakh interest saved. Pure math favours investing — <em>if</em> you actually invest it every year for 16 years without touching it. Most people do not. Prepayment is a guaranteed, risk-free 9% return with zero discipline required after the transfer. A sensible middle path: prepay one EMI yearly <em>and</em> run a parallel SIP with any further surplus." },
      { t: "h2", text: "Rules before you prepay" },
      { t: "ul", items: [
        "<strong>Floating-rate loans: zero prepayment charges.</strong> RBI rules bar banks from charging prepayment penalties on floating-rate home loans to individuals. Fixed-rate loans may charge — check your sanction letter.",
        "<strong>Emergency fund first.</strong> Never prepay with your last liquid rupee. Keep 6 months of expenses (see our <a href=\"/blog/emergency-fund-how-much-india\">emergency fund guide</a>) before accelerating the loan.",
        "<strong>Reduce tenure, not EMI.</strong> When prepaying, ask the bank to keep the EMI constant and cut the tenure — that is what converts the payment into interest savings.",
        "<strong>Old-regime tax angle:</strong> principal gets 80C (up to ₹1.5L) and interest gets ₹2L under Section 24(b). Heavy prepayment shrinks both deductions — worth modelling if you are in the old regime and the 30% slab.",
        "<strong>Timing:</strong> prepay early in the loan when the interest component is fattest. An extra EMI in year 2 saves nearly double the interest of one in year 15."
      ] },
      { t: "note", title: "Watch the reset clause", html: "Some banks reset your EMI (lowering it) instead of cutting tenure when you prepay — which silently destroys most of the benefit. Always confirm in writing: <em>tenure reduction, EMI unchanged</em>." },
      { t: "h2", text: "Part-prepay vs full foreclosure" },
      { t: "p", html: "One extra EMI a year is part-prepayment — but should you ever foreclose the entire loan? Only after the emergency fund is full, high-interest debt is zero, and retirement investing is on track. A common mistake is draining all savings to close a 9% loan while carrying 36% credit-card debt or holding zero liquid buffer. Sequence it: kill the costliest debt first, build the safety net, fund the future — then attack the home loan. And when you do foreclose, collect the original property documents and the no-dues certificate from the bank in the same month." },
      { t: "h2", text: "The balance-transfer alternative" },
      { t: "p", html: "If your rate is above 9.5%, get quotes for a home-loan balance transfer before prepaying aggressively — moving a ₹50L loan from 9.5% to 8.75% saves roughly ₹4.3 lakh in interest over 20 years with zero extra outgo, and most banks now process transfers in 2–3 weeks. Just watch for processing fees (typically 0.25–0.50%) and confirm the new lender also offers free part-prepayments, so the one-extra-EMI strategy keeps working after the switch." },
      { t: "faq", items: [
        { q: "How much does one extra EMI per year save on a home loan?", a: "On a ₹50L, 20-year loan at 9%, one extra EMI yearly cuts the tenure from 240 to 198 months and saves about ₹11.6 lakh in interest — you become debt-free 3.5 years early." },
        { q: "Is there a prepayment penalty on home loans in India?", a: "No prepayment charges are allowed on floating-rate home loans taken by individuals, per RBI guidelines. Fixed-rate loans from banks and all loans from HFCs may levy charges — check your loan agreement." },
        { q: "Should I reduce EMI or tenure when prepaying?", a: "Reduce tenure and keep the EMI unchanged. Reducing the EMI instead keeps you in debt for the full term and wipes out most of the interest saving." },
        { q: "Is it better to prepay a home loan or invest in mutual funds?", a: "Prepayment gives a guaranteed post-tax return equal to your loan rate (9% here). Equity SIPs may return more (10–12%) but with risk and volatility. If you will genuinely invest the surplus for 15+ years, investing can win; otherwise prepay." },
        { q: "When is the best time to prepay a home loan?", a: "As early as possible. In the first half of the tenure, most of your EMI is interest, so principal prepayments then avoid the maximum future interest." }
      ] },
      { t: "cta", title: "Model your own loan", text: "Enter your loan amount, rate and tenure to see your EMI, total interest and prepayment savings.", label: "Open EMI Calculator", to: "/calculators/emi-calculator" }
    ]
  },
  {
    slug: "elss-explained-tax-saving",
    title: "ELSS Explained: Tax-Saving Funds, Lock-In & SIP vs Lumpsum",
    description: "ELSS funds explained: 3-year lock-in, SIP vs lumpsum math, LTCG tax at 12.5%, and how ELSS fits your 80C plan under old vs new regime.",
    date: "2026-10-10",
    updated: "2026-10-10",
    author: "Srot Finance Team",
    category: "Investing",
    readMins: 8,
    keywords: ["elss funds", "elss tax saving", "elss sip vs lumpsum", "elss lock in period", "best elss funds india"],
    calculatorLink: "/calculators/lumpsum-calculator",
    calculatorName: "Lumpsum Calculator",
    blocks: [
      { t: "h2", text: "What ELSS actually is" },
      { t: "p", html: "An <strong>Equity Linked Savings Scheme (ELSS)</strong> is a diversified equity mutual fund with two special powers: investments up to ₹1.5 lakh a year qualify for <strong>80C deduction</strong> (old regime), and it has the <strong>shortest lock-in of any tax-saving option — just 3 years</strong>. Compare that with PPF's 15 years and NPS's till-age-60. You get equity growth potential with a tax sweetener on top." },
      { t: "h2", text: "The 3-year lock-in, precisely" },
      { t: "p", html: "The lock-in applies <strong>per instalment, not per folio</strong>. Every SIP instalment is locked for 3 years from its own investment date. A SIP started in April 2026 frees its first instalment in April 2029, its second in May 2029, and so on. After 3 years you may redeem, switch or simply stay invested — there is no auto-exit and no penalty for staying." },
      { t: "example", title: "SIP vs lumpsum in ELSS: the 3-year math", html: "Invest ₹1.5 lakh for the 80C limit, held 3 years at 12%:<br><strong>Lumpsum ₹1.5L on day one:</strong> 1,50,000 × 1.12<sup>3</sup> = <strong>₹2,10,739</strong>.<br><strong>SIP ₹12,500/month for 12 months</strong> (same ₹1.5L total), then left invested to complete 3 years: ≈ <strong>₹2,03,306</strong>.<br>The lumpsum wins by ~₹7,400 <em>if</em> markets rise steadily. But SIPs win the more common real-world scenario — volatile or falling markets in year one — because later instalments buy cheaper units. For salaried investors without ₹1.5L idle in April, the SIP is the practical default." },
      { t: "h2", text: "How ELSS is taxed" },
      { t: "p", html: "ELSS gains are equity gains: <strong>LTCG at 12.5% on gains above ₹1.25 lakh per financial year</strong> (holding over 12 months, which the 3-year lock-in guarantees). Dividends, if any, are taxed at your slab rate. Practical tip: if your ELSS gains are large, redeem across two financial years to use the ₹1.25 lakh exemption twice." },
      { t: "table", head: ["You invested (80C)", "Value after 5 yrs @12%", "Gain", "LTCG tax (single FY)"], rows: [
        ["₹1.5L × 5 yrs = ₹7.5L", "₹9.53 lakh*", "₹2.03 lakh", "~₹9,700"],
        ["₹1.5L × 10 yrs = ₹15L", "₹26.30 lakh*", "₹11.30 lakh", "~₹1.26 lakh"]
      ] },
      { t: "p", html: "*Approximate, assuming 12% CAGR and year-start investments. The 10-year row shows why staggering redemptions across financial years matters — ₹1.26 lakh tax in one year is avoidable." },
      { t: "h2", text: "Fitting ELSS into your 80C plan" },
      { t: "ul", items: [
        "<strong>Old regime + long horizon:</strong> ELSS is usually the highest-returning 80C option. Our <a href=\"/blog/ppf-vs-elss-vs-nps-80c-tax-saving\">PPF vs ELSS vs NPS comparison</a> shows it beating PPF by ~₹18 lakh over 15 years on ₹1.5L/year.",
        "<strong>New regime:</strong> no 80C deduction, so pick ELSS only if you want equity exposure with a 3-year discipline lock — not for tax reasons.",
        "<strong>Don't buy 4 ELSS funds:</strong> one or two diversified ELSS funds are enough. Spreading ₹1.5L across five funds is diworsification, not diversification.",
        "<strong>March rush warning:</strong> ELSS bought in a panic on March 30th still locks for 3 years. Start the SIP in April and the <em>next</em> March takes care of itself."
      ] },
      { t: "note", title: "ELSS is equity first, tax-saving second", html: "Never buy ELSS for a 3-year goal. Three years is the <em>minimum</em> lock-in, not a recommended horizon — equity needs 5–7+ years to smooth out volatility. Judge ELSS as an equity fund that happens to save tax, not a tax product that happens to invest in equity." },
      { t: "h2", text: "Lumpsum top-ups in a falling market" },
      { t: "p", html: "ELSS does not have to be SIP-only. Many investors run a base SIP through the year and add lumpsum top-ups during market corrections — each top-up starts its own 3-year lock-in clock but buys units at depressed NAVs. Before committing a large top-up, model the outcome on the <a href=\"/calculators/lumpsum-calculator\">lumpsum calculator</a>: a ₹1 lakh correction-time investment compounding at 12% for 10 years becomes ~₹3.1 lakh, which often beats spreading the same amount as small SIPs in a flat market." },
      { t: "ul", items: [
        "<strong>Keep powder dry:</strong> hold 10–20% of your yearly ELSS budget as dry powder for 5%+ market dips.",
        "<strong>Don't time the 80C deadline:</strong> March panic-buying at market peaks is the worst version of lumpsum investing — spread purchases across the year."
      ] },
      { t: "faq", items: [
        { q: "What is the lock-in period for ELSS?", a: "3 years per instalment — the shortest among 80C options (PPF: 15 years, NSC: 5 years, NPS: till 60). Each SIP instalment is locked for 3 years from its own date." },
        { q: "Is ELSS better as SIP or lumpsum?", a: "Lumpsum wins in steadily rising markets; SIP wins in volatile markets and suits salaried cash flows. Over long periods the difference is small — consistency matters more than the mode." },
        { q: "How is ELSS taxed on withdrawal?", a: "Gains are taxed as equity LTCG: 12.5% on gains above ₹1.25 lakh per financial year. The 3-year lock-in means ELSS always qualifies for LTCG treatment, never STCG." },
        { q: "Can I withdraw ELSS after 3 years?", a: "Yes — after 3 years each instalment is fully redeemable with no exit load or penalty. But staying invested longer usually serves wealth creation better." },
        { q: "Is ELSS eligible for 80C in the new tax regime?", a: "No. The new regime allows no 80C deduction. ELSS still works as an equity investment there, but the tax-saving motive disappears." }
      ] },
      { t: "cta", title: "Project a lumpsum ELSS investment", text: "See what a one-time ELSS investment could grow to over 5, 10 or 15 years.", label: "Open Lumpsum Calculator", to: "/calculators/lumpsum-calculator" }
    ]
  },
  {
    slug: "money-leaks-monthly-budget-fix",
    title: "5 Money Leaks in Your Monthly Budget (and How to Fix Them)",
    description: "Food delivery, forgotten UPI subscriptions, BNPL interest and 2 more leaks silently drain Indian budgets. A checklist with real numbers and fixes.",
    date: "2026-10-11",
    updated: "2026-10-11",
    author: "Srot Finance Team",
    category: "Budgeting",
    readMins: 8,
    keywords: ["money leaks", "save money india", "monthly budget tips", "upi subscriptions", "reduce expenses india"],
    calculatorLink: "/calculators/interest-calculator",
    calculatorName: "Interest Calculator",
    blocks: [
      { t: "h2", text: "Why small leaks matter more than big budgets" },
      { t: "p", html: "Nobody goes broke from one ₹50,000 purchase. People go broke from thirty ₹500 purchases they never noticed. In India's UPI-first economy, money leaves your account with a thumbprint — no wallet-opening, no counting change, no friction. These five leaks drain the average urban household of <strong>₹5,000–₹8,000 a month</strong> without a single memorable purchase to show for it." },
      { t: "h3", text: "Leak 1: Food delivery on autopilot — ~₹3,200/month" },
      { t: "p", html: "Eight orders a month at ₹400 each is ₹3,200 — and that assumes no <em>platform fees, delivery charges and surge pricing</em>, which routinely add 25–30%. A home-cooked equivalent costs ₹80–120. Fix: cap delivery to 2 orders a month and keep a <em>15-minute meals</em> list (poha, dal-rice, besan chilla) for lazy evenings. Savings: ~₹2,400/month." },
      { t: "h3", text: "Leak 2: Forgotten UPI autopay subscriptions — ~₹1,200/month" },
      { t: "p", html: "Two OTT apps you stopped watching, a <em>pro</em> tier you trialled, cloud storage, a news app, a fitness app — each ₹149–₹499, each silently renewing via UPI AutoPay. Fix: open your UPI app's AutoPay/mandate section today and kill everything you didn't use in the last 30 days. Then set a quarterly calendar reminder. Savings: ~₹1,200/month." },
      { t: "h3", text: "Leak 3: Credit-card rollover & BNPL interest — ~₹1,500/month" },
      { t: "p", html: "Revolving ₹40,000 on a credit card at 3.5% per month (42% annualised) costs ₹1,400/month in interest <em>while the principal barely moves</em>. BNPL <em>no-cost EMIs</em> with a missed payment trigger similar penalties. Fix: pay cards in full, always. If you are already revolving, take a personal loan at 11–13% to clear the card — it feels wrong to borrow to repay, but the math is unambiguous." },
      { t: "h3", text: "Leak 4: Impulse UPI spending — ~₹2,000/month" },
      { t: "p", html: "The ₹99–₹499 zone: phone accessories, sale items, snacks, <em>just browsing</em> purchases. UPI removed the last moment of reflection between <em>want</em> and <em>bought</em>. Fix: the 48-hour rule for anything non-essential over ₹500, and unlink saved cards from shopping apps so every purchase requires effort. Savings: ~₹2,000/month." },
      { t: "h3", text: "Leak 5: Memberships you don't use — ~₹600/month" },
      { t: "p", html: "The gym visited 6 times, the club membership for <em>networking</em>, the annual maintenance plan on a gadget you replaced. Fix: compute cost-per-use. A ₹18,000/year gym used 20 times is ₹900 per visit — a pay-per-use alternative is cheaper until you cross ~8 visits a month." },
      { t: "example", title: "What plugging the leaks is really worth", html: "Total leaks: ~₹7,500/month. Redirected into an equity SIP at 12% for 10 years:<br>FV = 7,500 × 232.34 = <strong>₹17.43 lakh</strong>.<br>You are not <em>cutting spending</em> — you are moving ₹17.4 lakh from forgettable consumption to your future self. Run it for your own leak total on the <a href=\"/calculators/interest-calculator\">interest calculator</a>." },
      { t: "h2", text: "The 30-minute fix checklist" },
      { t: "ol", items: [
        "Open UPI AutoPay mandates — cancel every subscription unused in 30 days (10 min).",
        "Pull last month's bank + card statements — highlight every food-delivery and impulse line (10 min).",
        "Set delivery-app order cap: 2/month, and delete saved addresses that enable one-tap ordering (5 min).",
        "Enable full auto-debit on credit cards — never pay <em>minimum due</em> again (3 min).",
        "Move the recovered amount — even ₹3,000 — into a SIP dated the 2nd of next month (2 min). Automate before motivation fades."
      ] },
      { t: "p", html: "Once the leaks are sealed, give every rupee a permanent address with the <a href=\"/blog/50-30-20-budget-rule-india\">50/30/20 budget rule</a> — the wants bucket then has a hard ceiling instead of an open tap." },
      { t: "note", title: "Don't optimise what you should eliminate", html: "Hunting for a cheaper OTT plan while keeping three of them is optimising the leak. The highest-ROI financial move is cancellation, not comparison." },
      { t: "h2", text: "Make the fix stick: the monthly money date" },
      { t: "p", html: "One 30-minute cleanup decays within months unless it becomes a ritual. Schedule a <em>money date</em> on the 1st of every month: 20 minutes reviewing last month's statement for new leaks, cancelling anything unused, and confirming the SIP went through. Couples who do this together report the biggest wins — most leaks are invisible precisely because nobody is looking. Twelve money dates a year will save more than any single budgeting app ever will." },
      { t: "faq", items: [
        { q: "How do I find all my UPI AutoPay subscriptions?", a: "In GPay: Settings → Autopay. In PhonePe: profile → AutoPay. BHIM and Paytm have similar mandate sections under profile/settings. Review this list every quarter." },
        { q: "Is food delivery really that expensive?", a: "A ₹300 dish typically bills at ₹400–450 after packaging, delivery, platform and surge fees — 30–50% over menu price. At 8 orders a month that is ₹3,200+, versus ~₹800 for home-cooked equivalents." },
        { q: "Should I close my credit card to stop overspending?", a: "No — a long credit history helps your CIBIL score. Instead, enable full-amount auto-debit, lower the limit to one month's budgeted card spend, and remove saved card details from shopping apps." },
        { q: "What is the 48-hour rule?", a: "For any non-essential purchase above ₹500, wait 48 hours before buying. Most impulse urges fade; the ones that survive are usually genuine needs." },
        { q: "How much can plugging money leaks save in a year?", a: "₹5,000–₹8,000/month is ₹60,000–₹96,000 a year — and invested at 12% for 10 years, ₹7,500/month becomes about ₹17.4 lakh." }
      ] },
      { t: "cta", title: "Turn leaks into wealth", text: "Calculate what your recovered monthly amount grows to when invested instead of leaked.", label: "Open Interest Calculator", to: "/calculators/interest-calculator" }
    ]
  },
  {
    slug: "retirement-corpus-india-50",
    title: "Retirement Corpus: How Much Do You Need to Retire at 50?",
    description: "Inflation-adjusted retirement math for 25, 30 and 35-year-olds retiring at 50. Corpus targets, monthly SIPs needed, and the assumptions behind them.",
    date: "2026-10-12",
    updated: "2026-10-12",
    author: "Srot Finance Team",
    category: "Retirement",
    readMins: 8,
    keywords: ["retirement corpus", "retire at 50 india", "retirement planning india", "how much to retire", "retirement calculator"],
    calculatorLink: "/calculators/sip-calculator",
    calculatorName: "SIP Calculator",
    blocks: [
      { t: "h2", text: "The core problem: inflation" },
      { t: "p", html: "Retiring at 50 sounds like a corpus question, but it is really an <strong>inflation question</strong>. At 6% annual inflation — India's long-run reality for household expenses — prices multiply relentlessly:" },
      { t: "table", head: ["Today's monthly spend", "In 15 years (age 35→50)", "In 20 years (age 30→50)", "In 25 years (age 25→50)"], rows: [
        ["₹50,000", "₹1,19,828", "₹1,60,357", "₹2,14,594"],
        ["₹75,000", "₹1,79,742", "₹2,40,536", "₹3,21,890"],
        ["₹1,00,000", "₹2,39,656", "₹3,20,714", "₹4,29,187"]
      ] },
      { t: "p", html: "A 25-year-old spending ₹1 lakh a month today will need <strong>₹4.29 lakh a month</strong> at 50 to live the same life. Every retirement plan that ignores this is fiction." },
      { t: "h2", text: "Corpus targets by starting age" },
      { t: "p", html: "Assumptions: retire at 50, fund 35 years of retirement (to age 85), 6% inflation, 12% returns while accumulating, 8% post-retirement returns. Corpus ≈ 25.4× your annual spend at age 50:" },
      { t: "table", head: ["Start age", "Years to 50", "Spend today/mo", "Spend at 50/mo", "Corpus needed", "Monthly SIP @12%"], rows: [
        ["25", "25 yrs", "₹50,000", "₹2,14,594", "₹6.55 cr", "≈ ₹34,500"],
        ["30", "20 yrs", "₹60,000", "₹1,92,428", "₹5.87 cr", "≈ ₹58,700"],
        ["35", "15 yrs", "₹75,000", "₹1,79,742", "₹5.49 cr", "≈ ₹1,08,800"]
      ] },
      { t: "example", title: "Reading the table: the 30-year-old", html: "Spends ₹60,000/month today → needs ₹1,92,428/month at 50 (20 years of 6% inflation).<br>Annual need at 50: ₹23.09 lakh → corpus: 23.09 × 25.4 ≈ <strong>₹5.87 crore</strong>.<br>Monthly SIP for 20 years at 12% to reach it: 5,87,00,000 ÷ 999.1 ≈ <strong>₹58,750/month</strong>.<br>Daunting — until you add a 10% yearly step-up, which cuts the starting SIP dramatically. See our <a href=\"/blog/step-up-sip-10-percent-annual-hike\">step-up SIP guide</a> for the math." },
      { t: "h2", text: "Why starting early wins so decisively" },
      { t: "p", html: "The 25-year-old needs a bigger corpus (₹6.55 cr vs ₹5.49 cr) because 25 years of inflation compounds longer — yet their monthly SIP is <strong>one-third</strong> of the 35-year-old's (₹34,500 vs ₹1,08,800). Time does two jobs at once: it lets smaller amounts compound, and it spreads the burden. Every year you delay past 30 adds roughly ₹8,000–10,000 to the required monthly SIP." },
      { t: "h2", text: "Assumptions you must read" },
      { t: "ul", items: [
        "<strong>6% inflation:</strong> conservative for healthcare and education (often 8–10%), optimistic for electronics. Blended household inflation near 6% is the standard planning figure.",
        "<strong>12% accumulation returns:</strong> requires heavy equity allocation. A 60:40 equity-debt mix at 10% pushes the 30-year-old's SIP from ₹58,700 to ~₹73,000 — model both on the <a href=\"/calculators/sip-calculator\">SIP calculator</a>.",
        "<strong>No major withdrawals:</strong> the corpus math collapses if you raid it for a house down payment at 40. Keep retirement money in a separate mental (and actual) account.",
        "<strong>EPF/NPS stack on top:</strong> mandatory EPF contributions and any NPS balance reduce the SIP needed. Subtract their projected values from the corpus target first."
      ] },
      { t: "note", title: "Retire at 50 means fund 35+ years", html: "Indian life expectancy at 50 is roughly 28–30 more years, and affluent retirees routinely cross 85. Planning to 85 is not pessimism — it is the baseline. Running out at 78 is the real risk." },
      { t: "h2", text: "The glide path: what changes after 45" },
      { t: "p", html: "The SIP numbers above assume equity-heavy compounding all the way to 50. In practice, start de-risking around age 43–45: shift 5–10% of the corpus from equity to debt every year, so that by 50 roughly 60% sits in safe instruments. A 20% market crash at 49 with a 100%-equity portfolio can erase 4–5 years of SIPs and delay retirement itself. The glide path sacrifices a little return for something more valuable — certainty about the date." },
      { t: "ul", items: [
        "<strong>Bucket the corpus at 50:</strong> 3 years of expenses in liquid funds, 7–10 years in debt or arbitrage funds, the rest in equity for longevity.",
        "<strong>Don't stop investing at 50:</strong> with a 35-year retirement ahead, the equity portion must keep growing to fight inflation — retirement is a phase change in asset allocation, not the end of investing."
      ] },
      { t: "faq", items: [
        { q: "How much corpus do I need to retire at 50 in India?", a: "Roughly 25× your annual expenses at age 50. For a 30-year-old spending ₹60k/month today, that is about ₹5.9 crore — requiring a ~₹59k monthly SIP at 12% for 20 years." },
        { q: "Is ₹5 crore enough to retire in India?", a: "It depends on your spending and age. ₹5 crore supports about ₹16–17 lakh/year in inflation-adjusted withdrawals for 30+ years. For a ₹1L/month lifestyle at 50, you would need closer to ₹7–8 crore." },
        { q: "What inflation rate should I use for retirement planning?", a: "6% is the standard blended figure for Indian household expenses. Use 8–10% separately for healthcare and education if those dominate your budget." },
        { q: "Should I count EPF in my retirement corpus?", a: "Yes — project your EPF (employer + employee contributions at ~8.25%) to age 50 and subtract it from the corpus target before computing your SIP. For long-tenure salaried employees this can cover 20–30% of the goal." },
        { q: "Can I retire at 50 with only mutual funds?", a: "Yes, if the corpus is sized right and you shift to a conservative mix (30–40% equity) near retirement. Keep 2–3 years of expenses in liquid funds at retirement to avoid selling equity in a downturn." }
      ] },
      { t: "cta", title: "Calculate your retirement SIP", text: "Enter your target corpus and years left to see the monthly SIP you need starting today.", label: "Open SIP Calculator", to: "/calculators/sip-calculator" }
    ]
  }
];
