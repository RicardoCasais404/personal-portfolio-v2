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
    // REMOVIDO: 'gap-32'. Agora confiamos no padding das secções.
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#d9d9d9]">
      <Hero />

      {/*
         REMOVI os divs 'wrapper' (w-full flex flex-col gap-32).
         Agora os componentes estão "soltos".
         Isto permite que o padding interno de cada um dite o espaçamento.
      */}

      <About />

      <Marquee />

      <Education />

      <Marquee />

      <Projects />

      <Marquee />

      <Skills />

      {/* Bloco Final: Separador + Contacto + Footer */}
      <div className="w-full flex flex-col snap-start min-h-screen">
        <Marquee />
        {/* 'flex-1' no Contact empurra o Footer para o fundo se sobrar espaço */}
        <div className="flex-1 flex flex-col justify-center">
          <Contact />
        </div>
        <Footer />
      </div>
    </main>
  );
}
