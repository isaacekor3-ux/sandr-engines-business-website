import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      bookingType,
      fullName,
      phone,
      regNumber,
      makeModel,
      faultDescription,
      requireMobile,
      address,
      preferredDate,
      preferredTimeSlot,
      serviceType,
    } = body;

    // 1. Validation check for mandatory booking details
    if (!phone || !regNumber || !makeModel || !preferredDate || !preferredTimeSlot) {
      return NextResponse.json(
        { error: "Mandatory booking details (phone, registration, make & model, date, time) are required." },
        { status: 400 }
      );
    }

    // 2. Configure SMTP Transporter
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === "true";

    const isFullService = bookingType === "full_service";
    const serviceName = isFullService ? "Full Vehicle Service" : serviceType;
    const bookingMethod = requireMobile ? "Mobile Callout (Home Visit)" : "Garage Appointment";

    const timeSlot = preferredTimeSlot === "morning"
      ? "Morning (9:00 AM - 12:00 PM)"
      : preferredTimeSlot === "midday"
        ? "Midday (12:00 PM - 3:00 PM)"
        : "Late Afternoon (3:00 PM - 5:00 PM)";

    // Rich HTML email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <div style="background-color: #0f172a; color: #ffffff; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 24px; border-bottom: 4px solid #b12468;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">
            New S&R Booking Request
          </h1>
          <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">
            S&R Engine & Diagnostics Ltd Website Submissions
          </p>
        </div>

        <!-- Section 1: Customer Contact Details -->
        <h3 style="color: #b12468; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 0;">
          Customer & Vehicle Details
        </h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; width: 35%; font-weight: bold; color: #475569;">Customer Name:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${fullName || "Not Provided"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Phone Number:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;"><a href="tel:${phone}" style="color: #011997; text-decoration: none;">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Registration Plate:</td>
            <td style="padding: 6px 0;">
              <span style="background-color: #facc15; border-radius: 4px; border: 1px solid #eab308; padding: 3px 8px; font-family: monospace; font-weight: 900; font-size: 15px; color: #000; letter-spacing: 1px; text-transform: uppercase;">
                ${regNumber}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Vehicle Model:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${makeModel}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Preferred Date:</td>
            <td style="padding: 6px 0; color: #011997; font-weight: bold;">${preferredDate}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Preferred Time:</td>
            <td style="padding: 6px 0; color: #011997; font-weight: bold;">${timeSlot}</td>
          </tr>
        </table>

        <!-- Section 2: Booking Details -->
        <h3 style="color: #b12468; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px;">
          Service Configuration
        </h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; width: 35%; font-weight: bold; color: #475569;">Service Plan:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${serviceName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Location Type:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${bookingMethod}</td>
          </tr>
        </table>

        <!-- Section 3: Callout Address -->
        ${requireMobile && address ? `
        <div style="margin-top: 20px; padding: 16px; background-color: #fdf2f8; border-left: 4px solid #b12468; border-radius: 8px;">
          <p style="margin: 0 0 8px 0; font-weight: bold; color: #b12468; font-size: 14px;">Mobile Callout Address:</p>
          <p style="margin: 0; color: #0f172a; font-size: 14px; font-weight: 600;">${address}</p>
        </div>
        ` : ''}

        <!-- Section 4: Fault Details -->
        ${!isFullService && faultDescription ? `
        <div style="margin-top: 24px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #64748b; border-radius: 8px; border: 1px solid #e2e8f0;">
          <p style="margin: 0 0 8px 0; font-weight: bold; color: #1e293b; font-size: 14px;">Fault Details / Client Notes:</p>
          <p style="margin: 0; color: #475569; white-space: pre-wrap; font-size: 14px; font-style: italic;">"${faultDescription}"</p>
        </div>
        ` : ''}

        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0 24px 0;" />
        <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-bottom: 0;">
          This booking request was submitted automatically via the website request form for S&R Engine & Diagnostics Ltd.
        </p>
      </div>
    `;

    // Transporter configuration block matching cleaning wizard project style
    if (!user || !pass) {
      console.warn("WARNING: SMTP credentials not set. Logging booking request details:");
      console.log("[Booking Submission Detail]", JSON.stringify(body, null, 2));

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
      from: `"${fullName || "S&R Booking"}" <${user}>`,
      to: "info@sandrengines.co.uk",
      subject: `[Booking Request] ${serviceName} - ${fullName || regNumber}`,
      text: `
        New Booking Request from ${fullName || "Not Provided"}

        Contact Details:
        - Phone: ${phone}
        - Registration Plate: ${regNumber}
        - Vehicle Model: ${makeModel}
        - Preferred Date: ${preferredDate}
        - Time Slot: ${timeSlot}
        - Booking Type: ${serviceName}
        - Location Type: ${bookingMethod}
        
        ${requireMobile && address ? `Mobile Callout Address:\n- ${address}\n` : ""}
        ${!isFullService && faultDescription ? `Fault Description:\n- ${faultDescription}\n` : ""}
      `,
      html: emailHtml
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Booking Mail Submission Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit booking inquiry." },
      { status: 500 }
    );
  }
}
