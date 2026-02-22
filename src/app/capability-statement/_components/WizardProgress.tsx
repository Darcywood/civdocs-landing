'use client';

interface WizardProgressProps {
  currentStep: number;
  totalSteps?: number;
}

const STEPS = [
  { num: 1, label: 'Basics' },
  { num: 2, label: 'Portfolio' },
  { num: 3, label: 'Upload & Generate' },
] as const;

export default function WizardProgress({ currentStep, totalSteps = 3 }: WizardProgressProps) {
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-10">
      {/* Track and progress fill */}
      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gray-100" />
        <div
          className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#FF8C32] transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
        <div className="relative flex">
          {STEPS.map(({ num, label }) => {
            const isComplete = num < currentStep;
            const isCurrent = num === currentStep;
            const isActive = isComplete || isCurrent;
            return (
              <div
                key={num}
                className="flex flex-1 flex-col items-center"
                style={{ minWidth: 0 }}
              >
                <div
                  className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold shadow-sm ring-4 ring-white transition-all duration-200 ${
                    isComplete
                      ? 'bg-[#FF8C32] text-white'
                      : isCurrent
                        ? 'border-2 border-[#FF8C32] bg-white text-[#FF8C32]'
                        : 'border-2 border-gray-200 bg-white text-gray-400'
                  }`}
                >
                  {isComplete ? (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    num
                  )}
                </div>
                <span
                  className={`mt-2.5 text-center text-xs font-medium leading-tight ${
                    isActive ? 'text-[#FF8C32]' : 'text-gray-400'
                  }`}
                  style={{ maxWidth: '100%' }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
