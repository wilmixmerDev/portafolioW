"use client";

import { motion } from "framer-motion";
import { translations, Language } from "../i18n/translations";
import { scrollToSection } from "../utils/scroll";

export default function Footer({ language }: { language: Language }) {
  const t = translations[language];

  return (
    <footer
      className="relative z-20 w-full overflow-hidden border-t border-white/5 bg-black/40 px-3 py-6 mt-12 sm:px-4 sm:py-8 sm:mt-14 md:px-10 md:py-16 md:mt-0 mt-auto"
    >
      {/* BMW tricolor stripe at top of footer */}
      <div className="absolute left-0 top-0 flex h-[2px] w-full">
        <div className="h-full w-1/3 bg-[#00A2E8]/70" />
        <div className="h-full w-1/3 bg-[#10069F]/70" />
        <div className="h-full w-1/3 bg-[#E32118]/70" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        {/* Left: copyright */}
        <div className="text-[9px] uppercase tracking-[0.14em] text-white/20 sm:text-[10px] sm:tracking-[0.2em] md:text-[0.6rem] md:tracking-[0.3em]">
          {t.footer.copyright}
        </div>

        {/* Center: BMW mini roundel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-first md:order-none"
        >
          <svg
            viewBox="0 0 100 100"
            className="h-7 w-7 opacity-20 sm:h-8 sm:w-8 md:h-9 md:w-9"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="47" stroke="white" strokeWidth="4" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="4" fill="none" />
            <circle cx="50" cy="50" r="49" stroke="white" strokeWidth="1.5" fill="none" />
            <path d="M 50 20 A 30 30 0 0 1 80 50 L 50 50 Z" fill="white" />
            <path d="M 50 80 A 30 30 0 0 1 20 50 L 50 50 Z" fill="white" />
          </svg>
        </motion.div>

        {/* Right: nav links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[9px] uppercase tracking-[0.14em] text-white/20 sm:gap-6 sm:text-[10px] sm:tracking-[0.2em] md:gap-12 md:text-[0.6rem] md:tracking-[0.3em]">
          <a
            className="transition-colors duration-500 hover:text-white"
            href="#about"
            onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}
          >
            {t.nav.about}
          </a>
          <a
            className="transition-colors duration-500 hover:text-white"
            href="#projects"
            onClick={(e) => { e.preventDefault(); scrollToSection("projects"); }}
          >
            {t.nav.projects}
          </a>
          <a
            className="transition-colors duration-500 hover:text-white"
            href="#stack"
            onClick={(e) => { e.preventDefault(); scrollToSection("stack"); }}
          >
            {t.footer.stack}
          </a>
          <a
            className="hidden rounded-full border border-white/30 bg-white/10 px-3 py-1 text-white/85 underline decoration-white/40 underline-offset-4 transition-colors duration-500 hover:text-white md:inline-flex"
            href="https://youtu.be/YAFUyPp_238?si=FKewTWOqaZ5F2nAP"
            target="_blank"
            rel="noopener noreferrer"
          >
            Credits: Damir Who
          </a>
        </div>
      </div>

      <div className="mx-auto mt-4 flex w-full max-w-7xl justify-center md:hidden">
        <a
          href={t.footer.mobileCreditsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-full bg-white/10 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/80 underline decoration-white/30 underline-offset-4 shadow-sm transition-colors duration-500 hover:text-white hover:bg-white/20"
        >
          {t.footer.mobileCredits}
        </a>
      </div>
    </footer>
  );
}
