import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Modal from "./components/Modal";
import Nav from "./components/Nav";
import { api } from "./services/api";
import "./styles/global.css";

export default function App() {
  const [modal, setModal] = useState(null);

  useEffect(() => {
    // Track page visit — fire and forget
    api.trackVisit().catch(() => {});
  }, []);

  return (
    <div className="app">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience onOpen={setModal} />
      <Projects onOpen={setModal} />
      <Contact />
      {modal && <Modal data={modal} onClose={() => setModal(null)} />}
    </div>
  );
}
