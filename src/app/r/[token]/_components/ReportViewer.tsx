'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ReportData {
  signedUrl: string;
  machineDescription: string;
  reportNumber: string;
  preparedFor: string;
  createdAt: string;
}

export default function ReportViewer({ token }: { token: string }) {
  const [report, setReport] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetch(`/api/risk-assessment/report/${token}`);
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Report not found');
          return;
        }
        const data = await res.json();
        setReport(data);
      } catch {
        setError('Failed to load report');
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#FF8C32] border-t-transparent" />
          <p className="text-gray-500 text-sm">Loading report…</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/homepage/pngcivdocs1000x400.png"
              alt="CivDocs"
              width={160}
              height={64}
              className="h-10 w-auto object-contain"
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">Report not found</h1>
          <p className="text-gray-500 mb-8">
            {error === 'Report not yet ready'
              ? 'This report is still being generated. Please check back in a moment.'
              : 'This link may have expired or the report doesn\'t exist.'}
          </p>
          <Link
            href="/free-tools/risk-assessment"
            className="inline-flex items-center justify-center rounded-full bg-[#FF8C32] px-6 py-3 font-semibold text-white hover:bg-[#e67a20] transition-colors"
          >
            Generate your own free report →
          </Link>
        </div>
      </div>
    );
  }

  const date = new Date(report.createdAt).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#F7F3EC] flex flex-col">
      {/* Header bar */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/">
            <Image
              src="/homepage/pngcivdocs1000x400.png"
              alt="CivDocs"
              width={140}
              height={56}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <a
            href={report.signedUrl}
            download
            className="inline-flex items-center gap-2 rounded-full bg-[#FF8C32] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e67a20] transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download PDF
          </a>
        </div>
      </header>

      {/* Report meta */}
      <div className="mx-auto w-full max-w-5xl px-4 py-4">
        <div className="rounded-xl bg-white border border-gray-100 px-5 py-4 flex flex-wrap gap-6">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Machine</p>
            <p className="mt-0.5 font-semibold text-gray-900">{report.machineDescription}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Report #</p>
            <p className="mt-0.5 font-semibold text-gray-900">{report.reportNumber}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Prepared for</p>
            <p className="mt-0.5 font-semibold text-gray-900">{report.preparedFor}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Generated</p>
            <p className="mt-0.5 font-semibold text-gray-900">{date}</p>
          </div>
        </div>
      </div>

      {/* PDF viewer */}
      <div className="flex-1 mx-auto w-full max-w-5xl px-4 pb-8">
        <iframe
          src={`${report.signedUrl}#toolbar=1&view=FitH`}
          title="Machine Risk Assessment Report"
          className="w-full rounded-xl border border-gray-200 bg-white shadow-sm"
          style={{ height: 'calc(100vh - 220px)', minHeight: '500px' }}
        />
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 py-4 text-center text-sm text-gray-400">
        Report hosted by{' '}
        <Link href="/" className="font-medium text-gray-600 hover:text-[#FF8C32] transition-colors">
          CivDocs
        </Link>
        {' '}· Plant risk management for civil contractors
      </footer>
    </div>
  );
}
