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

      {/* Container Principal */}
      <div className="w-full flex flex-col">
        {/* 1. ABOUT */}
        <About />

        {/* 2. PROJECTS */}
        <Marquee />
        <Projects />

        {/* 3. EDUCATION */}
        <Marquee />
        <Education />

        {/* 4. SKILLS */}
        <Marquee />
        <Skills />

        {/* 5. CONTACTO + FOOTER */}
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
