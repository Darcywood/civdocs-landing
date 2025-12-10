"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure worker - use CDN for better compatibility
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
}

interface MobilePdfViewerProps {
  file: string;
}

export default function MobilePdfViewer({ file }: MobilePdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    
    const updateWidth = () => {
      if (typeof window !== "undefined") {
        // Use container width minus padding (32px total)
        const containerWidth = Math.min(window.innerWidth - 32, 672); // max-w-2xl = 672px
        setPageWidth(containerWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("PDF load error:", error);
    setError("Failed to load PDF. Please try again.");
  };

  if (!mounted) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-2xl mx-auto rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading PDF...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-2xl mx-auto rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-red-500 mb-4">{error}</p>
            <a
              href={file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF8C32] hover:underline"
            >
              Open PDF in new tab
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl mx-auto rounded-xl border border-gray-200 bg-white p-4 shadow-sm overflow-x-auto">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Loading PDF...</p>
            </div>
          }
          className="flex flex-col items-center"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} className="mb-4 last:mb-0">
              <Page
                pageNumber={index + 1}
                width={pageWidth || 672}
                renderAnnotationLayer={false}
                renderTextLayer={true}
                className="shadow-sm"
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}

