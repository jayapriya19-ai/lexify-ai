// Enhanced Indian Legal Document Templates with Real Legal Language and Dynamic Parsing
// Based on Indian legal practice and Kanoon.org legal database patterns

interface DocumentTemplate {
  type: string;
  title: string;
  description: string;
  template: (insights: string) => string;
  requiredClauses: string[];
  indianLegalRefs: string[];
}

export const INDIAN_DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    type: 'service_agreement',
    title: 'Professional Service Agreement',
    description: 'Comprehensive service agreement compliant with Indian Contract Act 1872',
    requiredClauses: ['scope', 'payment', 'gst', 'ip', 'termination', 'jurisdiction'],
    indianLegalRefs: ['Indian Contract Act 1872', 'GST Act 2017', 'Copyright Act 1957'],
    template: (insights: string) => generateServiceAgreement(insights)
  },
  {
    type: 'employment_contract',
    title: 'Employment Agreement',
    description: 'Employment contract with Indian labor law compliance',
    requiredClauses: ['designation', 'salary', 'benefits', 'termination', 'confidentiality'],
    indianLegalRefs: ['Industrial Disputes Act 1947', 'EPF Act 1952', 'Payment of Gratuity Act 1972'],
    template: (insights: string) => generateEmploymentContract(insights)
  },
  {
    type: 'lease_agreement',
    title: 'Property Lease Agreement',
    description: 'Residential/commercial lease with stamp duty compliance',
    requiredClauses: ['property', 'rent', 'deposit', 'maintenance', 'termination'],
    indianLegalRefs: ['Transfer of Property Act 1882', 'Registration Act 1908', 'Indian Stamp Act 1899'],
    template: (insights: string) => generateLeaseAgreement(insights)
  },
  {
    type: 'partnership_deed',
    title: 'Partnership Deed',
    description: 'Partnership agreement under Indian Partnership Act 1932',
    requiredClauses: ['partners', 'capital', 'profit_sharing', 'management', 'dissolution'],
    indianLegalRefs: ['Indian Partnership Act 1932', 'Income Tax Act 1961'],
    template: (insights: string) => generatePartnershipDeed(insights)
  },
  {
    type: 'nda',
    title: 'Non-Disclosure Agreement',
    description: 'Confidentiality agreement with IP protection',
    requiredClauses: ['confidential_info', 'obligations', 'exceptions', 'term', 'remedies'],
    indianLegalRefs: ['Indian Contract Act 1872', 'Copyright Act 1957', 'Trade Marks Act 1999'],
    template: (insights: string) => generateNDA(insights)
  },
  {
    type: 'loan_agreement',
    title: 'Loan Agreement',
    description: 'Personal/business loan agreement with security provisions',
    requiredClauses: ['loan_amount', 'interest', 'repayment', 'security', 'default'],
    indianLegalRefs: ['Indian Contract Act 1872', 'Negotiable Instruments Act 1881', 'SARFAESI Act 2002'],
    template: (insights: string) => generateLoanAgreement(insights)
  },
  {
    type: 'sale_deed',
    title: 'Sale Deed',
    description: 'Property sale deed with registration requirements',
    requiredClauses: ['property_description', 'consideration', 'title', 'possession', 'registration'],
    indianLegalRefs: ['Transfer of Property Act 1882', 'Registration Act 1908', 'Indian Stamp Act 1899'],
    template: (insights: string) => generateSaleDeed(insights)
  }
];

// -----------------------------------------------------------------------------
// UTILITIES
// -----------------------------------------------------------------------------

function parseInsights(insights: string): Record<string, string> {
  const data: Record<string, string> = {};
  const lines = insights.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^[\s•\-*]*([^:]+):\s*(.+)$/);
    if (match) {
      const key = match[1].trim().toLowerCase().replace(/\s+/g, '_');
      data[key] = match[2].trim();
    }
  }
  return data;
}

function getVal(data: Record<string, string>, keys: string[], fallback: string): string {
  for (const k of keys) {
    if (data[k] !== undefined && data[k] !== '') return data[k];
  }
  return fallback;
}

function getCurrentDateOrdinal(): string {
  const date = new Date();
  const day = date.getDate();
  const suffix = ["th", "st", "nd", "rd"][
    (day % 10 > 3 || Math.floor(day % 100 / 10) === 1) ? 0 : day % 10
  ];
  const month = date.toLocaleString('en-IN', { month: 'long' });
  const year = date.getFullYear();
  return `this **${day}${suffix} day of ${month}, ${year}**`;
}

// -----------------------------------------------------------------------------
// TEMPLATE GENERATORS
// -----------------------------------------------------------------------------

function generateServiceAgreement(insights: string): string {
  const data = parseInsights(insights);
  const provider = getVal(data, ['service_provider', 'provider', 'company'], '[SERVICE PROVIDER NAME, e.g., ABC Tech]');
  const client = getVal(data, ['client', 'customer'], '[CLIENT NAME, e.g., XYZ Corp]');
  const services = getVal(data, ['services', 'scope', 'work'], '[DESCRIPTION OF SERVICES]');
  const duration = getVal(data, ['duration', 'timeline', 'term'], '[DURATION, e.g., 6 months]');
  const value = getVal(data, ['total_value', 'value', 'price', 'cost'], '[AMOUNT]');
  const payment = getVal(data, ['payment', 'payment_terms'], '[PAYMENT TERMS, e.g., 50% advance]');
  
  return `**INDIA NON-JUDICIAL STAMP PAPER**
*(E-Stamp to be affixed as per respective State Stamp Act)*

**PROFESSIONAL SERVICE AGREEMENT**

THIS PROFESSIONAL SERVICE AGREEMENT (the "Agreement") is made and executed at [CITY/STATE] on ${getCurrentDateOrdinal()} (the "Effective Date") BY AND BETWEEN:

**${provider}**, a company/entity incorporated under the laws of India, having its principal place of business at [ADDRESS] (hereinafter referred to as the **"Service Provider"**, which expression shall, unless repugnant to the context or meaning thereof, be deemed to mean and include its successors-in-interest, administrators and permitted assigns) of the FIRST PART;

**AND**

**${client}**, a company/entity incorporated under the laws of India, having its principal place of business at [ADDRESS] (hereinafter referred to as the **"Client"**, which expression shall, unless repugnant to the context or meaning thereof, be deemed to mean and include its successors-in-interest, administrators and permitted assigns) of the SECOND PART.

(The Service Provider and the Client are hereinafter individually referred to as a "Party" and collectively as the "Parties").

**WHEREAS:**
A. The Service Provider is engaged in the business of providing professional services and possesses the requisite expertise, knowledge, and personnel.
B. The Client desires to engage the Service Provider to perform specific services, and the Service Provider has agreed to perform such services on the terms and conditions set out below.

**NOW, THEREFORE, IN CONSIDERATION OF THE MUTUAL COVENANTS CONTAINED HEREIN, THE PARTIES AGREE AS FOLLOWS:**

**1. SCOPE OF SERVICES**
1.1 The Service Provider agrees to provide the following services to the Client (the "Services"):
${services}
1.2 The Service Provider shall perform the Services in a diligent, professional, and workmanlike manner, in accordance with industry standards.

**2. TERM AND TIMELINE**
2.1 This Agreement shall commence on the Effective Date and shall remain valid for a period of **${duration}**, unless terminated earlier in accordance with Clause 6.

**3. CONSIDERATION AND PAYMENT TERMS**
3.1 In consideration for the Services rendered, the Client shall pay the Service Provider a total consideration of **${value}**.
3.2 The payment shall be released as per the following schedule: 
${payment}
3.3 All payments shall be subject to deduction of Tax Deducted at Source (TDS) as applicable under the Income Tax Act, 1961. The Service Provider shall raise valid GST invoices under the CGST/SGST Act, 2017.

**4. INTELLECTUAL PROPERTY RIGHTS**
4.1 Upon receipt of full payment, all intellectual property rights in the final deliverables customized exclusively for the Client shall vest absolutely with the Client under the Copyright Act, 1957.
4.2 Pre-existing intellectual property belonging to the Service Provider shall remain the exclusive property of the Service Provider.

**5. CONFIDENTIALITY**
5.1 Both Parties agree to maintain strict confidentiality of all proprietary information shared during the course of this Agreement. This obligation shall survive the termination of this Agreement for a period of three (3) years.

**6. TERMINATION**
6.1 Either Party may terminate this Agreement without cause by providing thirty (30) days prior written notice to the other Party.
6.2 In the event of a material breach, the non-breaching Party may terminate this Agreement immediately if the breach is not rectified within fifteen (15) days of receiving a written notice.

**7. DISPUTE RESOLUTION AND JURISDICTION**
7.1 Any dispute, controversy, or claim arising out of or relating to this Agreement shall be resolved through arbitration under the Arbitration and Conciliation Act, 1996 (as amended). The arbitral tribunal shall consist of a sole arbitrator mutually appointed by the Parties.
7.2 Subject to the arbitration clause, the courts of [CITY/STATE] shall have exclusive jurisdiction.

**IN WITNESS WHEREOF**, the Parties hereto have caused this Agreement to be executed by their duly authorized representatives on the date first above written.

**For ${provider}**                                          **For ${client}**

______________________                                   ______________________
Authorized Signatory                                     Authorized Signatory
Name:                                                    Name:

**WITNESSES:**
1. ____________________                                  2. ____________________`;
}

function generateEmploymentContract(insights: string): string {
  const data = parseInsights(insights);
  const employee = getVal(data, ['employee', 'name', 'candidate'], '[EMPLOYEE NAME]');
  const position = getVal(data, ['position', 'role', 'designation'], '[DESIGNATION]');
  const salary = getVal(data, ['salary', 'ctc', 'compensation'], '[SALARY AMOUNT]');
  const location = getVal(data, ['location', 'office'], '[WORK LOCATION]');
  const notice = getVal(data, ['notice_period', 'notice'], '[NOTICE PERIOD, e.g., 2 months]');
  const probation = getVal(data, ['probation', 'probation_period'], '[PROBATION PERIOD, e.g., 6 months]');

  return `**EMPLOYMENT AGREEMENT**

THIS EMPLOYMENT AGREEMENT (the "Agreement") is made and executed on ${getCurrentDateOrdinal()} BY AND BETWEEN:

**[COMPANY NAME]**, a company incorporated under the provisions of the Companies Act, 2013, having its registered office at [COMPANY ADDRESS] (hereinafter referred to as the **"Company"** or **"Employer"**);

**AND**

**${employee}**, an adult Indian inhabitant, residing at [EMPLOYEE ADDRESS] (hereinafter referred to as the **"Employee"**).

**WHEREAS:**
The Company desires to appoint the Employee, and the Employee has accepted the offer of employment on the terms and conditions set out in this Agreement.

**NOW, THEREFORE, IT IS AGREED AS FOLLOWS:**

**1. DESIGNATION AND POSTING**
1.1 The Employee is appointed to the position of **${position}**.
1.2 The initial place of posting shall be at the Company’s office in **${location}**. However, the Company reserves the right to transfer the Employee to any other branch, subsidiary, or affiliate across India or abroad as per business requirements.

**2. PROBATION AND CONFIRMATION**
2.1 The Employee shall be on probation for a period of **${probation}** from the date of joining.
2.2 Upon satisfactory completion of the probation period, the Employee's services may be confirmed in writing. Unless confirmed in writing, the Employee shall be deemed to continue on probation.

**3. COMPENSATION AND BENEFITS**
3.1 The Employee shall be entitled to an overall compensation of **${salary}** per annum (Cost to Company).
3.2 Statutory deductions including Provident Fund (PF), Employee State Insurance (ESI), Professional Tax, and Tax Deducted at Source (TDS) shall be made as per applicable laws (EPF Act 1952, Income Tax Act 1961, etc.).
3.3 The Employee shall be eligible for Gratuity as per the Payment of Gratuity Act, 1972, subject to completion of five (5) continuous years of service.

**4. DUTIES AND RESPONSIBILITIES**
4.1 The Employee shall devote their whole time, attention, and ability to the business of the Company.
4.2 During the term of employment, the Employee shall not engage, directly or indirectly, in any other business, trade, or profession without prior written consent from the Company.

**5. CONFIDENTIALITY AND NON-DISCLOSURE**
5.1 The Employee acknowledges that they will have access to confidential information and trade secrets of the Company. The Employee shall not disclose any such information to any third party during or after the termination of employment.

**6. NON-SOLICITATION AND NON-COMPETE**
6.1 The Employee agrees that during employment and for a period of twelve (12) months following termination, they shall not solicit the Company's clients or employees.

**7. TERMINATION**
7.1 Either Party may terminate this Agreement by serving a written notice of **${notice}** or by paying basic salary in lieu of notice.
7.2 During the probation period, the notice period shall be [PROBATION NOTICE, e.g., 15 days] on either side.
7.3 The Company reserves the right to terminate the Employee immediately without notice for gross misconduct, fraud, insubordination, or material breach of this Agreement.

**8. GOVERNING LAW AND JURISDICTION**
8.1 This Agreement shall be governed by and construed in accordance with the labor laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts at [COMPANY CITY].

**IN WITNESS WHEREOF**, the Parties have executed this Agreement as of the date first written above.

**For [COMPANY NAME]**                                    **EMPLOYEE**

______________________                                   ______________________
Authorized Signatory                                     ${employee}
Name: `;
}

function generateLeaseAgreement(insights: string): string {
  const data = parseInsights(insights);
  const landlord = getVal(data, ['landlord', 'owner', 'lessor'], '[LANDLORD NAME]');
  const tenant = getVal(data, ['tenant', 'lessee'], '[TENANT NAME]');
  const property = getVal(data, ['property', 'address', 'premises'], '[PROPERTY DESCRIPTION/ADDRESS]');
  const rent = getVal(data, ['rent', 'monthly_rent'], '[RENT AMOUNT]');
  const deposit = getVal(data, ['deposit', 'security_deposit'], '[DEPOSIT AMOUNT]');
  const period = getVal(data, ['period', 'lease_period', 'duration'], '[LEASE DURATION, e.g., 11 Months]');

  return `**INDIA NON-JUDICIAL STAMP PAPER**
*(To be stamped as per the relevant State Rent Control / Stamp Act)*

**RENT / LEASE AGREEMENT**

THIS LEASE AGREEMENT (the "Agreement") is made at [CITY] on ${getCurrentDateOrdinal()} BY AND BETWEEN:

**${landlord}**, an adult Indian inhabitant, residing at [LANDLORD ADDRESS], (hereinafter referred to as the **"Lessor/Landlord"**, which expression shall include his/her heirs, executors, and assigns) of the ONE PART;

**AND**

**${tenant}**, an adult Indian inhabitant, residing at [TENANT ADDRESS] (hereinafter referred to as the **"Lessee/Tenant"**, which expression shall include his/her heirs, executors, and assigns) of the OTHER PART.

**WHEREAS:**
The Lessor is the absolute and lawful owner of the premises situated at **${property}** (hereinafter referred to as the "Demised Premises"). The Lessee has approached the Lessor to let out the Demised Premises on lease for residential/commercial purposes.

**NOW THIS DEED WITNESSETH AS FOLLOWS:**

**1. GRANT OF LEASE AND TERM**
1.1 The Lessor hereby grants and the Lessee hereby accepts the lease of the Demised Premises for a period of **${period}** commencing from [START DATE].

**2. RENT AND SECURITY DEPOSIT**
2.1 The Lessee shall pay to the Lessor a monthly rent of **${rent}**. The rent shall be paid in advance on or before the 5th day of every calendar month.
2.2 The Lessee has paid an interest-free refundable Security Deposit of **${deposit}** vide [Cheque/NEFT/UPI details]. The Lessor acknowledges the receipt of the same. This deposit shall be refunded upon vacant handover of the premises, subject to deductions for damages or unpaid dues.

**3. UTILITIES AND MAINTENANCE**
3.1 The Lessee shall bear and pay all electricity, water, and gas consumption charges directly to the respective authorities based on actual meter readings.
3.2 Any regular society maintenance charges of [MAINTENANCE AMOUNT] shall be borne by the [LESSOR/LESSEE].

**4. COVENANTS OF THE LESSEE**
4.1 To use the Demised Premises exclusively for lawful [RESIDENTIAL/COMMERCIAL] purposes.
4.2 Not to sublet, assign, or part with the possession of the Demised Premises or any part thereof.
4.3 Not to make any structural alterations or modifications to the Demised Premises without the prior written consent of the Lessor.
4.4 To maintain the premises in good and tenantable condition subject to normal wear and tear.

**5. TERMINATION AND LOCK-IN PERIOD**
5.1 There shall be a lock-in period of [LOCK-IN MONTHS] months. If the Lessee vacates the premises before the expiry of the lock-in period, the Lessee shall be liable to pay rent for the remaining lock-in period.
5.2 After the lock-in period, either Party may terminate this Agreement by giving [NOTICE PERIOD] months advance written notice.

**6. REGISTRATION AND STAMP DUTY**
6.1 The cost of stamp duty and registration of this Agreement under the Registration Act, 1908 shall be borne equally by both Parties (or as mutually agreed).

**IN WITNESS WHEREOF**, the Parties hereto have set their respective hands on the day and year first above written.

**LESSOR/LANDLORD**                                       **LESSEE/TENANT**

______________________                                   ______________________
${landlord}                                               ${tenant}

**WITNESSES:**
1. ____________________                                  2. ____________________`;
}

function generatePartnershipDeed(insights: string): string {
  const data = parseInsights(insights);
  const partners = getVal(data, ['partners', 'parties'], '[PARTNER NAMES AND RATIOS, e.g., A (50%), B (50%)]');
  const firm = getVal(data, ['firm_name', 'name', 'business_name'], '[FIRM NAME]');
  const business = getVal(data, ['business', 'nature_of_business'], '[NATURE OF BUSINESS]');
  const capital = getVal(data, ['capital', 'investment'], '[TOTAL CAPITAL AMOUNT]');

  return `**INDIA NON-JUDICIAL STAMP PAPER**
*(To be stamped as per the Indian Stamp Act, 1899)*

**DEED OF PARTNERSHIP**

THIS DEED OF PARTNERSHIP is made and executed at [CITY] on ${getCurrentDateOrdinal()} BY AND BETWEEN:

${partners}
(Hereinafter collectively referred to as the **"Partners"**).

**WHEREAS:**
The Parties have agreed to form a partnership under the provisions of the Indian Partnership Act, 1932 to carry on the business of **${business}** under the name and style of **M/s. ${firm}**.

**NOW THIS DEED WITNESSETH AS UNDER:**

**1. NAME AND PLACE OF BUSINESS**
1.1 The business of the partnership shall be carried on under the name and style of **${firm}**.
1.2 The principal place of business shall be situated at [ADDRESS] or at such other places as the Partners may mutually decide.

**2. CAPITAL CONTRIBUTION**
2.1 The initial capital of the firm shall be **${capital}**, contributed by the Partners in their respective profit-sharing ratios, or as mutually agreed.
2.2 Interest on capital may be paid to the Partners at a rate not exceeding 12% per annum, subject to the provisions of Section 40(b) of the Income Tax Act, 1961.

**3. PROFIT AND LOSS SHARING**
3.1 The net profits and losses of the partnership business shall be divided and distributed among the Partners in the following ratios:
[SPECIFY RATIOS HERE]

**4. BANK ACCOUNT**
4.1 A bank account shall be opened in the name of the firm and shall be operated [JOINTLY / SEVERALLY] by the Partners.

**5. BOOKS OF ACCOUNTS**
5.1 The accounting year of the firm shall be the financial year from 1st April to 31st March.
5.2 Proper books of accounts shall be maintained and kept at the principal place of business, and every Partner shall have free access to inspect them.

**6. RETIREMENT, DEATH, OR INSOLVENCY**
6.1 The retirement, death, or insolvency of any Partner shall not immediately dissolve the firm. The remaining Partners may elect to continue the business.

**7. ARBITRATION**
7.1 In the event of any dispute or difference arising among the Partners regarding the affairs of the firm or interpretation of this Deed, the same shall be referred to arbitration under the Arbitration and Conciliation Act, 1996.

**IN WITNESS WHEREOF**, the Partners have signed this Deed of Partnership on the day and year first above written.

**PARTNER 1**                                            **PARTNER 2**
______________________                                   ______________________

**WITNESSES:**
1. ____________________                                  2. ____________________`;
}

function generateNDA(insights: string): string {
  const data = parseInsights(insights);
  const parties = getVal(data, ['parties', 'between'], '[PARTY 1 and PARTY 2]');
  const purpose = getVal(data, ['purpose', 'context'], '[PURPOSE OF DISCLOSURE, e.g., evaluating a business partnership]');
  const info = getVal(data, ['confidential_info', 'information'], '[DESCRIPTION OF CONFIDENTIAL INFORMATION]');
  const duration = getVal(data, ['duration', 'term'], '[TERM, e.g., 3 years]');

  return `**NON-DISCLOSURE AGREEMENT**

THIS NON-DISCLOSURE AGREEMENT (the "Agreement") is made on ${getCurrentDateOrdinal()} BY AND BETWEEN:

**${parties}**

(Individually referred to as a "Party" and collectively as the "Parties").

**WHEREAS:**
The Parties intend to engage in discussions regarding **${purpose}** (the "Purpose"). During these discussions, it may be necessary for one Party (the "Disclosing Party") to share certain proprietary and confidential information with the other Party (the "Receiving Party").

**NOW, THEREFORE, THE PARTIES AGREE AS FOLLOWS:**

**1. DEFINITION OF CONFIDENTIAL INFORMATION**
1.1 "Confidential Information" shall mean any and all technical and non-technical information including, but not limited to, data, know-how, trade secrets, software, source code, business plans, and financial information disclosed by the Disclosing Party.
1.2 Specifically, this includes: **${info}**.

**2. OBLIGATIONS OF THE RECEIVING PARTY**
2.1 The Receiving Party agrees to maintain the Confidential Information in strict confidence and to take all reasonable precautions to prevent unauthorized disclosure.
2.2 The Receiving Party shall use the Confidential Information solely for the Purpose and shall not disclose it to any third party without prior written consent.

**3. EXCEPTIONS**
3.1 The obligations of confidentiality shall not apply to information that:
(a) is or becomes publicly available without breach of this Agreement;
(b) was known to the Receiving Party prior to its disclosure;
(c) is independently developed by the Receiving Party; or
(d) is required to be disclosed by law or court order.

**4. TERM AND SURVIVAL**
4.1 This Agreement shall govern all communications from the Effective Date. The obligations of confidentiality shall survive for a period of **${duration}** from the date of disclosure.

**5. REMEDIES**
5.1 The Receiving Party acknowledges that a breach of this Agreement may cause irreparable harm to the Disclosing Party, for which monetary damages may be inadequate. Therefore, the Disclosing Party shall be entitled to seek injunctive relief under the Specific Relief Act, 1963.

**6. GOVERNING LAW**
6.1 This Agreement shall be governed by the laws of India, specifically the Indian Contract Act, 1872.

**IN WITNESS WHEREOF**, the Parties have executed this Agreement.

**DISCLOSING PARTY**                                     **RECEIVING PARTY**
______________________                                   ______________________`;
}

function generateLoanAgreement(insights: string): string {
  const data = parseInsights(insights);
  const lender = getVal(data, ['lender'], '[LENDER NAME]');
  const borrower = getVal(data, ['borrower'], '[BORROWER NAME]');
  const amount = getVal(data, ['loan_amount', 'amount'], '[LOAN AMOUNT]');
  const interest = getVal(data, ['interest_rate', 'interest'], '[INTEREST RATE, e.g., 12% p.a.]');
  const tenure = getVal(data, ['tenure', 'repayment', 'duration'], '[TENURE, e.g., 24 months]');
  const security = getVal(data, ['security', 'collateral', 'guarantor'], '[SECURITY/COLLATERAL/NONE]');

  return `**INDIA NON-JUDICIAL STAMP PAPER**

**LOAN AGREEMENT**

THIS LOAN AGREEMENT is executed on ${getCurrentDateOrdinal()} BY AND BETWEEN:

**${lender}**, residing at [LENDER ADDRESS] (hereinafter referred to as the **"Lender"**);
AND
**${borrower}**, residing at [BORROWER ADDRESS] (hereinafter referred to as the **"Borrower"**).

**WHEREAS:**
The Borrower has requested the Lender for a financial loan for the purpose of [LOAN PURPOSE], and the Lender has agreed to grant the loan on the terms set forth below.

**NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:**

**1. LOAN AMOUNT AND DISBURSEMENT**
1.1 The Lender agrees to lend and the Borrower agrees to borrow a sum of **${amount}** (the "Principal Amount").
1.2 The loan is disbursed via [Bank Transfer/Cheque No. Details] dated [DATE].

**2. INTEREST AND REPAYMENT**
2.1 The loan shall carry an interest rate of **${interest}**.
2.2 The Borrower agrees to repay the Principal Amount along with interest over a tenure of **${tenure}** in Equated Monthly Installments (EMIs).

**3. SECURITY / GUARANTEE**
3.1 To secure the repayment, the Borrower has provided the following security: **${security}**.
3.2 In the event of default, the Lender shall have the right to proceed against the security under applicable laws.

**4. EVENTS OF DEFAULT**
4.1 The following shall constitute an Event of Default:
(a) Failure to pay any EMI for two consecutive months.
(b) Breach of any representation or warranty made by the Borrower.
(c) In case of bounced cheques, the Lender may initiate proceedings under Section 138 of the Negotiable Instruments Act, 1881.

**5. GOVERNING LAW**
5.1 This Agreement is governed by the laws of India.

**IN WITNESS WHEREOF**, the Parties have executed this Loan Agreement.

**LENDER**                                               **BORROWER**
______________________                                   ______________________`;
}

function generateSaleDeed(insights: string): string {
  const data = parseInsights(insights);
  const seller = getVal(data, ['seller', 'vendor'], '[SELLER NAME]');
  const buyer = getVal(data, ['buyer', 'purchaser'], '[BUYER NAME]');
  const property = getVal(data, ['property', 'description', 'details'], '[PROPERTY DESCRIPTION]');
  const price = getVal(data, ['sale_price', 'price', 'consideration'], '[SALE CONSIDERATION AMOUNT]');

  return `**INDIA NON-JUDICIAL STAMP PAPER**
*(To be stamped as per the respective State Stamp Act)*

**DEED OF ABSOLUTE SALE**

THIS DEED OF ABSOLUTE SALE is made and executed at [CITY] on ${getCurrentDateOrdinal()} BY AND BETWEEN:

**${seller}**, an adult Indian inhabitant, residing at [SELLER ADDRESS] (hereinafter referred to as the **"Vendor"**, which expression shall mean and include his/her heirs, legal representatives, executors, administrators and assigns) of the FIRST PART;

**AND**

**${buyer}**, an adult Indian inhabitant, residing at [BUYER ADDRESS] (hereinafter referred to as the **"Purchaser"**, which expression shall mean and include his/her heirs, legal representatives, executors, administrators and assigns) of the SECOND PART.

**WHEREAS:**
A. The Vendor is the absolute and lawful owner in possession of the immovable property bearing **${property}** (hereinafter referred to as the "Schedule Property").
B. The Vendor has acquired the Schedule Property vide Sale Deed dated [DATE] registered as Document No. [DOC NO.] in the office of the Sub-Registrar, [LOCATION].
C. The Vendor has offered to sell the Schedule Property to the Purchaser for a total sale consideration of **${price}**, and the Purchaser has agreed to purchase the same.

**NOW THIS DEED OF SALE WITNESSETH AS FOLLOWS:**

**1. TRANSFER OF OWNERSHIP**
1.1 In consideration of the sum of **${price}** paid by the Purchaser to the Vendor, the receipt of which the Vendor hereby acknowledges, the Vendor doth hereby grant, convey, transfer, and assign unto the Purchaser the Schedule Property absolutely and forever.

**2. COVENANTS OF THE VENDOR**
2.1 The Vendor hereby assures the Purchaser that the Schedule Property is free from all encumbrances, charges, mortgages, liens, lis pendens, attachments, or any other defects in title.
2.2 The Vendor confirms that all property taxes, water charges, electricity bills, and statutory dues pertaining to the Schedule Property up to the date of execution of this Sale Deed have been fully paid.

**3. HANDOVER OF POSSESSION**
3.1 The Vendor has today delivered the vacant and peaceful physical possession of the Schedule Property to the Purchaser along with all original title deeds.

**4. INDEMNITY**
4.1 The Vendor hereby agrees to indemnify and keep harmless the Purchaser from any claims, disputes, or liabilities arising out of any defect in title or non-payment of statutory dues prior to this date.

**5. REGISTRATION**
5.2 This Sale Deed is being registered under the Registration Act, 1908 at the office of the Sub-Registrar, [LOCATION]. All stamp duty and registration charges have been borne by the Purchaser.

**SCHEDULE OF PROPERTY**
(Detailed description of the property including boundaries)
North:
South:
East:
West:

**IN WITNESS WHEREOF**, the Vendor and the Purchaser have signed this Deed of Absolute Sale on the day, month, and year first above written.

**VENDOR**                                               **PURCHASER**
______________________                                   ______________________
${seller}                                                ${buyer}

**WITNESSES:**
1. ____________________                                  2. ____________________`;
}

export function getDocumentTemplate(type: string): DocumentTemplate | undefined {
  return INDIAN_DOCUMENT_TEMPLATES.find(template => template.type === type);
}

export function generateIndianDocument(type: string, insights: string): string {
  const template = getDocumentTemplate(type);
  if (!template) {
    throw new Error(`Template not found for document type: ${type}`);
  }
  return template.template(insights);
}