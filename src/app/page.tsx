import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#d9d9d9]">
      <Hero />

      {/*
         CONTAINER PRINCIPAL
         Mobile: gap-16 (Apertado)
         Desktop: md:gap-32 (O original espaçoso)
      */}
      <div className="w-full flex flex-col gap-16 md:gap-32">
        <About />

        {/* 1. PROJECTS (Agora em primeiro) */}
        <div className="w-full flex flex-col">
          <Marquee />
          <Projects />
        </div>

        {/* 2. EDUCATION (Agora em segundo) */}
        <div className="w-full flex flex-col">
          <Marquee />
          <Education />
        </div>

        <div className="w-full flex flex-col">
          <Marquee />
          <Skills />
        </div>

        <div className="w-full flex flex-col snap-start min-h-screen">
          <Marquee />
          <div className="flex-1 flex flex-col justify-center">
            <Contact />
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
}
