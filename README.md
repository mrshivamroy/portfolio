# Full Stack Portfolio Website

A **production-ready full stack portfolio website** built with **Next.js (App Router, JSX)**, Tailwind CSS, MongoDB, and secure backend APIs. This project is designed to be **clean, professional, scalable**, and suitable for real-world deployment.

---

## ✨ Features

### 🌐 Public Pages

* **Home (`/`)**

  * Profile image & description (from backend)
  * Education dropdown (dynamic)
  * CTA buttons (Projects, Contact)
  * One-time session popup (HTML content from backend)

* **Projects (`/project`)**

  * Toggle between *Ongoing* and *Completed*
  * Tile-based layout
  * Popup modal with full project details

* **Gallery (`/gallery`)**

  * Toggle between Images & Videos
  * Tiles layout
  * Popup viewer (videos play only inside popup)

* **Contact (`/contact`)**

  * Contact form
  * Free Image CAPTCHA validation
  * Email delivery using Nodemailer

---

### 🔐 Admin System

* Secure **JWT-based authentication**
* Admin login notification email
* Forgot password support
* Protected admin routes

### 🧑‍💼 Admin Dashboard (`/profile`)

Admin can **Create / Read / Update / Delete**:

* Profile image & description
* Education entries
* Projects
* Gallery images/videos
* Home page popup content
* Social media links

---

### ⚙️ Backend & Infrastructure

* MongoDB with Mongoose
* Cloudinary for media storage
* Redis (optional) for caching
* Nodemailer for email notifications
* Free Image CAPTCHA integration
* Secure environment configuration

---

## 🧱 Tech Stack

**Frontend**

* Next.js (App Router)
* JSX (no TypeScript)
* Tailwind CSS

**Backend**

* Next.js API Routes
* MongoDB + Mongoose
* JWT Authentication
* Nodemailer

**Other**

* Cloudinary
* Redis (optional)
* PWA support

---

## 📁 Project Structure

```
app/
├── page.jsx                # Home page
├── project/page.jsx        # Projects page
├── gallery/page.jsx        # Gallery page
├── contact/page.jsx        # Contact page
├── login/page.jsx          # Admin login
├── profile/                # Admin dashboard
│   ├── page.jsx
│   └── profileClient.jsx
│
├── api/
│   ├── admin/
│   ├── contact/
│   ├── education/
│   ├── project/
│   ├── gallery/
│   └── profile/
│
lib/
├── db.js                   # MongoDB connection
├── nodemailer.js           # Email utilities
├── auth.js                 # JWT helpers

models/
├── Admin.js
├── Education.js
├── Project.js
├── Gallery.js
├── Profile.js

scripts/
└── createAdmin.js          # One-time admin creation script
```

---

## 🔐 Environment Variables (`.env`)

```env
# Database
MONGODB_URI=mongodb+srv://...

# JWT
JWT_SECRET=your_jwt_secret

# Admin
ADMIN_EMAIL=admin@example.com

# SMTP (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

---

## 👤 One-Time Admin Creation

Create admin securely using script:

```bash
node scripts/createAdmin.js
```

Env required temporarily:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=StrongPassword@123
```

⚠️ Remove these env values after running the script.

---

## 🛡️ Security Practices

* No admin creation via API
* JWT stored in HTTP-only cookies
* CAPTCHA validation server-side
* Admin login email alerts
* Protected routes via middleware

---

## 📦 PWA Support

* Installable as a Progressive Web App
* Download option available in footer

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Deployment Notes

* Works with Vercel / VPS
* Ensure env variables are set
* Use production MongoDB & SMTP

---

## 📜 License

This project is built for personal portfolio use. You are free to customize and extend it.

---

## 👨‍💻 Author

**Shivam Roy**
Full Stack Developer

---

If you are a recruiter or collaborator and want to discuss opportunities, feel free to reach out via the contact page.
