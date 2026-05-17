# ⚖️ Lexify AI: Intelligent Legal Document Assistant

Lexify AI is a powerful, React-based web application designed to streamline legal document analysis and generation, built specifically with Indian legal standards and compliance in mind.

## ✨ Key Features

### 1. Document Analysis Engine
Upload legal documents (PDF, DOCX, TXT) and instantly receive AI-driven insights:
- **Risk Assessment**: Automatically flags missing clauses (e.g., Jurisdiction, Dispute Resolution, Indemnity).
- **Obligation Extraction**: Identifies key dates, payments, and deliverables.
- **Compliance Checking**: Verifies alignment with major Indian laws like the *Indian Contract Act 1872*, *Transfer of Property Act 1882*, and *Companies Act 2013*.

### 2. High-Realism Document Generation
Generate highly professional, formal Indian legal documents by simply providing bulleted insights (e.g., `• Buyer: John Doe`, `• Amount: ₹50,000`). Supported templates include:
- Professional Service Agreements
- Employment Contracts
- Property Lease Agreements
- Partnership Deeds
- Non-Disclosure Agreements (NDAs)
- Loan Agreements
- Sale Deeds

*Generated documents feature proper legal jargon, recitals, justified formatting, and dynamic markdown parsing, ready for immediate PDF export.*

### 3. Expert Network
Connect with vetted legal professionals across various specializations directly through the platform.

## 🛠️ Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Document Processing**: `pdfjs-dist` (local worker processing for stability), `mammoth` (for DOCX)
- **PDF Export**: `jspdf`
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jayapriya19-ai/lexify-ai.git
   cd lexify-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   *The application will typically be available at `http://localhost:5173`.*

## 📄 Legal Disclaimer
Lexify AI is designed to assist users in reviewing and generating legal drafts. **It is not a substitute for professional legal counsel.** Users should always consult with a qualified, registered legal practitioner before executing any generated agreements to ensure compliance with the latest laws and specific jurisdictional requirements.

---
*Built to make legal intelligence accessible, secure, and professional.*
