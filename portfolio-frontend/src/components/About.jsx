import "./About.css";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about__inner">
        <div className="about__left">
          <p className="section-label">// who i am</p>
          <h2 className="section-title">About <span>Me</span></h2>
          <p className="about__text">
            Results-driven Software Engineer (MERN Stack) based in Dubai, UAE with 2+ years of
            experience building scalable web applications and SaaS platforms. I specialize in
            full-stack development with a strong command of microservices, distributed systems,
            and DevOps tooling.
          </p>
          <p className="about__text">
            Currently freelancing with Quality Care Group, delivering end-to-end CRM solutions
            that reduce manual effort and improve operational efficiency. Previously at Siemens India,
            where I architected a B2B e-commerce platform handling 3x traffic surges with 99.9% uptime.
          </p>
          <div className="about__details">
            {[
              { label: "Location", value: "Al Nahda 1, Dubai, UAE" },
              { label: "Phone", value: "+971 55 514 1205" },
              { label: "Email", value: "20823mohammadaqib@gmail.com" },
              { label: "Visa", value: "Visit Visa — Valid till 25/05/2026" },
              { label: "Degree", value: "B.E. — Electronics & Comm. Eng." },
              { label: "University", value: "Savitribai Phule Pune University" },
            ].map((d) => (
              <div className="about__detail" key={d.label}>
                <span className="about__detail-label">{d.label}</span>
                <span className="about__detail-value">{d.value}</span>
              </div>
            ))}
          </div>
          <div className="about__links">
            <a href="https://linkedin.com/in/mohammadaqib2001" target="_blank" rel="noreferrer" className="btn btn-outline">
              LinkedIn ↗
            </a>
            <a href="mailto:20823mohammadaqib@gmail.com" className="btn btn-primary">
              Contact Me
            </a>
          </div>
        </div>

        <div className="about__right">
          <div className="about__card-wrap">
            <div className="about__avatar-card">
              <div className="about__avatar-ring" />
              <div className="about__avatar">
                <span>MA</span>
              </div>
              <div className="about__avatar-tags">
                <span className="tag">MERN Stack</span>
                <span className="tag">DevOps</span>
                <span className="tag">AWS</span>
                <span className="tag">Microservices</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
