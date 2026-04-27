import { useState } from "react";
import { api } from "../services/api";
import "./Contact.css";

const INITIAL = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrMsg("");
    try {
      await api.submitContact(form);
      setStatus("success");
      setForm(INITIAL);
    } catch (err) {
      setStatus("error");
      setErrMsg(err.message || "Something went wrong. Please try again.");
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
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noreferrer" className="contact__item-value contact__item-value--link">
                        {c.value}
                      </a>
                    ) : (
                      <span className="contact__item-value">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact__form-block">
            {status === "success" ? (
              <div className="contact__success">
                <span className="contact__success-icon">✅</span>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll get back to you soon.</p>
                <button className="btn btn-outline" onClick={() => setStatus(null)}>
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      disabled={status === "sending"}
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      disabled={status === "sending"}
                    />
                  </div>
                </div>
                <div className="contact__field">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    disabled={status === "sending"}
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    disabled={status === "sending"}
                  />
                </div>
                {status === "error" && (
                  <p className="contact__form-error">⚠️ {errMsg}</p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary contact__btn"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <span>© 2025 Mohammad Aqib. Built with React.</span>
          <span>Dubai, UAE</span>
        </div>
      </footer>
    </section>
  );
}
