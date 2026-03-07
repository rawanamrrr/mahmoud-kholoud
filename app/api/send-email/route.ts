// app/api/send-email/route.ts
import nodemailer from 'nodemailer';

// Ensure this route uses the Node.js runtime (not Edge), required for nodemailer
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const message = formData.get('message') as string;
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || '';
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.GOOGLE_APP_PASSWORD || '';
    const toEmail = process.env.CONTACT_EMAIL || smtpUser || '';
    const imageFile = formData.get('image') as File | null;

    if (!name?.trim()) {
      return Response.json(
        { success: false, message: 'Please enter your name' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!smtpUser || !smtpPass) {
      return Response.json(
        { success: false, message: 'Email service not configured. Missing SMTP credentials.' },
        { status: 500 }
      );
    }
    if (!toEmail) {
      return Response.json(
        { success: false, message: 'Email service not configured. Missing recipient email.' },
        { status: 500 }
      );
    }

    // Create transporter after validating env, so any errors are caught below
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Verify SMTP connection/auth before attempting to send
    try {
      await transporter.verify();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'SMTP verification failed';
      console.error('SMTP verify error:', err);
      return Response.json(
        { success: false, message: `Email service error: ${msg}` },
        { status: 500 }
      );
    }

    // Convert the image file to a buffer
    let attachments = [];
    if (imageFile) {
      const imageBytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(imageBytes);
      
      attachments.push({
        filename: 'handwritten-message.png',
        content: buffer,
        cid: 'handwritten-message',
        encoding: 'base64'
      });
    }

    // Send mail
    let info;
    try {
      info = await transporter.sendMail({
        from: `"Wedding Website" <${smtpUser}>`,
        to: toEmail,
        subject: `New Message from ${name}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; background-color: #ffffff;">
          <h2 style="color: #9CA89A; border-bottom: 2px solid #9CA89A; padding-bottom: 10px; margin-top: 0;">New Wedding Message!</h2>
          <div style="margin-top: 20px;">
            <p style="font-size: 16px; color: #374151;"><strong>From:</strong> ${name}</p>
            
            ${message ? `
            <div style="margin: 20px 0; padding: 15px; background: #f9fafb; border-left: 4px solid #9CA89A; border-radius: 4px;">
              <p style="margin: 0; font-size: 16px; color: #1f2937; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            ` : ''}

            ${imageFile ? 
              `<div style="margin: 20px 0;">
                <p style="font-size: 16px; color: #374151; margin-bottom: 10px;"><strong>Handwritten Note:</strong></p>
                <div style="padding: 10px; background: #ffffff; border: 1px dashed #9CA89A; border-radius: 8px;">
                  <img src="cid:handwritten-message" alt="Handwritten message" style="max-width: 100%; height: auto; display: block;" />
                </div>
              </div>` : 
              ''
            }
          </div>
          <footer style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
            Sent from Mahmoud & Kholoud Wedding Website
          </footer>
        </div>
      `,
        attachments
      });
    } catch (err: any) {
      console.error('Error sending email:', err);
      const message = (err && (err.message || err.toString())) || 'Unknown email error';
      return Response.json(
        {
          success: false,
          message,
          code: err?.code || null,
          provider: 'gmail',
          envPresent: {
            SMTP_USER: Boolean(process.env.SMTP_USER),
            SMTP_PASS: Boolean(process.env.SMTP_PASS),
            GMAIL_USER: Boolean(process.env.GMAIL_USER),
            GMAIL_APP_PASSWORD: Boolean(process.env.GMAIL_APP_PASSWORD),
            GOOGLE_APP_PASSWORD: Boolean(process.env.GOOGLE_APP_PASSWORD),
            CONTACT_EMAIL: Boolean(process.env.CONTACT_EMAIL),
          },
        },
        { status: 500 }
      );
    }

    return Response.json({ 
      success: true, 
      message: 'Message sent successfully!',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json(
      { 
        success: false, 
        message: 'Failed to send message. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}