"use client";

import { motion } from "framer-motion";
import { translations } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";
import { BMWBadge } from "./BMWStripe";

const CATEGORIES = [
  {
    key: "backend",
    label: { es: "Backend", en: "Backend" },
    accent: "#00A2E8",
    entry: { x: -60, y: 0, opacity: 0 },
    techs: [
      { name: "Java",        detail: "OpenJDK 21" },
      { name: "Spring Boot", detail: "v3.x"       },
      { name: "PHP",         detail: "8.x"        },
      { name: "Laravel",     detail: "v11"        },
      { name: "NestJS",      detail: "v10"        },
      { name: "Docker",      detail: "v27"        },
    ],
  },
  {
    key: "frontend",
    label: { es: "Frontend", en: "Frontend" },
    accent: "#10069F",
    entry: { x: 0, y: 60, opacity: 0 },
    techs: [
      { name: "React",        detail: "v19" },
      { name: "Next.js",      detail: "v16" },
      { name: "TypeScript",   detail: "v5"  },
      { name: "Tailwind CSS", detail: "v4"  },
    ],
  },
  {
    key: "data",
    label: { es: "Datos & ORM", en: "Data & ORM" },
    accent: "#E32118",
    entry: { x: 60, y: 0, opacity: 0 },
    techs: [
      { name: "MySQL",      detail: "8.x"  },
      { name: "PostgreSQL", detail: "v16"  },
      { name: "Supabase",   detail: "BaaS" },
      { name: "SQLite",     detail: "v3"   },
      { name: "Prisma ORM", detail: "v5"   },
    ],
  },
] as const;

const techListVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};
const techItemVariants = {
  hidden: { x: -16, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Stack() {
  const { language } = useLanguage();
  const t = translations[language].engine;

  return (
    <section id="stack" className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-24 md:px-24 md:py-40">

      {/* BMW Roundel watermark */}
      <div className="pointer-events-none absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 opacity-[0.04] sm:opacity-[0.06]">
        <svg viewBox="0 0 500 500" className="h-64 w-64 sm:h-96 sm:w-96 md:h-120 md:w-120">
          <circle cx="250" cy="250" r="240" stroke="white" strokeWidth="12" fill="none" />
          <circle cx="250" cy="250" r="155" stroke="white" strokeWidth="12" fill="none" />
          <circle cx="250" cy="250" r="248" stroke="white" strokeWidth="4"  fill="none" />
          <path d="M 250 95 A 155 155 0 0 1 405 250 L 250 250 Z" fill="white" />
          <path d="M 250 405 A 155 155 0 0 1 95 250 L 250 250 Z" fill="white" />
        </svg>
      </div>

      <div className="mx-auto w-full max-w-7xl">

        {/* Header — izquierda alineado como Projects */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-20"
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

        {/* Categorías — cada una entra desde una dirección distinta */}
        <div key={language} className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {CATEGORIES.map((cat, catIdx) => (
            <motion.div
              key={cat.key}
              initial={cat.entry}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: catIdx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.05]">

                {/* Barra de acento lateral */}
                <div
                  className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full transition-all duration-500 group-hover:top-4 group-hover:bottom-4"
                  style={{ backgroundColor: cat.accent }}
                />

                {/* Header de categoría */}
                <div className="mb-5 flex items-center gap-3 pl-2">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: cat.accent }}
                  />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/35">
                    {cat.label[language]}
                  </span>
                  <div
                    className="h-px flex-1 transition-opacity duration-500 group-hover:opacity-60"
                    style={{ backgroundColor: `${cat.accent}40` }}
                  />
                </div>

                {/* Lista de tecnologías */}
                <motion.div
                  className="flex flex-col gap-0.5 pl-2"
                  variants={techListVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {cat.techs.map((tech) => (
                    <motion.div
                      key={tech.name}
                      variants={techItemVariants}
                      whileHover={{ x: 5, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                      className="group/item flex cursor-default items-center justify-between rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-white/5"
                    >
                      <span className="text-sm font-medium text-white/70 transition-colors duration-200 group-hover/item:text-white">
                        {tech.name}
                      </span>
                      <span
                        className="font-mono text-[10px] uppercase tracking-wider opacity-0 transition-all duration-200 group-hover/item:opacity-100"
                        style={{ color: cat.accent }}
                      >
                        {tech.detail}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Franja de adaptabilidad */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-5 border-t border-white/8 pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-14"
        >
          <div className="max-w-sm">
            <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/30">
              {t.adaptabilityTitle}
            </p>
            <p className="text-sm leading-relaxed text-white/50">
              {t.adaptability}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {t.adaptabilitySignals.map((signal, i) => (
              <motion.span
                key={signal}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.07, duration: 0.35 }}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-white/45"
              >
                {signal}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
