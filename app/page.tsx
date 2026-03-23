"use client";

import { useEffect, useState } from "react";
import BackgroundVideo from "./components/BackgroundVideo";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import BMWMarquee from "./components/BMWMarquee";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import NoiseOverlay from "./components/NoiseOverlay";
import ScrollProgress from "./components/ScrollProgress";
import { Language } from "./i18n/translations";

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const browserLang = navigator.language.startsWith("es") ? "es" : "en";
    setLanguage(browserLang);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Loader onComplete={() => setIsLoaded(true)} />
      <CustomCursor />
      <NoiseOverlay />
      <ScrollProgress />

      <div className="relative min-h-screen bg-black text-[#e2e2e2] flex flex-col">
        <BackgroundVideo isLoaded={isLoaded} />

        <Navigation language={language} setLanguage={setLanguage} />

        <main className="relative z-20">
          <Hero language={language} isLoaded={isLoaded} />
          <Projects language={language} />
          <Stack language={language} />
          <BMWMarquee />
          <Contact language={language} />
        </main>

        <Footer language={language} />
      </div>
    </>
  );
}
