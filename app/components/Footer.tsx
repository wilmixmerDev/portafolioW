"use client";

import { translations, Language } from "../i18n/translations";
import { scrollToSection } from "../utils/scroll";

export default function Footer({ language }: { language: Language }) {
  const t = translations[language];

  return (
    <footer className="relative z-20 w-full border-t border-white/5 bg-black/40 px-5 py-8 backdrop-blur-md sm:px-6 sm:py-10 md:px-10 md:py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 text-[9px] uppercase tracking-[0.14em] text-white/20 sm:gap-6 sm:text-[10px] sm:tracking-[0.2em] md:flex-row md:text-[0.6rem] md:tracking-[0.3em]">
        <div>{t.footer.copyright}</div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-12">
          <a
            className="transition-colors duration-500 hover:text-white"
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
          >
            {t.nav.about}
          </a>
          <a
            className="transition-colors duration-500 hover:text-white"
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("projects");
            }}
          >
            {t.nav.projects}
          </a>
          <a
            className="transition-colors duration-500 hover:text-white"
            href="#stack"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("stack");
            }}
          >
            {t.footer.stack}
          </a>
        </div>
      </div>
    </footer>
  );
}
