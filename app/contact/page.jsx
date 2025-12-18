
"use client";

import { useEffect, useState } from "react";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    captchaInput: "",
  });

  const [captchaId, setCaptchaId] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const loadCaptcha = async () => {
    const res = await fetch("https://freeimagecaptcha.vercel.app/api/captcha");
    const data = await res.json();
    setCaptchaId(data.captchaId);
    setCaptchaImage(data.image);
    setForm((f) => ({ ...f, captchaInput: "" }));
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  useEffect(() => {
    document.title = "Contact | Shivam Roy";
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitForm = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        captchaId,
      }),
    });

    const data = await res.json();
    setSending(false);

    if (res.ok) {
      setForm({ name: "", email: "", message: "", captchaInput: "" });
      loadCaptcha();
      setStatus("Message sent successfully");
    } else {
      setStatus(data.error || "Failed to send message");
      loadCaptcha();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Contact Me</h1>
        <p className={styles.subtitle}>
          Get in touch for collaborations, projects, or inquiries
        </p>

        <form onSubmit={submitForm} className={styles.form}>
          <div>
            <label className={styles.label}>Your Name *</label>
            <input
              className={styles.input}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className={styles.label}>Your Email *</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <label className={styles.label}>Your Message *</label>
            <textarea
              className={styles.textarea}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              required
            />
          </div>

          <div className={styles.captchaBox}>
            <label className={styles.label}>Verification *</label>

            {captchaImage && (
              <img
                src={captchaImage}
                alt="captcha"
                className={styles.captchaImage}
                width={160}
                height={60}
              />
            )}

            <input
              className={styles.input}
              name="captchaInput"
              value={form.captchaInput}
              onChange={handleChange}
              placeholder="Enter CAPTCHA"
              required
            />

            <button
              type="button"
              onClick={loadCaptcha}
              className={styles.refresh}
            >
              Refresh CAPTCHA
            </button>
          </div>

          <button className={styles.button} disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <div
              className={`${styles.status} ${
                status.includes("success")
                  ? styles.success
                  : styles.error
              }`}
            >
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}



// "use client";

// import { useEffect, useState } from "react";

// export default function ContactPage() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//     captchaInput: "",
//   });

//   const [captchaId, setCaptchaId] = useState("");
//   const [captchaImage, setCaptchaImage] = useState("");
//   const [status, setStatus] = useState("");
//   const [sending, setSending] = useState(false);

//   /* Load captcha */
//   const loadCaptcha = async () => {
//     const res = await fetch("https://freeimagecaptcha.vercel.app/api/captcha");
//     const data = await res.json();
//     setCaptchaId(data.captchaId);
//     setCaptchaImage(data.image);
//     setForm((f) => ({ ...f, captchaInput: "" }));
//   };

//   useEffect(() => {
//     loadCaptcha();
//   }, []);

//   useEffect(() => {
//     document.title = "Contact | Shivam Roy";
//     const metaDescription = document.querySelector('meta[name="description"]');
//     if (metaDescription) {
//       metaDescription.setAttribute(
//         "content",
//         "Get in touch with Shivam Roy – Full Stack Developer. Contact form, email, and social links."
//       );
//     }
//   }, []);
  

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const submitForm = async (e) => {
//     e.preventDefault();
//     setSending(true);
//     setStatus("");

//     const res = await fetch("/api/contact", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: form.name,
//         email: form.email,
//         message: form.message,
//         captchaId,
//         captchaInput: form.captchaInput,
//       }),
//     });

//     const data = await res.json();
//     setSending(false);

//     if (res.ok) {
//       setForm({ name: "", email: "", message: "", captchaInput: "" });
//       loadCaptcha();
//       setStatus("Message sent successfully");
//     } else {
//       setStatus(data.error || "Failed to send message");
//       loadCaptcha();
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto px-6 py-10">
//       <h1 className="text-lg font-semibold mb-6">Contact</h1>

//       <form onSubmit={submitForm} className="space-y-4">

//         <input
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Your Name"
//           required
//           className="w-full bg-transparent border border-[var(--twitter-blue)] px-4 py-2 text-sm"
//         />

//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Your Email"
//           required
//           className="w-full bg-transparent border border-[var(--twitter-blue)] px-4 py-2 text-sm"
//         />

//         <textarea
//           name="message"
//           value={form.message}
//           onChange={handleChange}
//           placeholder="Your Message"
//           rows={5}
//           required
//           className="w-full bg-transparent border border-[var(--twitter-blue)] px-4 py-2 text-sm resize-none"
//         />

//         {/* CAPTCHA */}
//         <div className="space-y-2">
//           {captchaImage && (
//             <img
//               src={captchaImage}
//               alt="captcha"
//               width={160}
//               height={60}
//               className="border border-[var(--twitter-blue)]"
//             />
//           )}

//           <input
//             name="captchaInput"
//             value={form.captchaInput}
//             onChange={handleChange}
//             placeholder="Enter CAPTCHA (case-sensitive)"
//             required
//             className="w-full bg-transparent border border-[var(--twitter-blue)] px-4 py-2 text-sm"
//           />

//           <button
//             type="button"
//             onClick={loadCaptcha}
//             className="text-sm underline"
//           >
//             Refresh CAPTCHA
//           </button>
//         </div>

//         <button
//           type="submit"
//           disabled={sending}
//           className="px-6 py-2 text-sm border border-[var(--twitter-blue)] hover:bg-[var(--twitter-blue)] disabled:opacity-50"
//         >
//           {sending ? "Sending..." : "Send Message"}
//         </button>

//         {status && <p className="text-sm">{status}</p>}
//       </form>
//     </div>
//   );
// }



// ============================================
// FILE: app/contact/page.jsx
// ============================================
// "use client";

// import { useEffect, useState } from "react";

// export default function ContactPage() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//     captchaInput: "",
//   });

//   const [captchaId, setCaptchaId] = useState("");
//   const [captchaImage, setCaptchaImage] = useState("");
//   const [status, setStatus] = useState("");
//   const [sending, setSending] = useState(false);

//   const loadCaptcha = async () => {
//     const res = await fetch("https://freeimagecaptcha.vercel.app/api/captcha");
//     const data = await res.json();
//     setCaptchaId(data.captchaId);
//     setCaptchaImage(data.image);
//     setForm((f) => ({ ...f, captchaInput: "" }));
//   };

//   useEffect(() => {
//     loadCaptcha();
//   }, []);

//   useEffect(() => {
//     document.title = "Contact | Shivam Roy";
//     const metaDescription = document.querySelector('meta[name="description"]');
//     if (metaDescription) {
//       metaDescription.setAttribute(
//         "content",
//         "Get in touch with Shivam Roy – Full Stack Developer. Contact form, email, and social links."
//       );
//     }
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const submitForm = async (e) => {
//     e.preventDefault();
//     setSending(true);
//     setStatus("");

//     const res = await fetch("/api/contact", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: form.name,
//         email: form.email,
//         message: form.message,
//         captchaId,
//         captchaInput: form.captchaInput,
//       }),
//     });

//     const data = await res.json();
//     setSending(false);

//     if (res.ok) {
//       setForm({ name: "", email: "", message: "", captchaInput: "" });
//       loadCaptcha();
//       setStatus("Message sent successfully");
//     } else {
//       setStatus(data.error || "Failed to send message");
//       loadCaptcha();
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-140px)] max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
//       <div className="bg-[var(--ocean-deep)] border-2 border-[var(--twitter-blue)] p-6 sm:p-10">
        
//         <h1 className="text-xl sm:text-2xl font-bold mb-2 text-white border-b-2 border-[var(--twitter-blue)] pb-3">
//           Contact Me
//         </h1>
//         <p className="text-sm sm:text-base text-[var(--icy-blue)] mb-8">
//           Get in touch for collaborations, projects, or inquiries
//         </p>

//         <form onSubmit={submitForm} className="space-y-6">

//           <div>
//             <label className="block text-sm font-semibold text-white mb-2">
//               Your Name *
//             </label>
//             <input
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="Enter your full name"
//               required
//               className="w-full bg-[var(--twitter-blue)] border-2 border-[var(--brilliant-azure)] px-4 py-3 text-sm sm:text-base text-white placeholder-[var(--icy-blue)] focus:border-[var(--dodger-blue)] focus:outline-none transition-colors duration-200"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-white mb-2">
//               Your Email *
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="your.email@example.com"
//               required
//               className="w-full bg-[var(--twitter-blue)] border-2 border-[var(--brilliant-azure)] px-4 py-3 text-sm sm:text-base text-white placeholder-[var(--icy-blue)] focus:border-[var(--dodger-blue)] focus:outline-none transition-colors duration-200"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-white mb-2">
//               Your Message *
//             </label>
//             <textarea
//               name="message"
//               value={form.message}
//               onChange={handleChange}
//               placeholder="Write your message here..."
//               rows={6}
//               required
//               className="w-full bg-[var(--twitter-blue)] border-2 border-[var(--brilliant-azure)] px-4 py-3 text-sm sm:text-base text-white placeholder-[var(--icy-blue)] resize-none focus:border-[var(--dodger-blue)] focus:outline-none transition-colors duration-200"
//             />
//           </div>

//           {/* CAPTCHA */}
//           <div className="space-y-4 bg-[var(--twitter-blue)] p-4 sm:p-6 border-2 border-[var(--brilliant-azure)]">
//             <label className="block text-sm font-semibold text-white">
//               Verification *
//             </label>
            
//             {captchaImage && (
//               <img
//                 src={captchaImage}
//                 alt="captcha"
//                 width={160}
//                 height={60}
//                 className="border-2 border-[var(--dodger-blue)]"
//               />
//             )}

//             <input
//               name="captchaInput"
//               value={form.captchaInput}
//               onChange={handleChange}
//               placeholder="Enter CAPTCHA (case-sensitive)"
//               required
//               className="w-full bg-[var(--ocean-deep)] border-2 border-[var(--brilliant-azure)] px-4 py-3 text-sm sm:text-base text-white placeholder-[var(--icy-blue)] focus:border-[var(--dodger-blue)] focus:outline-none transition-colors duration-200"
//             />

//             <button
//               type="button"
//               onClick={loadCaptcha}
//               className="text-sm text-[var(--alice-blue)] underline hover:text-white transition-colors duration-200"
//             >
//               Refresh CAPTCHA
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={sending}
//             className="w-full px-6 py-4 text-sm sm:text-base font-bold border-2 border-[var(--twitter-blue)] bg-[var(--twitter-blue)] text-white hover:bg-[var(--dodger-blue)] hover:border-[var(--dodger-blue)] disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-all duration-200"
//           >
//             {sending ? "Sending..." : "Send Message"}
//           </button>

//           {status && (
//             <div className={`p-4 text-sm sm:text-base text-center border-2 ${
//               status.includes('success') 
//                 ? 'bg-green-900/30 border-green-500 text-green-300' 
//                 : 'bg-red-900/30 border-red-500 text-red-300'
//             }`}>
//               {status}
//             </div>
//           )}
//         </form>

//       </div>
//     </div>
//   );
// }


