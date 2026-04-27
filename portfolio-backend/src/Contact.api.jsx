// src/components/Contact.jsx — API-connected version
import { useState } from "react";
import { api } from "../services/api";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await api.submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container contact__inner">
        <p className="section-label">// let's connect</p>
        <h2 className="section-title">Get In <span>Touch</span></h2>

        <div className="contact__grid">
          <div className="contact__info">
            <p className="contact__text">
              Currently open to full-time opportunities in UAE. Whether you have a project
              in mind or just want to say hi — my inbox is always open.
            </p>
            <div className="contact__items">
              {[
                { icon: "📧", label: "Email", value: "20823mohammadaqib@gmail.com", href: "mailto:20823mohammadaqib@gmail.com" },
                { icon: "📱", label: "Phone", value: "+971 55 514 1205", href: "tel:+971555141205" },
                { icon: "🔗", label: "LinkedIn", value: "linkedin.com/in/mohammadaqib2001", href: "https://linkedin.com/in/mohammadaqib2001" },
                { icon: "📍", label: "Location", value: "Al Nahda 1, Dubai, UAE", href: null },
              ].map((c) => (
                <div className="contact__item" key={c.label}>
                  <span className="contact__icon">{c.icon}</span>
                  <div>
                    <div className="contact__item-label">{c.label}</div>
                    {c.href
                      ? <a href={c.href} target="_blank" rel="noreferrer" className="contact__item-value contact__item-value--link">{c.value}</a>
                      : <span className="contact__item-value">{c.value}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Contact Form ── */}
          <div>
            {status === "success" ? (
              <div className="contact__success">
                <div className="contact__success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button className="btn btn-outline" onClick={() => setStatus(null)}>Send Another</button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label className="contact__label">Name</label>
                    <input className="contact__input" name="name" value={form.name}
                      onChange={handleChange} placeholder="Your name" required />
                  </div>
                  <div className="contact__field">
                    <label className="contact__label">Email</label>
                    <input className="contact__input" name="email" type="email" value={form.email}
                      onChange={handleChange} placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="contact__field">
                  <label className="contact__label">Subject</label>
                  <input className="contact__input" name="subject" value={form.subject}
                    onChange={handleChange} placeholder="Job opportunity / Project / Hello" required />
                </div>
                <div className="contact__field">
                  <label className="contact__label">Message</label>
                  <textarea className="contact__input contact__textarea" name="message" value={form.message}
                    onChange={handleChange} placeholder="Tell me about your project or opportunity..."
                    rows={5} required />
                </div>
                {status === "error" && (
                  <div className="contact__error">⚠ {errorMsg}</div>
                )}
                <button type="submit" className="btn btn-primary contact__btn" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="container">
          <span>© 2025 Mohammad Aqib. Built with React + Node.js.</span>
          <span>Dubai, UAE</span>
        </div>
      </footer>
    </section>
  );
}
