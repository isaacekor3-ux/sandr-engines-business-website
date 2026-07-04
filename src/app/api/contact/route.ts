import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, regNumber, subject, message } = body;

    // 1. Validation check for mandatory contact details
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Mandatory details (name, email, phone, message) are required." },
        { status: 400 }
      );
    }

    // 2. Configure SMTP Transporter
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === "true";

    // Rich HTML email content for S&R branding
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <div style="background-color: #0f172a; color: #ffffff; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 24px; border-bottom: 4px solid #b12468;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">
            New Contact Inquiry Received
          </h1>
          <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">
            S&R Engine & Diagnostics Ltd Website Contact Form
          </p>
        </div>

        <!-- Section 1: Customer Contact Details -->
        <h3 style="color: #b12468; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 0;">
          Customer Contact Details
        </h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; width: 35%; font-weight: bold; color: #475569;">Name:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Phone Number:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;"><a href="tel:${phone}" style="color: #011997; text-decoration: none;">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Email Address:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;"><a href="mailto:${email}" style="color: #011997; text-decoration: none;">${email}</a></td>
          </tr>
          ${regNumber ? `
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Registration Plate:</td>
            <td style="padding: 6px 0;">
              <span style="background-color: #facc15; border-radius: 4px; border: 1px solid #eab308; padding: 3px 8px; font-family: monospace; font-weight: 900; font-size: 15px; color: #000; letter-spacing: 1px; text-transform: uppercase;">
                ${regNumber}
              </span>
            </td>
          </tr>` : ""}
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Inquiry Topic:</td>
            <td style="padding: 6px 0; color: #011997; font-weight: bold;">${subject}</td>
          </tr>
        </table>

        <!-- Section 2: Customer Message -->
        <h3 style="color: #b12468; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px;">
          Message details
        </h3>
        <div style="margin-top: 12px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #64748b; border-radius: 8px; border: 1px solid #e2e8f0;">
          <p style="margin: 0; color: #475569; white-space: pre-wrap; font-size: 14px; font-style: italic;">"${message}"</p>
        </div>

        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0 24px 0;" />
        <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-bottom: 0;">
          This contact inquiry was submitted automatically via the website form for S&R Engine & Diagnostics Ltd.
        </p>
      </div>
    `;

    // Transporter configuration check
    if (!user || !pass) {
      console.warn("WARNING: SMTP credentials not set. Logging contact form request details:");
      console.log("[Contact Submission Detail]", JSON.stringify(body, null, 2));

      return NextResponse.json({
        success: true,
        info: "Mock mode: SMTP not configured. Submission logged in backend console."
      });
    }

    const transporter = nodemailer.createTransport({
      host: host || "smtp.gmail.com",
      port: parseInt(port || "587"),
      secure: secure,
      auth: {
        user: user,
        pass: pass
      }
    });

    const mailOptions = {
      from: `"${name}" <${user}>`,
      to: "info@sandrengines.co.uk",
      replyTo: email,
      subject: `[Contact Inquiry] ${subject} - ${name}`,
      text: `
        New Contact Inquiry from ${name}

        Contact Details:
        - Phone: ${phone}
        - Email: ${email}
        - Registration Plate: ${regNumber || "Not Provided"}
        - Topic: ${subject}
        
        Message:
        ${message}
      `,
      html: emailHtml
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact Mail Submission Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit contact inquiry." },
      { status: 500 }
    );
  }
}
