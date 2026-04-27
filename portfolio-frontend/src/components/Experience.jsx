import { useEffect, useState } from "react";
import { api } from "../services/api";
import "./Experience.css";

export default function Experience({ onOpen }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getExperience()
      .then((res) => setExperiences(res.data || res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="experience">
      <div className="container">
        <p className="section-label">// where i've worked</p>
        <h2 className="section-title">Experience</h2>

        {loading && (
          <div className="exp__loading">
            {[1, 2, 3].map((i) => (
              <div key={i} className="exp__skeleton" />
            ))}
          </div>
        )}

        {error && (
          <p className="exp__error">Failed to load experience: {error}</p>
        )}

        {!loading && !error && (
          <div className="exp__timeline">
            {experiences.map((exp, i) => (
              <div className="exp__item" key={exp._id || exp.id} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="exp__dot-col">
                  <div className={`exp__dot ${exp.status === "current" ? "exp__dot--active" : ""}`} />
                  {i < experiences.length - 1 && <div className="exp__line" />}
                </div>
                <div className="card exp__card" onClick={() => onOpen({ type: "experience", data: exp })}>
                  <div className="exp__card-top">
                    <div>
                      <div className="exp__company-row">
                        <h3 className="exp__company">{exp.company}</h3>
                        {exp.status === "current" && (
                          <span className="exp__badge exp__badge--current">Current</span>
                        )}
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
                    {(exp.stack || []).slice(0, 5).map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                    {(exp.stack || []).length > 5 && (
                      <span className="tag">+{exp.stack.length - 5} more</span>
                    )}
                  </div>
                  <div className="exp__metrics">
                    {(exp.metrics || []).map((m) => (
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
        )}
      </div>
    </section>
  );
}
