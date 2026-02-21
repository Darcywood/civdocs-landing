import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  name: string;
  company: string;
  quote: string;
  logoSrc?: string;
  avatarGradient?: string;
  className?: string;
}

export function TestimonialCard({
  name,
  company,
  quote,
  logoSrc,
  avatarGradient,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'flex w-[280px] shrink-0 flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_4px_14px_rgba(0,0,0,0.06)] mx-2',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'relative h-12 w-12 shrink-0 overflow-hidden rounded-full',
            logoSrc ? 'bg-gray-100' : avatarGradient
          )}
          aria-hidden
        >
          {logoSrc && (
            <Image
              src={logoSrc}
              alt={`${name} - ${company}`}
              width={48}
              height={48}
              className="object-contain"
            />
          )}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{company}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-gray-700">{quote}</p>
    </div>
  );
}
