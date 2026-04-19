import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { isEmail } from "../Helper/RegexMatcher";
import axiosInstance from "../Helper/axiosInstance";

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState("");

  function inputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function onFormSubmit(event) {
  event.preventDefault();
  
  if (!formData.name || !formData.email || !formData.message) {
    toast.error("Fill all the details");
    return;
  }
  
  if (!isEmail(formData.email)) {
    toast.error("Invalid email id");
    return;
  }

  const responsePromise = axiosInstance.post("/contact/sendMessage", formData);

  toast.promise(responsePromise, {
    loading: "Submitting your message...",
    success: "Message sent successfully!",
    error: (err) => err?.response?.data?.message || "Failed to submit", // Dynamic error message
  });

  try {
    const response = await responsePromise;
    if (response?.data?.success) {
      setFormData({ name: "", email: "", message: "" });
    }
  } catch (e) {
    console.error("Submission error:", e);
  }
}

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-yellow-500/50 focus:bg-yellow-500/5 focus:ring-2 focus:ring-yellow-500/10";

  const labelClass = (field) =>
    `block text-[11px] font-semibold uppercase tracking-widest mb-2 transition-colors duration-200 ${
      focused === field ? "text-yellow-400" : "text-white/40"
    }`;

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-[#0a0c10] relative overflow-hidden">

        {/* Glow blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/[0.07] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/[0.04] rounded-full blur-3xl pointer-events-none" />

        {/* Card */}
        <div className="w-full max-w-[460px] bg-white/[0.03] border border-white/[0.09] rounded-2xl p-10 relative z-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/25 rounded-full px-3 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-[11px] text-yellow-400 font-semibold uppercase tracking-widest">
              We reply within 24h
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
            Get in touch
          </h1>
          <p className="text-sm text-white/35 font-light mb-8 leading-relaxed">
            Have a question or want to work together?<br />Drop us a message below.
          </p>

          {/* Form */}
          <form onSubmit={onFormSubmit} noValidate className="flex flex-col gap-5">

            {/* Name */}
            <div>
              <label htmlFor="name" className={labelClass("name")}>Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className={inputClass}
                placeholder="Enter your name..."
                onChange={inputChange}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused("")}
                value={formData.name}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass("email")}>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className={inputClass}
                placeholder="Enter your email..."
                onChange={inputChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                value={formData.email}
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className={labelClass("message")}>Message</label>
              <textarea
                name="message"
                id="message"
                className={`${inputClass} resize-none h-32`}
                placeholder="Tell us what's on your mind..."
                onChange={inputChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused("")}
                value={formData.message}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 hover:opacity-85 active:scale-[0.98] transition-all duration-200 cursor-pointer mt-1"
            >
              Send message <span className="text-base">→</span>
            </button>
          </form>

        
        </div>
      </div>
    </HomeLayout>
  );
}

export default Contact;