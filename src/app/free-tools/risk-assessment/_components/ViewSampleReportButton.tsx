'use client';

interface ViewSampleReportButtonProps {
  onClick: () => void;
}

export default function ViewSampleReportButton({ onClick }: ViewSampleReportButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-full border-2 border-gray-300 bg-white px-8 py-3.5 font-semibold text-gray-900 hover:border-[#FF8C32] hover:text-[#FF8C32] transition-all"
    >
      View Sample Report
    </button>
  );
}
