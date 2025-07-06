import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY!);
const SHEET_ENDPOINT = process.env.SHEETDB_API_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, product } = body;

    if (!name || !email || !product?.name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!SHEET_ENDPOINT) {
      return NextResponse.json({ error: 'Server misconfiguration: Sheet endpoint missing' }, { status: 500 });
    }

    const date = new Date().toISOString();

    // Send email
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'faysmatta@gmail.com',
      subject: `New request: ${product.name}`,
      html: `
        <h2>New Request to Buy</h2>
        <p><strong>Product:</strong> ${product.name}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message || 'None'}</p>
        <p><strong>Date:</strong> ${date}</p>
      `,
    });

    // Post to SheetDB
    await fetch(SHEET_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [{
          name,
          email,
          message,
          product: product.name,
          date,
          status: 'pending',
        }],
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error in request-to-buy API:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
