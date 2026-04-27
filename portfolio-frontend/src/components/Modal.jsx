import { useEffect } from "react";
import "./Modal.css";

export default function Modal({ data, onClose }) {
  const { type, data: d } = data;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>✕</button>

        <div className="modal__header">
          {type === "experience" ? (
            <>
              <div className="modal__label">Experience</div>
              <h2 className="modal__title">{d.company}</h2>
              <div className="modal__role">{d.role}</div>
              <div className="modal__meta">
                <span>📍 {d.location}</span>
                <span>📅 {d.period}</span>
                <span className={`modal__badge ${d.status === "current" ? "modal__badge--current" : ""}`}>
                  {d.type}
                </span>
                {d.status === "current" && (
                  <span className="modal__badge modal__badge--current">● Current</span>
                )}
              </div>
              {d.url && d.url !== "#" && (
                <a href={d.url} target="_blank" rel="noreferrer" className="modal__link">
                  Visit Website ↗
                </a>
              )}
            </>
          ) : (
            <>
              <div className="modal__label">Project</div>
              <h2 className="modal__title">{d.title}</h2>
              <div className="modal__role">{d.subtitle}</div>
              <div className="modal__meta">
                <span>📅 {d.period}</span>
                <span className="modal__badge">{d.type}</span>
              </div>
              {d.link && (
                <a href={d.link} target="_blank" rel="noreferrer" className="modal__link">
                  Visit Live Project ↗
                </a>
              )}
            </>
          )}
        </div>

        <div className="modal__body">
          <div className="modal__metrics">
            {d.metrics.map((m) => (
              <div className="modal__metric" key={m.label}>
                <span className="modal__metric-value">{m.value}</span>
                <span className="modal__metric-label">{m.label}</span>
              </div>
            ))}
          </div>

          <div className="modal__section">
            <h4 className="modal__section-title">// Overview</h4>
            <p className="modal__summary">{d.summary}</p>
          </div>

          <div className="modal__section">
            <h4 className="modal__section-title">// Key Highlights</h4>
            <ul className="modal__highlights">
              {d.highlights.map((h, i) => (
                <li key={i} className="modal__highlight">
                  <span className="modal__highlight-dot">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="modal__section">
            <h4 className="modal__section-title">// Tech Stack</h4>
            <div className="modal__stack">
              {d.stack.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
