// src/components/Experience.jsx  — API-connected version
import { useState, useEffect } from "react";
import { api } from "../services/api";
import "./Experience.css";

export default function Experience({ onOpen }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getExperience()
      .then((res) => setExperiences(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <section id="experience"><div className="container">
      <p className="section-label">// where i've worked</p>
      <h2 className="section-title">Experience</h2>
      <div className="loading-pulse">Loading experience...</div>
    </div></section>
  );

  if (error) return (
    <section id="experience"><div className="container">
      <p className="section-label">// where i've worked</p>
      <h2 className="section-title">Experience</h2>
      <p style={{ color: "var(--muted)" }}>Could not load experience data. ({error})</p>
    </div></section>
  );

  return (
    <section id="experience" className="experience">
      <div className="container">
        <p className="section-label">// where i've worked</p>
        <h2 className="section-title">Experience</h2>
        <div className="exp__timeline">
          {experiences.map((exp, i) => (
            <div className="exp__item" key={exp._id}>
              <div className="exp__dot-col">
                <div className={`exp__dot ${exp.status === "current" ? "exp__dot--active" : ""}`} />
                {i < experiences.length - 1 && <div className="exp__line" />}
              </div>
              <div className="card exp__card" onClick={() => onOpen({ type: "experience", data: exp })}>
                <div className="exp__card-top">
                  <div>
                    <div className="exp__company-row">
                      <h3 className="exp__company">{exp.company}</h3>
                      {exp.status === "current" && <span className="exp__badge exp__badge--current">Current</span>}
                      <span className="exp__badge">{exp.type}</span>
                    </div>
                    <div className="exp__role">{exp.role}</div>
                    <div className="exp__meta">
                      <span>📍 {exp.location}</span>
                      <span>📅 {exp.period}</span>
                    </div>
                  </div>
                  <div className="exp__arrow">→</div>
                </div>
                <p className="exp__summary">{exp.summary}</p>
                <div className="exp__stack">
                  {exp.stack.slice(0, 5).map((t) => <span className="tag" key={t}>{t}</span>)}
                  {exp.stack.length > 5 && <span className="tag">+{exp.stack.length - 5} more</span>}
                </div>
                <div className="exp__metrics">
                  {exp.metrics.map((m) => (
                    <div className="exp__metric" key={m.label}>
                      <span className="exp__metric-value">{m.value}</span>
                      <span className="exp__metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
                <div className="exp__click-hint">Click to view details →</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
