"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translations, Language } from "../i18n/translations";

interface NavigationProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function Navigation({ language, setLanguage }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const navigateToSection = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <>
      <header className="pointer-events-none fixed left-0 top-0 z-50 flex w-full items-center justify-end px-4 py-4 sm:px-5 sm:py-5 md:px-8 md:py-8">
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center gap-3 rounded-xl border border-white/10 bg-[#131313]/60 px-3 py-2 backdrop-blur-xl transition-all duration-500 hover:bg-[#131313]/80 hover:border-white/20 sm:gap-6 sm:px-5 sm:py-3 md:gap-10 md:px-10 md:py-5"
        >
          <div className="hidden items-center gap-5 sm:flex md:gap-10">
            {["about", "projects", "contact"].map((section) => (
              <a
                key={section}
                className="nav-link text-xs font-bold uppercase tracking-[-0.04em] text-[#e2e2e2]/60 hover:text-white md:text-sm transition-colors duration-300"
                href={`#${section}`}
                onClick={(event) => navigateToSection(event, section)}
              >
                {translations[language].nav[section as keyof typeof translations[typeof language]["nav"]]}
              </a>
            ))}
          </div>
          <button
            className="portfolio-btn rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs uppercase tracking-[0.15em] text-white/50 transition-all hover:bg-white/10 hover:text-white hover:border-white/30"
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            title={language === "es" ? "Switch to English" : "Cambiar a Español"}
          >
            {language === "es" ? "EN" : "ES"}
          </button>
          <button
            className="portfolio-btn rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs uppercase tracking-[0.15em] text-white/70 sm:hidden transition-all active:scale-95"
            onClick={() => setMobileMenuOpen((current) => !current)}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? translations[language].nav.close : translations[language].nav.menu}
          </button>
        </motion.nav>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed left-4 right-4 top-20 z-40 rounded-xl border border-white/15 bg-black/80 p-4 backdrop-blur-2xl sm:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {["about", "projects", "contact"].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={(event) => navigateToSection(event, section)}
                  className="rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium uppercase tracking-[0.15em] text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-[0.98]"
                >
                  {translations[language].nav[section as keyof typeof translations[typeof language]["nav"]]}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
