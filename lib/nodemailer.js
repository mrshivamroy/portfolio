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

export async function sendAdminLoginNotification(username, ip) {
  const time = new Date().toLocaleString();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color:#2196f3;">Admin Login Alert</h2>
      <ul>
        <li><strong>Username:</strong> ${username}</li>
        <li><strong>IP Address:</strong> ${ip}</li>
        <li><strong>Time:</strong> ${time}</li>
      </ul>
      <p>If this wasn't you, secure your account immediately.</p>
    </div>
  `;

  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: "Admin Login Notification",
    text: `Admin login detected for ${username} from ${ip} at ${time}`,
    html,
  });
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