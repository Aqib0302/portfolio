import "./Skills.css";

const FRONTEND = ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "GraphQL"];
const BACKEND = ["Node.js", "Express.js", "REST APIs", "Kafka", "RabbitMQ", "Redis", "JWT/OAuth2"];
const DATABASE = ["MongoDB", "PostgreSQL", "MySQL", "Redis", "SQL", "NoSQL"];
const DEVOPS = ["Docker", "Kubernetes", "AWS", "Jenkins", "ELK Stack", "Prometheus", "Grafana", "Git"];

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <p className="section-label">// what i use</p>
        <h2 className="section-title">Tech <span>Stack</span></h2>

        <div className="skills__grid">
          <SkillGroup title="Frontend" icon="⬡" items={FRONTEND} color="accent" />
          <SkillGroup title="Backend" icon="⬡" items={BACKEND} color="accent3" />
          <SkillGroup title="Databases" icon="⬡" items={DATABASE} color="accent2" />
          <SkillGroup title="DevOps & Cloud" icon="⬡" items={DEVOPS} color="accent" />
        </div>
      </div>
    </section>
  );
}

function SkillGroup({ title, icon, items, color }) {
  return (
    <div className={`skill-group skill-group--${color}`}>
      <div className="skill-group__header">
        <span className="skill-group__icon">{icon}</span>
        <h3 className="skill-group__title">{title}</h3>
      </div>
      <div className="skill-group__items">
        {items.map((s) => (
          <span className="skill-pill" key={s}>{s}</span>
        ))}
      </div>
    </div>
  );
}
