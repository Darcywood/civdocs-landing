# Company Type Debugging Guide

## Overview
This guide helps you test and debug the `company_type` issue where "Plant Hire Company" selections are being saved as "Civil Contractor".

## Changes Made

### 1. localStorage Safeguard
- Clears any potential localStorage interference from the app on form load
- Clears keys: `company_type`, `view_mode`, `default_view_mode`, `organization_view_mode`

### 2. Comprehensive Debugging
- **Frontend**: Logs when radio buttons are clicked, form state changes, and submission
- **Backend**: Logs what value is received and what gets saved to database

## How to Test

### Step 1: Open Browser DevTools
1. Open Chrome/Firefox DevTools (F12)
2. Go to **Console** tab
3. Go to **Network** tab (to inspect API requests)

### Step 2: Clear Browser Data (Optional but Recommended)
1. Open DevTools → Application tab
2. Clear **Local Storage** for your domain
3. Clear **Session Storage**
4. This ensures a clean test environment

### Step 3: Test Plant Hire Selection

1. Navigate to `/start-trial` page
2. Fill out the form:
   - Full Name: `Test User`
   - Email: `test-plant-hire@example.com` (use unique email each time)
   - Company: `Test Plant Hire Co`
   - Password: `Test123!`
   - Confirm Password: `Test123!`
3. **Select "Plant Hire Company"** radio button
4. Check the Console - you should see:
   ```
   [Signup] Plant Hire Company clicked - setting company_type to "plant_hire"
   ```
5. Accept Terms & Privacy checkboxes
6. Expand and accept Organization Acknowledgement
7. Click "Create Organisation"

### Step 4: Check Console Logs

Look for these logs in order:

#### Frontend Logs (before API call):
```
[Signup] ===== FORM SUBMISSION DEBUG =====
[Signup] Form state company_type: plant_hire
[Signup] Form element company_type (from DOM): plant_hire
[Signup] Final company_type being used: plant_hire
[Signup] Request body being sent: { ... "company_type": "plant_hire" ... }
[Signup] Company type in request body: plant_hire
```

#### Backend Logs (in server console/terminal):
```
[Trial Signup] ===== BACKEND DEBUG =====
[Trial Signup] Company type received: "plant_hire" (type: string)
[Trial Signup] Valid company types: [ 'civil', 'plant_hire' ]
[Trial Signup] Company type being saved to database: "plant_hire"
[Trial Signup] default_view_mode value: "plant_hire"
[Trial Signup] ✓ Organization created: <org-id>
[Trial Signup] Organization default_view_mode saved as: "plant_hire"
```

### Step 5: Check Network Request

1. In DevTools → Network tab
2. Find the `/api/start-trial` request
3. Click on it
4. Go to **Payload** tab
5. Verify `company_type` is `"plant_hire"` (not `"civil"`)

### Step 6: Verify Database

After successful signup, check the database:

```sql
SELECT id, name, email, default_view_mode, created_at 
FROM organizations 
WHERE email = 'test-plant-hire@example.com'
ORDER BY created_at DESC 
LIMIT 1;
```

Expected result:
- `default_view_mode` should be `'plant_hire'` (NOT `'civil'`)

## What to Look For

### ✅ Good Signs:
- Console shows `company_type: "plant_hire"` at every step
- Network request payload shows `"company_type": "plant_hire"`
- Backend logs show `"plant_hire"` being received and saved
- Database shows `default_view_mode = 'plant_hire'`

### ❌ Problem Signs:
- Console shows `company_type: "civil"` when Plant Hire is selected
- Form state shows wrong value
- Network request shows wrong value
- Backend receives wrong value
- Database has wrong value

## Common Issues & Solutions

### Issue 1: Form State Shows Wrong Value
**Symptom**: Console shows `Form state company_type: civil` when Plant Hire is selected

**Check**:
- Are both radio buttons visible and clickable?
- Is there a JavaScript error preventing state updates?
- Check if `onClick` handlers are firing (look for click logs)

**Solution**: The form element fallback should catch this, but check radio button values are correct.

### Issue 2: Network Request Has Wrong Value
**Symptom**: Form state is correct, but network request shows wrong value

**Check**:
- Is `finalCompanyType` being used correctly in request body?
- Check the exact JSON being sent

**Solution**: The code now explicitly sets `company_type: finalCompanyType` in the request body.

### Issue 3: Backend Receives Wrong Value
**Symptom**: Network request is correct, but backend logs show wrong value

**Check**:
- Is there middleware modifying the request?
- Check backend logs for the exact value received

**Solution**: Backend now logs the exact value received and validates it.

### Issue 4: Database Has Wrong Value
**Symptom**: Backend receives correct value, but database has wrong value

**Check**:
- Is there a database trigger modifying the value?
- Check the exact insert statement being executed

**Solution**: Backend now logs what's being inserted and what's saved.

## Testing Checklist

- [ ] Clear localStorage before testing
- [ ] Select "Plant Hire Company" and verify console logs
- [ ] Submit form and check Network request payload
- [ ] Check backend logs for received value
- [ ] Verify database has correct `default_view_mode`
- [ ] Test with "Civil Contractor" to ensure it still works
- [ ] Test with localStorage containing `company_type: 'civil'` to ensure safeguard works

## Quick Test Script

Run this in browser console before submitting form:

```javascript
// Check current form state
console.log('Current form state:', document.querySelector('form')?.querySelector('input[name="company_type"]:checked')?.value);

// Check localStorage
console.log('localStorage.company_type:', localStorage.getItem('company_type'));
console.log('localStorage.view_mode:', localStorage.getItem('view_mode'));

// Manually set Plant Hire (for testing)
document.querySelector('input[value="plant_hire"]').click();
console.log('After clicking plant_hire:', document.querySelector('input[name="company_type"]:checked')?.value);
```

## Next Steps

If the issue persists after these changes:

1. **Share the console logs** - Frontend and backend
2. **Share the Network request payload** - Screenshot of the `/api/start-trial` request
3. **Share database query result** - Show what's actually saved
4. **Check for browser extensions** - Some extensions modify form data
5. **Test in incognito mode** - Rules out extension/cache issues
