import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Marquee } from "@/components/Marquee";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#d9d9d9]">
      {/* 1. Hero Section (Entrada) */}
      <Hero />

      {/* 2. About Section */}
      <About />

      {/* 3. Separador 1 */}
      <Marquee />

      {/* 4. Education Timeline */}
      <Education />

      {/* 5. Separador 2 (Repetimos o componente, ele funciona igual) */}
      <Marquee />

      {/* Espaço Temporário para o Footer (vamos criar a seguir) */}
      <div className="h-[20vh] w-full"></div>
    </main>
  );
}
