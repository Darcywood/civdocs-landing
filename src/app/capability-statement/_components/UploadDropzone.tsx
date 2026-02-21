'use client';

import { useCallback, useEffect, useState } from 'react';

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_LOGO_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_PHOTO_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_TEAM_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_COVER_SIZE = 15 * 1024 * 1024; // 15MB for high-quality cover

export type UploadCategory = 'logo' | 'cover' | 'finishing' | 'projects' | 'plant' | 'team';

interface UploadDropzoneProps {
  category: UploadCategory;
  maxFiles: number;
  value: File[];
  onChange: (files: File[]) => void;
  maxSize?: number;
  labelOverride?: string;
  hintOverride?: string;
}

function FilePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-sm">
      <div className="aspect-square w-24 overflow-hidden bg-gray-200 sm:w-28">
        {src ? (
          <img
            src={src}
            alt={file.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">
            …
          </div>
        )}
      </div>
      <p className="max-w-[6rem] truncate px-2 py-1 text-xs text-gray-600 sm:max-w-[7rem]">
        {file.name}
      </p>
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-1 top-1 rounded bg-black/70 px-2 py-0.5 text-xs text-white transition-opacity hover:bg-black/90 sm:opacity-0 sm:group-hover:opacity-100"
      >
        Remove
      </button>
    </div>
  );
}

function getMaxSize(category: UploadCategory): number {
  switch (category) {
    case 'logo':
    case 'team':
      return MAX_TEAM_SIZE;
    case 'cover':
    case 'finishing':
      return MAX_COVER_SIZE;
    default:
      return MAX_PHOTO_SIZE;
  }
}

export default function UploadDropzone({
  category,
  maxFiles,
  value,
  onChange,
  maxSize,
  labelOverride,
  hintOverride,
}: UploadDropzoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const limit = maxSize ?? getMaxSize(category);
  const isMulti = maxFiles > 1;

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        return `${file.name}: JPG and PNG only`;
      }
      if (file.size > limit) {
        const mb = limit / (1024 * 1024);
        return `${file.name}: max ${mb}MB`;
      }
      return null;
    },
    [limit]
  );

  const processFiles = useCallback(
    (newFiles: FileList | File[]) => {
      setError(null);
      const files = Array.from(newFiles);
      const valid: File[] = [];
      const errs: string[] = [];

      for (const file of files) {
        const err = validateFile(file);
        if (err) errs.push(err);
        else valid.push(file);
      }

      if (errs.length) setError(errs[0]);

      const combined = [...value, ...valid].slice(0, maxFiles);
      onChange(combined);
    },
    [value, maxFiles, onChange, validateFile]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) processFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) processFiles(files);
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    const next = value.filter((_, i) => i !== index);
    onChange(next);
    setError(null);
  };

  const defaultLabel =
    category === 'logo'
      ? 'Logo'
      : category === 'cover'
        ? 'Cover photo'
        : category === 'finishing'
          ? 'Finishing photo'
          : category === 'projects'
            ? 'Project photos'
            : category === 'plant'
              ? 'Plant photos'
              : 'Team photos';

  const defaultHint =
    category === 'logo'
      ? '1 file, JPG/PNG, max 5MB'
      : category === 'cover'
        ? 'Used as the cover photo on page 1. Please use a high-quality image (JPG/PNG, max 15MB).'
        : category === 'finishing'
          ? 'Used as the final page background — choose a strong, high-quality site photo to leave a lasting impression (JPG/PNG, max 15MB).'
          : category === 'team'
            ? 'Up to 2 files, JPG/PNG, max 5MB each'
            : `Up to ${maxFiles} files, JPG/PNG, max 10MB each`;

  const label = labelOverride ?? defaultLabel;
  const hint = hintOverride ?? defaultHint;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-800">{label}</label>
      <p className="text-xs text-gray-500">{hint}</p>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`relative rounded-xl border-2 border-dashed p-6 text-center transition-all ${
          dragActive
            ? 'border-[#FF8C32] bg-orange-50/50'
            : 'border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-50'
        }`}
      >
        <input
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/jpg,image/png"
          multiple={isMulti}
          onChange={handleChange}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <p className="text-sm text-gray-600">
          {isMulti ? 'Drag and drop or click to select files' : 'Drag and drop or click to select a file'}
        </p>
      </div>
      {value.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {value.map((file, i) => (
            <FilePreview key={i} file={file} onRemove={() => removeFile(i)} />
          ))}
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
