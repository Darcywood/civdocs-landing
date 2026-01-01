# CivDocs Mobile-First Refactor Plan

**Generated:** 2025-01-27  
**Based on:** RESPONSIVE_DESIGN_DIAGNOSTIC_REPORT.md  
**Target:** Standardize UI for iPhone SE → Pro Max, Android, iPad, Desktop, Capacitor WebView

---

## Executive Summary

This plan outlines a comprehensive refactoring strategy to transform the CivDocs codebase into a mobile-first, responsive design system that works seamlessly across all devices and Capacitor WebView environments.

### Core Objectives:
1. ✅ Create global mobile shell component
2. ✅ Implement safe-area utilities
3. ✅ Standardize responsive paddings
4. ✅ Remove all pixel-based layout hacks
5. ✅ Standardize vertical spacing with `space-y-*`
6. ✅ Ensure forms, cards, modals, wizards, steppers match new system
7. ✅ Ensure Capacitor compatibility
8. ✅ Avoid desktop layout regressions

---

## Phase 1: Foundation Setup

### 1.1 Create Safe-Area Utilities

**File:** `src/app/globals.css`

**Add to existing CSS:**

```css
/* Safe Area Insets for iOS and Android */
@supports (padding: max(0px)) {
  :root {
    --safe-area-inset-top: env(safe-area-inset-top, 0px);
    --safe-area-inset-right: env(safe-area-inset-right, 0px);
    --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
    --safe-area-inset-left: env(safe-area-inset-left, 0px);
  }
}

/* Safe Area Utility Classes */
.pt-safe {
  padding-top: max(1rem, env(safe-area-inset-top, 1rem));
}

.pb-safe {
  padding-bottom: max(1rem, env(safe-area-inset-bottom, 1rem));
}

.pl-safe {
  padding-left: max(1rem, env(safe-area-inset-left, 1rem));
}

.pr-safe {
  padding-right: max(1rem, env(safe-area-inset-right, 1rem));
}

.px-safe {
  padding-left: max(1rem, env(safe-area-inset-left, 1rem));
  padding-right: max(1rem, env(safe-area-inset-right, 1rem));
}

.py-safe {
  padding-top: max(1rem, env(safe-area-inset-top, 1rem));
  padding-bottom: max(1rem, env(safe-area-inset-bottom, 1rem));
}

.p-safe {
  padding-top: max(1rem, env(safe-area-inset-top, 1rem));
  padding-right: max(1rem, env(safe-area-inset-right, 1rem));
  padding-bottom: max(1rem, env(safe-area-inset-bottom, 1rem));
  padding-left: max(1rem, env(safe-area-inset-left, 1rem));
}

/* Safe Area Margin Utilities */
.mt-safe {
  margin-top: max(1rem, env(safe-area-inset-top, 1rem));
}

.mb-safe {
  margin-bottom: max(1rem, env(safe-area-inset-bottom, 1rem));
}
```

**Rationale:**
- Uses CSS `env()` function for safe-area insets
- Falls back to `1rem` for non-notched devices
- Provides padding and margin variants
- Works in Capacitor WebView

---

### 1.2 Update Viewport Meta Tag

**File:** `src/app/layout.tsx`

**Update HTML head:**

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, viewport-fit=cover" 
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

**Key Change:** `viewport-fit=cover` enables safe-area insets on iOS devices

---

### 1.3 Create Global Mobile Shell Component

**File:** `src/components/MobileShell.tsx` (NEW FILE)

```tsx
'use client';

import { ReactNode } from 'react';

interface MobileShellProps {
  children: ReactNode;
  className?: string;
  /**
   * If true, uses max-w-xl for mobile-first constraint
   * If false, allows full width (for marketing pages that need wider layouts)
   */
  constrained?: boolean;
}

export default function MobileShell({ 
  children, 
  className = '',
  constrained = true 
}: MobileShellProps) {
  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 ${className}`}>
      <div 
        className={`
          ${constrained ? 'max-w-xl' : 'max-w-full'} 
          mx-auto 
          w-full 
          px-4 
          py-4 
          sm:px-6 
          lg:px-8
          pt-safe
          pb-safe
        `}
      >
        {children}
      </div>
    </div>
  );
}
```

**Usage Pattern:**
- **Constrained pages** (forms, app pages): `<MobileShell constrained>{children}</MobileShell>`
- **Marketing pages** (homepage, product pages): `<MobileShell constrained={false}>{children}</MobileShell>`

**Rationale:**
- Mobile-first: `max-w-xl` (576px) for constrained content
- Responsive padding: `px-4 py-4 sm:px-6 lg:px-8`
- Safe-area padding: `pt-safe pb-safe`
- Dark theme base: `bg-slate-950 text-slate-100`
- Flexible constraint option for marketing vs app pages

---

### 1.4 Create Responsive Spacing Utilities

**File:** `src/app/globals.css` (ADDITION)

```css
/* Responsive Spacing Scale */
/* Mobile-first spacing that scales appropriately */

/* Section Spacing */
.section-spacing {
  padding-top: 3rem; /* py-12 */
  padding-bottom: 3rem;
}

@media (min-width: 640px) {
  .section-spacing {
    padding-top: 4rem; /* sm:py-16 */
    padding-bottom: 4rem;
  }
}

@media (min-width: 1024px) {
  .section-spacing {
    padding-top: 5rem; /* lg:py-20 */
    padding-bottom: 5rem;
  }
}

/* Container Padding */
.container-padding {
  padding-left: 1rem; /* px-4 */
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container-padding {
    padding-left: 1.5rem; /* sm:px-6 */
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container-padding {
    padding-left: 2rem; /* lg:px-8 */
    padding-right: 2rem;
  }
}
```

**Note:** These utilities are optional - prefer Tailwind classes `py-12 sm:py-16 lg:py-20` for consistency.

---

## Phase 2: Component Standardization

### 2.1 Create Standardized Header Component

**File:** `src/components/Header.tsx` (NEW FILE)

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  /**
   * If true, header is sticky. If false, static.
   */
  sticky?: boolean;
  /**
   * Background color override (default: bg-white/95 backdrop-blur-sm)
   */
  bgClassName?: string;
}

export default function Header({ sticky = true, bgClassName }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsProductDropdownOpen(false);
    setIsResourcesDropdownOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    document.body.classList.add('overflow-hidden');
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  const toggleResourcesDropdown = () => {
    setIsResourcesDropdownOpen(!isResourcesDropdownOpen);
  };

  // Calculate header height dynamically for mobile menu positioning
  const headerHeight = 'h-16 sm:h-20'; // 64px mobile, 80px desktop

  return (
    <>
      <header 
        className={`
          ${sticky ? 'sticky top-0' : 'relative'} 
          z-[80] 
          ${bgClassName || 'bg-white/95 backdrop-blur-sm'} 
          border-b 
          border-gray-200
          pt-safe
        `}
      >
        <div className="max-w-xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between ${headerHeight}`}>
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="/CivDocs no lift.svg" 
                alt="CivDocs"
                width={200}
                height={64}
                className="h-12 sm:h-16 w-auto"
              />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Desktop nav items */}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center justify-center">
              <button 
                onClick={toggleMobileMenu}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                aria-label="Toggle mobile menu"
              >
                <div className="w-5 h-5 relative flex items-center justify-center">
                  <span className={`absolute w-5 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                  }`}></span>
                  <span className={`absolute w-5 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`absolute w-5 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 bg-black/20 z-[70] lg:hidden"
              style={{ top: 'var(--header-height, 64px)' }}
              onClick={closeMobileMenu}
            />
        
            {/* Menu Card */}
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
              className="fixed z-[75] bg-gray-50 rounded-3xl shadow-2xl overflow-hidden lg:hidden max-h-[calc(100vh-var(--header-height,64px))] overflow-y-auto"
              style={{ 
                top: 'var(--header-height, 64px)',
                left: 'max(1rem, env(safe-area-inset-left, 1rem))',
                right: 'max(1rem, env(safe-area-inset-right, 1rem))',
              }}
            >
              <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-2">
                {/* Menu content */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
```

**Key Changes:**
- ✅ Removed `top-[88px]` hard-coded value
- ✅ Uses CSS variable `--header-height` for dynamic positioning
- ✅ Hamburger icon uses `h-0.5` instead of `h-[2px]`
- ✅ Responsive header height: `h-16 sm:h-20`
- ✅ Safe-area aware mobile menu positioning
- ✅ Consistent padding: `px-4 sm:px-6 lg:px-8`

---

### 2.2 Create Standardized Form Components

**File:** `src/components/forms/FormInput.tsx` (NEW FILE)

```tsx
'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          ref={ref}
          className={`
            w-full 
            px-4 
            py-3 
            border 
            rounded-xl 
            focus:ring-2 
            focus:ring-[#FF8C32] 
            focus:border-transparent 
            outline-none 
            transition-all 
            text-gray-900 
            dark:text-gray-100
            dark:bg-gray-800
            dark:border-gray-700
            ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
```

**File:** `src/components/forms/FormCard.tsx` (NEW FILE)

```tsx
'use client';

import { ReactNode } from 'react';

interface FormCardProps {
  children: ReactNode;
  className?: string;
}

export default function FormCard({ children, className = '' }: FormCardProps) {
  return (
    <div className={`
      bg-white 
      dark:bg-gray-900
      rounded-2xl 
      shadow-xl 
      p-6 
      sm:p-8 
      space-y-4
      ${className}
    `}>
      {children}
    </div>
  );
}
```

**File:** `src/components/forms/FormContainer.tsx` (NEW FILE)

```tsx
'use client';

import { ReactNode } from 'react';
import MobileShell from '../MobileShell';

interface FormContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  backLink?: { href: string; label: string };
}

export default function FormContainer({ 
  children, 
  title, 
  subtitle,
  backLink 
}: FormContainerProps) {
  return (
    <MobileShell constrained>
      <div className="flex flex-col min-h-screen">
        {/* Back link */}
        {backLink && (
          <div className="mb-6 pt-safe">
            <a 
              href={backLink.href}
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-[#FF8C32] transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {backLink.label}
            </a>
          </div>
        )}

        {/* Form content */}
        <div className="flex-1 flex items-center justify-center py-8 sm:py-12">
          <div className="w-full max-w-md">
            {(title || subtitle) && (
              <div className="text-center mb-8">
                {title && (
                  <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-gray-600 dark:text-gray-400">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
```

**Usage Example:**

```tsx
import FormContainer from '@/components/forms/FormContainer';
import FormCard from '@/components/forms/FormCard';
import { FormInput } from '@/components/forms/FormInput';

export default function LoginPage() {
  return (
    <FormContainer
      title="Welcome Back"
      subtitle="Sign in to your CivDocs account"
      backLink={{ href: '/', label: 'Back to home' }}
    >
      <FormCard>
        <form className="space-y-4">
          <FormInput
            type="email"
            label="Email Address"
            placeholder="you@company.com"
            required
          />
          <FormInput
            type="password"
            label="Password"
            placeholder="Enter your password"
            required
          />
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold rounded-full hover:shadow-xl transition-all"
          >
            Sign In
          </button>
        </form>
      </FormCard>
    </FormContainer>
  );
}
```

**Key Features:**
- ✅ Consistent spacing with `space-y-4`
- ✅ Responsive padding: `p-6 sm:p-8`
- ✅ Dark mode support
- ✅ Safe-area aware
- ✅ Mobile-first container: `max-w-md`

---

### 2.3 Create Standardized Card Component

**File:** `src/components/Card.tsx` (NEW FILE)

```tsx
'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  /**
   * Padding size: 'sm' | 'md' | 'lg'
   */
  padding?: 'sm' | 'md' | 'lg';
  /**
   * If true, adds hover effect
   */
  hover?: boolean;
  /**
   * Additional className
   */
  className?: string;
}

export default function Card({ 
  children, 
  padding = 'md',
  hover = false,
  className = '' 
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10',
  };

  return (
    <div className={`
      bg-white 
      dark:bg-gray-900
      rounded-2xl 
      shadow-lg 
      border 
      border-gray-100 
      dark:border-gray-800
      ${paddingClasses[padding]}
      ${hover ? 'hover:shadow-xl transition-all duration-300' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}
```

**Usage:**

```tsx
<Card padding="md" hover>
  <h3 className="text-xl font-semibold mb-3">Card Title</h3>
  <p className="text-gray-600">Card content</p>
</Card>
```

---

### 2.4 Create Standardized Section Component

**File:** `src/components/Section.tsx` (NEW FILE)

```tsx
'use client';

import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  /**
   * Background color: 'white' | 'gray' | 'slate' | 'gradient'
   */
  bg?: 'white' | 'gray' | 'slate' | 'gradient';
  /**
   * Vertical padding: 'sm' | 'md' | 'lg' | 'xl'
   */
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Container max-width: 'xl' | '2xl' | '4xl' | '7xl' | 'full'
   */
  container?: 'xl' | '2xl' | '4xl' | '7xl' | 'full';
  className?: string;
}

export default function Section({
  children,
  bg = 'white',
  padding = 'md',
  container = 'xl',
  className = '',
}: SectionProps) {
  const bgClasses = {
    white: 'bg-white dark:bg-gray-900',
    gray: 'bg-gray-50 dark:bg-gray-950',
    slate: 'bg-slate-950 text-slate-100',
    gradient: 'bg-gradient-to-b from-white via-[#FFFAF7] to-[#FFF5ED]',
  };

  const paddingClasses = {
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16 lg:py-20',
    lg: 'py-16 sm:py-20 lg:py-24',
    xl: 'py-20 sm:py-24 lg:py-32',
  };

  const containerClasses = {
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <section className={`${bgClasses[bg]} ${paddingClasses[padding]} ${className}`}>
      <div className={`${containerClasses[container]} mx-auto px-4 sm:px-6 lg:px-8`}>
        {children}
      </div>
    </section>
  );
}
```

**Usage:**

```tsx
<Section bg="slate" padding="lg" container="xl">
  <h2 className="text-3xl font-semibold mb-6">Section Title</h2>
  <p>Section content</p>
</Section>
```

---

## Phase 3: Migration Strategy

### 3.1 Migration Order (Priority-Based)

#### **Phase 3.1: Critical Foundation** (Week 1)
1. ✅ Add safe-area utilities to `globals.css`
2. ✅ Update viewport meta tag in `layout.tsx`
3. ✅ Create `MobileShell` component
4. ✅ Create `Header` component
5. ✅ Test on iPhone SE, iPhone 14, Pro Max

#### **Phase 3.2: Form Pages** (Week 1-2)
6. ✅ Create form components (`FormInput`, `FormCard`, `FormContainer`)
7. ✅ Migrate `start-trial/page.tsx`
8. ✅ Migrate `login/page.tsx`
9. ✅ Migrate `sign-in/page.tsx`
10. ✅ Migrate `forgot-password/page.tsx`
11. ✅ Migrate `reset-password/page.tsx`
12. ✅ Test all forms on mobile devices

#### **Phase 3.3: Marketing Pages** (Week 2-3)
13. ✅ Migrate `page.tsx` (homepage)
14. ✅ Migrate `prestarts/page.tsx` (fix `h-[700px]` issue)
15. ✅ Migrate `timesheets/page.tsx`
16. ✅ Migrate `pricing/page.tsx`
17. ✅ Migrate `billing/page.tsx`
18. ✅ Migrate `video-tutorials/page.tsx`
19. ✅ Migrate `support/page.tsx`
20. ✅ Migrate `guides/page.tsx`
21. ✅ Migrate `free-tools/page.tsx`
22. ✅ Migrate `reporting/page.tsx`
23. ✅ Migrate `crank-ai/page.tsx`
24. ✅ Migrate `cost-tracking/page.tsx`

#### **Phase 3.4: Success Pages** (Week 3)
25. ✅ Migrate `trial-success/page.tsx`
26. ✅ Migrate `success/page.tsx`
27. ✅ Migrate `test-trial/page.tsx`

#### **Phase 3.5: Components** (Week 3-4)
28. ✅ Migrate `billing/CardFields.tsx`
29. ✅ Migrate `billing/CheckoutForm.tsx`
30. ✅ Create standardized card component
31. ✅ Create standardized section component

---

### 3.2 Migration Checklist Per File

For each file migration, follow this checklist:

#### **Pre-Migration:**
- [ ] Backup current file
- [ ] Review diagnostic report for file-specific issues
- [ ] Identify all hard-coded pixel values
- [ ] Identify all absolute/fixed positioning
- [ ] Identify container width inconsistencies
- [ ] Identify spacing inconsistencies

#### **Migration Steps:**
1. [ ] Wrap page content in `<MobileShell>` (constrained or not)
2. [ ] Replace hard-coded `px-[value]` with responsive classes
3. [ ] Replace hard-coded `py-[value]` with responsive classes
4. [ ] Replace hard-coded `mt-[value]` with `space-y-*` where appropriate
5. [ ] Replace hard-coded `text-[value]` with standard Tailwind sizes
6. [ ] Replace `h-[value]` with responsive height classes
7. [ ] Replace `w-[value]` with responsive width classes
8. [ ] Fix mobile menu positioning (use Header component or CSS variables)
9. [ ] Replace `max-w-7xl` with appropriate container size
10. [ ] Add `pt-safe` and `pb-safe` where needed
11. [ ] Replace `space-y-4` patterns with consistent spacing
12. [ ] Test on iPhone SE (375px)
13. [ ] Test on iPhone 14/15 (390px)
14. [ ] Test on iPhone Pro Max (428px)
15. [ ] Test on iPad (768px)
16. [ ] Test on desktop (1024px+)
17. [ ] Test in Capacitor WebView (if applicable)

#### **Post-Migration:**
- [ ] Verify no layout regressions on desktop
- [ ] Verify safe-area padding works on notched devices
- [ ] Verify no horizontal scroll on small screens
- [ ] Verify touch targets are at least 44x44px
- [ ] Verify text is readable (minimum 16px on mobile)
- [ ] Run linter (no errors)
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility

---

### 3.3 Specific File Migrations

#### **File: `src/app/prestarts/page.tsx`**

**Critical Issues:**
- `h-[700px]` video placeholder (line 502) - will break on iPhone SE
- `top-[88px]` mobile menu positioning
- Hard-coded text sizes
- Inconsistent container widths

**Migration Steps:**

1. **Replace root wrapper:**
```tsx
// BEFORE:
<div className="min-h-screen bg-[#FFFBF8]">

// AFTER:
<MobileShell constrained={false}>
```

2. **Fix video placeholder height:**
```tsx
// BEFORE:
<div className="w-full max-w-lg h-[700px] bg-gray-100...">

// AFTER:
<div className="w-full max-w-lg aspect-video sm:aspect-[4/3] lg:aspect-video bg-gray-100...">
```

3. **Replace Header:**
```tsx
// BEFORE:
<header className="sticky top-0 z-[80] bg-white border-b...">

// AFTER:
<Header sticky bgClassName="bg-white border-b border-gray-200" />
```

4. **Standardize section spacing:**
```tsx
// BEFORE:
<section className="py-20 bg-[#FFFBF8]">

// AFTER:
<Section bg="slate" padding="lg" container="xl">
```

5. **Replace hard-coded text sizes:**
```tsx
// BEFORE:
<span className="text-[16px] font-medium">

// AFTER:
<span className="text-base font-medium">
```

---

#### **File: `src/app/timesheets/page.tsx`**

**Migration Steps:**

1. Wrap in `MobileShell`
2. Replace header with `Header` component
3. Fix mobile menu positioning
4. Replace `min-h-[220px]` with `aspect-video` or responsive min-height
5. Standardize section spacing
6. Replace hard-coded text sizes

---

#### **File: `src/app/start-trial/page.tsx`**

**Migration Steps:**

1. Replace root wrapper:
```tsx
// BEFORE:
<div className="min-h-screen bg-gradient-to-b from-white via-[#FFFAF7] to-[#FFF5ED] flex items-center justify-center px-6 py-12">
  <div className="max-w-md w-full">

// AFTER:
<FormContainer
  title="Start Your Free Trial"
  subtitle="No credit card required. 14 days of unlimited access to all features."
  backLink={{ href: '/', label: 'Back to home' }}
>
```

2. Replace form structure:
```tsx
// BEFORE:
<div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
  <form className="space-y-4">

// AFTER:
<FormCard>
  <form className="space-y-4">
```

3. Replace input fields:
```tsx
// BEFORE:
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Full Name *
  </label>
  <input className="w-full px-4 py-3 border..." />

// AFTER:
<FormInput
  type="text"
  label="Full Name"
  placeholder="John Smith"
  required
/>
```

---

#### **File: `src/app/billing/page.tsx`**

**Migration Steps:**

1. Wrap in `MobileShell`
2. Replace header with `Header` component
3. Update form to use `FormContainer` and `FormCard`
4. Update `CardFields` component to use standardized spacing
5. Fix container widths
6. Add safe-area padding

---

## Phase 4: Pixel Value Replacement Guide

### 4.1 Common Replacements

| Current (Hard-Coded) | Replacement (Responsive) | Notes |
|---------------------|--------------------------|-------|
| `h-[2px]` | `h-0.5` | Hamburger icon lines |
| `top-[88px]` | `top-[var(--header-height)]` or Header component | Mobile menu positioning |
| `text-[16px]` | `text-base` | Standard Tailwind size |
| `text-[14px]` | `text-sm` | Standard Tailwind size |
| `mt-[4px]` | `mt-1` or `space-y-1` | Use space-y for vertical spacing |
| `px-[35px]` | `px-4 sm:px-6 lg:px-8` | Responsive padding |
| `py-[73px]` | `py-12 sm:py-16 lg:py-20` | Responsive padding |
| `h-[700px]` | `aspect-video` or `min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]` | Responsive height |
| `h-[320px]` | `aspect-video` or `min-h-[200px] sm:min-h-[300px]` | Responsive height |
| `min-h-[220px]` | `aspect-video` or `min-h-[200px] sm:min-h-[250px]` | Responsive height |
| `max-w-7xl` | `max-w-xl` (mobile-first) or `max-w-4xl lg:max-w-7xl` | Responsive container |
| `max-w-md` | `max-w-xl` (for forms) | Consistent with shell |
| `left-4 right-4` | `left-safe right-safe` or use CSS variables | Safe-area aware |

---

### 4.2 Spacing Standardization

**Vertical Spacing Pattern:**

```tsx
// Use space-y-* for consistent vertical spacing
<div className="space-y-4">  {/* 1rem = 16px */}
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Responsive spacing
<div className="space-y-4 sm:space-y-6 lg:space-y-8">
```

**Section Spacing Pattern:**

```tsx
// Standardized section padding
<section className="py-12 sm:py-16 lg:py-20">
  {/* Content */}
</section>

// Or use Section component
<Section padding="md">
  {/* Content */}
</Section>
```

---

## Phase 5: Capacitor Compatibility

### 5.1 Capacitor-Specific Considerations

**File:** `capacitor.config.ts` (if exists, or create)

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.civdocs.app',
  appName: 'CivDocs',
  webDir: 'out', // or 'dist' depending on build output
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0f172a', // slate-950
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#0f172a', // slate-950
    },
  },
};

export default config;
```

**Key Points:**
- ✅ Safe-area utilities work automatically in Capacitor
- ✅ `viewport-fit=cover` enables safe-area insets
- ✅ Dark theme (`bg-slate-950`) matches Capacitor status bar
- ✅ Touch targets should be minimum 44x44px (iOS HIG)
- ✅ Test on physical devices, not just simulators

---

### 5.2 Testing Checklist for Capacitor

- [ ] Test on iOS device (iPhone SE, iPhone 14, Pro Max)
- [ ] Test on Android device (various screen sizes)
- [ ] Verify safe-area padding on notched devices
- [ ] Verify status bar doesn't overlap content
- [ ] Verify home indicator doesn't overlap footer
- [ ] Test keyboard behavior (forms)
- [ ] Test scroll behavior
- [ ] Test touch interactions
- [ ] Verify no horizontal scroll
- [ ] Test in both portrait and landscape

---

## Phase 6: Desktop Regression Prevention

### 6.1 Desktop Testing Strategy

**Breakpoints to Test:**
- Desktop Small: 1024px (lg breakpoint)
- Desktop Medium: 1280px
- Desktop Large: 1536px (xl breakpoint)
- Desktop XL: 1920px+

**Key Areas to Verify:**
1. ✅ Content doesn't exceed `max-w-7xl` unnecessarily
2. ✅ Marketing pages use full width appropriately
3. ✅ Forms remain centered and readable
4. ✅ Navigation works correctly
5. ✅ Cards/grids display properly
6. ✅ Typography scales appropriately
7. ✅ Spacing doesn't become excessive
8. ✅ Images/videos maintain aspect ratios

---

### 6.2 Desktop-Specific Considerations

**Marketing Pages (Homepage, Product Pages):**
- Use `MobileShell constrained={false}` for full-width layouts
- Use `Section container="7xl"` for wide content
- Maintain responsive grid systems

**App Pages (Forms, Settings):**
- Use `MobileShell constrained` for centered content
- Use `Section container="xl"` for readable width
- Maintain consistent max-width

**Hybrid Approach:**
```tsx
// Marketing page with constrained content sections
<MobileShell constrained={false}>
  <Section container="full" bg="slate">
    {/* Full-width hero */}
  </Section>
  <Section container="xl" bg="white">
    {/* Constrained content */}
  </Section>
</MobileShell>
```

---

## Phase 7: Implementation Timeline

### Week 1: Foundation
- Day 1-2: Safe-area utilities, viewport meta, MobileShell
- Day 3-4: Header component, form components
- Day 5: Testing on devices, adjustments

### Week 2: Form Pages
- Day 1-2: Migrate all form pages (start-trial, login, etc.)
- Day 3-4: Migrate billing page and components
- Day 5: Testing and fixes

### Week 3: Marketing Pages
- Day 1-2: Migrate homepage and product pages
- Day 3-4: Migrate remaining marketing pages
- Day 5: Testing and fixes

### Week 4: Polish & Testing
- Day 1-2: Component standardization (cards, sections)
- Day 3-4: Comprehensive testing across devices
- Day 5: Bug fixes and final adjustments

---

## Phase 8: Quality Assurance

### 8.1 Testing Matrix

| Device | Screen Size | Status | Notes |
|--------|-------------|--------|-------|
| iPhone SE | 375x667 | ⏳ | Smallest screen, critical |
| iPhone 14 | 390x844 | ⏳ | Standard modern iPhone |
| iPhone 14 Pro Max | 430x932 | ⏳ | Largest iPhone, safe-area critical |
| iPad | 768x1024 | ⏳ | Tablet layout |
| Android (Small) | 360x640 | ⏳ | Small Android |
| Android (Large) | 412x915 | ⏳ | Large Android |
| Desktop | 1920x1080 | ⏳ | Desktop regression check |

### 8.2 Automated Testing

**Consider adding:**
- Visual regression testing (Playwright, Percy)
- Responsive design testing (BrowserStack, Responsively)
- Accessibility testing (axe-core, Lighthouse)

---

## Phase 9: Documentation

### 9.1 Component Documentation

Create `COMPONENT_GUIDE.md` with:
- MobileShell usage
- Header component props
- Form components API
- Card component variants
- Section component options
- Spacing guidelines
- Safe-area usage

### 9.2 Developer Guidelines

Create `MOBILE_FIRST_GUIDELINES.md` with:
- When to use constrained vs unconstrained shell
- Spacing patterns
- Container width guidelines
- Safe-area best practices
- Capacitor considerations

---

## Phase 10: Rollout Strategy

### 10.1 Gradual Rollout

1. **Phase 1:** Deploy foundation (safe-area, MobileShell) - no visual changes
2. **Phase 2:** Deploy form pages - test with small user group
3. **Phase 3:** Deploy marketing pages - monitor analytics
4. **Phase 4:** Full rollout - all pages migrated

### 10.2 Feature Flags (Optional)

Consider feature flags for:
- New mobile shell (can toggle back if issues)
- New header component
- New form components

---

## Success Criteria

### ✅ Mobile-First Goals:
- [ ] All pages work perfectly on iPhone SE (375px)
- [ ] No horizontal scroll on any device
- [ ] Safe-area padding works on notched devices
- [ ] Touch targets are minimum 44x44px
- [ ] Text is readable (minimum 16px)

### ✅ Code Quality Goals:
- [ ] Zero hard-coded pixel values (`[value]px`)
- [ ] Zero `top-[88px]` or similar positioning hacks
- [ ] Consistent spacing using `space-y-*`
- [ ] All pages use MobileShell
- [ ] All forms use FormContainer/FormCard

### ✅ Desktop Goals:
- [ ] No layout regressions
- [ ] Content remains readable
- [ ] Spacing is appropriate
- [ ] Navigation works correctly

### ✅ Capacitor Goals:
- [ ] Works in Capacitor WebView
- [ ] Safe-area insets work correctly
- [ ] Status bar doesn't overlap content
- [ ] Home indicator doesn't overlap footer
- [ ] Keyboard behavior is correct

---

## Risk Mitigation

### Potential Risks:

1. **Desktop Layout Regressions**
   - **Mitigation:** Comprehensive desktop testing, gradual rollout
   - **Rollback:** Feature flags or revert specific pages

2. **Capacitor Compatibility Issues**
   - **Mitigation:** Test on physical devices early
   - **Rollback:** Keep old layout as fallback

3. **Performance Impact**
   - **Mitigation:** Monitor bundle size, use code splitting
   - **Rollback:** Optimize or revert if needed

4. **User Experience Disruption**
   - **Mitigation:** Gradual rollout, user testing
   - **Rollback:** A/B testing, feature flags

---

## Next Steps

1. ✅ **Review this plan** - Ensure alignment with requirements
2. ⏳ **Approve Phase 1** - Foundation setup
3. ⏳ **Begin implementation** - Start with safe-area utilities
4. ⏳ **Create components** - MobileShell, Header, Form components
5. ⏳ **Test on devices** - Verify foundation works
6. ⏳ **Begin migrations** - Start with form pages

---

**Plan Status:** Ready for Review  
**Estimated Duration:** 4 weeks  
**Team Size:** 1-2 developers  
**Risk Level:** Medium (mitigated with gradual rollout)





























