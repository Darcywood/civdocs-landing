'use client';

interface ColourPickerProps {
  logoFile: File | null;
  value: string;
  onChange: (colour: string) => void;
}

export default function ColourPicker({ value, onChange }: ColourPickerProps) {
  const displayValue = value && /^#[0-9A-Fa-f]{6}$/.test(value) ? value : '#1B3A5C';

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-800">
        Colour scheme
      </label>
      <p className="text-xs text-gray-500">
        Choose the accent colour for your capability statement.
      </p>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={displayValue}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-14 cursor-pointer rounded border border-gray-300 bg-transparent p-0"
        />
        <span
          className="h-8 w-8 rounded border border-gray-200"
          style={{ backgroundColor: displayValue }}
          aria-hidden
        />
      </div>
    </div>
  );
}
