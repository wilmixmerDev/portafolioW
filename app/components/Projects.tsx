"use client";

import { motion } from "framer-motion";
import { translations } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";
import { BMWBadge } from "./BMWStripe";

const BMW_ACCENTS = ["#00A2E8", "#10069F", "#E32118"] as const;

const projectsList = [
  {
    id: "01",
    title: "fitW",
    tags: ["PWA", "Full-Stack", "Next.js", "TypeScript"],
    year: "2026",
    link: "https://fitw.vercel.app",
    github: "https://github.com/wilmixmerDev/fitW",
    descES: "Aplicación nutricional para atletas con cálculo de macros, registro de alimentos y seguimiento de peso.",
    descEN: "Nutritional app for athletes with macro tracking, food logging, and weight trend monitoring.",
  },
  {
    id: "02",
    title: "JournalW",
    tags: ["Next.js", "TypeScript", "Supabase"],
    year: "2026",
    link: "https://journalw.vercel.app",
    github: "https://github.com/wilmixmerDev/journalW",
    descES: "Diario de trading profesional para registrar operaciones, analizar métricas de rendimiento y alternar entre trading en vivo y backtesting.",
    descEN: "Professional trading journal to log trades, track performance metrics, and switch between live and backtest modes.",
  },
  {
    id: "03",
    title: "Water Quality",
    tags: ["Java", "Weka", "PHP", "Laravel"],
    year: "2026",
    github: "https://github.com/RINZLER0TP/Water-Quality-",
    descES: "Modelo de IA para predecir potabilidad del agua comparando cuatro algoritmos de clasificación con metodología CRISP-DM.",
    descEN: "AI model predicting water potability by comparing four classification algorithms using CRISP-DM methodology.",
  },
  {
    id: "04",
    title: "FinSight",
    tags: ["Python", "React", "ML", "NLP"],
    year: "2025",
    github: "https://github.com/wilmixmerDev/FinSightColombia",
    descES: "Plataforma de análisis financiero con ML y NLP para predecir indicadores económicos colombianos.",
    descEN: "Financial platform using ML and NLP to forecast Colombian economic indicators.",
  },
  {
    id: "05",
    title: "WINDAQ",
    tags: ["Next.js", "TypeScript", "Prisma", "SQLite"],
    year: "2025",
    github: "https://github.com/wilmixmerDev/WINDAQ",
    descES: "Plataforma educativa de trading enfocada en análisis técnico del NASDAQ para desarrollar criterio propio.",
    descEN: "Educational trading platform focused on NASDAQ technical analysis for independent market judgment.",
  },
  {
    id: "06",
    title: "Funcepal",
    tags: ["PHP", "Laravel", "Full-Stack"],
    year: "2024",
    github: "https://github.com/wilmixmerDev/funcepal",
    descES: "Sistema web para la gestión de personal, solicitudes y reportes administrativos de una organización.",
    descEN: "Web system for managing staff, requests, and administrative reports for an organization.",
  },
  {
    id: "07",
    title: "Centro Médico",
    tags: ["NestJS", "Next.js", "TypeScript"],
    year: "2024",
    github: "https://github.com/wilmixmerDev/CentroMedicoDrAlvaro",
    descES: "Plataforma para centralizar digitalmente los procesos médicos de un centro de salud.",
    descEN: "Platform to digitally centralize the medical processes of a healthcare center.",
  },
  {
    id: "08",
    title: "ScrapingTec",
    tags: ["Python", "Playwright", "Automation"],
    year: "2024",
    github: "https://github.com/wilmixmerDev/scrapingTec",
    descES: "Bot de automatización para publicar en foros educativos Ferrum/Moodle simulando comportamiento humano.",
    descEN: "Automation bot simulating human browser behavior to post on Ferrum (Moodle) educational platform forums.",
  },
];

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface CardProps {
  project: typeof projectsList[number];
  index: number;
  featured?: boolean;
  language: string;
}

function ProjectCard({ project, index, featured = false, language }: CardProps) {
  const accent = BMW_ACCENTS[index % 3];
  const desc = language === "es" ? project.descES : project.descEN;

  return (
    <motion.article
      variants={cardVariants}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] transition-all duration-500
        hover:-translate-y-1.5 hover:border-white/18 hover:bg-white/[0.05]
        ${featured ? "sm:col-span-2 min-h-[280px]" : "min-h-[240px]"}`}
      style={{
        boxShadow: "0 0 0 0 transparent",
      }}
      whileHover={{
        boxShadow: `0 24px 60px -12px rgba(0,0,0,0.7), 0 0 0 1px ${accent}20`,
      }}
    >
      {/* Top accent bar */}
      <div className="h-[2px] w-full shrink-0" style={{ backgroundColor: accent }} />

      {/* Corner glow al hover */}
      <div
        className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundColor: `${accent}20` }}
      />

      {/* Número watermark */}
      <span
        className="pointer-events-none absolute bottom-3 right-4 select-none font-headline font-bold leading-none transition-all duration-500 group-hover:opacity-20 group-hover:scale-110"
        style={{
          fontSize: featured ? "8rem" : "6rem",
          color: `${accent}14`,
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        {project.id}
      </span>

      <div className="relative flex flex-1 flex-col gap-3 p-5 sm:p-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold"
            style={{ color: accent, backgroundColor: `${accent}15` }}
          >
            {project.year}
          </span>
          {project.link && (
            <span className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/8 px-2.5 py-0.5 text-[8px] uppercase tracking-[0.2em] text-emerald-400">
              <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          )}
        </div>

        {/* Título */}
        <h3
          className={`font-headline font-bold uppercase leading-[0.9] tracking-tight text-white transition-colors duration-300
            ${featured ? "text-[2rem] sm:text-[2.6rem] lg:text-[3.2rem]" : "text-[1.5rem] sm:text-[1.75rem]"}`}
        >
          {project.title}
        </h3>

        {/* Descripción */}
        <p className={`leading-relaxed text-white/40 transition-colors duration-300 group-hover:text-white/65
          ${featured ? "text-sm sm:text-base" : "text-sm"}`}>
          {desc}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.1em] transition-all duration-300"
              style={{
                border: `1px solid ${accent}20`,
                color: `${accent}70`,
                backgroundColor: `${accent}08`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Botones + línea */}
        <div className="flex items-center gap-2 pt-1">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub — ${project.title}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-white/40 transition-all duration-300 hover:border-white/35 hover:bg-white/8 hover:text-white active:scale-95"
            >
              <GitHubIcon />
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live — ${project.title}`}
              className="flex h-9 w-9 items-center justify-center rounded-full text-black transition-all duration-300 hover:scale-110 active:scale-95"
              style={{ backgroundColor: "white" }}
            >
              <ArrowIcon />
            </a>
          )}
          {/* Línea que crece al hover */}
          <div
            className="ml-1 h-px flex-1 origin-left scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100"
            style={{ backgroundColor: `${accent}60` }}
          />
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language].projects;

  return (
    <section
      id="projects"
      className="relative px-5 py-20 sm:px-6 sm:py-24 md:px-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="mb-3 block text-[10px] uppercase tracking-[0.4em] text-white/30">
            {t.subtitle}
          </span>
          <div className="flex items-center gap-4">
            <BMWBadge />
            <h2 className="font-headline text-2xl font-bold uppercase tracking-widest text-white sm:text-3xl md:text-5xl">
              {t.title}
            </h2>
          </div>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        >
          {projectsList.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              featured={index === 0}
              language={language}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
