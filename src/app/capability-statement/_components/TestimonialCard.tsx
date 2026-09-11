import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  name: string;
  company: string;
  quote: string;
  logoSrc?: string;
  avatarGradient?: string;
  className?: string;
  size?: 'default' | 'lg';
}

const WIDE_LOGOS = ['/logos-testomonials/9.png', '/logos-testomonials/10.png'];

export function TestimonialCard({
  name,
  company,
  quote,
  logoSrc,
  avatarGradient,
  className,
  size = 'default',
}: TestimonialCardProps) {
  const isWideLogo = !!logoSrc && WIDE_LOGOS.some((src) => logoSrc.includes(src));
  const isLarge = size === 'lg';

  return (
    <div
      className={cn(
        'mx-2 flex shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_4px_14px_rgba(0,0,0,0.06)]',
        isLarge
          ? 'h-[280px] w-[340px] min-w-[340px] gap-4 p-6'
          : 'h-[220px] w-[280px] min-w-[280px] gap-3 p-5',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'relative shrink-0 overflow-hidden',
            isWideLogo
              ? isLarge
                ? 'h-14 w-[5.5rem] rounded-lg bg-white'
                : 'h-12 w-[4.75rem] rounded-lg bg-white'
              : cn(
                  isLarge ? 'h-14 w-14' : 'h-12 w-12',
                  'rounded-full',
                  logoSrc ? 'bg-gray-100' : avatarGradient
                )
          )}
          aria-hidden
        >
          {logoSrc && (
            <Image
              src={logoSrc}
              alt={`${name} - ${company}`}
              width={isWideLogo ? (isLarge ? 88 : 76) : isLarge ? 56 : 48}
              height={isLarge ? 56 : 48}
              className={cn('h-full w-full object-contain', isWideLogo ? 'p-1' : '')}
            />
          )}
        </div>
        <div className="min-w-0">
          <p className={cn('font-semibold text-gray-900', isLarge && 'text-lg')}>{name}</p>
          <p className={cn('text-gray-500', isLarge ? 'text-base' : 'text-sm')}>{company}</p>
        </div>
      </div>
      <p
        className={cn(
          'leading-relaxed text-gray-700',
          isLarge ? 'line-clamp-6 text-lg' : 'line-clamp-5 text-sm'
        )}
      >
        {quote}
      </p>
    </div>
  );
}
