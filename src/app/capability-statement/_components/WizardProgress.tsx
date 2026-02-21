'use client';

interface WizardProgressProps {
  currentStep: number;
  totalSteps?: number;
}

export default function WizardProgress({ currentStep, totalSteps = 3 }: WizardProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-1 items-center">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                step < currentStep
                  ? 'bg-[#FF8C32] text-white'
                  : step === currentStep
                    ? 'border-2 border-[#FF8C32] bg-white text-[#FF8C32]'
                    : 'border-2 border-gray-200 bg-white text-gray-400'
              }`}
            >
              {step < currentStep ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                step
              )}
            </div>
            {step < totalSteps && (
              <div
                className={`mx-2 h-0.5 flex-1 ${
                  step < currentStep ? 'bg-[#FF8C32]' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs font-medium text-gray-500">
        <span className={currentStep >= 1 ? 'text-[#FF8C32]' : ''}>Basics</span>
        <span className={currentStep >= 2 ? 'text-[#FF8C32]' : ''}>Portfolio</span>
        <span className={currentStep >= 3 ? 'text-[#FF8C32]' : ''}>Upload & Generate</span>
      </div>
    </div>
  );
}
