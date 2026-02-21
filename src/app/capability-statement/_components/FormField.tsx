'use client';

import { forwardRef } from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, hint, id, className = '', ...props }, ref) => {
    const inputId = id || `field-${label.replace(/\s/g, '-').toLowerCase()}`;
    return (
      <div className="space-y-1.5">
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          suppressHydrationWarning
          className={`block w-full rounded-lg border px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-[#FF8C32] focus:outline-none focus:ring-1 focus:ring-[#FF8C32] sm:text-sm ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {hint && !error && <p className="text-sm text-gray-500">{hint}</p>}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
