# LEXIFY – AI LEGAL ASSISTANT PLATFORM
## Technical & Project Report Documentation

---

## 1. COVER PAGE

### PROJECT TITLE: 
**LEXIFY – AI LEGAL ASSISTANT PLATFORM WITH COMPLIANCE AUDITING**

**A Project Report submitted in partial fulfillment of the requirements for the degree of Bachelor of Engineering / Technology in Computer Science & Engineering**

**Submitted By:**
*   **Student Name:** [STUDENT NAME PLACEHOLDER]
*   **Register Number:** [REGISTER NUMBER PLACEHOLDER]

**Under the Guidance of:**
*   **Guide Name & Designation:** [GUIDE NAME PLACEHOLDER]
*   **Department:** Department of Computer Science & Engineering
*   **College:** [COLLEGE NAME PLACEHOLDER]

**Academic Year:** 2025 – 2026

---

## 2. ABSTRACT

In the contemporary legal landscape of India, both individuals and small-to-medium enterprises (SMEs) face substantial hurdles when navigating complex statutory environments. High professional fees, a lack of rudimentary legal literacy, and the sheer volume of legal documents requiring execution daily create systemic inefficiencies. **Lexify** is an AI-powered legal assistance web application developed to bridge this accessibility gap. 

By leveraging a robust client-side parsing pipeline and state-of-the-art Natural Language Processing (NLP) models, Lexify facilitates real-time document analysis, legal risk detection, and automated document generation. The system parses PDF, DOCX, and TXT files directly within the client browser using highly optimized, locally bundled workers (`pdfjs-dist` and `mammoth`), extracting metadata, identifying structural omissions (such as missing jurisdiction or dispute resolution clauses), and calculating an **Indian Legal Compliance Score** based on statutory regimes (e.g., *Indian Contract Act 1872*, *Transfer of Property Act 1882*). 

Additionally, the platform incorporates a dynamic legal document drafting engine that parses user-entered unstructured specifications to generate print-ready, legally compliant agreements formatted according to traditional Indian registry standards. With integrated history management backed by Supabase and a secure user authentication layer, Lexify delivers a production-ready, client-centric tool designed to optimize legal operations, reduce dependency on expensive preliminary consultations, and democratize legal accessibility.

---

## 3. INTRODUCTION

### 3.1 Problem Statement
In India, the legal sector remains highly traditional, complex, and inaccessible to the layperson. Small business owners, freelancers, and individuals frequently sign contracts, leases, and agreements without understanding the hidden legal liabilities and structural risks contained within them. Standard legal services are prohibitively expensive for preliminary consultations, leading many to proceed without legal counsel. Moreover, drafting standard legal contracts requires precise knowledge of the relevant Indian Acts, causing draft generation to be slow, error-prone, and reliant on rigid, non-dynamic online templates.

### 3.2 Why This Project is Needed
There is an urgent need for an intermediate "Legal Tech" layer that empowers users to audit agreements before signing them. By providing an automated tool that flags missing clauses, highlights critical obligations, and generates highly realistic documents based on user input, Lexify prevents legal disputes before they arise. This app does not replace a lawyer, but acts as a robust preliminary compliance checker and high-quality drafting assistant.

### 3.3 Existing System Limitations
1.  **High Dependency and Costs:** Users must hire legal counsel even for routine drafts or basic analysis.
2.  **Static Online Templates:** Existing online tools generate generic, standard templates that do not dynamically parse and inject user details, leaving hardcoded placeholders like `[SELLER NAME]` in final outputs.
3.  **Security and Privacy Concerns:** Standard cloud-based analysis platforms require uploading highly sensitive legal documents to third-party servers, posing serious data privacy risks.
4.  **Lack of Indian Legal Specificity:** Global tools fail to evaluate documents against specific Indian acts (e.g., *Indian Stamp Act 1899*, *Registration Act 1908*).

### 3.4 Proposed Solution
Lexify addresses these limitations by offering a fast, client-side, TypeScript-validated application.
*   **Local File Parsing:** Processes PDFs and DOCX files directly inside the browser, protecting client data.
*   **Intelligent Variable Extraction:** Parses unstructured user requirements (e.g., "Seller: Kavita Singh, Delhi") and automatically maps them to formal agreement variables.
*   **Compliance Scoring:** Provides an analytical "Compliance Score" based on missing essential clauses under Indian law.
*   **Professional PDF Exports:** Exports structured documents with realistic formatting, stamp paper headers, and justified alignment.

---

## 4. OBJECTIVES

The primary objectives of the Lexify platform are:
1.  **Automated Ingestion:** Build a robust client-side parser to extract clean text from multi-page PDFs, DOCX, and TXT files securely.
2.  **Structural Analysis:** Create a rule-based NLP parser that detects critical legal clauses (Jurisdiction, Indemnity, Payment Terms, Termination, and Dispute Resolution).
3.  **Regulatory Benchmarking:** Assess legal text against Indian statutory frameworks and generate an interactive compliance score (0-100%).
4.  **High-Fidelity Document Generation:** Design a smart variable-extraction engine that takes simple notes and generates complete, formal, and realistic deeds (e.g., Lease Agreements, Sale Deeds) conforming to Indian registry standards.
5.  **Dynamic Rendering & Export:** Render documents with justified paragraph alignment and bold section headers in the UI, and compile them into clean PDFs with precise margin control.
6.  **Secure Synchronization:** Implement Supabase authentication and database rules to safely store analysis reports and generated contracts in a user history dashboard.

---

## 5. SCOPE OF THE PROJECT

### 5.1 What the Application Can Do
*   **Format-Agnostic Parsing:** Instantly extract text from PDFs (via local thread workers) and Word documents (by converting XML schemas to HTML using `mammoth`).
*   **Risk Identification:** High-contrast warnings indicating the severity of missing terms (e.g., "HIGH RISK: Missing Dispute Resolution clause under Section 28 of Indian Contract Act").
*   **Semantic Data Extraction:** Automatically isolate critical metadata (contracting parties, monetary values, execution dates).
*   **Registry-Ready Drafting:** Draft agreements featuring stamp paper headers, preamble formatting, and witness signatures.
*   **Cloud Staging:** Save, review, and delete history through a real-time synchronized cloud database.

### 5.2 Future Scalability
*   **Optical Character Recognition (OCR):** Integrate `tesseract.js` to process scanned documents or physical photographs of stamp papers.
*   **AI Conversational Agent:** Embed a retrieval-augmented generation (RAG) chatbot allowing users to ask questions about uploaded documents in real-time.
*   **Bilingual Translation:** Translate legalese to Hindi, Tamil, Telugu, and other regional Indian languages.
*   **Predictive Case Analytics:** Use machine learning models to analyze historic Indian Supreme Court judgments and predict contract dispute outcomes.

---

## 6. TECHNOLOGY STACK EXPLANATION

| Technology | What it is | Why it is used in Lexify | Key Advantages |
| :--- | :--- | :--- | :--- |
| **React.js (v18)** | Component-based JS library | To build an interactive, single-page reactive dashboard. | High rendering speed via Virtual DOM; highly reusable component system. |
| **TypeScript** | Statically typed superset of JS | Enforces strict data models for legal documents, preventing runtime errors. | Early compile-time bug detection; excellent autocompletion. |
| **Tailwind CSS** | Utility-first CSS framework | For constructing a premium, high-fidelity dark/light mode user interface. | Zero styling overhead; highly customizable; ultra-responsive layouts. |
| **Vite** | Next-generation frontend build tool | Powers the dev server and compiles optimized static assets for build. | Instant Hot Module Replacement (HMR); extremely fast build times using Esbuild. |
| **jsPDF (v3)** | Client-side PDF generation engine | To generate clean, downloadable legal documents directly in-browser. | Offline capability; exact programmatic coordinate control for printing. |
| **pdfjs-dist (v5)** | Mozilla's raw PDF reader engine | To extract clean text strings from highly structured, nested PDF binary files. | Bundled locally as a Vite web worker, avoiding network delays or external API fails. |
| **Mammoth.js** | Word document (.docx) parser | Converts raw `.docx` Office XML binaries into readable HTML text strings. | Focuses purely on semantic structures (paragraphs, tables) ignoring raw styling junk. |
| **Supabase** | Backend-as-a-Service (BaaS) | Manages OAuth/Email logins and stores document metadata and user history. | Built on top of PostgreSQL; provides secure Row Level Security (RLS) out-of-the-box. |

---

## 7. SYSTEM ARCHITECTURE

```
                      +-------------------------------------------------+
                      |                 USER BROWSER                    |
                      |                                                 |
                      |   +-----------------------------------------+   |
                      |   |               REACT UI                  |   |
                      |   |  - Dashboard      - Doc Analysis        |   |
                      |   |  - Doc Generator  - Expert Network      |   |
                      |   +-------------------+---------------------+   |
                      |                       |                         |
                      |                       v                         |
                      |   +-----------------------------------------+   |
                      |   |         LOCAL PARSING ENGINE            |   |
                      |   |  - pdfjs-dist Worker (Threaded)         |   |
                      |   |  - Mammoth Docx Parser                  |   |
                      |   +-------------------+---------------------+   |
                      |                       |                         |
                      |                       v                         |
                      |   +-----------------------------------------+   |
                      |   |         LEGAL ANALYSIS ENGINE           |   |
                      |   |  - NLP Keyword Matching                 |   |
                      |   |  - Compliance & Risk Auditing           |   |
                      |   +-------------------+---------------------+   |
                      |                       |                         |
                      +-----------------------|-------------------------+
                                              |
                                              | HTTPS Requests
                                              v
                      +-------------------------------------------------+
                      |                 SUPABASE SERVER                 |
                      |                                                 |
                      |   +-----------------------------------------+   |
                      |   |            AUTHENTICATION               |   |
                      |   |          - JWT / User Session           |   |
                      |   +-----------------------------------------+   |
                      |   |          POSTGRESQL DATABASE            |   |
                      |   |  - User Profiles   - Saved Analyses     |   |
                      |   |  - Row Level Security (RLS) Enforced    |   |
                      |   +-----------------------------------------+   |
                      +-------------------------------------------------+
```

### 7.1 Architecture Flow Descriptions
1.  **Frontend-Backend Separation:** The React frontend operates entirely on the client, fetching configuration parameters dynamically. Authentication tokens (JWTs) are handled securely via local storage.
2.  **The AI & Regex Analysis Flow:**
    *   The file is loaded via a file picker.
    *   Raw text is extracted and normalized (lowercase, punctuation removed).
    *   Regex dictionary models search for synonyms of mandatory clauses (e.g., `(?=.*\bdispute\b)(?=.*\barbitration\b)`).
    *   Scores are generated, metadata is extracted, and the final object is formatted.
3.  **PDF Generation Flow:**
    *   The `downloadPDFDocument` hook creates a new `jsPDF` instance.
    *   It applies custom margins (left: 20mm, right: 20mm).
    *   A simulated e-stamp or document header is drawn.
    *   The text-justify formatting engine splits strings based on line width and programmatically writes lines.
4.  **Database Synchronization Flow:**
    *   Once an analysis or generation is completed, the user can click "Save".
    *   Supabase checks the JWT. If verified, the JSON response is safely written to the user's specific row in `saved_analyses` or `saved_documents`.

---

## 8. MODULES EXPLANATION

### 8.1 Authentication Module
*   **Purpose:** Registers users and prevents unauthorized access to private legal documents.
*   **Details:** Uses Supabase client-side library to send email credentials. Once logged in, an active React context (`AuthContext.tsx`) manages the user state globally across all components.

### 8.2 Document Upload Module
*   **Purpose:** Drag-and-drop file ingestion zone.
*   **Details:** Built using React state and events (`onDragOver`, `onDrop`). It filters MIME types (`application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `text/plain`). It triggers specialized client-side web worker threads depending on the extension.

### 8.3 Legal Analysis Engine
*   **Purpose:** Audits the text and generates legal analytics.
*   **Details:** Utilizes keyword mappings representing essential requirements under the *Indian Contract Act, 1872*. It returns a comprehensive data object outlining:
    *   Identified parties and financial figures.
    *   Key dates.
    *   Recommendations to mitigate liabilities.

### 8.4 Risk Detection Engine
*   **Purpose:** Flags negative liabilities or dangerous missing terms.
*   **Details:** Scans for high-risk parameters, such as uncapped indemnity clauses, extreme termination periods, or lack of arbitration procedures, listing these with dynamic severity badges (High, Medium, Info).

### 8.5 Recommendation Engine
*   **Purpose:** Suggests concrete actions for the user based on the analysis.
*   **Details:** If a contract lacks an Arbitration clause, the engine generates a warning saying: *"RECOMMENDATION: Insert a standard Arbitration clause under the Arbitration and Conciliation Act, 1996 to avoid lengthy civil litigation in Indian courts."*

### 8.6 Report Generation Module
*   **Purpose:** Exports analyzed reports or generated contracts.
*   **Details:** Compiles the data into professional, aligned PDFs using `jsPDF` coordinates, featuring custom borders, dynamic page counts, and metadata.

### 8.7 Compliance Analysis Module
*   **Purpose:** Assigns a numeric compliance grade.
*   **Details:** Calculates a ratio based on the presence of five mandatory pillars under Indian law (Capacity, Free Consent, Lawful Consideration, Lawful Object, and Written Formatting), displaying an interactive visual gauge.

---

## 9. WORKFLOW

The functional execution flow of the Lexify platform proceeds as follows:

```
[ User Logins ] 
      │
      ▼
[ Choose Feature: Analysis OR Generation ]
      │
      ├───────────────────────── Analysis ─────────────────────────┐
      │                                                            │
      ▼                                                            ▼
[ Drag & Drop File ]                                     [ Select Legal Template ]
(PDF, DOCX, TXT)                                         (Lease, Sale Deed, NDA, etc.)
      │                                                            │
      ▼                                                            ▼
[ Local Web Worker Ingestion ]                           [ Type Specifications ]
(pdfjs-dist / mammoth extracts text)                    (e.g., "Seller: Kavita, Rent: 20k")
      │                                                            │
      ▼                                                            ▼
[ Rule-Based NLP Analysis ]                              [ Smart Parser Extraction ]
(Regex matching & risk checking)                         (Maps details to template variables)
      │                                                            │
      ▼                                                            ▼
[ View Dashboard Results ]                               [ View Formatted Preview ]
(Score, risks, and recommendations)                     (Justified serif layout with bold headings)
      │                                                            │
      └─────────────────────────┬──────────────────────────────────┘
                                │
                                ▼
                  [ Export PDF / Save to History ]
```

---

## 10. UI PAGES EXPLANATION

### 10.1 Home Page
*   **Description:** The welcome landing page. Designed with dark gradient visuals, offering a premium hero banner, core feature summaries, and direct call-to-actions (Get Started, Try Analyzer).
*   **Key UI Elements:** Smooth CSS transitions, interactive layout cards, and a minimalist floating nav bar.

### 10.2 Document Analysis Page
*   **Description:** The heart of the scanning suite. Features a large dashed drag-and-drop dashboard. Once a document is processed, it dynamically transitions into a split-screen dashboard:
    *   *Left Panel:* Overall compliance score gauge and metadata.
    *   *Right Panel:* Tabbed view displaying detected clauses, found risks, and recommendations.

### 10.3 Document Generation Page
*   **Description:** The automated legal drafting workspace.
    *   *Left Panel:* Let's users choose their template (e.g., "Property Lease Agreement") and type the specifications in a text area with example placeholders.
    *   *Right Panel:* Renders the generated document in a serif typeface resembling stamp paper with fully justified alignment. Contains an "Export PDF" button.

### 10.4 Expert Network Page
*   **Description:** A professional registry listing lawyers by category (Criminal, Corporate, Property, Labor). Users can search and click to simulate booking consultations.
*   **Key UI Elements:** Responsive grid cards with contact detail badges.

### 10.5 Pricing Page
*   **Description:** Tiered plans (Free, Pro, Enterprise) displaying features and subscription models.
*   **Key UI Elements:** Sleek pricing tables with highlights on target recommended selections.

---

## 11. DETAILED CODE EXPLANATION

### 11.1 File Ingestion Router (`DocumentAnalysis.tsx`)
This handles routing files according to their extension and routing to the correct parser:

```typescript
const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;
  
  setIsProcessing(true);
  setError(null);
  
  try {
    let content = '';
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      content = await readPdfContent(file);
    } else if (file.name.endsWith('.docx')) {
      content = await readDocxContent(file);
    } else {
      content = await readTxtContent(file);
    }
    
    // Send clean text to Analyzer
    const results = analyzeLegalDocument(content);
    setAnalysisResults(results);
  } catch (err: any) {
    setError(err.message || 'Failed to analyze document.');
  } finally {
    setIsProcessing(false);
  }
};
```

### 11.2 Threaded Web Worker PDF Reader (`pdfjs-dist`)
To avoid locking the browser thread when rendering large PDF arrays, a local web worker is declared:

```typescript
import * as pdfjsLib from 'pdfjs-dist';

// Configures local Vite import of PDF worker for deployment safety
import pdfjsWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;

const readPdfContent = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str || '')
      .join(' ');
    fullText += pageText + '\n';
  }
  return fullText;
};
```

### 11.3 Word XML Parser (`mammoth`)
Converts docx streams to raw structural text strings:

```typescript
import mammoth from 'mammoth';

const readDocxContent = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value; // Clean string representing file contents
};
```

### 11.4 Dynamic Document Generation Engine (`indianDocumentTemplates.ts`)
This parses raw unstructured lines into structured keys for legal templates:

```typescript
function parseInsights(insights: string): Record<string, string> {
  const data: Record<string, string> = {};
  const lines = insights.split('\n');
  
  for (const line of lines) {
    // Matches "• Key: Value" or "Key: Value"
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
```

---

## 12. DATABASE DESIGN

Lexify uses Supabase (PostgreSQL) to store user authentication and persistence states. The database schema contains two primary transactional tables.

### 12.1 Table: `saved_analyses`
Stores audit results from uploaded agreements.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | Primary Key, default `gen_random_uuid()` | Unique analysis ID. |
| `user_id` | `UUID` | Foreign Key -> `auth.users(id)`, cascade delete | Ties entry to logged-in user. |
| `document_name` | `TEXT` | Not Null | Original filename. |
| `compliance_score` | `INTEGER` | Not Null | Calculated score (0-100). |
| `metadata` | `JSONB` | Not Null | Stores extracted parties, value, and dates. |
| `risks` | `JSONB` | Not Null | Array of identified risks. |
| `recommendations` | `JSONB` | Not Null | Array of recommendations. |
| `created_at` | `TIMESTAMP` | default `now()` | Date of execution. |

### 12.2 Table: `saved_documents`
Stores generated drafts.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | Primary Key, default `gen_random_uuid()` | Unique document ID. |
| `user_id` | `UUID` | Foreign Key -> `auth.users(id)`, cascade delete | Ties entry to logged-in user. |
| `title` | `TEXT` | Not Null | Document Title (e.g. Lease). |
| `content` | `TEXT` | Not Null | Complete drafted text. |
| `created_at` | `TIMESTAMP` | default `now()` | Date of generation. |

### 12.3 Row Level Security (RLS) Policies
Both tables enforce RLS to ensure complete data confidentiality:
```sql
ALTER TABLE saved_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only read their own analyses" 
ON saved_analyses FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own analyses" 
ON saved_analyses FOR INSERT 
WITH CHECK (auth.uid() = user_id);
```

---

## 13. FEATURES LIST

### 13.1 Client-Side File Extraction
*   Supports PDF, DOCX, and TXT instantly.
*   Zero server-side file transmission ensures complete data sovereignty and data privacy under upcoming *Digital Personal Data Protection (DPDP) Act, 2023*.

### 13.2 Smart Legal Scanner
*   Examines text structures using complex regex dictionaries.
*   Finds key parameters like Indemnity, Jurisdiction, Payment, and Termination.

### 13.3 Regulatory Audit Scorecard
*   Calculates a numerical 0-100% compliance level dynamically.
*   Gives quick graphical signals to evaluate an agreement's stability.

### 13.4 Context-Aware Recommendation Engine
*   Identifies missing terms and suggests correction scripts.
*   Quotes relevant Indian laws (e.g. *Section 28 of Contract Act* for jurisdiction blocks).

### 13.5 Modern Document Generation Editor
*   Converts user-provided bullet notes into high-quality legal drafts.
*   Provides automated stamps, date ordinals, and justified layouts.

---

## 14. ADVANTAGES OF THE PROJECT

### 14.1 Benefits to Individuals
*   **Legal Literacy:** Demystifies complex legal terms into simple language.
*   **Cost Savings:** Helps draft basic NDAs, rent agreements, and receipts without high consultation fees.
*   **Risk Prevention:** Warns before signing agreements with unfair terms.

### 14.2 Benefits to Businesses (SMEs)
*   **Fast Operations:** Instantly draft or review routine B2B service contracts.
*   **Statutory Compliance:** Assures all business contracts conform to basic laws like the Indian Contract Act.
*   **Contract Lifecycle Management:** Provides a history log to keep track of old agreements.

### 14.3 Benefits to Legal Professionals
*   **Preliminary Drafting:** Speeds up the first draft process.
*   **Quick Audits:** Helps perform swift initial reviews of bulk contract files.

---

## 15. CHALLENGES FACED

### 15.1 Web Worker Failure with PDF.js
During compilation, standard CDN imports for Mozilla's PDF web workers caused deployment errors because hot-reloading (HMR) and Netlify builds couldn't resolve external scripts.

### 15.2 Complex PDF Text Ordering
Many PDF generators write text out of order. Extracting this resulted in garbled text paragraphs, which caused standard keyword matching algorithms to fail.

### 15.3 Submodule Build Failures on Netlify
When attempting to deploy the main project, the presence of a nested React project (`lexify-app`) containing its own `.git` history caused Netlify's clone script to abort during the initialization stage.

### 15.4 TypeScript Interface Matching
Differences between dynamic Supabase query returns and strict TypeScript state objects resulted in build-blocking compiler errors.

---

## 16. SOLUTIONS IMPLEMENTED

### 16.1 Local Worker Routing
We solved the PDF.js problem by importing the worker directly using Vite's URL asset parser:
```typescript
import pdfjsWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';
```
This bundles the worker locally and guarantees it runs in production on any CDN.

### 16.2 Smart String Cleaning
We implemented regex cleaners that normalize line breaks, spaces, and punctuations to allow reliable keyword matching regardless of how disorganized the PDF's internal text ordering was.

### 16.3 Removing Nested Git Submodules
We removed the `.git` directory inside the nested folders, cleaned the git cache globally using `git rm --cached`, and committed them as regular folders. This immediately resolved the Netlify initialization error.

### 16.4 Interface Synchronization
We defined strict custom interfaces (e.g. `interface AnalysisResult`) and used explicit type assertions, resolving all TypeScript compile blocks while maintaining full type safety.

---

## 17. TESTING

### 17.1 Functional Testing
We verified that every button, drop-down, and interactive tool works as intended, from uploading a document to downloading a PDF report.

### 17.2 UI Testing
We tested the design responsiveness across mobile devices, tablets, and desktop resolutions. The justified alignment and custom typography dynamically scale correctly without breaks.

### 17.3 File Upload Testing
We tested the ingestion module with a variety of files:
*   Perfect 20-page PDF files.
*   Word documents (`.docx`) containing rich formatting.
*   Plain TXT files.
*   Unsupported files (like `.png`), verifying that clean, clear error alerts are shown to the user.

### 17.4 PDF Generation Testing
We verified that the exported PDF file downloads correctly with precise margins, fits within normal print widths, and handles page breaks cleanly.

---

## 18. DEPLOYMENT

The system was deployed on **Netlify** with continuous integration linked directly to **GitHub**.

### 18.1 Build Configuration
*   **Git Provider:** GitHub
*   **Branch:** `main`
*   **Base Directory:** Root
*   **Build Command:** `npm run build`
*   **Publish Directory:** `dist`

### 18.2 Steps Implemented
1.  Created a clean repository on GitHub.
2.  Set up local Git tracking, committed the code, and pushed to the remote repository.
3.  Linked the GitHub repository to the Netlify dashboard.
4.  Configured the build settings and clicked **Deploy**. The project builds and is hosted at `https://lexify-ai.netlify.app`.

---

## 19. FUTURE ENHANCEMENTS

1.  **AI Chatbot Integration (RAG):** Embed a chat drawer next to the document viewer allowing users to ask questions like: *"What is the penalty if I pay rent late?"*
2.  **Scanned Stamp Paper OCR:** Add optical character recognition to analyze photos of stamped paper drafts.
3.  **Regional Indian Languages:** Support multi-language drafting for regional jurisdictions.
4.  **Case Prediction Engine:** Add a machine learning classifier to analyze historic Supreme Court verdicts and identify high-risk litigation clauses.

---

## 20. CONCLUSION

The **Lexify – AI Legal Assistant Platform** successfully addresses the challenge of legal accessibility in India. By enabling client-side analysis and realistic template drafting in a unified, modern web interface, it provides users with an intuitive tool to protect their interests before signing any contract. The clean TypeScript architecture, local web worker pipeline, and secure cloud synchronization make Lexify a scalable legal technology foundation.

---

## 21. VIVA QUESTIONS AND ANSWERS

#### Q1: What is the main purpose of Lexify?
**A:** Lexify is designed to be an AI-powered legal assistant that lets users securely scan legal files (PDF/DOCX/TXT) for compliance issues and draft realistic legal agreements based on simple specifications.

#### Q2: What framework and language were used to build Lexify?
**A:** The frontend is built using **React.js** with **TypeScript**, styled using **Tailwind CSS**, and compiled using **Vite**.

#### Q3: Why did you choose Vite over Create React App (CRA)?
**A:** Vite uses native ES modules and is powered by Esbuild, making development server boot times and hot-module replacement (HMR) virtually instant compared to CRA's Webpack configuration.

#### Q4: Why is it important that document parsing happens client-side?
**A:** In legal tech, data privacy is crucial. Processing files directly in the user's browser using local threads ensures sensitive legal information never has to leave their machine.

#### Q5: How does Lexify process PDF files?
**A:** We use Mozilla's **`pdfjs-dist`** library, configured with a local web worker to parse text streams asynchronously without blocking the main browser interface thread.

#### Q6: How does Mammoth.js handle DOCX files?
**A:** Mammoth reads the raw XML structure of a `.docx` container, extracting paragraphs, lists, and tables as clean text strings while ignoring complex, bloated XML styling rules.

#### Q7: What is the Indian Legal Compliance Score?
**A:** It is a calculated score out of 100 representing how many mandatory legal pillars (like Jurisdiction, Dispute Resolution, and Indemnity) are present in the audited text.

#### Q8: How does the document generation engine parse user notes?
**A:** It runs a custom regex-based parser that identifies key-value pairs (like `• Tenant: Ramesh Kumar`), extracts the variables, and injects them into high-fidelity legal templates.

#### Q9: What is jsPDF used for?
**A:** It is a client-side JavaScript library used to programmatically generate and download structured PDF files from our generated documents.

#### Q10: How did you fix the PDF web worker CDN issues?
**A:** By importing the worker locally through Vite asset packaging:
`import pdfjsWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url'`

#### Q11: What is Supabase?
**A:** Supabase is an open-source Backend-as-a-Service (BaaS) providing an instant PostgreSQL database, user authentication services, and Row Level Security.

#### Q12: Explain Row Level Security (RLS).
**A:** RLS is a security feature in PostgreSQL that restricts which database rows a user can view or edit, ensuring they can only access their own history logs even when sharing a table.

#### Q13: What happens if a contract doesn't have a Jurisdiction clause under Indian law?
**A:** Without it, disputes can be filed in any civil court where the cause of action arises, leading to expensive legal battles in distant locations. Lexify flags this as a "HIGH RISK".

#### Q14: How does Lexify support the Indian Contract Act, 1872?
**A:** Our analyzer specifically looks for essential contract components defined by this Act, such as lawful consideration, capacity of parties, and free consent.

#### Q15: Why did you use Tailwind CSS instead of vanilla CSS?
**A:** Tailwind provides a comprehensive set of low-level utility classes, allowing us to build a premium, highly responsive user interface without writing custom, bloated CSS files.

#### Q16: What causes the "Initializing Failed" error on Netlify deployments?
**A:** It is usually caused by nested subfolders containing their own `.git` directories, which Git treats as unlinked submodules that Netlify fails to clone during initialization.

#### Q17: How did you resolve the submodule deploy issue?
**A:** By running `git rm --cached <folder>` to remove the submodule link and deleting the nested `.git` folders so they are committed as standard directories.

#### Q18: What is TypeScript's role in this project?
**A:** It provides compile-time type safety. This ensures our complex legal analysis data objects conform to defined interfaces, preventing runtime errors in production.

#### Q19: What is `npx tsc --noEmit` used for?
**A:** It compiles the TypeScript project without generating output files, allowing us to verify that all code compiles perfectly with zero type errors.

#### Q20: How are risks categorized in Lexify?
**A:** They are categorized into **High Risk** (missing key legal clauses), **Medium Risk** (incomplete terms), and **Info** (general contractual metadata).

#### Q21: What is the purpose of the Expert Network?
**A:** It bridges the gap between digital assistance and real-world execution by connecting users directly with legal professionals categorized by specialty.

#### Q22: What does `whitespace-pre-wrap` do in Tailwind CSS?
**A:** It preserves line breaks and spaces, which is essential for rendering legal text formatting correctly in the browser.

#### Q23: How do you handle page breaks in jsPDF?
**A:** By tracking the current drawing height (`yPosition`). If writing another line would exceed the page margin, we call `pdf.addPage()` to start a fresh page.

#### Q24: What is the Arbitration and Conciliation Act, 1996?
**A:** An Indian act that governs out-of-court arbitration. Lexify recommends adding an arbitration clause to prevent slow, expensive litigation in Indian civil courts.

#### Q25: Why is Vite's build folder called `dist`?
**A:** It stands for "distribution". It contains the fully optimized, minified HTML, CSS, and JS files ready to be deployed directly to Netlify.

#### Q26: What is a React Hook?
**A:** Hooks (like `useState` or `useEffect`) let you manage state and other React features in functional components without writing class-based code.

#### Q27: Why did we wrap database queries in `useCallback`?
**A:** To memoize the functions, preventing unnecessary re-renders and satisfying ESLint's dependency requirements.

#### Q28: How does Lexify process DOCX files?
**A:** It reads the file array buffer and processes it using Mammoth.js to extract structural plain text.

#### Q29: Can users access each other's legal drafts?
**A:** No, because Supabase enforces strict PostgreSQL Row Level Security (RLS) checked against active JWT tokens.

#### Q30: What is the main future target for Lexify?
**A:** Integrating OCR for scanned paper documents and adding a Retrieval-Augmented Generation (RAG) legal chat assistant.

---

## 22. INTERVIEW QUESTIONS

#### Q1: How did you implement real-time client-side PDF text extraction in a React app without causing UI freezing?
**A:** I utilized Mozilla's `pdfjs-dist` library. To prevent the main UI thread from freezing during heavy binary parsing of multi-page documents, I configured `pdfjs-dist` to use a separate web worker thread. By declaring the worker globally using Vite's native URL asset bundling system, the main thread remains completely free to handle UI animations, while the worker handles the file extraction asynchronously in the background.

#### Q2: How did you handle TS interface mismatches between database return schemas and local UI state models?
**A:** I defined explicit TypeScript interfaces (such as `interface SavedAnalysis`) to represent our exact application models. When fetching unstructured or dynamic JSON data from Supabase (PostgreSQL `JSONB` columns), I utilized safe type assertions (`as AnalysisResult`) and implemented strict null-checking to gracefully handle any database inconsistencies without breaking compile-time type safety.

#### Q3: What security measures protect user-uploaded legal documents on this platform?
**A:** Since all file parsing and rule-based NLP scanning happen client-side within the user's browser memory, document contents are never transmitted to external servers. For history persistence, data is securely stored in a Supabase PostgreSQL instance guarded by strict Row Level Security (RLS) policies, verifying that only authenticated users can read or write their own documents.

#### Q4: If a generated PDF contains 5 pages of text, how does your PDF rendering function know where to introduce page breaks?
**A:** I implemented a dynamic coordinate tracking function inside `downloadPDFDocument()`. As the loop processes lines of text, it tracks the vertical draw coordinate (`yPosition`). If the next line of text would exceed the lower margin threshold (e.g., 270mm on an A4 page), the function calls `pdf.addPage()`, resets the `yPosition` to the top margin (e.g., 40mm), and continues drawing on the new page.

---

## 23. PRESENTATION PREPARATION NOTES

### 23.1 Core Pitch (First 60 Seconds)
"Good morning, members of the jury. Today we present **Lexify**, an AI-powered Legal Tech assistant designed to make legal compliance and contract drafting accessible and secure for everyday Indian citizens and SMEs. Currently, individuals sign complex contracts daily without understanding their liabilities, and consulting a lawyer for preliminary drafts is prohibitively expensive. Lexify solves this by enabling instant, 100% private client-side contract auditing and high-fidelity, compliant document generation."

### 23.2 Architecture Slide Explanation
*   Point out that the system has **zero server footprint for parsing**. This makes it incredibly secure and fast.
*   Explain the role of **TypeScript** in securing the application state.
*   Emphasize that the database layer uses **PostgreSQL Row Level Security** on Supabase to keep user data private.

### 23.3 The Perfect Demo Flow
1.  **Login:** Start by logging in via the clean Auth Modal.
2.  **Upload & Scan:** Drag and drop an agreement (like a Lease Agreement) containing a missing clause (e.g. no arbitration clause). Show the analysis dashboard dynamically render a compliance score and flag the high-risk omission.
3.  **Draft:** Go to the Document Generation tab. Select the "Property Lease Agreement" template, type simple specs, and show the beautiful, justified, serif agreement generate instantly.
4.  **Download:** Click "Export PDF" and show the clean downloaded PDF.
5.  **History:** Go to the history view to show that everything was securely synced in the cloud.

---

## 24. REFERENCES

1.  **React.js Documentation:** [https://react.dev/](https://react.dev/) (Comprehensive guide for Hooks and component architecture)
2.  **TypeScript Handbook:** [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/) (Type configurations and compiler setups)
3.  **jsPDF API Reference:** [https://rawgit.com/MrRio/jsPDF/master/docs/index.html](https://rawgit.com/MrRio/jsPDF/master/docs/index.html) (Programmatic PDF drawing guidelines)
4.  **Mozilla PDF.js Library:** [https://mozilla.github.io/pdf.js/](https://mozilla.github.io/pdf.js/) (PDF binary worker documentation)
5.  **Mammoth.js GitHub Repository:** [https://github.com/mwilliamson/mammoth.js](https://github.com/mwilliamson/mammoth.js) (DOCX XML transformation structures)
6.  **Tailwind CSS Documentation:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs) (Utility-first styling systems)
7.  **Supabase PostgreSQL docs:** [https://supabase.com/docs](https://supabase.com/docs) (Row Level Security configurations)
