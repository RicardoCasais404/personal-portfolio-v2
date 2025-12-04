import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Education } from "@/components/Education"; // <--- Novo
import { Marquee } from "@/components/Marquee"; // <--- Novo

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <About />
      <Marquee />
      <Education />
      <Marquee />

      {/* Footer temp */}
      <div className="h-[20vh] w-full bg-[#d9d9d9]"></div>
    </main>
  );
}
