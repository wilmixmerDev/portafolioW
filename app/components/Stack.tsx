"use client";

import { motion } from "framer-motion";
import { translations, Language } from "../i18n/translations";

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

export default function Stack({ language }: { language: Language }) {
  const t = translations[language].engine;

  const adaptabilitySignals =
    language === "es"
      ? ["Aprendizaje rápido", "Cambio sin fricción", "Integración continua", "Enfoque en resultados"]
      : ["Fast learning", "Low-friction changes", "Continuous integration", "Results-oriented"];

  return (
    <section id="stack" className="overflow-hidden px-5 py-20 sm:px-6 sm:py-24 md:px-24 md:py-40">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 text-center sm:mb-12 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-headline mb-8 text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl md:text-5xl"
          >
            {t.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm font-light text-white/60 sm:text-base"
          >
            {t.subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="adaptability-container mx-auto mt-4 max-w-2xl rounded-xl p-3 text-left backdrop-blur-md sm:p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white/60" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/55 sm:text-[11px]">
                {t.adaptabilityTitle}
              </p>
            </div>
            <p className="text-[10px] leading-relaxed text-white/50 sm:text-xs">
              {t.adaptability}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
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
          </motion.div>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mx-auto mt-4 h-px bg-white/20" 
          />
        </div>

        <div className="tech-orbit-grid grid grid-cols-2 gap-5 sm:grid-cols-6 sm:gap-6 lg:grid-cols-12 lg:gap-8">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`engine-card tech-cloud-card group ${tech.spanClass}`}
              style={{
                animationDelay: `${index * 0.22}s`,
                ["--card-offset" as string]: `${((index % 2 === 0 ? -1 : 1) * (8 + (index % 3) * 3))}px`,
                ["--card-shift" as string]: `${(index % 3) - 1}px`,
                ["--card-duration" as string]: `${5.2 + (index % 4) * 0.7}s`,
              }}
            >
              <div className="engine-card-inner glass-panel relative flex h-full min-h-36 flex-col items-center justify-center rounded-2xl p-4 text-center sm:min-h-40 sm:p-6 md:p-8 hover-3d">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
