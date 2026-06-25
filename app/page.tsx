"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import { Language } from "./i18n/translations";

// Componentes que no necesitan SSR ni estar en el bundle inicial
const BackgroundVideo = dynamic(() => import("./components/BackgroundVideo"), { ssr: false, loading: () => null });
const Projects        = dynamic(() => import("./components/Projects"),        { ssr: false, loading: () => null });
const Stack           = dynamic(() => import("./components/Stack"),           { ssr: false, loading: () => null });
const BMWMarquee      = dynamic(() => import("./components/BMWMarquee"),      { ssr: false, loading: () => null });
const Contact         = dynamic(() => import("./components/Contact"),         { ssr: false, loading: () => null });
const Footer          = dynamic(() => import("./components/Footer"),          { ssr: false, loading: () => null });
const CustomCursor    = dynamic(() => import("./components/CustomCursor"),    { ssr: false, loading: () => null });
const NoiseOverlay    = dynamic(() => import("./components/NoiseOverlay"),    { ssr: false, loading: () => null });
const ScrollProgress  = dynamic(() => import("./components/ScrollProgress"),  { ssr: false, loading: () => null });

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

      <div className="relative flex min-h-dvh flex-col bg-black text-[#e2e2e2]">
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
