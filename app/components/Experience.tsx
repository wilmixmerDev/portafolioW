"use client";

import { motion } from "framer-motion";
import { translations } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";
import { BMWBadge } from "./BMWStripe";

const BMW_ACCENTS = ["#00A2E8", "#10069F", "#E32118"] as const;
/** Versiones aclaradas de BMW_ACCENTS para texto sobre fondo oscuro — el marino
 * (#10069F) es ilegible como texto en su tono real; se usa el real solo en
 * la barra lateral y el punto de la lista, donde el contraste no importa. */
const BMW_TEXT_ACCENTS = ["#73CCF2", "#7C76CA", "#F08580"] as const;

export default function Experience() {
  const { language } = useLanguage();
  const t = translations[language].experience;

  return (
    <section
      id="experience"
      className="relative px-5 py-20 sm:px-6 sm:py-24 md:px-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">

        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-16"
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

        <div className="flex flex-col gap-6">
          {t.jobs.map((job, jobIndex) => {
            const accent = BMW_ACCENTS[jobIndex % 3];
            const textAccent = BMW_TEXT_ACCENTS[jobIndex % 3];
            return (
              <motion.div
                key={`${job.company}-${job.period}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: jobIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-2xl border border-white/8 bg-black/55 backdrop-blur-md p-7 md:p-10"
              >
                <div className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full" style={{ backgroundColor: accent }} />

                <div className="pl-6 md:pl-8">
                  <div className="mb-1 flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-headline text-lg font-bold uppercase tracking-wide text-white sm:text-xl md:text-2xl">
                      {job.role}
                    </h3>
                  </div>

                  <p className="mb-0.5 text-sm font-medium" style={{ color: textAccent }}>{job.company}</p>
                  <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-white/30">
                    {job.location} · {job.period}
                  </p>

                  <ul className="flex flex-col gap-3">
                    {job.bullets.map((bullet, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-start gap-3 text-sm leading-relaxed text-white/55"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: `${accent}99` }} />
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
