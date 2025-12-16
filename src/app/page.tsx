import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#d9d9d9]">
      {/* 1. HERO */}
      <Hero />

      {/*
         CONTAINER DE SECÇÕES
         Sem 'gap'. O espaçamento é gerido pelo padding interno de cada secção
         (py-20 no mobile, py-32 no desktop) e pelo min-h-screen.
      */}
      <div className="w-full flex flex-col">
        {/* 2. ABOUT */}
        <About />

        {/* 3. PROJECTS */}
        <Projects />

        {/* 4. EDUCATION */}
        <Education />

        {/* 5. SKILLS */}
        <Skills />

        {/* 6. CONTACTO + FOOTER (Agrupados para ocupar 1 ecrã no fim) */}
        <div className="w-full flex flex-col snap-start min-h-screen">
          <div className="flex-1 flex flex-col justify-center">
            <Contact />
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
}
