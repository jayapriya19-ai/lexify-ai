import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  FileDown
} from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import { localDB } from '../lib/auth';
import { LegalDocumentAnalyzer } from '../lib/legalAnalysis';

import jsPDF from 'jspdf';
import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

interface AnalysisMetadata {
  documentType?: string;
  wordCount?: number;
  legalTermsFound?: number;
  documentComplexity?: string;
  complianceScore?: number;
  indianComplianceScore?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  indianCompliance?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recommendedPrecedents?: any[];
}

interface AnalysisResult {
  id: string;
  fileName: string;
  summary: string;
  keyPoints: string[];
  risks: string[];
  recommendations: string[];
  confidenceScore: number;
  metadata: AnalysisMetadata;
  createdAt: string;
}

export const DocumentAnalysis: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResult | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setSavedAnalyses] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();

  const loadSavedAnalyses = React.useCallback(async () => {
    if (!user) return;

    const { data, error } =
      await localDB.getDocumentAnalyses(user.id);

    if (error) {
      console.error(error);
    } else {
      setSavedAnalyses(data || []);
    }
  }, [user]);

  React.useEffect(() => {
    if (user) {
      loadSavedAnalyses();
    }
  }, [user, loadSavedAnalyses]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      e.type === 'dragenter' ||
      e.type === 'dragover'
    ) {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    if (
      e.dataTransfer.files &&
      e.dataTransfer.files[0]
    ) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    const allowedTypes = [
      'text/plain',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (
      !allowedTypes.includes(selectedFile.type) &&
      !selectedFile.name.endsWith('.txt')
    ) {
      setError(
        'Please upload PDF, DOCX or TXT file'
      );
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be below 10MB');
      return;
    }

    setFile(selectedFile);
    setError('');
    setAnalysisResult(null);
  };

  const analyzeDocument = async () => {
    if (!file || !user) return;

    setIsAnalyzing(true);
    setError('');

    try {
      const content = await readFileContent(file);

      const analyzer =
        new LegalDocumentAnalyzer(content);

      const result: AnalysisResult = {
        id: Date.now().toString(),
        fileName: file.name,
        summary:
          analyzer.generateEnhancedSummary(
            'detailed'
          ),
        keyPoints:
          analyzer.extractEnhancedKeyPoints(),
        risks:
          analyzer.identifyEnhancedRisks(),
        recommendations:
          analyzer.generateEnhancedRecommendations(),
        confidenceScore:
          analyzer.getEnhancedConfidenceScore(),
        metadata:
          analyzer.getEnhancedAnalysisMetadata(),
        createdAt: new Date().toISOString()
      };

      setAnalysisResult(result);

      await localDB.saveDocumentAnalysis(
        user.id,
        file.name,
        result
      );

      loadSavedAnalyses();

    } catch (err: any) {
      console.error(err);

      setError(
        err.message || 'Failed to analyze document'
      );

    } finally {
      setIsAnalyzing(false);
    }
  };

  const readFileContent = async (
    file: File
  ): Promise<string> => {

    const ext = file.name
      .split('.')
      .pop()
      ?.toLowerCase();

    // PDF
    if (ext === 'pdf') {

      const arrayBuffer =
        await file.arrayBuffer();

      const pdf =
        await pdfjsLib
          .getDocument({
            data: arrayBuffer
          })
          .promise;

      let fullText = '';

      for (
        let i = 1;
        i <= pdf.numPages;
        i++
      ) {

        const page =
          await pdf.getPage(i);

        const content =
          await page.getTextContent();

        const pageText =
          content.items
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((item: any) => item.str || '')
            .join(' ');

        fullText += pageText + '\n';
      }

      return fullText;
    }

    // DOCX
    if (
      ext === 'docx' ||
      ext === 'doc'
    ) {

      const arrayBuffer =
        await file.arrayBuffer();

      const result =
        await mammoth.extractRawText({
          arrayBuffer
        });

      return result.value;
    }

    // TXT
    return new Promise(
      (resolve, reject) => {

        const reader =
          new FileReader();

        reader.onload = (e) => {

          const content =
            e.target?.result as string;

          resolve(content);
        };

        reader.onerror = () =>
          reject(
            new Error(
              'Unable to read file'
            )
          );

        reader.readAsText(file);
      }
    );
  };

  const downloadPDFReport = () => {

    if (!analysisResult) return;

    const pdf = new jsPDF();

    const pageWidth =
      pdf.internal.pageSize.getWidth();

    const margin = 20;

    const maxWidth =
      pageWidth - margin * 2;

    let yPosition = 30;

    const addText = (
      text: string,
      fontSize = 12,
      isBold = false
    ) => {

      pdf.setFontSize(fontSize);

      pdf.setFont(
        pdf.getFont().fontName,
        isBold ? 'bold' : 'normal'
      );

      const lines =
        pdf.splitTextToSize(
          text,
          maxWidth
        );

      if (
        yPosition +
        lines.length * 10 >
        pdf.internal.pageSize.getHeight() - 20
      ) {

        pdf.addPage();
        yPosition = 30;
      }

      pdf.text(
        lines,
        margin,
        yPosition
      );

      yPosition +=
        lines.length * 7 + 5;
    };

    // HEADER
    pdf.setFillColor(14, 123, 127);

    pdf.rect(
      0,
      0,
      pageWidth,
      25,
      'F'
    );

    pdf.setTextColor(
      255,
      255,
      255
    );

    pdf.setFontSize(18);

    pdf.text(
      'LEGAL DOCUMENT ANALYSIS REPORT',
      margin,
      18
    );

    pdf.setTextColor(0, 0, 0);

    yPosition = 40;

    // INFO
    addText(
      `Document: ${analysisResult?.fileName ||
      'Unknown'
      }`,
      14,
      true
    );

    addText(
      `Generated: ${new Date().toLocaleString()}`,
      10
    );

    addText(
      `Confidence Score: ${analysisResult.confidenceScore}%`,
      12,
      true
    );

    yPosition += 10;

    // SUMMARY
    addText(
      'SUMMARY',
      14,
      true
    );

    addText(
      analysisResult.summary,
      11
    );

    // KEY POINTS
    addText(
      'KEY POINTS',
      14,
      true
    );

    analysisResult.keyPoints.forEach(
      (point, index) => {

        addText(
          `${index + 1}. ${point}`,
          10
        );
      }
    );

    // RISKS
    addText(
      'RISKS',
      14,
      true
    );

    analysisResult.risks.forEach(
      (risk, index) => {

        addText(
          `${index + 1}. ${risk}`,
          10
        );
      }
    );

    // RECOMMENDATIONS
    addText(
      'RECOMMENDATIONS',
      14,
      true
    );

    analysisResult.recommendations.forEach(
      (rec, index) => {

        addText(
          `${index + 1}. ${rec}`,
          10
        );
      }
    );

    // METADATA
    addText(
      'DOCUMENT INFO',
      14,
      true
    );

    addText(
      `Document Type: ${(
        analysisResult
          ?.metadata
          ?.documentType ||
        'GENERAL_DOCUMENT'
      )
        .replace('_', ' ')
        .toUpperCase()
      }`,
      10
    );

    addText(
      `Word Count: ${analysisResult
        ?.metadata
        ?.wordCount || 0
      }`,
      10
    );

    addText(
      `Compliance Score: ${analysisResult
        ?.metadata
        ?.complianceScore || 0
      }%`,
      10
    );

    // FOOTER
    const pageCount =
      pdf.getNumberOfPages();

    for (
      let i = 1;
      i <= pageCount;
      i++
    ) {

      pdf.setPage(i);

      pdf.setFontSize(8);

      pdf.text(
        `Page ${i} of ${pageCount}`,
        margin,
        pdf.internal.pageSize.getHeight() - 10
      );
    }

    pdf.save(
      `legal-analysis-${Date.now()}.pdf`
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="bg-white rounded-lg shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-6">
          AI Legal Document Analysis
        </h2>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        )}

        {/* UPLOAD */}
        <div
          className={`border-2 border-dashed p-8 rounded-lg text-center ${dragActive
              ? 'border-blue-500'
              : 'border-gray-300'
            }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >

          <Upload className="mx-auto mb-4" />

          <p className="mb-4">
            Upload PDF / DOCX / TXT
          </p>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) =>
              e.target.files?.[0] &&
              handleFileSelect(
                e.target.files[0]
              )
            }
          />

          <button
            onClick={() =>
              fileInputRef.current?.click()
            }
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Choose File
          </button>
        </div>

        {/* FILE INFO */}
        {file && (
          <div className="mt-4 flex justify-between items-center bg-gray-100 p-4 rounded">

            <div className="flex items-center gap-2">
              <FileText />
              <span>{file.name}</span>
            </div>

            <button
              onClick={analyzeDocument}
              disabled={isAnalyzing}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {isAnalyzing
                ? 'Analyzing...'
                : 'Analyze'}
            </button>
          </div>
        )}

        {/* RESULT */}
        {analysisResult && (
          <div className="mt-8 space-y-6">

            <div className="flex justify-between items-center">

              <h3 className="text-xl font-bold">
                Analysis Result
              </h3>

              <button
                onClick={downloadPDFReport}
                className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <FileDown size={18} />
                Download PDF
              </button>
            </div>

            <div className="bg-gray-50 p-5 rounded">
              <h4 className="font-bold mb-2">
                Summary
              </h4>

              <p>
                {analysisResult.summary}
              </p>
            </div>

            <div className="bg-blue-50 p-5 rounded">
              <h4 className="font-bold mb-3">
                Key Points
              </h4>

              <ul className="space-y-2">
                {analysisResult.keyPoints.map(
                  (point, index) => (
                    <li key={index}>
                      {index + 1}. {point}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="bg-red-50 p-5 rounded">
              <h4 className="font-bold mb-3">
                Risks
              </h4>

              <ul className="space-y-2">
                {analysisResult.risks.map(
                  (risk, index) => (
                    <li key={index}>
                      {index + 1}. {risk}
                    </li>
                  )
                )}
              </ul>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};