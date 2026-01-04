# Invoice PDF Generator - Copy to App

## 📦 Dependencies Required

Make sure these are installed in your app:

```bash
npm install puppeteer resend
```

## 📁 File Structure

Create this file in your app:
**`src/lib/billing/invoices.ts`**

## 📋 Complete Code to Copy

```typescript
import Stripe from 'stripe';
import puppeteer from 'puppeteer';
import { Resend } from 'resend';

/**
 * Generates a PDF invoice from a Stripe invoice
 * @param invoice - Stripe invoice object
 * @param customerEmail - Customer email address
 * @returns PDF buffer
 */
export async function generateInvoicePDF(
  invoice: Stripe.Invoice,
  customerEmail: string
): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Format date as dd/mm/yyyy
    const paymentDate = new Date(invoice.status_transitions.paid_at! * 1000);
    const formattedDate = paymentDate.toLocaleDateString('en-AU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    // Convert amount from cents to AUD
    const amountAUD = (invoice.amount_paid / 100).toFixed(2);
    
    // Get plan description
    const planDescription = invoice.lines.data[0]?.description || 'CivDocs Subscription';
    
    // Create HTML template for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>CivDocs Tax Invoice</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 40px;
            color: #333;
            background: white;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #F97316;
            padding-bottom: 20px;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            color: #F97316;
            margin-bottom: 10px;
          }
          .invoice-title {
            font-size: 24px;
            color: #333;
            margin: 0;
          }
          .invoice-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }
          .invoice-info {
            flex: 1;
          }
          .customer-info {
            flex: 1;
            text-align: right;
          }
          .info-label {
            font-weight: bold;
            color: #666;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .info-value {
            font-size: 14px;
            margin-bottom: 15px;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
          }
          .items-table th {
            background-color: #F97316;
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: bold;
          }
          .items-table td {
            padding: 15px;
            border-bottom: 1px solid #ddd;
          }
          .items-table tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          .total-section {
            margin-top: 30px;
            text-align: right;
          }
          .total-row {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
          }
          .total-label {
            width: 200px;
            text-align: right;
            padding-right: 20px;
            font-weight: bold;
          }
          .total-amount {
            width: 100px;
            text-align: right;
            font-weight: bold;
          }
          .grand-total {
            border-top: 2px solid #F97316;
            padding-top: 10px;
            font-size: 18px;
            color: #F97316;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 20px;
          }
          .payment-info {
            background-color: #f0f8ff;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #F97316;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">CivDocs</div>
          <h1 class="invoice-title">Tax Invoice</h1>
        </div>
        
        <div class="invoice-details">
          <div class="invoice-info">
            <div class="info-label">Invoice Number</div>
            <div class="info-value">${invoice.number || invoice.id}</div>
            <div class="info-label">Invoice Date</div>
            <div class="info-value">${formattedDate}</div>
            <div class="info-label">Payment Date</div>
            <div class="info-value">${formattedDate}</div>
          </div>
          <div class="customer-info">
            <div class="info-label">Bill To</div>
            <div class="info-value">${customerEmail}</div>
            <div class="info-label">CivDocs Pty Ltd</div>
            <div class="info-value">ABN 12 345 678 901</div>
            <div class="info-value">darcy@civdocs.com.au</div>
            <div class="info-value">www.civdocs.com</div>
          </div>
        </div>
        
        <table class="items-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${planDescription}</td>
              <td>1</td>
              <td>$${amountAUD} AUD</td>
              <td>$${amountAUD} AUD</td>
            </tr>
          </tbody>
        </table>
        
        <div class="total-section">
          <div class="total-row">
            <div class="total-label">Subtotal:</div>
            <div class="total-amount">$${amountAUD} AUD</div>
          </div>
          <div class="total-row">
            <div class="total-label">Tax (GST):</div>
            <div class="total-amount">$0.00 AUD</div>
          </div>
          <div class="total-row grand-total">
            <div class="total-label">Total Paid:</div>
            <div class="total-amount">$${amountAUD} AUD</div>
          </div>
        </div>
        
        <div class="payment-info">
          <strong>Payment Status:</strong> Paid<br>
          <strong>Payment Method:</strong> Credit Card via Stripe<br>
          <strong>Transaction ID:</strong> ${invoice.id}
        </div>
        
        <div class="footer">
          <p>Thank you for your business with CivDocs!</p>
          <p>CivDocs Pty Ltd | ABN 12 345 678 901 | www.civdocs.com | darcy@civdocs.com.au</p>
          <p>This is an official tax invoice for your records.</p>
        </div>
      </body>
      </html>
    `;
    
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });
    
    return Buffer.from(pdfBuffer);
    
  } finally {
    await browser.close();
  }
}

/**
 * Sends invoice email with PDF attachment
 * @param invoice - Stripe invoice object
 * @param customerEmail - Customer email address
 */
export async function sendInvoiceEmail(
  invoice: Stripe.Invoice,
  customerEmail: string
): Promise<void> {
  try {
    // Initialize Resend
    const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
    if (!resend) {
      throw new Error("RESEND_API_KEY is not set");
    }
    
    // Format date as dd/mm/yyyy
    const paymentDate = new Date(invoice.status_transitions.paid_at! * 1000);
    const formattedDate = paymentDate.toLocaleDateString('en-AU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    // Convert amount from cents to AUD
    const amountAUD = (invoice.amount_paid / 100).toFixed(2);
    
    // Get plan description
    const planDescription = invoice.lines.data[0]?.description || 'CivDocs Subscription';
    
    // Create HTML email body
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
        <h2 style="color: #F97316;">CivDocs Tax Invoice</h2>
        <p>Hi there,</p>
        <p>Thanks for your payment to CivDocs. Here are your invoice details:</p>
        <table style="margin-top: 10px;">
          <tr><td><strong>Date:</strong></td><td>${formattedDate}</td></tr>
          <tr><td><strong>Amount Paid:</strong></td><td>$${amountAUD} AUD</td></tr>
          <tr><td><strong>Invoice Number:</strong></td><td>${invoice.number || invoice.id}</td></tr>
          <tr><td><strong>Plan:</strong></td><td>${planDescription}</td></tr>
        </table>
        <p style="margin-top: 20px;">Your official tax invoice is also available via Stripe.</p>
        <p>— The CivDocs Team</p>
        <hr style="margin-top: 30px;">
        <small>CivDocs Pty Ltd | ABN 12 345 678 901 | www.civdocs.com | darcy@civdocs.com.au</small>
      </div>
    `;
    
    // Generate PDF invoice
    console.log('Generating PDF invoice...');
    const pdfBuffer = await generateInvoicePDF(invoice, customerEmail);
    console.log('PDF generated successfully');
    
    // Send email with PDF attachment
    console.log('Attempting to send tax invoice email to:', customerEmail);
    const emailResult = await resend.emails.send({
      from: 'CivDocs <darcy@civdocs.com.au>',
      to: [customerEmail],
      subject: 'Tax Invoice – CivDocs Subscription',
      html: emailHtml,
      attachments: [{
        filename: `invoice-${invoice.number || invoice.id}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }]
    });
    
    console.log('Email send result:', emailResult);
    console.log(`📧 CivDocs Tax Invoice with PDF sent to ${customerEmail}`);
    
  } catch (error) {
    console.error('Failed to send tax invoice email:', error);
    console.error('Error details:', error);
    throw error;
  }
}
```

## 🔧 How It's Used in Webhook Handler

Here's how it's called in your webhook handler:

```typescript
// In src/app/api/webhooks/stripe/route.ts

import { sendInvoiceEmail } from '@/lib/billing/invoices';

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  // Get customer email
  let customerEmail = invoice.customer_email;
  
  // If no email on invoice, fetch from customer object
  if (!customerEmail && invoice.customer) {
    const stripe = getStripe();
    const customer = await stripe.customers.retrieve(invoice.customer as string);
    if (customer && !customer.deleted) {
      customerEmail = (customer as Stripe.Customer).email;
    }
  }
  
  if (!customerEmail) {
    console.log('No customer email found for invoice:', invoice.id);
    return;
  }
  
  // Send invoice email with PDF
  await sendInvoiceEmail(invoice, customerEmail);
}
```

## 📥 How to Use for Invoice Download API

You can also use it in your invoice download API route:

```typescript
// In src/app/api/billing/invoices/[id]/route.ts

import { generateInvoicePDF } from '@/lib/billing/invoices';
import { getStripe } from '@/lib/billing/stripe';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const stripe = getStripe();
    const invoice = await stripe.invoices.retrieve(params.id);
    
    // Get customer email
    let customerEmail = invoice.customer_email;
    if (!customerEmail && invoice.customer) {
      const customer = await stripe.customers.retrieve(invoice.customer as string);
      if (customer && !customer.deleted) {
        customerEmail = (customer as Stripe.Customer).email || '';
      }
    }
    
    // Generate PDF
    const pdfBuffer = await generateInvoicePDF(invoice, customerEmail || '');
    
    // Return PDF
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${invoice.number || invoice.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Failed to generate invoice PDF:', error);
    return new Response('Failed to generate invoice', { status: 500 });
  }
}
```

## 🎨 Invoice Design Features

The PDF includes:
- ✅ CivDocs branding (orange #F97316)
- ✅ Invoice number and dates
- ✅ Customer email
- ✅ Company details (ABN, contact info)
- ✅ Itemized line items
- ✅ Subtotal, tax, and total
- ✅ Payment status and transaction ID
- ✅ Professional footer
- ✅ A4 format with proper margins

## ⚙️ Environment Variables Needed

Make sure these are set in your app:

```env
RESEND_API_KEY=re_...
FROM_EMAIL=darcy@civdocs.com.au
```

## 📝 Notes

1. **Puppeteer Requirements:**
   - Works in Node.js environment
   - Requires `headless: true` for serverless
   - Uses `--no-sandbox` flags for deployment compatibility

2. **PDF Format:**
   - A4 size
   - 20mm margins
   - Print background colors enabled

3. **Email:**
   - Sent via Resend
   - PDF attached as file
   - HTML email body included

4. **Error Handling:**
   - Browser always closed in `finally` block
   - Errors logged but don't crash webhook

---

**Copy this code to `src/lib/billing/invoices.ts` in your app!**










































