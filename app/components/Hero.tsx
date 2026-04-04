"use client";

import { motion, Variants } from "framer-motion";
import { translations, Language } from "../i18n/translations";
import { scrollToSection } from "../utils/scroll";
import ParticleText from "./ParticleText";

export default function Hero({ language, isLoaded }: { language: Language; isLoaded: boolean }) {
  const t = translations[language].hero;

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

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section key={language} id="about" className="flex min-h-screen flex-col px-5 pb-10 pt-28 sm:px-6 sm:pt-32 md:px-24 md:pt-48">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="mb-5 block text-[10px] uppercase tracking-[0.28em] text-white/30 sm:text-[11px] sm:tracking-[0.4em]">
            {t.subtitle}
          </span>
        </motion.div>

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
            key={`hero-content-${language}`}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className="mt-14 grid grid-cols-1 items-center gap-8 sm:mt-18 md:mt-24 md:grid-cols-12 md:gap-12"
          >
          <motion.div variants={item} className="md:col-span-8 flex items-center pr-2 sm:pr-8">
            <motion.p 
              variants={{
                hidden: { opacity: 1 },
                show: { opacity: 1, transition: { staggerChildren: 0.03, delayChildren: 0.1 } }
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="text-base font-light leading-relaxed text-white/90 sm:text-lg md:text-2xl drop-shadow-[0_4px_16px_rgba(0,0,0,1)] text-left"
            >
              {t.bio.split(" ").map((word, wIdx) => (
                <motion.span
                  key={wIdx}
                  variants={{
                    hidden: { opacity: 0, y: 5 },
                    show: { opacity: 1, y: 0 }
                  }}
                  className="inline-block mr-[0.25em] mb-1"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-col justify-end md:col-start-9 md:col-span-4 md:mt-6"
          >
            <div className="glass-panel relative rounded-2xl border border-white/10 p-5 backdrop-blur-md overflow-hidden bg-black/40">
              <div className="absolute top-0 left-0 w-full h-1 flex">
                <div className="w-1/3 h-full bg-[#00A2E8]/80" />
                <div className="w-1/3 h-full bg-[#10069F]/80" />
                <div className="w-1/3 h-full bg-[#E32118]/80" />
              </div>
              <div className="flex flex-col gap-6 pt-2">
                <div className="flex flex-wrap gap-2">
                  {heroHighlights.map((highlight) => (
                    <motion.span
                      key={highlight}
                      variants={item}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-white/70 sm:text-[10px]"
                    >
                      {highlight}
                    </motion.span>
                  ))}
                </div>

                <motion.div variants={item} className="text-[10px] uppercase tracking-[0.15em] text-white/40 sm:text-[11px] sm:tracking-[0.2em]">
                  {t.location}
                </motion.div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {heroStats.map((stat) => (
                    <motion.div
                      key={stat.label}
                      variants={item}
                      whileHover={{ y: -5, scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="rounded-xl border border-white/10 px-2 py-4 flex flex-col items-center justify-center text-center glass-panel"
                    >
                      <div className="font-headline text-lg font-semibold text-white sm:text-xl drop-shadow-md">
                        {stat.value}
                      </div>
                      <div className="mt-1 w-full text-center text-[7px] uppercase tracking-widest text-white/60 leading-tight sm:text-[8px]">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 mt-2 w-full">
                  <motion.button
                    variants={item}
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
                    variants={item}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection("contact")}
                    className="portfolio-btn rounded-xl border border-white/20 bg-black/40 px-4 py-4 text-[9px] font-semibold uppercase tracking-[0.15em] text-white transition-colors sm:py-5 sm:text-[10px] w-full text-center backdrop-blur-md flex items-center justify-center"
                  >
                    {t.quickContact}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        )}
      </div>
    </section>
  );
}
