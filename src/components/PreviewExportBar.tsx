import { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import { resumeToPlainText } from '../utils/resumeToPlainText';
import { getExportWarningMessage } from '../utils/exportValidation';
import './PreviewExportBar.css';

export function PreviewExportBar() {
  const { resume } = useResume();
  const [copied, setCopied] = useState(false);
  const [pdfToast, setPdfToast] = useState(false);
  const warningMessage = getExportWarningMessage(resume);

  useEffect(() => {
    if (!pdfToast) return;
    const t = setTimeout(() => setPdfToast(false), 3000);
    return () => clearTimeout(t);
  }, [pdfToast]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    setPdfToast(true);
  };

  const handleCopyText = async () => {
    const text = resumeToPlainText(resume);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback or silent fail
    }
  };

  return (
    <div className="preview-export-bar no-print">
      {warningMessage && (
        <p className="preview-export-warning" role="status">
          {warningMessage}
        </p>
      )}
      <div className="preview-export-buttons">
        <button type="button" className="btn btn-primary" onClick={handlePrint}>
          Print / Save as PDF
        </button>
        <button type="button" className="btn btn-primary" onClick={handleDownloadPdf}>
          Download PDF
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleCopyText}>
          {copied ? 'Copied!' : 'Copy Resume as Text'}
        </button>
      </div>
      {pdfToast && (
        <div className="preview-export-toast" role="status" aria-live="polite">
          PDF export ready! Check your downloads.
        </div>
      )}
    </div>
  );
}
