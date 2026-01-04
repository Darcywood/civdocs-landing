# FancySpinner App Integration Guide

This document provides instructions for integrating the `FancySpinner` component into the app codebase to create a seamless loading experience when users are redirected from the landing page after trial signup.

## Overview

When a user completes trial signup on the landing page, they are redirected to the app via a magic link. To minimize visual jump and create a seamless experience, the app should immediately show the same spinner that was displayed on the landing page.

## Implementation Steps

### 1. Copy Required Assets

Copy the following image files from the landing page `public` directory to your app's `public` directory:

- `/John Smith/whitepaper.png` - The white paper icon (centered, static)
- `/realfancyspinner/left.png` - Left half of the orange cog
- `/realfancyspinner/right.png` - Right half of the orange cog

**Directory structure in app:**
```
public/
  ├── John Smith/
  │   └── whitepaper.png
  └── realfancyspinner/
      ├── left.png
      └── right.png
```

### 2. Copy the FancySpinner Component

Copy the entire `FancySpinner` component from `src/components/fancyspinner/FancySpinner.tsx` to your app codebase.

**Dependencies required:**
- `framer-motion` (v12+)
- `next/image` (if using Next.js)
- React 19+
- TypeScript

### 3. Implement Spinner Check on App Load

The landing page sets a localStorage flag before redirecting. Your app should check for this flag and show the spinner immediately.

**Implementation locations:**
- Root layout (`app/layout.tsx` or `_app.tsx`)
- Auth callback handler (`app/auth/callback/page.tsx` or similar)

**Example implementation:**

```typescript
'use client';

import { useEffect, useState } from 'react';
import FancySpinner from '@/components/fancyspinner/FancySpinner';

export default function RootLayout({ children }) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [spinnerMessage, setSpinnerMessage] = useState('Getting your org setup');

  useEffect(() => {
    // Check for spinner flag on mount
    const shouldShowSpinner = localStorage.getItem('showSpinner') === 'true';
    const message = localStorage.getItem('spinnerMessage') || 'Getting your org setup';
    
    if (shouldShowSpinner) {
      setShowSpinner(true);
      setSpinnerMessage(message);
      
      // Clear the flag after a short delay to allow app to load
      // The spinner will be hidden when auth completes and dashboard loads
      setTimeout(() => {
        localStorage.removeItem('showSpinner');
        localStorage.removeItem('spinnerMessage');
      }, 100);
    }
  }, []);

  return (
    <>
      {showSpinner && (
        <FancySpinner 
          size="md" 
          showOverlay={true} 
          message={spinnerMessage}
        />
      )}
      {children}
    </>
  );
}
```

### 4. Hide Spinner When Ready

Hide the spinner once:
- Authentication is complete
- User data is loaded
- Dashboard is ready to display

**Example in auth callback:**

```typescript
useEffect(() => {
  // After successful auth and data loading
  if (user && organization && !loading) {
    setShowSpinner(false);
    localStorage.removeItem('showSpinner');
    localStorage.removeItem('spinnerMessage');
  }
}, [user, organization, loading]);
```

## Component API

The `FancySpinner` component accepts the following props:

```typescript
interface FancySpinnerProps {
  size?: 'sm' | 'md' | 'lg';        // Default: 'md'
  showOverlay?: boolean;             // Default: true
  message?: string;                  // Default: 'Getting your org setup...'
}
```

**Size mapping:**
- `sm`: 120px
- `md`: 180px
- `lg`: 240px

## Animation Details

- **Paper icon**: Fades in and scales from 0.95 to 1.0 over 200ms, stays static
- **Cog halves**: Slide in from left/right over 450ms, snap together with scale animation
- **Rotation**: Starts after assembly (600ms delay), rotates continuously at 1.8s per rotation
- **Message**: Fades in with animated ellipsis (cycles through ".", "..", "..." every 500ms)

## Testing

1. Complete a trial signup on the landing page
2. Verify the spinner appears immediately when redirected to the app
3. Verify the spinner hides once the dashboard loads
4. Check that localStorage flags are cleared after use

## Notes

- The spinner uses `z-[100]` to ensure it appears above all other content
- The overlay uses `rgba(0, 0, 0, 0.55)` with backdrop blur for visual consistency
- All images should use `priority` prop for Next.js Image optimization
- The component is client-side only (`'use client'`)


