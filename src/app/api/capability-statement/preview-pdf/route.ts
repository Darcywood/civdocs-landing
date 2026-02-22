import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import path from 'path';
import fs from 'fs';

// Serves the sample capability statement PDF with page 3 removed
export async function GET() {
  try {
    const pdfPath = path.join(
      process.cwd(),
      'public',
      'capability-statement',
      '1lead112',
      'capability-statement 4.pdf'
    );

    if (!fs.existsSync(pdfPath)) {
      return NextResponse.json({ error: 'PDF not found' }, { status: 404 });
    }

    const pdfBytes = fs.readFileSync(pdfPath);
    const doc = await PDFDocument.load(pdfBytes);
    const pageCount = doc.getPageCount();

    // Copy all pages except page 3 (0-indexed: skip index 2)
    const newDoc = await PDFDocument.create();
    const pagesToCopy: number[] = [];
    for (let i = 0; i < pageCount; i++) {
      if (i !== 2) pagesToCopy.push(i); // skip page 3
    }
    const copiedPages = await newDoc.copyPages(doc, pagesToCopy);
    copiedPages.forEach((page) => newDoc.addPage(page));

    const modifiedPdf = await newDoc.save();

    return new NextResponse(Buffer.from(modifiedPdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="capability-statement-preview.pdf"',
      },
    });
  } catch (err) {
    console.error('Preview PDF error:', err);
    return NextResponse.json({ error: 'Failed to load PDF' }, { status: 500 });
  }
}
