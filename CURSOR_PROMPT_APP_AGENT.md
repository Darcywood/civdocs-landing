# Cursor Prompt for App Agent

Copy and paste this prompt into Cursor for the app codebase:

---

**Task: Integrate FancySpinner component to show seamless loading when users are redirected from landing page**

## Context

When users complete trial signup on the landing page (`civdocs-landing` repo), they are redirected to the app via a magic link. The landing page sets localStorage flags before redirecting:
- `localStorage.setItem('showSpinner', 'true')`
- `localStorage.setItem('spinnerMessage', 'Getting your org setup')`

To minimize visual jump and create a seamless experience, the app should immediately show the same spinner that was displayed on the landing page.

## Requirements

1. **Copy Required Assets**
   - Copy these image files from the landing page `public` directory to app `public` directory:
     - `/John Smith/whitepaper.png` → `public/John Smith/whitepaper.png`
     - `/realfancyspinner/left.png` → `public/realfancyspinner/left.png`
     - `/realfancyspinner/right.png` → `public/realfancyspinner/right.png`

2. **Copy FancySpinner Component**
   - Copy `FANCYSPINNER_COMPONENT.tsx` (from landing repo root) to `src/components/fancyspinner/FancySpinner.tsx`
   - Ensure all dependencies are installed: `framer-motion`, `next/image`, React 19+, TypeScript

3. **Implement Spinner Check on App Load**
   - In the root layout (`app/layout.tsx` or `_app.tsx`), check for `localStorage.getItem('showSpinner') === 'true'` on mount
   - If flag exists, immediately show `<FancySpinner size="md" showOverlay={true} message={spinnerMessage} />`
   - Get message from `localStorage.getItem('spinnerMessage')` or use default "Getting your org setup"
   - Clear localStorage flags after reading them (to prevent showing spinner on subsequent page loads)

4. **Hide Spinner When Ready**
   - Hide the spinner once authentication is complete AND user data is loaded AND dashboard is ready
   - This should happen in:
     - Auth callback handler (`app/auth/callback/page.tsx` or similar)
     - Root layout after checking auth state
     - Or wherever you determine the user is fully authenticated and data is loaded

5. **Implementation Details**
   - Use `useEffect` hook to check localStorage on mount
   - Use state (`useState`) to control spinner visibility
   - The spinner should appear BEFORE any other content loads
   - The spinner uses `z-[100]` to appear above all content
   - Component is client-side only (`'use client'`)

## Expected Behavior

1. User completes signup on landing page → spinner shows
2. User gets redirected to app → spinner should appear IMMEDIATELY (within ~100-200ms)
3. App loads auth, user data, dashboard → spinner hides once everything is ready
4. No visual jump or blank screen between landing page and app

## Files to Create/Modify

- `src/components/fancyspinner/FancySpinner.tsx` (new - copy from FANCYSPINNER_COMPONENT.tsx)
- `app/layout.tsx` or `_app.tsx` (modify - add spinner check)
- `app/auth/callback/page.tsx` or similar (modify - hide spinner when ready)
- `public/John Smith/whitepaper.png` (copy from landing repo)
- `public/realfancyspinner/left.png` (copy from landing repo)
- `public/realfancyspinner/right.png` (copy from landing repo)

## Testing

After implementation:
1. Complete a trial signup on landing page
2. Verify spinner appears immediately when redirected to app
3. Verify spinner hides once dashboard loads
4. Verify localStorage flags are cleared after use
5. Verify spinner doesn't appear on subsequent page loads

## Reference

See `FANCYSPINNER_APP_INTEGRATION.md` in the landing repo for detailed documentation.

---




