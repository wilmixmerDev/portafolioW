"use client";

import { motion, Variants } from "framer-motion";
import { translations } from "../i18n/translations";
import { scrollToSection } from "../utils/scroll";
import ParticleText from "./ParticleText";
import { useLanguage } from "../context/LanguageContext";
import { BMWTopBorder } from "./BMWStripe";

export default function Hero({ isLoaded }: { isLoaded: boolean }) {
  const { language } = useLanguage();
  const t = translations[language].hero;

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section key={language} id="about" className="flex min-h-screen flex-col px-5 pb-10 pt-28 sm:px-6 sm:pt-32 md:px-24 md:pt-48">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="mb-5 block text-[10px] uppercase tracking-[0.28em] text-white/30 sm:text-[11px] sm:tracking-[0.4em]">
            {t.subtitle}
          </span>
        </motion.div>

        {/* Name */}
        <h1 className="font-headline mb-10 text-[16vw] font-bold leading-[0.85] tracking-[-0.05em] text-white sm:text-[14vw] md:mb-12 md:text-[8rem]">
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={isLoaded ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {t.title[0]}
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={isLoaded ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {t.title[1]}
            </motion.span>
          </div>
          <div className="relative -mt-2 w-full h-full pb-2 sm:-mt-3 sm:pb-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full"
            >
              <ParticleText text={t.title[2]} />
            </motion.div>
          </div>
        </h1>

        {isLoaded && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-14 grid grid-cols-1 items-start gap-8 sm:mt-18 md:mt-24 md:grid-cols-12 md:gap-12"
          >
            {/* Bio */}
            <motion.div variants={item} className="md:col-span-8 flex flex-col justify-between gap-10 pr-2 sm:pr-8">
              <p className="text-base font-light leading-relaxed text-white/80 sm:text-lg md:text-xl drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
                {t.bio}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-px overflow-hidden rounded-xl border border-white/8">
                {t.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-1 flex-col items-center gap-1 bg-white/[0.03] px-5 py-4 text-center"
                  >
                    <span className="font-headline text-2xl font-bold text-white sm:text-3xl">
                      {stat.value}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/35 sm:text-[10px]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Spec card */}
            <motion.div
              variants={item}
              className="md:col-start-9 md:col-span-4"
            >
              <div className="relative rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md overflow-hidden">
                <BMWTopBorder />

                <div className="flex flex-col pt-5">
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 px-5 pb-5">
                    {t.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-white/55 sm:text-[10px]"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Spec rows — estilo ficha técnica */}
                  <div className="border-t border-white/8 divide-y divide-white/8">
                    {t.specs.map((spec) => (
                      <div key={spec.label} className="flex items-center justify-between px-5 py-3">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                          {spec.label}
                        </span>
                        <span className="font-headline text-sm font-semibold text-white">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-col gap-3 p-5 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection("projects")}
                      className="portfolio-btn group relative overflow-hidden rounded-xl bg-white px-4 py-4 text-[9px] font-bold uppercase tracking-[0.15em] text-black transition-all hover:pr-8 sm:py-5 sm:text-[10px] w-full text-center flex items-center justify-center"
                    >
                      <span className="relative z-10">{t.showreel}</span>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 transition-all group-hover:opacity-100">
                        →
                      </span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection("contact")}
                      className="portfolio-btn rounded-xl border border-white/20 bg-black/40 px-4 py-4 text-[9px] font-semibold uppercase tracking-[0.15em] text-white transition-colors sm:py-5 sm:text-[10px] w-full text-center backdrop-blur-md flex items-center justify-center"
                    >
                      {t.quickContact}
                    </motion.button>

                    <div className="flex gap-2">
                      {/* Ver CV */}
                      <motion.a
                        href="/CV_Wilmer_Iriarte.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="portfolio-btn group flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/50 transition-all duration-300 hover:border-white/25 hover:text-white/80 sm:text-[10px]"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        {t.viewCV}
                      </motion.a>

                      {/* Descargar CV */}
                      <motion.a
                        href="/CV_Wilmer_Iriarte.pdf"
                        download
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center rounded-xl border border-white/10 bg-transparent p-3 text-white/40 transition-all duration-300 hover:border-white/25 hover:text-white/80"
                        aria-label="Descargar CV"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <path d="M12 3v13M7 11l5 5 5-5M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Bottom bar — se pega al fondo del viewport */}
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-auto flex items-center justify-between border-t border-white/8 pt-5"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
              {t.location}
            </span>
            <button
              onClick={() => scrollToSection("projects")}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/25 transition-colors duration-300 hover:text-white/60"
            >
              <span>{t.scroll}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="animate-bounce">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
