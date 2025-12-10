"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function MobilePdfViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number>(0);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl mx-auto rounded-xl border border-gray-200 bg-white p-4">
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<p className="text-center text-gray-500">Loading PDF…</p>}
        >
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              width={typeof window !== "undefined" ? window.innerWidth - 40 : 300}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      </div>
    </div>
  );
}
