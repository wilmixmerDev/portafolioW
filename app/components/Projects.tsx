"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "../i18n/translations";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const projectsList = [
  {
    id: "01",
    title: "fitW",
    tags: ["PWA", "Full-Stack", "Next.js", "TypeScript"],
    year: "2026",
    link: "https://fitw.vercel.app",
    descES: "PWA de seguimiento nutricional y calórico para atletas. Calcula TDEE y macros con la fórmula Mifflin-St Jeor, sistema de recetas proporcionales, registro de alimentos y gráficos de tendencia de peso.",
    descEN: "Nutritional and calorie tracking PWA for athletes. Calculates TDEE and macros using Mifflin-St Jeor formula, proportional recipe system, food logging, and weight trend charts."
  },
  {
    id: "02",
    title: "Urosalud",
    tags: ["Healthcare", "Full-Stack"],
    year: "2024",
    link: "#",
    descES: "Plataforma integral de gestión de citas y telemedicina para especialistas urológicos.",
    descEN: "Comprehensive appointment and telemedicine management platform for urological specialists."
  },
  {
    id: "03",
    title: "EasyPlanning",
    tags: ["Booking", "Events"],
    year: "2024",
    link: "#",
    descES: "Sistema de reservas de salones de eventos y planificación de horarios corporativos.",
    descEN: "Event hall booking and corporate schedule planning system."
  },
  {
    id: "04",
    title: "Portfolio",
    tags: ["Next.js", "React", "Framer Motion"],
    year: "2026",
    link: "#",
    descES: "Experiencia web interactiva con físicas avanzadas de partículas y componentes de alto rendimiento.",
    descEN: "Interactive web experience with advanced particle physics and high-performance components."
  },
];

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language].projects;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);
  const currentProject = projectsList[currentIndex];
  const visibleTags = currentProject.tags.slice(0, 2);

  useEffect(() => {
    setMobileInfoOpen(false);
  }, [currentIndex]);

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projectsList.length);
  };

  const handleCardTap = () => {
    if (window.innerWidth < 768) {
      setMobileInfoOpen((current) => !current);
    }
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projectsList.length) % projectsList.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 220 : -220,
      opacity: 0,
      y: 16,
      scale: 0.88,
      rotateY: direction > 0 ? -16 : 16,
      rotateZ: direction > 0 ? 0.8 : -0.8,
      filter: "blur(8px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      rotateZ: 0,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 220 : -220,
      opacity: 0,
      y: -16,
      scale: 0.9,
      rotateY: direction < 0 ? 14 : -14,
      rotateZ: direction < 0 ? 0.7 : -0.7,
      filter: "blur(8px)",
    }),
  };

  return (
    <section id="projects" className="relative flex min-h-svh flex-col justify-center overflow-hidden py-10 sm:min-h-[90vh] sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-24">
        
        {/* Header */}
        <motion.div 
          key={language}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6, margin: "0px 0px -18% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 mb-10 flex w-full max-w-full flex-col items-start gap-3 border-b border-white/10 pb-5 sm:mb-12 sm:gap-4 sm:pb-6 md:w-fit md:flex-row md:items-end md:gap-6 md:pb-8"
        >
          <div className="relative">
            {/* Extremely faint M POWER text watermark behind the title */}
            <div className="pointer-events-none absolute -left-10 -top-10 z-0 hidden select-none text-[100px] font-headline font-black uppercase tracking-widest text-white/2 md:block">
              ///M POWER
            </div>
            <motion.h2 className="relative z-10 flex flex-col items-start gap-2 font-headline text-[2.1rem] font-bold uppercase leading-[0.95] tracking-[0.08em] text-white sm:text-4xl sm:tracking-widest md:flex-row md:items-center md:gap-4 md:text-5xl md:tracking-[0.15em] lg:text-6xl">
              <span className="mb-1 flex h-5 w-7 md:mb-0 md:h-6 md:w-8">
                <span className="h-full w-1/3 -skew-x-20 bg-[#00A2E8]" />
                <span className="-ml-0.5 h-full w-1/3 -skew-x-20 bg-[#10069F]" />
                <span className="-ml-0.5 h-full w-1/3 -skew-x-20 bg-[#E32118]" />
              </span>
              {t.title}
            </motion.h2>
            <span className="relative z-10 mt-2 block font-label text-[9px] uppercase tracking-[0.14em] text-white/35 sm:text-[10px] sm:tracking-[0.2em] md:text-[0.6rem] md:tracking-[0.3em]">
              {t.subtitle}
            </span>
          </div>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative mx-auto flex h-[clamp(340px,46svh,520px)] min-h-80 w-full max-w-250 items-center justify-center sm:h-[55vh] sm:min-h-112.5">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.article
              key={`${currentIndex}-${language}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              onClick={handleCardTap}
              transition={{
                x: { type: "spring", stiffness: 220, damping: 24, mass: 0.95 },
                y: { type: "spring", stiffness: 220, damping: 24, mass: 0.95 },
                scale: { type: "spring", stiffness: 220, damping: 26, mass: 0.95 },
                rotateY: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
                rotateZ: { duration: 0.46, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.28, ease: "easeOut" },
                filter: { duration: 0.32, ease: "easeOut" },
              }}
              style={{ transformPerspective: 1200 }}
              className="group absolute flex h-full w-full cursor-pointer flex-col justify-between overflow-hidden rounded-[1.8rem] border border-white/12 bg-[#08090b]/88 p-5 backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:bg-[#0d1015]/92 md:cursor-default sm:rounded-4xl sm:p-10"
            >
              <motion.div
                key={`streak-${currentIndex}`}
                initial={{ x: direction > 0 ? "-130%" : "130%", opacity: 0 }}
                animate={{ x: direction > 0 ? "130%" : "-130%", opacity: [0, 0.24, 0] }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute inset-y-0 w-[42%] bg-linear-to-r from-transparent via-white/25 to-transparent blur-md"
              />

              {/* Motorsport accents */}
              <div className="pointer-events-none absolute inset-0 opacity-90">
                <div className="absolute -left-14 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-[#00A2E8]/14 blur-3xl" />
                <div className="absolute -right-12 top-12 h-32 w-32 rounded-full bg-[#10069F]/18 blur-3xl" />
                <div className="absolute bottom-4 right-8 h-24 w-24 rounded-full bg-[#E32118]/16 blur-2xl" />
              </div>

              <div className="pointer-events-none absolute left-0 top-0 h-full w-1.5 overflow-hidden">
                <div className="h-1/3 bg-[#00A2E8]" />
                <div className="h-1/3 bg-[#10069F]" />
                <div className="h-1/3 bg-[#E32118]" />
              </div>

              <div className="pointer-events-none absolute left-5 right-5 top-3 h-px bg-linear-to-r from-white/20 via-white/8 to-transparent sm:left-8 sm:right-8 sm:top-7" />
              
              <div className="relative z-10 flex items-start justify-between pt-3 sm:pt-0">
                <div className="font-headline text-[clamp(2.35rem,11vw,3.6rem)] leading-none text-white/16 transition-colors duration-700 group-hover:text-white/28 sm:text-6xl">
                  {currentProject.id}
                </div>
                <div className="font-label flex items-center gap-2 rounded-full border border-white/12 bg-black/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/55">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                  {currentProject.year}
                </div>
              </div>

              <div className="relative z-10 flex w-full flex-col items-end justify-between gap-6 sm:flex-row sm:gap-4">
                <div className="flex-1">
                  <h3 className="mb-4 font-headline text-[clamp(2.15rem,10.5vw,4rem)] uppercase tracking-[-0.03em] text-white transition-transform duration-500 group-hover:translate-x-2 sm:text-6xl md:text-8xl">
                    {currentProject.title}
                  </h3>
                  <p className="text-white/60 mb-6 max-w-sm sm:max-w-md text-sm sm:text-base leading-relaxed opacity-0 -translate-y-4 transition-all duration-500 hidden md:block group-hover:opacity-100 group-hover:translate-y-0">
                    {language === "es" ? currentProject.descES : currentProject.descEN}
                  </p>
                  <div className="flex min-h-10 flex-wrap gap-2.5">
                    {visibleTags.map((tag) => (
                      <span key={tag} className="inline-flex rounded-full bg-linear-to-r from-[#00A2E8]/85 via-[#10069F]/85 to-[#E32118]/85 p-px shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-transform duration-300 group-hover:-translate-y-px">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#0b0d11]/92 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/82 whitespace-nowrap transition-all duration-300 group-hover:bg-[#11151d] group-hover:text-white">
                          <span className="relative h-1.5 w-1.5 rounded-full bg-white/70">
                            <span className="absolute -inset-1 rounded-full bg-linear-to-r from-[#00A2E8] via-[#10069F] to-[#E32118] opacity-60 blur-[2px]" />
                          </span>
                          {tag}
                        </span>
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 md:hidden">
                    <motion.p
                      animate={{
                        opacity: mobileInfoOpen ? 0 : 1,
                        y: mobileInfoOpen ? -4 : 0,
                        height: mobileInfoOpen ? 0 : "auto",
                      }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden text-[11px] uppercase tracking-[0.16em] text-white/35"
                    >
                      {language === "es" ? "Toca la tarjeta para ver info" : "Tap card to view info"}
                    </motion.p>

                    <motion.div
                      initial={false}
                      animate={{
                        opacity: mobileInfoOpen ? 1 : 0,
                        y: mobileInfoOpen ? 0 : 8,
                        height: mobileInfoOpen ? "auto" : 0,
                      }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-sm pb-0.5 text-sm leading-relaxed text-white/65">
                        {language === "es" ? currentProject.descES : currentProject.descEN}
                      </p>
                    </motion.div>
                  </div>
                </div>

                <div className="shrink-0 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2">
                  <a
                    href={currentProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="relative flex items-center justify-center rounded-full bg-white p-3 text-black transition-transform duration-300 hover:scale-105 sm:p-4"
                    aria-label={language === "es" ? `Abrir ${currentProject.title}` : `Open ${currentProject.title}`}
                  >
                    <span className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-linear-to-r from-[#00A2E8]/60 via-[#10069F]/60 to-[#E32118]/60 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="-rotate-45 sm:h-6 sm:w-6">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Custom Navigation Controls */}
        <div className="relative z-20 mt-6 flex items-center justify-center gap-4 sm:mt-12 sm:gap-6">
          <button 
            onClick={prevProject}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/70 transition-all hover:scale-110 hover:border-white/50 hover:bg-white hover:text-black focus:outline-none sm:h-14 sm:w-14"
            aria-label="Previous project"
          >
            <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1 sm:h-6 sm:w-6" />
          </button>
          
          <div className="flex gap-2 sm:gap-3">
            {projectsList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/20 hover:bg-white/50"
                }`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={nextProject}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/70 transition-all hover:scale-110 hover:border-white/50 hover:bg-white hover:text-black focus:outline-none sm:h-14 sm:w-14"
            aria-label="Next project"
          >
            <ChevronRight size={20} className="transition-transform group-hover:translate-x-1 sm:h-6 sm:w-6" />
          </button>
        </div>

      </div>
    </section>
  );
}
