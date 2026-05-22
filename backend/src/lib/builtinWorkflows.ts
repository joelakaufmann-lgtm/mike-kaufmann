export const BUILTIN_WORKFLOWS: { id: string; title: string; prompt_md: string }[] = [
  {
    id: "builtin-cp-checklist",
    title: "Generate CP Checklist",
    prompt_md:
      "## Generate Conditions Precedent Checklist\n\n" +
      "Review the uploaded credit agreement or financing document and generate a comprehensive " +
      "Conditions Precedent (CP) checklist.\n\n" +
      "You MUST use the generate_docx tool to produce the checklist as a downloadable Word document. " +
      "You MUST pass landscape: true to the generate_docx tool — the document must be in landscape orientation. " +
      "Do not display the checklist inline — generate the .docx file and provide the download link.\n\n" +
      "Structure the document as follows:\n" +
      "- For each category of conditions (e.g. Corporate, Financial, Legal, Security), add a section with a heading\n" +
      "- Under each category heading, include a table with exactly these four columns in this order:\n" +
      "  1. Index — sequential number within the category (1, 2, 3…)\n" +
      "  2. Clause Number — the clause or schedule reference from the agreement\n" +
      "  3. Clause — a concise description of the condition precedent\n" +
      "  4. Status — leave blank (empty string) for the user to fill in\n\n" +
      "Use the table field in the section object (not content) for each category's rows.\n\n" +
      "Nevada note: if the borrower, guarantor, or any security provider is a Nevada entity, add a separate \"Nevada\" category covering: good-standing certificate from the Nevada Secretary of State, current State Business License (NRS 76), Initial/Annual List of Managers or Officers, registered-agent confirmation (NRS 86.231 / NRS 78.090), and any required filings under NRS Chapter 104 (Nevada UCC) for security interests.\n\n" +
      "Before finalizing, double-check that every table is formatted correctly: each table must have exactly the four columns above in the same order, headers must match exactly (Index, Clause Number, Clause, Status), every row must have the same number of cells as the headers, the Index column must be sequential starting from 1 within each category, and no cells should contain stray markdown, newlines, or placeholder text (use an empty string for Status).",
  },
  {
    id: "builtin-credit-summary",
    title: "Credit Agreement Summary",
    prompt_md:
      "## Credit Agreement Summary\n\n" +
      "Review the uploaded credit agreement and produce a comprehensive legal summary covering the following topics. " +
      "For each section, identify the key provisions, quote the relevant clause or schedule references, and flag any unusual, onerous, or non-market terms.\n\n" +
      "1. **Lenders** — All lenders or members of the lender syndicate, including their full legal name and role (e.g. mandated lead arranger, original lender, agent bank)\n" +
      "2. **Borrowers** — All borrowers, including their full legal name and jurisdiction of incorporation\n" +
      "3. **Guarantors** — All guarantors, including their full legal name and the scope of their guarantee obligation\n" +
      "4. **Other Parties** — Any other material parties (e.g. facility agent, security agent, hedge counterparties, issuing bank) and their roles\n" +
      "5. **Date of Agreement** — Date of the credit agreement\n" +
      "6. **Facilities** — Each facility available (e.g. Revolving Credit Facility, Term Loan A, Term Loan B, Term Loan C), the facility type, tranche name, and any key structural features\n" +
      "7. **Amount** — Total committed amount across all facilities, the currency, and breakdown by tranche if applicable\n" +
      "8. **Purpose** — Stated purpose for which borrowings may be used and any restrictions on use of proceeds\n" +
      "9. **Interest** — Applicable reference rate (e.g. SOFR, EURIBOR, base rate), the margin, any margin ratchet mechanism, and how interest periods are structured\n" +
      "10. **Commitment Fee** — Commitment or utilisation fees, the applicable rate, how they are calculated, and the basis (e.g. undrawn commitment, average utilisation)\n" +
      "11. **Repayment Schedule** — Repayment profile for each facility, whether by scheduled instalments or bullet repayment, and the repayment dates and amounts\n" +
      "12. **Maturity** — Final maturity date for each facility\n" +
      "13. **Security** — Each class of security granted or required (e.g. share pledges, fixed and floating charges, real estate mortgages, account pledges) and the assets or entities over which security is taken\n" +
      "14. **Guarantees** — Guarantee obligations, the guarantors, the scope of the guarantee, and any limitations (e.g. up-stream guarantee limitations, guarantor coverage test)\n" +
      "15. **Financial Covenants** — Each financial covenant, the metric (e.g. leverage ratio, interest cover, cashflow cover), the applicable test, testing frequency, and any equity cure rights\n" +
      "16. **Events of Default** — Each event of default, noting any grace periods, materiality thresholds, or cross-default provisions\n" +
      "17. **Assignment** — Restrictions or permissions on assignment or transfer (e.g. white/blacklists, borrower consent for lender transfers; restrictions on borrower assignment)\n" +
      "18. **Change of Control** — What constitutes a change of control, what obligations it triggers (e.g. mandatory prepayment, cancellation, lender consent), and any cure period\n" +
      "19. **Prepayment Fee** — Any prepayment fees, make-whole premiums, or soft-call protections, the applicable fee, the period during which it applies, and any exceptions (e.g. prepayment from insurance proceeds or asset disposals)\n" +
      "20. **Governing Law** — Governing law of the agreement. Specifically flag whether the agreement is governed by Nevada law; if so, note any provisions that may interact with NRS Chapter 99 (interest and usury) or NRS Chapter 104 (Nevada UCC).\n" +
      "21. **Dispute Resolution** — Whether disputes go to litigation or arbitration, the chosen forum or seat, and any submission to jurisdiction provisions. Flag if Nevada state or federal venue is selected, and whether the Nevada Uniform Arbitration Act (NRS 38) governs any arbitration clause.\n\n" +
      "Deliver the summary inline in your chat response — do NOT call generate_docx. Only produce a downloadable Word document if the user explicitly asks for one.",
  },
  {
    id: "builtin-sha-summary",
    title: "Shareholder Agreement Summary",
    prompt_md:
      "## Shareholder Agreement Summary\n\n" +
      "Review the uploaded shareholder agreement and produce a comprehensive legal summary covering the following topics. " +
      "For each section, identify the key provisions, quote the relevant clause references, and flag any unusual, onerous, or market-standard deviations.\n\n" +
      "1. **Parties & Shareholdings** — Full legal names, roles, share classes held, and percentage interests (on a fully diluted basis if stated). Note whether any party is a Nevada entity and its state of formation.\n" +
      "2. **Share Classes & Rights** — For each class: voting rights, dividend rights, liquidation preference, conversion or redemption features\n" +
      "3. **Board Composition & Governance** — Board size, director appointment rights (and the shareholding thresholds required to maintain them), quorum, and casting vote. For Nevada corporations, flag any deviation from NRS 78.115 (directors), NRS 78.315 (board action), or NRS 78.320 (stockholder action without meeting).\n" +
      "4. **Reserved Matters** — Decisions requiring a special majority, unanimity, or a specific shareholder's consent; note the threshold and whose consent is required for each\n" +
      "5. **Pre-emption on New Shares** — Who holds pre-emption rights, procedure, timeline, and any carve-outs (e.g. employee option schemes)\n" +
      "6. **Transfer Restrictions** — Lock-up periods, prohibited transfers, permitted transfers (e.g. to affiliates), and any board or shareholder approval requirements\n" +
      "7. **Right of First Refusal / Pre-emption on Transfer** — Trigger, procedure, pricing mechanics, and any exceptions\n" +
      "8. **Drag-Along Rights** — Who holds the right, threshold to trigger, conditions (e.g. minimum price, independent valuation), and minority protections\n" +
      "9. **Tag-Along Rights** — Who holds the right, triggering threshold, exercise procedure, and price terms\n" +
      "10. **Anti-Dilution Protections** — Type (full ratchet, weighted average), trigger events, calculation mechanics, and exceptions\n" +
      "11. **Dividend Policy** — Any obligation or target to pay dividends, preferential dividend rights, and restrictions on distributions. Cross-check against NRS 78.288 (distributions to stockholders) for Nevada corporations.\n" +
      "12. **Exit & Liquidity** — Agreed exit routes (trade sale, IPO, drag sale), timelines, and liquidation preferences on exit\n" +
      "13. **Deadlock** — Deadlock definition, escalation and resolution mechanisms (e.g. Russian roulette, put/call options), and consequences if unresolved\n" +
      "14. **Non-Compete & Non-Solicitation** — Who is bound, scope of activities and geography, duration, and carve-outs. For Nevada-based individuals or businesses, flag whether the restraint complies with NRS 613.195 (reasonableness, consideration, and the blue-pencil rule).\n" +
      "15. **Governing Law & Dispute Resolution** — Applicable law, forum, arbitration or litigation, and any mandatory escalation steps. Flag if Nevada law applies and whether NRS Chapter 38 (Nevada Uniform Arbitration Act) governs.\n\n" +
      "Generate the summary as a downloadable Word document.",
  },
  {
    id: "builtin-nv-llc-formation",
    title: "Nevada LLC Formation Checklist",
    prompt_md:
      "## Nevada LLC Formation Checklist\n\n" +
      "Generate a comprehensive checklist for forming a Nevada limited liability company under NRS Chapter 86. " +
      "You MUST use the generate_docx tool to produce a downloadable Word document. " +
      "Pass landscape: true. Do not display the checklist inline.\n\n" +
      "Organize the document into the following categories, each with its own heading and a four-column table " +
      "(Index | Statutory / Form Reference | Action Item | Status):\n\n" +
      "1. **Pre-Formation** — choose entity name compliant with NRS 86.171 (availability check via SilverFlume), reserve name (NRS 86.176), select registered agent (NRS 86.231), confirm member/manager structure (member-managed vs manager-managed under NRS 86.291).\n" +
      "2. **Formation Filings** — file Articles of Organization with the Nevada Secretary of State (NRS 86.151), submit Initial List of Managers or Managing Members and State Business License application (NRS 76.100; NRS 86.263). Note filing fees and 24-hour/expedite options.\n" +
      "3. **Internal Governance** — adopt an Operating Agreement (NRS 86.286), document capital contributions (NRS 86.321), define distributions and allocations (NRS 86.343), and confirm whether the LLC will be member-managed or manager-managed.\n" +
      "4. **Tax & Regulatory** — obtain EIN from IRS, register for Nevada Modified Business Tax if employer (NRS 363B), check Commerce Tax thresholds (NRS 363C; $4M gross revenue), Sales/Use Tax permit if applicable (NRS 372), and any industry-specific licensing (gaming under NRS 463, cannabis under NRS 678, etc.).\n" +
      "5. **Ongoing Compliance** — Annual List of Managers/Members and State Business License renewal each year by anniversary month (NRS 86.263; NRS 76.130), maintain registered agent, keep records under NRS 86.241.\n\n" +
      "Each row must have a sequential Index within its category and an empty string for Status. " +
      "Headers must match exactly: Index, Statutory / Form Reference, Action Item, Status.",
  },
  {
    id: "builtin-nv-employment-review",
    title: "Nevada Employment Agreement Review",
    prompt_md:
      "## Nevada Employment Agreement Review\n\n" +
      "Review the uploaded employment agreement under Nevada law and produce a written analysis. " +
      "Deliver inline — do NOT call generate_docx unless the user explicitly asks for a document.\n\n" +
      "For each topic below, quote the relevant clause from the agreement, identify any conflict with Nevada law, and recommend revisions where appropriate:\n\n" +
      "1. **At-Will Status** — confirm clear at-will language; note any modification by handbook or oral promise.\n" +
      "2. **Compensation & Wage Compliance** — minimum wage compliance under NRS 608.250 (note Nevada's two-tier minimum wage repealed; check current statewide rate), overtime under NRS 608.018, final paycheck timing (NRS 608.020 / 608.030).\n" +
      "3. **Paid Leave** — accrued paid leave under NRS 608.0197 (employers with 50+ employees, 0.01923 hours per hour worked), and any PTO policies; pregnancy-related accommodations under NRS 613.335.\n" +
      "4. **Non-Compete** — assess enforceability under NRS 613.195: must be supported by valuable consideration, reasonable in time and geographic scope, not unduly burdensome, and not restrict customers the employee did not contact. Note the statutory blue-pencil mandate. Flag any clause restricting hourly (non-exempt) employees, which is prohibited.\n" +
      "5. **Non-Solicitation & Non-Disclosure** — confirm scope is reasonable; flag any improper restriction on solicitation of customers the employee did not contact (NRS 613.195(3)).\n" +
      "6. **Trade Secrets & IP Assignment** — review against Nevada Uniform Trade Secrets Act (NRS 600A) and confirm IP assignment carve-outs comply with NRS 600.500.\n" +
      "7. **Discrimination & Harassment** — confirm compliance with NRS 613.330 (protected classes include race, color, religion, sex, sexual orientation, gender identity, age, disability, national origin, and pregnancy).\n" +
      "8. **Arbitration / Dispute Resolution** — flag whether arbitration is mandatory, whether NRS Chapter 38 governs, and whether class-action waivers are present.\n" +
      "9. **Choice of Law & Venue** — confirm Nevada law and a Nevada venue; flag any foreign choice-of-law clause that could undercut NRS 613.195 protections.\n" +
      "10. **Termination & Severance** — review notice provisions, severance triggers, and release-of-claims requirements.\n\n" +
      "End with a short list of the top 3 risks and recommended fixes.",
  },
  {
    id: "builtin-nv-real-estate-disclosures",
    title: "Nevada Real Estate Disclosure Check",
    prompt_md:
      "## Nevada Real Estate Disclosure Check\n\n" +
      "Review the uploaded Nevada residential real estate documents (purchase agreement, disclosures, " +
      "HOA package, title commitment, etc.) and confirm the presence and completeness of all Nevada-required disclosures. " +
      "Deliver inline.\n\n" +
      "Check for and report on each of the following:\n\n" +
      "1. **Seller's Real Property Disclosure Form (SRPD)** — required by NRS 113.130 for most residential resales; confirm the form is the current state-approved version, fully completed, signed, and dated within the statutory window.\n" +
      "2. **Lead-Based Paint Disclosure** — required for pre-1978 homes under federal law (24 CFR Part 35), with EPA pamphlet.\n" +
      "3. **Common-Interest Community (CIC) Disclosures** — for properties in HOAs/condos, confirm full NRS Chapter 116 resale package: CC&Rs, bylaws, rules, current budget, reserve study summary, statement of assessments, recent meeting minutes, and the public-offering statement where applicable. Note the 5-day rescission period under NRS 116.4109.\n" +
      "4. **Open-Range / Agricultural Disclosure** — required where applicable under NRS 113.065.\n" +
      "5. **Construction Defect / SB 248 Notices** — for newer construction, confirm NRS Chapter 40 notices and any builder warranty disclosures.\n" +
      "6. **Methamphetamine / Hazardous Substance** — disclosure of any known prior meth contamination (NRS 113.140) and other material defects known to the seller.\n" +
      "7. **Water Rights / Wells** — for rural or larger parcels, confirm well permit status under NRS 534 and any water-rights disclosure.\n" +
      "8. **Property Tax / Special Assessments** — confirm disclosure of any special improvement districts, LID/SID assessments, or unusual tax characteristics.\n" +
      "9. **Title Commitment Review** — flag any easements, CC&R restrictions, or exceptions that materially affect use.\n" +
      "10. **Agency Disclosure** — confirm \"Duties Owed by a Nevada Real Estate Licensee\" form (NRS 645.252) and any \"Consent to Act\" form are present and signed.\n\n" +
      "List any missing or incomplete disclosure with the statutory citation and a one-line note on the risk it creates.",
  },
];
