import { useState, useEffect } from "react";
import "./Nav.css";

const links = ["about", "skills", "experience", "projects", "contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__logo">
        <span className="nav__logo-bracket">&lt;</span>
        MA
        <span className="nav__logo-bracket">/&gt;</span>
      </div>
      <ul className="nav__links">
        {links.map((l) => (
          <li key={l}>
            <a
              href={`#${l}`}
              className={`nav__link ${active === l ? "nav__link--active" : ""}`}
              onClick={() => setActive(l)}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
      <a href="mailto:20823mohammadaqib@gmail.com" className="btn btn-primary nav__cta">
        Hire Me
      </a>
    </nav>
  );
}
