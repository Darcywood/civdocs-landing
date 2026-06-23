import OptimizedImage from '@/components/OptimizedImage';

export default function DemoDayDocketPdfPreview() {
  return (
    <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <OptimizedImage
          src="/logbook/demodaydocket-preview.png"
          alt="Sample Day Docket PDF — hours, machine, job details and supervisor sign-off"
          width={1191}
          height={2223}
          className="w-full h-auto"
          sizes="(max-width: 768px) 90vw, 520px"
          quality={95}
        />
      </div>

      <div className="lg:pt-2">
        <h3 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] tracking-tight">
          What your client receives every day
        </h3>
        <div className="mt-5 space-y-4 text-lg text-gray-600 leading-relaxed">
          <p>
            When a logbook entry is approved, CivDocs automatically generates this Day Docket PDF and emails it to your
            client — no manual work on your end.
          </p>
          <p>
            In this example, <span className="font-medium text-gray-900">darcy</span> worked{' '}
            <span className="font-medium text-gray-900">9 hrs 30 min</span> on{' '}
            <span className="font-medium text-gray-900">GRD-019</span> at{' '}
            <span className="font-medium text-gray-900">Airport Long Term Car Park</span>, including{' '}
            <span className="font-medium text-gray-900">1 hr 30 min</span> overtime and site allowances. Supervisor{' '}
            <span className="font-medium text-gray-900">Luke</span> signed off on{' '}
            <span className="font-medium text-gray-900">17 Jun 2026</span>, locking the record.
          </p>
          <p>
            Your client gets the exact document you see here — a clear, daily record of what happened on site before
            the invoice arrives.
          </p>
        </div>
      </div>
    </div>
  );
}
