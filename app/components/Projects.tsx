"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translations, Language } from "../i18n/translations";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projectsList = [
  {
    id: "01",
    title: "Urosalud",
    tags: ["Healthcare", "Full-Stack"],
    year: "2024",
    link: "#",
    descES: "Plataforma integral de gestión de citas y telemedicina para especialistas urológicos.",
    descEN: "Comprehensive appointment and telemedicine management platform for urological specialists."
  },
  {
    id: "02",
    title: "EasyPlanning",
    tags: ["Booking", "Events"],
    year: "2024",
    link: "#",
    descES: "Sistema de reservas de salones de eventos y planificación de horarios corporativos.",
    descEN: "Event hall booking and corporate schedule planning system."
  },
  {
    id: "03",
    title: "Portfolio",
    tags: ["Next.js", "React", "Framer Motion"],
    year: "2026",
    link: "#",
    descES: "Experiencia web interactiva con físicas avanzadas de partículas y componentes de alto rendimiento.",
    descEN: "Interactive web experience with advanced particle physics and high-performance components."
  },
];

export default function Projects({ language }: { language: Language }) {
  const t = translations[language].projects;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projectsList.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projectsList.length) % projectsList.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section id="projects" className="relative min-h-[90vh] flex flex-col justify-center py-20 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-24">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="flex flex-col items-start gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:gap-6 md:pb-8 w-fit mb-12 relative z-20"
        >
          <div className="relative">
            {/* Extremely faint M POWER text watermark behind the title */}
            <div className="absolute -top-10 -left-10 text-[100px] font-headline font-black text-white/[0.02] tracking-widest uppercase pointer-events-none select-none z-0">
              ///M POWER
            </div>
            <motion.h2 className="font-headline text-3xl font-bold uppercase tracking-[0.15em] text-white sm:text-4xl md:text-5xl lg:text-6xl text-center md:text-left flex flex-col md:flex-row items-center gap-4 relative z-10">
              <span className="flex h-6 w-8 hidden md:flex">
                <span className="w-1/3 h-full bg-[#00A2E8] -skew-x-[20deg]" />
                <span className="w-1/3 h-full bg-[#10069F] -skew-x-[20deg] ml-[-2px]" />
                <span className="w-1/3 h-full bg-[#E32118] -skew-x-[20deg] ml-[-2px]" />
              </span>
              {t.title}
            </motion.h2>
            <span className="font-label mt-1 block text-[9px] uppercase tracking-[0.2em] text-white/30 sm:text-[10px] sm:tracking-[0.3em] md:text-[0.6rem] relative z-10">
              {t.subtitle}
            </span>
          </div>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative h-[55vh] min-h-[450px] w-full max-w-[1000px] mx-auto flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.a
              key={currentIndex}
              href={projectsList[currentIndex].link}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              className="absolute w-full h-full group flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 p-8 sm:p-12 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/5"
            >
              {/* Internal Glow on Hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
              
              <div className="flex justify-between items-start relative z-10">
                <div className="font-headline text-5xl sm:text-6xl text-white/20 transition-colors duration-700 group-hover:text-white">
                  {projectsList[currentIndex].id}
                </div>
                <div className="font-label text-sm uppercase tracking-[0.2em] text-white/40 border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                  {projectsList[currentIndex].year}
                </div>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-end gap-6 sm:gap-4 w-full">
                <div className="flex-1">
                  <h3 className="mb-4 font-headline text-5xl uppercase tracking-tighter text-white sm:text-6xl md:text-8xl transition-transform duration-500 group-hover:translate-x-3">
                    {projectsList[currentIndex].title}
                  </h3>
                  <p className="text-white/60 mb-6 max-w-sm sm:max-w-md text-sm sm:text-base leading-relaxed opacity-0 -translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 hidden sm:block">
                    {language === "es" ? projectsList[currentIndex].descES : projectsList[currentIndex].descEN}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {projectsList[currentIndex].tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/20 px-4 py-2 text-[10px] uppercase tracking-widest text-white/70 transition-colors duration-300 group-hover:border-white/50 group-hover:text-white bg-black/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2">
                  <div className="flex bg-white text-black p-4 rounded-full items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-[-45deg]">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.a>
          </AnimatePresence>
        </div>

        {/* Custom Navigation Controls */}
        <div className="mt-12 flex justify-center items-center gap-6 relative z-20">
          <button 
            onClick={prevProject}
            className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/70 transition-all hover:scale-110 hover:border-white/50 hover:bg-white hover:text-black focus:outline-none"
            aria-label="Previous project"
          >
            <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-1" />
          </button>
          
          <div className="flex gap-3">
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
            className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/70 transition-all hover:scale-110 hover:border-white/50 hover:bg-white hover:text-black focus:outline-none"
            aria-label="Next project"
          >
            <ChevronRight size={24} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
