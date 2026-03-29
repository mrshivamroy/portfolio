import nodemailer from "nodemailer";

/* ────────────────────────────────────────────── */
/* ENV VALIDATION (FAIL FAST)                     */
/* ────────────────────────────────────────────── */

const requiredEnv = [
  "EMAIL_HOST",
  "EMAIL_PORT",
  "EMAIL_USER",
  "EMAIL_PASSWORD",
  "EMAIL_FROM",
  "ADMIN_EMAIL",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

/* ────────────────────────────────────────────── */
/* TRANSPORTER                                   */
/* ────────────────────────────────────────────── */

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false otherwise
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
  logger: false,
  debug: false,
});

/* ────────────────────────────────────────────── */
/* GENERIC EMAIL SENDER                          */
/* ────────────────────────────────────────────── */

export async function sendEmail({ to, subject, html, text }) {
  if (!to || !subject) {
    throw new Error("Email recipient and subject are required");
  }

  try {
    return await transporter.sendMail({
      from: `"shivamroy.vercel.app" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      text,
      html,
    });
  } catch {
    // Do not leak SMTP or credential details
    throw new Error("Failed to send email");
  }
}

/* ────────────────────────────────────────────── */
/* ADMIN LOGIN NOTIFICATION                      */
/* ────────────────────────────────────────────── */

export async function sendAdminLoginNotification(username, metadata) {
  const time = new Date().toLocaleString() ;

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a1a2f; color: #ffffff; padding: 2rem; border: 2px solid #1da1f2; border-radius: 8px;">
      
      <h2 style="color: #1da1f2; border-bottom: 2px solid #1c5fa8; padding-bottom: 10px; margin-top: 0;">
        🚨 Security Alert: Admin Access
      </h2>
      
      <p style="color: #9ecbff; font-size: 16px;">
        A successful login was just detected for the administrator account: <strong style="color: #ffffff;">${username}</strong>.
      </p>
      
      <div style="background-color: #050f1e; padding: 20px; border-left: 4px solid #1da1f2; margin: 25px 0; border-radius: 0 4px 4px 0;">
        <ul style="list-style-type: none; padding: 0; margin: 0; line-height: 2;">
          <li><strong style="color: #1da1f2; display: inline-block; width: 120px;">IP Address:</strong> ${metadata.ip}</li>
          <li><strong style="color: #1da1f2; display: inline-block; width: 120px;">Location:</strong> ${metadata.city}, ${metadata.country}</li>
          <li><strong style="color: #1da1f2; display: inline-block; width: 120px;">Referer:</strong> ${metadata.referer}</li>
          <li><strong style="color: #1da1f2; display: inline-block; width: 120px;">Timestamp:</strong> ${time}</li>
        </ul>
        
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #1c5fa8;">
          <strong style="color: #1da1f2; display: block; margin-bottom: 5px;">Device Info:</strong>
          <span style="color: #9ecbff; font-size: 14px; word-break: break-all;">${metadata.userAgent}</span>
        </div>
      </div>
      
      <p style="color: #ef4444; font-weight: bold; margin-top: 20px; font-size: 15px;">
        ⚠️ If this was not you, please secure your application immediately.
      </p>
      
    </div>
  ` ;

  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `Admin Login Alert [IP: ${metadata.ip}]`,
    text: `Admin login for ${username} from IP: ${metadata.ip}, Location: ${metadata.city}, Device: ${metadata.userAgent} at ${time}`,
    html,
  }) ;
}

export default transporter;



// import nodemailer from "nodemailer";

// /* ---------- ENV VALIDATION ---------- */
// const requiredEnv = [
//   "EMAIL_HOST",
//   "EMAIL_PORT",
//   "EMAIL_USER",
//   "EMAIL_PASSWORD",
// ];

// for (const key of requiredEnv) {
//   if (!process.env[key]) {
//     //console.error(`❌ Missing environment variable: ${key}`);
//   }
// }

// /* ---------- TRANSPORTER ---------- */
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: Number(process.env.EMAIL_PORT) || 587,
//   secure: false, // STARTTLS
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
//   tls: {
//     rejectUnauthorized: true,
//   },
//   logger: process.env.NODE_ENV !== "production",
//   debug: process.env.NODE_ENV !== "production",
// });

// /* ---------- VERIFY SMTP ON START ---------- */
// transporter.verify((error, success) => {
//   if (error) {
//     //console.error("❌ SMTP CONFIG ERROR:", error);
//   } else {
//     //console.log("✅ SMTP server ready");
//   }
// });

// /* ---------- GENERIC SEND ---------- */
// export async function sendEmail({ to, subject, html, text }) {
//   if (!to) throw new Error("Recipient email is missing");

//   try {
//     const info = await transporter.sendMail({
//       from: `"Portfolio Contact" <${process.env.EMAIL_FROM}>`,
//       to,
//       subject,
//       text,
//       html,
//     });

//     //console.log("📨 Email sent:", info.messageId);
//     return info;

//   } catch (error) {
//     // console.error("❌ Nodemailer error:", {
//     //   message: error.message,
//     //   code: error.code,
//     //   response: error.response,
//     // });
//     throw error; // propagate to API
//   }
// }

// /* ---------- ADMIN LOGIN ALERT ---------- */
// export async function sendAdminLoginNotification(username, ip) {
//   const time = new Date().toLocaleString();

//   const html = `
//     <div style="font-family: Arial; max-width: 600px;">
//       <h2 style="color:#2196f3;">Admin Login Alert</h2>
//       <ul>
//         <li><strong>Username:</strong> ${username}</li>
//         <li><strong>IP Address:</strong> ${ip}</li>
//         <li><strong>Time:</strong> ${time}</li>
//       </ul>
//       <p>If this wasn't you, secure your account immediately.</p>
//     </div>
//   `;

//   await sendEmail({
//     to: process.env.ADMIN_EMAIL,
//     subject: "Admin Login Notification",
//     html,
//     text: `Admin login detected for ${username} from ${ip} at ${time}`,
//   });
// }

// export default transporter;