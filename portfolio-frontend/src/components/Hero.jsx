import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__grid-lines" aria-hidden="true" />
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />

      <div className="container hero__inner">
        <div className="hero__badge">
          <span className="hero__dot" />
          Available for Full-Time Roles in UAE
        </div>

        <h1 className="hero__name">
          Mohammad<br />
          <span className="hero__name-accent">Aqib</span>
        </h1>

        <div className="hero__role">
          <span className="hero__role-prefix">$</span> Software Engineer — MERN Stack
        </div>

        <p className="hero__bio">
          2+ years building scalable web apps & SaaS platforms. Delivered{" "}
          <em>40% faster APIs</em>, <em>50% faster deployments</em>,{" "}
          <em>65% faster incident detection</em> & zero security breaches.
        </p>

        <div className="hero__ctas">
          <a href="#projects" className="btn btn-primary">View Work</a>
          <a href="#contact" className="btn btn-outline">Get In Touch</a>
        </div>

        <div className="hero__stats">
          {[
            { n: "2+", label: "Years Exp." },
            { n: "40%", label: "API Speed ↑" },
            { n: "99.9%", label: "Uptime" },
            { n: "1st", label: "Hackathon" },
          ].map((s) => (
            <div className="hero__stat" key={s.label}>
              <span className="hero__stat-n">{s.n}</span>
              <span className="hero__stat-l">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}
