"use client";

import { useEffect, useRef, useState } from "react";

type EngineRefMap = Record<string, HTMLDivElement | null>;
type ContactFormData = {
  email: string;
  subject: string;
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const translations = {
  es: {
    nav: { about: "Sobre mí", projects: "Proyectos", contact: "Contacto", menu: "Menú", close: "Cerrar" },
    hero: { subtitle: "Ingeniero de Sistemas | Desarrollador Full-Stack", title: ["WILMER", "IRIARTE", "DEVELOPER"], bio: "Soy estudiante de Ingeniería de Sistemas en la Fundación Universitaria Tecnológico Comfenalco. Mi objetivo es desarrollar soluciones tecnológicas innovadoras, eficientes y escalables. Busco oportunidades donde pueda aplicar mis conocimientos en desarrollo de software mientras continúo creciendo como profesional en el ecosistema tech.", location: "Colombia / Disponible Globalmente", showreel: "Ver Proyectos" },
    projects: { title: "Proyectos Representativos", subtitle: "2024 — 2026 Portafolio" },
    engine: {
      title: "Stack Tecnológico",
      subtitle: "Herramientas y lenguajes que domino",
      adaptability: "Me adapto rápido a nuevas tecnologías y frameworks según las necesidades del proyecto.",
      adaptabilityTitle: "Modo Adaptativo",
    },
    contact: { title: "TRABAJEMOS JUNTOS EN\nPROYECTOS INCREÍBLES", subtitle: "Estoy abierto a oportunidades de prácticas profesionales, colaboraciones y proyectos desafiantes. Si tienes una idea o un proyecto en mente, me encantaría escucharte y explorar cómo podemos trabajar juntos para llevarla a la realidad.", formIntro: "También puedes enviarme un correo directo desde este formulario.", email: "Correo", phone: "Teléfono", submitBtn: "Enviar", submitSending: "Enviando...", successMsg: "Mensaje enviado correctamente. Te responderé pronto.", errorMsg: "No se pudo enviar el mensaje. Intenta nuevamente.", requiredMsg: "Completa todos los campos antes de enviar.", invalidEmailMsg: "Escribe un correo válido (ejemplo@dominio.com).", formFields: { email: "Tu Correo", subject: "Asunto", message: "Tu Mensaje" }, placeholders: { email: "tu.email@ejemplo.com", subject: "Propuesta de Proyecto", message: "Cuéntame qué tienes en mente..." } },
    footer: { copyright: "© 2026 WILMER IRIARTE. TODOS LOS DERECHOS RESERVADOS." },
  },
  en: {
    nav: { about: "About", projects: "Projects", contact: "Contact", menu: "Menu", close: "Close" },
    hero: { subtitle: "Systems Engineer | Full-Stack Developer", title: ["WILMER", "IRIARTE", "DEVELOPER"], bio: "I'm a Systems Engineering student at Fundación Universitaria Tecnológico Comfenalco, passionate about building innovative and scalable software solutions. My goal is to develop technology that creates real impact while continuously expanding my skills in the tech industry and delivering excellence in every project.", location: "Colombia / Available Globally", showreel: "View Projects" },
    projects: { title: "Featured Projects", subtitle: "2024 — 2026 Portfolio" },
    engine: {
      title: "Tech Stack",
      subtitle: "Languages and tools I work with",
      adaptability: "I quickly adapt to new technologies and frameworks based on project needs.",
      adaptabilityTitle: "Adaptive Mode",
    },
    contact: { title: "LET'S COLLABORATE ON\nAMAZING PROJECTS", subtitle: "I'm open to internships, collaborations, and exciting projects. If you have an idea or project in mind, I'd love to hear about it and explore how we can work together to bring it to life.", formIntro: "You can also send me a direct email through this form.", email: "Email", phone: "Phone", submitBtn: "Send", submitSending: "Sending...", successMsg: "Message sent successfully. I'll get back to you soon.", errorMsg: "Could not send the message. Please try again.", requiredMsg: "Please complete all fields before sending.", invalidEmailMsg: "Please enter a valid email (example@domain.com).", formFields: { email: "Your Email", subject: "Subject", message: "Your Message" }, placeholders: { email: "your.email@example.com", subject: "Project Proposal", message: "Tell me what you have in mind..." } },
    footer: { copyright: "© 2026 WILMER IRIARTE. ALL RIGHTS RESERVED." },
  }
};

export default function Home() {
  const [videoFailed, setVideoFailed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mobileOpenContact, setMobileOpenContact] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    email: "",
    subject: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [contactStatusMessage, setContactStatusMessage] = useState("");
  const engineRefs = useRef<EngineRefMap>({});

  useEffect(() => {
    const browserLang = navigator.language.startsWith("es") ? "es" : "en";
    setLanguage(browserLang);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");

    const updateTouchMode = () => {
      setIsTouchDevice(mediaQuery.matches);
      if (!mediaQuery.matches) {
        setMobileOpenContact(null);
      }
    };

    updateTouchMode();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateTouchMode);
      return () => mediaQuery.removeEventListener("change", updateTouchMode);
    }

    mediaQuery.addListener(updateTouchMode);
    return () => mediaQuery.removeListener(updateTouchMode);
  }, []);

  const techStack = [
    { key: "java", label: "Java", iconSlug: "openjdk", spanClass: "sm:col-span-3 lg:col-span-3" },
    { key: "php", label: "PHP", iconSlug: "php", spanClass: "sm:col-span-3 lg:col-span-2" },
    { key: "react", label: "React", iconSlug: "react", spanClass: "sm:col-span-2 lg:col-span-2" },
    { key: "laravel", label: "Laravel", iconSlug: "laravel", spanClass: "sm:col-span-4 lg:col-span-3" },
    { key: "springboot", label: "Spring Boot", iconSlug: "springboot", spanClass: "sm:col-span-3 lg:col-span-2" },
    { key: "next", label: "Next.js", iconSlug: "nextdotjs", spanClass: "sm:col-span-3 lg:col-span-2" },
    { key: "ts", label: "TypeScript", iconSlug: "typescript", spanClass: "sm:col-span-2 lg:col-span-2" },
    { key: "mysql", label: "MySQL", iconSlug: "mysql", spanClass: "sm:col-span-4 lg:col-span-3" },
    { key: "postgrest", label: "PostgREST", iconSlug: "postgresql", spanClass: "sm:col-span-3 lg:col-span-2" },
    { key: "tw", label: "Tailwind", iconSlug: "tailwindcss", spanClass: "sm:col-span-3 lg:col-span-3" },
  ] as const;

  const adaptabilitySignals =
    language === "es"
      ? ["Aprendizaje rápido", "Cambio sin fricción", "Integración continua", "Enfoque en resultados"]
      : ["Fast learning", "Low-friction changes", "Continuous integration", "Results-oriented"];

  const heroHighlights =
    language === "es"
      ? ["APIs y Backend", "Interfaces Modernas", "Arquitectura Escalable"]
      : ["APIs & Backend", "Modern Interfaces", "Scalable Architecture"];

  const heroStats =
    language === "es"
      ? [
          { value: "3+", label: "Proyectos clave" },
          { value: "∞", label: "Tecnologías" },
          { value: "Fullstack", label: "Frontend + Backend" },
        ]
      : [
          { value: "3+", label: "Key projects" },
          { value: "∞", label: "Technologies" },
          { value: "Fullstack", label: "Frontend + Backend" },
        ];

  const contactTitleWords = translations[language].contact.title.replace(/\n/g, " ").split(" ");
  const contactOpenLabel = language === "es" ? "Abrir" : "Open";

  const contactDetails =
    language === "es"
      ? [
          { icon: "email", label: "Correo", value: "wilmixmer@gmail.com", href: "mailto:wilmixmer@gmail.com" },
          { icon: "phone", label: "Teléfono", value: "+57 302 244 7855", href: "tel:+573022447855" },
          { icon: "discord", label: "Discord", value: "wilmixmer", href: "https://discordapp.com/users/wilmixmer" },
          {
            icon: "linkedin",
            label: "LinkedIn",
            value: "@wilmer-andres-iriarte-camargo",
            href: "https://www.linkedin.com/in/wilmer-andres-iriarte-camargo-629372291",
          },
          { icon: "github", label: "GitHub Principal", value: "@wilmixmerDev", href: "https://github.com/wilmixmerDev" },
          { icon: "github", label: "GitHub Secundario", value: "@wilmixmer", href: "https://github.com/wilmixmer" },
        ]
      : [
          { icon: "email", label: "Email", value: "wilmixmer@gmail.com", href: "mailto:wilmixmer@gmail.com" },
          { icon: "phone", label: "Phone", value: "+57 302 244 7855", href: "tel:+573022447855" },
          { icon: "discord", label: "Discord", value: "wilmixmer", href: "https://discordapp.com/users/wilmixmer" },
          {
            icon: "linkedin",
            label: "LinkedIn",
            value: "@wilmer-andres-iriarte-camargo",
            href: "https://www.linkedin.com/in/wilmer-andres-iriarte-camargo-629372291",
          },
          { icon: "github", label: "GitHub Main", value: "@wilmixmerDev", href: "https://github.com/wilmixmerDev" },
          { icon: "github", label: "GitHub Secondary", value: "@wilmixmer", href: "https://github.com/wilmixmer" },
        ];

  const renderContactIcon = (icon: string) => {
    switch (icon) {
      case "email":
        return (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3.5" y="6" width="17" height="12" rx="2" />
            <path d="M5 8l7 5 7-5" />
          </svg>
        );
      case "phone":
        return (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M15.7 14.3c-.7.7-1.3 1.5-2.7.7-1.5-.8-3.3-2.6-4.1-4.1-.8-1.4 0-2 .7-2.7l.9-.9c.4-.4.5-1 .2-1.5L9.3 3.6c-.3-.6-1.1-.8-1.7-.4L6.1 4C5 4.8 4.5 6.3 4.9 7.7c.6 2.3 2.2 5.2 5 8 2.8 2.8 5.7 4.4 8 5 1.4.4 2.9-.1 3.7-1.2l.8-1.5c.4-.6.2-1.4-.4-1.7l-2.2-1.4c-.5-.3-1.1-.2-1.5.2l-.9.9z" />
          </svg>
        );
      case "github":
        return (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.68c-2.78.61-3.37-1.19-3.37-1.19-.45-1.15-1.1-1.45-1.1-1.45-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.93.84.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.41.11 2.66.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.93.68 1.87v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M6.94 8.5a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12zM5.6 9.8h2.7V18H5.6V9.8zm4.42 0h2.59v1.12h.04c.36-.68 1.24-1.39 2.56-1.39 2.74 0 3.25 1.8 3.25 4.14V18h-2.7v-3.84c0-.92-.02-2.1-1.28-2.1-1.28 0-1.48 1-1.48 2.03V18h-2.7V9.8z" />
          </svg>
        );
      case "discord":
        return (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M20.32 4.37A19.8 19.8 0 0 0 15.4 2.9l-.24.48a18.2 18.2 0 0 1 4.46 1.53 14.8 14.8 0 0 0-4.39-1.36 14.9 14.9 0 0 0-6.46 0A14.8 14.8 0 0 0 4.4 4.91 18.2 18.2 0 0 1 8.86 3.38l-.24-.48A19.8 19.8 0 0 0 3.7 4.37C1.3 7.93.64 11.4.97 14.82A20 20 0 0 0 6.9 17.9l.73-1.2c-.97-.33-1.9-.76-2.76-1.28.23.16.47.3.72.44 2.67 1.26 5.55 1.26 8.22 0 .25-.14.49-.28.72-.44-.86.52-1.79.95-2.76 1.28l.73 1.2a20 20 0 0 0 5.93-3.08c.39-3.97-.66-7.4-2.71-10.45ZM8.6 13.06c-.79 0-1.45-.73-1.45-1.62 0-.9.64-1.62 1.45-1.62.82 0 1.46.74 1.45 1.62 0 .89-.64 1.62-1.45 1.62Zm6.8 0c-.8 0-1.45-.73-1.45-1.62 0-.9.64-1.62 1.45-1.62.82 0 1.46.74 1.45 1.62 0 .89-.64 1.62-1.45 1.62Z" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 8v4l2 2" />
          </svg>
        );
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const navigateToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();
    scrollToSection(sectionId);
  };

  const handleContactInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setContactForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (contactStatus !== "idle") {
      setContactStatus("idle");
      setContactStatusMessage("");
    }
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      email: contactForm.email.trim(),
      subject: contactForm.subject.trim(),
      message: contactForm.message.trim(),
    };

    if (!formData.email || !formData.subject || !formData.message) {
      setContactStatus("error");
      setContactStatusMessage(translations[language].contact.requiredMsg);
      return;
    }

    if (!EMAIL_REGEX.test(formData.email)) {
      setContactStatus("error");
      setContactStatusMessage(translations[language].contact.invalidEmailMsg);
      return;
    }

    setContactStatus("sending");
    setContactStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await response.json().catch(() => null)) as
        | { message?: string; error?: string }
        | null;

      if (!response.ok) {
        const message =
          response.status >= 500
            ? translations[language].contact.errorMsg
            : data?.error || translations[language].contact.errorMsg;

        throw new Error(message);
      }

      setContactStatus("success");
      setContactStatusMessage(data?.message || translations[language].contact.successMsg);
      setContactForm({ email: "", subject: "", message: "" });
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : translations[language].contact.errorMsg;

      setContactStatus("error");
      setContactStatusMessage(message);
    }
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

      <header className="pointer-events-none fixed left-0 top-0 z-40 flex w-full items-center justify-end px-4 py-4 sm:px-5 sm:py-5 md:px-8 md:py-8">
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
            className="portfolio-btn rounded-md border border-white/10 px-2 py-1 text-xs uppercase tracking-[0.15em] text-white/50 transition-colors hover:text-white"
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            title={language === "es" ? "Switch to English" : "Cambiar a Español"}
          >
            {language === "es" ? "EN" : "ES"}
          </button>
          <button
            className="portfolio-btn rounded-md border border-white/10 px-2 py-1 text-xs uppercase tracking-[0.15em] text-white/70 sm:hidden"
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
                <p className="bio-text text-base font-light leading-relaxed text-white/70 sm:text-lg md:text-xl">
                  {translations[language].hero.bio.split(" ").map((word, index) => (
                    <span key={index}>
                      <span className="bio-word" style={{ animationDelay: `${index * 0.08}s` }}>
                        {word}
                      </span>
                      {index < translations[language].hero.bio.split(" ").length - 1 && " "}
                    </span>
                  ))}
                </p>
              </div>

              <div className="md:col-start-9 md:col-span-4">
                <div className="flex flex-col gap-5 sm:gap-6">
                  <div className="flex flex-wrap gap-2">
                    {heroHighlights.map((highlight, index) => (
                      <span
                        key={highlight}
                        className="hero-badge rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-white/70 sm:text-[10px]"
                        style={{ animationDelay: `${index * 0.15}s` }}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="hero-location-text text-[10px] uppercase tracking-[0.15em] text-white/40 sm:text-[11px] sm:tracking-[0.2em]">
                    {translations[language].hero.location}
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {heroStats.map((stat, index) => (
                      <div key={stat.label} className="hero-stat rounded-lg border border-white/10 px-3 py-3 text-center glass-panel" style={{ animationDelay: `${0.3 + index * 0.15}s` }}>
                        <div className="font-headline text-lg font-semibold text-white sm:text-xl">
                          <span className="hero-stat-value" style={{ animationDelay: `${0.6 + index * 0.15}s` }}>
                            {stat.value}
                          </span>
                        </div>
                        <div className="text-[8px] uppercase tracking-[0.12em] text-white/45 sm:text-[9px]">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollToSection("projects")}
                    className="hero-button portfolio-btn group relative overflow-hidden bg-white px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:pr-10 sm:px-8 sm:py-5 sm:text-[11px] sm:tracking-[0.3em] sm:hover:pr-14"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <span className="relative z-10">{translations[language].hero.showreel}</span>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-all group-hover:opacity-100">
                      →
                    </span>
                  </button>

                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hero-button portfolio-btn border border-white/15 bg-black/20 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-white sm:px-8 sm:text-[10px]"
                    style={{ animationDelay: "0.25s" }}
                  >
                    {language === "es" ? "Contacto rápido" : "Quick contact"}
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

        <section id="stack" className="overflow-hidden px-5 py-20 sm:px-6 sm:py-24 md:px-24 md:py-40">
          <div className="mx-auto w-full max-w-7xl">
            <div className="reveal-up mb-10 text-center sm:mb-12 md:mb-24">
              <h2 className="font-headline mb-8 text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl md:text-5xl">
                {translations[language].engine.title.split(" ").map((word, index) => (
                  <span key={index} className="stack-title-word-enhanced">
                    <span style={{ animationDelay: `${index * 0.1}s` }}>{word}</span>
                    {index < translations[language].engine.title.split(" ").length - 1 && " "}
                  </span>
                ))}
              </h2>
              <p className="stack-subtitle-enhanced text-sm font-light text-white/60 sm:text-base">{translations[language].engine.subtitle}</p>

              <div className="adaptability-container mx-auto mt-4 max-w-2xl rounded-xl p-3 text-left backdrop-blur-md sm:p-4">
                <div className="adaptability-title-group mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-white/60" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/55 sm:text-[11px]">
                    {translations[language].engine.adaptabilityTitle}
                  </p>
                </div>
                <p className="adaptability-description text-[10px] leading-relaxed text-white/50 sm:text-xs">
                  {translations[language].engine.adaptability}
                </p>
                <div className="adaptability-chips-wrapper mt-3 flex flex-wrap gap-2">
                  {adaptabilitySignals.map((signal, index) => (
                    <span
                      key={signal}
                      className="adaptability-chip-enhanced rounded-full px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] text-white/65 sm:text-[9px]"
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mx-auto mt-4 h-px w-16 bg-white/20" />
            </div>

            <div className="tech-orbit-grid grid grid-cols-2 gap-5 sm:grid-cols-6 sm:gap-6 lg:grid-cols-12 lg:gap-8">
              {techStack.map((tech, index) => (
                <div
                  key={tech.key}
                  ref={(element) => {
                    engineRefs.current[tech.key] = element;
                  }}
                  className={`engine-card tech-cloud-card group reveal-up ${tech.spanClass}`}
                  style={{
                    animationDelay: `${index * 0.22}s`,
                    transitionDelay: `${0.08 * (index + 1)}s`,
                    ["--card-offset" as string]: `${((index % 2 === 0 ? -1 : 1) * (8 + (index % 3) * 3))}px`,
                    ["--card-shift" as string]: `${(index % 3) - 1}px`,
                    ["--card-duration" as string]: `${5.2 + (index % 4) * 0.7}s`,
                  }}
                >
                  <div className="engine-card-inner glass-panel relative flex h-full min-h-36 flex-col items-center justify-center rounded-2xl p-4 text-center sm:min-h-40 sm:p-6 md:p-8">
                    <div className="glow-overlay" />
                    <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/55 transition-colors group-hover:text-white sm:mb-6 sm:h-10 sm:w-10">
                      <img
                        src={`https://cdn.simpleicons.org/${tech.iconSlug}/E2E2E2`}
                        alt={`${tech.label} logo`}
                        className="h-4 w-4 object-contain opacity-80 transition-opacity duration-500 group-hover:opacity-100 sm:h-5 sm:w-5"
                        loading="lazy"
                      />
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
              <h2 className="font-headline mb-8 text-3xl font-bold leading-[0.95] tracking-tight text-white sm:mb-10 sm:text-4xl md:mb-14 md:text-5xl lg:text-6xl xl:text-7xl">
                {contactTitleWords.map((word, wordIndex) => (
                  <span key={`w-${wordIndex}`} className="contact-title-word">
                    {word.split("").map((char, charIndex) => (
                      <span
                        key={`${wordIndex}-${charIndex}`}
                        className="contact-title-letter-wrap"
                      >
                        <span
                          className="contact-title-letter"
                          style={{ animationDelay: `${wordIndex * 0.08 + charIndex * 0.025}s` }}
                        >
                          {char}
                        </span>
                      </span>
                    ))}
                    {wordIndex < contactTitleWords.length - 1 && <span className="contact-title-space">&nbsp;</span>}
                  </span>
                ))}
              </h2>
              <p className="contact-subtitle contact-subtitle-animated reveal-up mb-10 max-w-lg text-base font-light leading-relaxed text-white/50 sm:mb-12 sm:text-lg md:mb-14 md:text-xl">
                {translations[language].contact.subtitle.split(" ").map((word, index) => (
                  <span key={index}>
                    <span className="contact-subtitle-word" style={{ animationDelay: `${0.15 + index * 0.05}s` }}>
                      {word}
                    </span>
                    {index < translations[language].contact.subtitle.split(" ").length - 1 && " "}
                  </span>
                ))}
              </p>
              <div className="contact-float-list reveal-up mt-4 flex w-full max-w-[24rem] flex-col items-start gap-3 sm:max-w-[26rem] sm:gap-4">
                {contactDetails.map((detail, index) => {
                  const isReadOnly = detail.icon === "email" || detail.icon === "phone";
                  const itemKey = `${detail.icon}-${detail.label}`;
                  const isMobileOpen = isTouchDevice && mobileOpenContact === itemKey;

                  const content = (
                    <>
                      <span className="contact-float-icon">{renderContactIcon(detail.icon)}</span>
                      <span className="contact-float-content">
                        <span className="contact-float-label-row">
                          <span className="contact-float-label">{detail.label}</span>
                          {!isReadOnly && <span className="contact-float-open">{contactOpenLabel}</span>}
                        </span>
                        <span className="contact-float-value">{detail.value}</span>
                      </span>
                      {!isReadOnly && <span className="contact-float-arrow" aria-hidden="true">↗</span>}
                    </>
                  );

                  if (isReadOnly) {
                    return (
                      <div
                        key={detail.label}
                        aria-label={`${detail.label}: ${detail.value}`}
                        className={`contact-float-item contact-float-item-static contact-float-${detail.icon} ${isMobileOpen ? "contact-float-item-mobile-open" : ""} group`}
                        style={{ transitionDelay: `${0.07 * (index + 1)}s` }}
                        onClick={() => {
                          if (!isTouchDevice) return;
                          setMobileOpenContact((current) => (current === itemKey ? null : itemKey));
                        }}
                      >
                        {content}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={detail.label}
                      href={detail.href}
                      target={detail.href.startsWith("http") ? "_blank" : undefined}
                      rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={`${detail.label}: ${detail.value}`}
                      className={`contact-float-item contact-float-${detail.icon} ${isMobileOpen ? "contact-float-item-mobile-open" : ""} group`}
                      style={{ transitionDelay: `${0.07 * (index + 1)}s` }}
                      onClick={(event) => {
                        if (!isTouchDevice) return;

                        if (mobileOpenContact !== itemKey) {
                          event.preventDefault();
                          setMobileOpenContact(itemKey);
                          return;
                        }

                        setMobileOpenContact(null);
                      }}
                    >
                      {content}
                    </a>
                  );
                })}
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

              <p className="contact-form-intro relative z-10 mb-5 text-sm font-medium leading-relaxed text-white/55 sm:mb-6 sm:text-base">
                {translations[language].contact.formIntro}
              </p>

              <form onSubmit={handleContactSubmit} className="form-shell relative z-10 space-y-6 sm:space-y-8">
                <div className="form-field">
                  <label className="font-label mb-2 block text-[9px] uppercase tracking-[0.2em] text-white/30 sm:mb-3 sm:text-[10px] sm:tracking-[0.3em]">
                    {translations[language].contact.formFields.email}
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={contactForm.email}
                    onChange={handleContactInputChange}
                    placeholder={translations[language].contact.placeholders.email}
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    title={translations[language].contact.invalidEmailMsg}
                    autoComplete="email"
                    required
                    disabled={contactStatus === "sending"}
                    className="form-input w-full bg-transparent px-0 py-2.5 text-sm text-white placeholder:text-white/20 focus:ring-0 sm:py-3 sm:text-base"
                  />
                </div>
                <div className="form-field">
                  <label className="font-label mb-2 block text-[9px] uppercase tracking-[0.2em] text-white/30 sm:mb-3 sm:text-[10px] sm:tracking-[0.3em]">
                    {translations[language].contact.formFields.subject}
                  </label>
                  <input
                    name="subject"
                    type="text"
                    value={contactForm.subject}
                    onChange={handleContactInputChange}
                    placeholder={translations[language].contact.placeholders.subject}
                    required
                    disabled={contactStatus === "sending"}
                    className="form-input w-full bg-transparent px-0 py-2.5 text-sm text-white placeholder:text-white/20 focus:ring-0 sm:py-3 sm:text-base"
                  />
                </div>
                <div className="form-field">
                  <label className="font-label mb-2 block text-[9px] uppercase tracking-[0.2em] text-white/30 sm:mb-3 sm:text-[10px] sm:tracking-[0.3em]">
                    {translations[language].contact.formFields.message}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={contactForm.message}
                    onChange={handleContactInputChange}
                    placeholder={translations[language].contact.placeholders.message}
                    required
                    disabled={contactStatus === "sending"}
                    className="form-input w-full resize-none bg-transparent px-0 py-2.5 text-sm text-white placeholder:text-white/20 focus:ring-0 sm:py-3 sm:text-base"
                  />
                </div>
                <button
                  type="submit"
                  disabled={contactStatus === "sending"}
                  className="form-cta relative w-full bg-white py-4 text-[10px] font-black uppercase tracking-[0.22em] text-black transition-all active:scale-[0.98] sm:py-5 sm:text-[11px] sm:tracking-[0.35em]"
                >
                  {contactStatus === "sending"
                    ? translations[language].contact.submitSending
                    : translations[language].contact.submitBtn}
                </button>
                {contactStatusMessage && (
                  <p
                    aria-live="polite"
                    className={`text-xs ${
                      contactStatus === "success" ? "text-white/70" : "text-white/50"
                    }`}
                  >
                    {contactStatusMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-20 w-full border-t border-white/5 bg-black/40 px-5 py-8 backdrop-blur-md sm:px-6 sm:py-10 md:px-10 md:py-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 text-[9px] uppercase tracking-[0.14em] text-white/20 sm:gap-6 sm:text-[10px] sm:tracking-[0.2em] md:flex-row md:text-[0.6rem] md:tracking-[0.3em]">
          <div>{translations[language].footer.copyright}</div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-12">
            <a className="transition-colors duration-500 hover:text-white" href="#about" onClick={(event) => navigateToSection(event, "about")}>
              {translations[language].nav.about}
            </a>
            <a className="transition-colors duration-500 hover:text-white" href="#projects" onClick={(event) => navigateToSection(event, "projects")}>
              {translations[language].nav.projects}
            </a>
            <a className="transition-colors duration-500 hover:text-white" href="#stack" onClick={(event) => navigateToSection(event, "stack")}>
              {language === "es" ? "Stack" : "Stack"}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
