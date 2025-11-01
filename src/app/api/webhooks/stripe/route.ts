import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import puppeteer from 'puppeteer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for webhooks
);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// PDF Generation Function
async function generateInvoicePDF(invoice: Stripe.Invoice, customerEmail: string): Promise<Buffer> {
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

export async function POST(req: NextRequest) {
  console.log('🔥 WEBHOOK CALLED - Starting webhook processing');
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log('🔥 Received webhook event:', event.type);

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      
      case 'invoice.payment_succeeded':
        console.log('🔥 INVOICE PAYMENT SUCCEEDED - Calling handler');
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
      
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      
      case 'invoice_payment.paid':
        console.log('🔥 INVOICE PAYMENT PAID - Calling handler');
        // For invoice_payment.paid, we need to fetch the full invoice
        const invoicePayment = event.data.object as Stripe.InvoicePayment;
        const fullInvoice = await stripe.invoices.retrieve(invoicePayment.invoice as string);
        await handlePaymentSucceeded(fullInvoice);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout session completed:', session.id);
  
  // Update organization with subscription details
  if (session.metadata?.orgId) {
    const { error } = await supabase
      .from('organizations')
      .update({
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
        plan_tier: session.metadata.planTier,
        subscription_status: 'active'
      })
      .eq('id', session.metadata.orgId);
    
    if (error) {
      console.error('Failed to update organization:', error);
    }
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('Subscription created:', subscription.id);
  
  // Update organization subscription status
  const { error } = await supabase
    .from('organizations')
    .update({
      stripe_subscription_id: subscription.id,
      subscription_status: subscription.status,
      current_period_end: (subscription as any).current_period_end ? new Date((subscription as any).current_period_end * 1000).toISOString() : null
    })
    .eq('stripe_customer_id', subscription.customer as string);
  
  if (error) {
    console.error('Failed to update subscription:', error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', subscription.id);
  
  const { error } = await supabase
    .from('organizations')
    .update({
      subscription_status: subscription.status,
      current_period_end: (subscription as any).current_period_end ? new Date((subscription as any).current_period_end * 1000).toISOString() : null
    })
    .eq('stripe_subscription_id', subscription.id);
  
  if (error) {
    console.error('Failed to update subscription:', error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', subscription.id);
  
  const { error } = await supabase
    .from('organizations')
    .update({
      subscription_status: 'canceled',
      stripe_subscription_id: null
    })
    .eq('stripe_subscription_id', subscription.id);
  
  if (error) {
    console.error('Failed to update subscription:', error);
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Payment succeeded for invoice:', invoice.id);
  console.log('Invoice details:', {
    id: invoice.id,
    customer_email: invoice.customer_email,
    amount_paid: invoice.amount_paid,
    status_transitions: invoice.status_transitions
  });
  
  try {
    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Get customer email
    let customerEmail = invoice.customer_email;
    
    // If no email on invoice, fetch from customer object
    if (!customerEmail && invoice.customer) {
      console.log('No email on invoice, fetching from customer:', invoice.customer);
      try {
        const customer = await stripe.customers.retrieve(invoice.customer as string);
        if (customer && !customer.deleted) {
          customerEmail = (customer as Stripe.Customer).email;
          console.log('Retrieved customer email:', customerEmail);
        }
      } catch (error) {
        console.error('Failed to fetch customer:', error);
      }
    }
    
    if (!customerEmail) {
      console.log('No customer email found for invoice:', invoice.id);
      console.log('Skipping email send - no customer email available');
      return;
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
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Payment failed for invoice:', invoice.id);
  
  // Handle failed payments
  // e.g., send dunning emails, suspend service, etc.
}

