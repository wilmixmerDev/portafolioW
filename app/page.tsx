"use client";

import { useEffect, useRef, useState } from "react";

type EngineRefMap = Record<string, HTMLDivElement | null>;

const translations = {
  es: {
    nav: { about: "Sobre mí", projects: "Proyectos", contact: "Contacto", menu: "Menú", close: "Cerrar" },
    hero: { subtitle: "Ingeniero de Sistemas | Desarrollador Full-Stack", title: ["WILMER", "IRIARTE", "DEVELOPER"], bio: "Soy estudiante de Ingeniería de Sistemas en la Fundación Universitaria Tecnológico Comfenalco. Mi objetivo es desarrollar soluciones tecnológicas innovadoras, eficientes y escalables. Busco oportunidades donde pueda aplicar mis conocimientos en desarrollo de software mientras continúo creciendo como profesional en el ecosistema tech.", location: "Colombia / Disponible Globalmente", showreel: "Ver Mi Trabajo" },
    projects: { title: "Proyectos Representativos", subtitle: "2024 — 2026 Portafolio" },
    engine: { title: "Stack Tecnológico", subtitle: "Herramientas y lenguajes que domino" },
    contact: { title: "TRABAJEMOS JUNTOS EN\nPROYECTOS INCREÍBLES", subtitle: "Estoy abierto a oportunidades de prácticas profesionales, colaboraciones y proyectos desafiantes. Si tienes una idea o un proyecto en mente, me encantaría escucharte y explorar cómo podemos trabajar juntos para llevarla a la realidad.", email: "Correo", phone: "Teléfono", submitBtn: "Enviar", formFields: { email: "Tu Correo", subject: "Asunto", message: "Tu Mensaje" }, placeholders: { email: "tu.email@ejemplo.com", subject: "Propuesta de Proyecto", message: "Cuéntame qué tienes en mente..." } },
    footer: { copyright: "© 2026 WILMER IRIARTE. TODOS LOS DERECHOS RESERVADOS." },
  },
  en: {
    nav: { about: "About", projects: "Projects", contact: "Contact", menu: "Menu", close: "Close" },
    hero: { subtitle: "Systems Engineer | Full-Stack Developer", title: ["WILMER", "IRIARTE", "DEVELOPER"], bio: "I'm a Systems Engineering student at Fundación Universitaria Tecnológico Comfenalco, passionate about building innovative and scalable software solutions. My goal is to develop technology that creates real impact while continuously expanding my skills in the tech industry and delivering excellence in every project.", location: "Colombia / Available Globally", showreel: "View My Work" },
    projects: { title: "Featured Projects", subtitle: "2024 — 2026 Portfolio" },
    engine: { title: "Tech Stack", subtitle: "Languages and tools I work with" },
    contact: { title: "LET'S COLLABORATE ON\nAMAZING PROJECTS", subtitle: "I'm open to internships, collaborations, and exciting projects. If you have an idea or project in mind, I'd love to hear about it and explore how we can work together to bring it to life.", email: "Email", phone: "Phone", submitBtn: "Send", formFields: { email: "Your Email", subject: "Subject", message: "Your Message" }, placeholders: { email: "your.email@example.com", subject: "Project Proposal", message: "Tell me what you have in mind..." } },
    footer: { copyright: "© 2026 WILMER IRIARTE. ALL RIGHTS RESERVED." },
  }
};

export default function Home() {
  const [videoFailed, setVideoFailed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"es" | "en">("es");
  const engineRefs = useRef<EngineRefMap>({});

  useEffect(() => {
    const browserLang = navigator.language.startsWith("es") ? "es" : "en";
    setLanguage(browserLang);
  }, []);

  const navigateToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-up")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    revealElements.forEach((element) => observer.observe(element));

    const cleanupCallbacks: Array<() => void> = [];

    Object.values(engineRefs.current).forEach((card) => {
      if (!card) return;

      const onMouseMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        const inner = card.querySelector<HTMLElement>(".engine-card-inner");
        if (!inner) return;

        inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      };

      const onMouseLeave = () => {
        const inner = card.querySelector<HTMLElement>(".engine-card-inner");
        if (!inner) return;
        inner.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      };

      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseleave", onMouseLeave);

      cleanupCallbacks.push(() => {
        card.removeEventListener("mousemove", onMouseMove);
        card.removeEventListener("mouseleave", onMouseLeave);
      });
    });

    return () => {
      observer.disconnect();
      cleanupCallbacks.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-[#e2e2e2]">
      <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          onError={() => setVideoFailed(true)}
        >
          <source src="/videos/BMW M3 Competition - 4K Cinematic Short Video.mp4" type="video/mp4" />
        </video>
      </div>

      {videoFailed && <div className="fixed inset-0 z-5 bg-[#0e0e0e]" />}

      <div className="fixed inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.72)_100%)]" />

      <header className="pointer-events-none fixed left-0 top-0 z-40 flex w-full items-center justify-between px-4 py-4 sm:px-5 sm:py-5 md:px-8 md:py-8">
        <a
          href="#"
          className="pointer-events-auto text-base font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-70 sm:text-xl sm:tracking-widest"
        >
          WILMER
        </a>

        <nav className="pointer-events-auto flex items-center gap-3 rounded-xl border border-white/10 bg-[#131313]/40 px-3 py-2 backdrop-blur-xl transition-all duration-500 sm:gap-6 sm:px-5 sm:py-3 md:gap-10 md:px-10 md:py-5">
          <div className="hidden items-center gap-5 sm:flex md:gap-10">
            <a
              className="nav-link text-xs font-bold uppercase tracking-[-0.04em] text-[#e2e2e2]/60 hover:text-white md:text-sm"
              href="#about"
              onClick={(event) => navigateToSection(event, "about")}
            >
              {translations[language].nav.about}
            </a>
            <a
              className="nav-link text-xs font-bold uppercase tracking-[-0.04em] text-[#e2e2e2]/60 hover:text-white md:text-sm"
              href="#projects"
              onClick={(event) => navigateToSection(event, "projects")}
            >
              {translations[language].nav.projects}
            </a>
            <a
              className="nav-link text-xs font-bold uppercase tracking-[-0.04em] text-[#e2e2e2]/60 hover:text-white md:text-sm"
              href="#contact"
              onClick={(event) => navigateToSection(event, "contact")}
            >
              {translations[language].nav.contact}
            </a>
          </div>
          <button
            className="rounded-md border border-white/10 px-2 py-1 text-xs uppercase tracking-[0.15em] text-white/50 transition-colors hover:text-white"
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            title={language === "es" ? "Switch to English" : "Cambiar a Español"}
          >
            {language === "es" ? "EN" : "ES"}
          </button>
          <button
            className="rounded-md border border-white/10 px-2 py-1 text-xs uppercase tracking-[0.15em] text-white/70 sm:hidden"
            onClick={() => setMobileMenuOpen((current) => !current)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? translations[language].nav.close : translations[language].nav.menu}
          </button>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed left-4 right-4 top-20 z-40 rounded-xl border border-white/15 bg-black/70 p-4 backdrop-blur-xl sm:hidden"
        >
          <div className="flex flex-col gap-3">
            <a
              href="#about"
              onClick={(event) => navigateToSection(event, "about")}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm uppercase tracking-[0.15em] text-white/80"
            >
              {translations[language].nav.about}
            </a>
            <a
              href="#projects"
              onClick={(event) => navigateToSection(event, "projects")}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm uppercase tracking-[0.15em] text-white/80"
            >
              {translations[language].nav.projects}
            </a>
            <a
              href="#contact"
              onClick={(event) => navigateToSection(event, "contact")}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm uppercase tracking-[0.15em] text-white/80"
            >
              {translations[language].nav.contact}
            </a>
          </div>
        </div>
      )}

      <main className="relative z-20">
        <section
          id="about"
          className="flex min-h-screen flex-col px-5 pb-10 pt-28 sm:px-6 sm:pt-32 md:px-24 md:pt-48"
        >
          <div className="mx-auto w-full max-w-6xl">
            <div className="reveal-up" style={{ transitionDelay: "0.2s" }}>
              <span className="mb-5 block text-[10px] uppercase tracking-[0.28em] text-white/30 sm:text-[11px] sm:tracking-[0.4em]">
                {translations[language].hero.subtitle}
              </span>
            </div>

            <h1 className="font-headline mb-10 text-[16vw] font-bold leading-[0.85] tracking-[-0.05em] text-white sm:text-[14vw] md:mb-12 md:text-[8rem]">
              <div className="overflow-hidden">
                <span className="reveal-up block" style={{ transitionDelay: "0.3s" }}>
                  WILMER
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="reveal-up block" style={{ transitionDelay: "0.4s" }}>
                  IRIARTE
                </span>
              </div>
              <div className="overflow-hidden">
                <span
                  className="reveal-up block text-white/10"
                  style={{
                    transitionDelay: "0.5s",
                    WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                  }}
                >
                  DEVELOPER.
                </span>
              </div>
            </h1>

            <div
              className="reveal-up mt-10 grid grid-cols-1 items-end gap-8 sm:mt-12 md:mt-20 md:grid-cols-12 md:gap-12"
              style={{ transitionDelay: "0.7s" }}
            >
              <div className="glass-panel rounded-xl p-5 sm:p-6 md:col-span-6 md:p-10">
                <p className="text-base font-light leading-relaxed text-white/70 sm:text-lg md:text-xl">
                  {translations[language].hero.bio}
                </p>
              </div>

              <div className="md:col-start-9 md:col-span-4">
                <div className="flex flex-col gap-6 sm:gap-8">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/40 sm:text-[11px] sm:tracking-[0.2em]">
                    {translations[language].hero.location}
                  </div>
                  <button className="group relative overflow-hidden bg-white px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:pr-10 sm:px-8 sm:py-5 sm:text-[11px] sm:tracking-[0.3em] sm:hover:pr-14">
                    <span className="relative z-10">{translations[language].hero.showreel}</span>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-all group-hover:opacity-100">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="px-5 py-20 sm:px-6 sm:py-24 md:px-24 md:py-40">
          <div className="mx-auto w-full max-w-7xl">
            <div className="reveal-up mb-10 flex flex-col items-start justify-between gap-3 border-b border-white/10 pb-6 sm:mb-12 sm:pb-8 md:mb-24 md:flex-row md:items-end md:gap-4 md:pb-10">
              <h2 className="font-headline text-2xl font-medium uppercase tracking-tighter sm:text-3xl md:text-4xl">
                {translations[language].projects.title}
              </h2>
              <span className="font-label text-[9px] uppercase tracking-[0.2em] text-white/30 sm:text-[10px] sm:tracking-[0.3em] md:text-[0.6rem]">
                {translations[language].projects.subtitle}
              </span>
            </div>

            <div className="space-y-0">
              {[
                {
                  id: "01",
                  title: "Urosalud",
                  tags: ["Healthcare", "Full-Stack"],
                  year: "2024",
                },
                {
                  id: "02",
                  title: "EasyPlanning",
                  tags: ["Booking", "Events"],
                  year: "2024",
                },
                {
                  id: "03",
                  title: "Portfolio",
                  tags: ["Next.js", "React"],
                  year: "2026",
                },
              ].map((project, index) => (
                <a
                  key={project.id}
                  href="#"
                  className="project-row group reveal-up relative block border-b border-white/5 px-3 py-10 sm:px-4 sm:py-12 md:px-6 md:py-20"
                  style={{ transitionDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-70"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.01) 100%)",
                    }}
                  />
                  <div className="grid grid-cols-1 items-center gap-4 sm:gap-6 md:grid-cols-12 md:gap-8">
                    <div className="font-headline text-lg text-white/10 transition-colors duration-700 group-hover:text-white sm:text-xl md:col-span-1">
                      {project.id}
                    </div>
                    <div className="overflow-hidden md:col-span-6">
                      <h3 className="project-title font-headline text-2xl uppercase tracking-tight sm:text-3xl md:text-6xl">
                        <span className="project-text">{project.title}</span>
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2 opacity-70 transition-all duration-700 group-hover:opacity-100 md:col-span-3 md:gap-3 md:opacity-40">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/20 px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] text-white transition-colors duration-500 group-hover:border-white/45 sm:text-[9px] sm:tracking-widest md:text-[0.55rem]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="font-label text-[9px] uppercase tracking-[0.12em] text-white/25 sm:text-[10px] sm:tracking-[0.2em] md:col-span-2 md:text-right md:text-[0.6rem]">
                      Year: {project.year}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden px-5 py-20 sm:px-6 sm:py-24 md:px-24 md:py-40">
          <div className="mx-auto w-full max-w-7xl">
            <div className="reveal-up mb-10 text-center sm:mb-12 md:mb-24">
              <h2 className="font-headline mb-5 text-[11px] uppercase tracking-[0.35em] text-white/40 sm:text-sm sm:tracking-[0.5em]">
                {translations[language].engine.title}
              </h2>
              <p className="text-xs text-white/30">{translations[language].engine.subtitle}</p>
              <div className="mx-auto mt-4 h-px w-16 bg-white/20" />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-6 md:gap-6">
              {[
                {
                  key: "java",
                  label: "Java",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M8 4h8M10 8v8M14 8v8M7 4c-1 0-2 1-2 2v8c0 1 1 2 2 2M17 4c1 0 2 1 2 2v8c0 1-1 2-2 2M6 16h12v2c0 1-1 2-2 2h-8c-1 0-2-1-2-2v-2Z" />
                    </svg>
                  ),
                },
                {
                  key: "react",
                  label: "React",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="2.2" />
                      <ellipse cx="12" cy="12" rx="9" ry="3.8" />
                      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
                      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
                    </svg>
                  ),
                },
                {
                  key: "next",
                  label: "Next.js",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M6 18V6l12 12V6" />
                    </svg>
                  ),
                },
                {
                  key: "ts",
                  label: "TypeScript",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 7h16" />
                      <path d="M8 7v10" />
                      <path d="M13 11c0-1.1.9-2 2-2h1.4A1.6 1.6 0 0 1 18 10.6c0 .9-.7 1.6-1.6 1.6H15a2 2 0 1 0 0 4h1.4" />
                    </svg>
                  ),
                },
                {
                  key: "mysql",
                  label: "MySQL",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="6" cy="9" r="1.5" />
                      <circle cx="12" cy="6" r="1.5" />
                      <circle cx="18" cy="9" r="1.5" />
                      <path d="M6 9v6M12 6v8M18 9v6M6 15h12" />
                    </svg>
                  ),
                },
                {
                  key: "tw",
                  label: "Tailwind",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 10c1.8-2.6 3.5-3.9 5.2-3.9 2.5 0 2.8 1.9 4.2 2.4 1.2.5 2.5-.2 4.1-2.1" />
                      <path d="M6.6 15.8c1.7-2.5 3.4-3.8 5.1-3.8 2.5 0 2.9 1.9 4.3 2.4 1.2.5 2.5-.2 4-2" />
                    </svg>
                  ),
                },
              ].map((tech, index) => (
                <div
                  key={tech.key}
                  ref={(element) => {
                    engineRefs.current[tech.key] = element;
                  }}
                  className="engine-card group float-anim"
                  style={{ animationDelay: `${index * 0.6}s` }}
                >
                  <div className="engine-card-inner glass-panel relative flex h-full min-h-32 flex-col items-center justify-center rounded-2xl p-4 text-center sm:p-6 md:min-h-0 md:p-10">
                    <div className="glow-overlay" />
                    <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/55 transition-colors group-hover:text-white sm:mb-6 sm:h-10 sm:w-10">
                      {tech.icon}
                    </div>
                    <p className="font-label text-[9px] font-bold uppercase tracking-[0.22em] sm:text-[10px] sm:tracking-[0.3em] md:text-[0.65rem]">
                      {tech.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="reveal-up mb-12 px-5 py-16 sm:px-6 sm:py-24 md:mb-20 md:px-24 md:py-40">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-24">
            <div>
              <h2 className="font-headline mb-6 text-4xl font-bold leading-none tracking-tighter sm:mb-8 sm:text-5xl md:mb-10 md:text-7xl">
                {translations[language].contact.title}
              </h2>
              <p className="mb-8 max-w-md text-base font-light leading-relaxed text-white/40 sm:mb-10 sm:text-lg md:mb-12 md:text-xl">
                {translations[language].contact.subtitle}
              </p>
              <div className="space-y-4 sm:space-y-6">
                <a
                  className="group flex items-center gap-3 sm:gap-5"
                  href="mailto:wilmixmer@gmail.com"
                >
                  <div className="glass-panel flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm text-white/60 transition-all duration-500 group-hover:bg-white group-hover:text-black sm:h-12 sm:w-12">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3.5" y="6" width="17" height="12" rx="2" />
                      <path d="M5 8l7 5 7-5" />
                    </svg>
                  </div>
                  <span className="font-label break-all text-[9px] font-bold uppercase tracking-[0.12em] text-white/60 transition-colors group-hover:text-white sm:break-normal sm:text-[11px] sm:tracking-[0.3em]">
                    wilmixmer@gmail.com
                  </span>
                </a>
                <a
                  className="group flex items-center gap-3 sm:gap-5"
                  href="tel:+573022447855"
                >
                  <div className="glass-panel flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm text-white/60 transition-all duration-500 group-hover:bg-white group-hover:text-black sm:h-12 sm:w-12">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M15.7 14.3c-.7.7-1.3 1.5-2.7.7-1.5-.8-3.3-2.6-4.1-4.1-.8-1.4 0-2 .7-2.7l.9-.9c.4-.4.5-1 .2-1.5L9.3 3.6c-.3-.6-1.1-.8-1.7-.4L6.1 4C5 4.8 4.5 6.3 4.9 7.7c.6 2.3 2.2 5.2 5 8 2.8 2.8 5.7 4.4 8 5 1.4.4 2.9-.1 3.7-1.2l.8-1.5c.4-.6.2-1.4-.4-1.7l-2.2-1.4c-.5-.3-1.1-.2-1.5.2l-.9.9z" />
                    </svg>
                  </div>
                  <span className="font-label text-[9px] font-bold uppercase tracking-[0.12em] text-white/60 transition-colors group-hover:text-white sm:text-[11px] sm:tracking-[0.3em]">
                    +57 302 244 7855
                  </span>
                </a>
              </div>
            </div>

            <div className="glass-panel relative overflow-hidden rounded-2xl border border-white/15 p-5 backdrop-blur-xl sm:p-7 md:rounded-3xl md:p-12 md:border-white/20">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl transition-all duration-700"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              />
              <div
                className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full blur-3xl transition-all duration-700"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              />

              <form action="#" className="form-shell relative z-10 space-y-6 sm:space-y-8">
                <div className="form-field">
                  <label className="font-label mb-2 block text-[9px] uppercase tracking-[0.2em] text-white/30 sm:mb-3 sm:text-[10px] sm:tracking-[0.3em]">
                    {translations[language].contact.formFields.email}
                  </label>
                  <input
                    type="email"
                    placeholder={translations[language].contact.placeholders.email}
                    className="form-input w-full bg-transparent px-0 py-2.5 text-sm text-white placeholder:text-white/20 focus:ring-0 sm:py-3 sm:text-base"
                  />
                </div>
                <div className="form-field">
                  <label className="font-label mb-2 block text-[9px] uppercase tracking-[0.2em] text-white/30 sm:mb-3 sm:text-[10px] sm:tracking-[0.3em]">
                    {translations[language].contact.formFields.subject}
                  </label>
                  <input
                    type="text"
                    placeholder={translations[language].contact.placeholders.subject}
                    className="form-input w-full bg-transparent px-0 py-2.5 text-sm text-white placeholder:text-white/20 focus:ring-0 sm:py-3 sm:text-base"
                  />
                </div>
                <div className="form-field">
                  <label className="font-label mb-2 block text-[9px] uppercase tracking-[0.2em] text-white/30 sm:mb-3 sm:text-[10px] sm:tracking-[0.3em]">
                    {translations[language].contact.formFields.message}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={translations[language].contact.placeholders.message}
                    className="form-input w-full resize-none bg-transparent px-0 py-2.5 text-sm text-white placeholder:text-white/20 focus:ring-0 sm:py-3 sm:text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="form-cta relative w-full bg-white py-4 text-[10px] font-black uppercase tracking-[0.22em] text-black transition-all active:scale-[0.98] sm:py-5 sm:text-[11px] sm:tracking-[0.35em]"
                >
                  {translations[language].contact.submitBtn}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-20 w-full border-t border-white/5 bg-black/40 px-5 py-8 backdrop-blur-md sm:px-6 sm:py-10 md:px-10 md:py-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 text-[9px] uppercase tracking-[0.14em] text-white/20 sm:gap-6 sm:text-[10px] sm:tracking-[0.2em] md:flex-row md:text-[0.6rem] md:tracking-[0.3em]">
          <div>{translations[language].footer.copyright}</div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-12">
            <a className="transition-colors duration-500 hover:text-white" href="https://github.com" target="_blank" rel="noopener">
              GitHub
            </a>
            <a className="transition-colors duration-500 hover:text-white" href="https://linkedin.com" target="_blank" rel="noopener">
              LinkedIn
            </a>
            <a className="transition-colors duration-500 hover:text-white" href="mailto:wilmixmer@gmail.com">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
