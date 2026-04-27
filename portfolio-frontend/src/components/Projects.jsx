import { useEffect, useState } from "react";
import { api } from "../services/api";
import "./Projects.css";

export default function Projects({ onOpen }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getProjects()
      .then((res) => setProjects(res.data || res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <p className="section-label">// what i've built</p>
        <h2 className="section-title">Projects</h2>

        {loading && (
          <div className="proj__grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card proj__skeleton" />
            ))}
          </div>
        )}

        {error && (
          <p className="exp__error">Failed to load projects: {error}</p>
        )}

        {!loading && !error && (
          <div className="proj__grid">
            {projects.map((proj) => {
              const color = proj.colorClass || proj.color || "accent";
              return (
                <div
                  key={proj._id || proj.id}
                  className={`card proj__card proj__card--${color}`}
                  onClick={() => onOpen({ type: "project", data: proj })}
                >
                  <div className="proj__top">
                    <div>
                      <span className={`proj__type proj__type--${color}`}>{proj.type}</span>
                      <h3 className="proj__title">{proj.title}</h3>
                      <p className="proj__subtitle">{proj.subtitle}</p>
                    </div>
                    <span className="proj__arrow">↗</span>
                  </div>
                  <p className="proj__summary">{proj.summary}</p>
                  <div className="proj__stack">
                    {(proj.stack || []).slice(0, 4).map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                    {(proj.stack || []).length > 4 && (
                      <span className="tag">+{proj.stack.length - 4}</span>
                    )}
                  </div>
                  <div className="proj__metrics">
                    {(proj.metrics || []).map((m) => (
                      <div className="proj__metric" key={m.label}>
                        <span className="proj__metric-value">{m.value}</span>
                        <span className="proj__metric-label">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="proj__footer">
                    <span className="proj__period">📅 {proj.period}</span>
                    <span className="proj__hint">View Details →</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
