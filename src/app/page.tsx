import { Hero } from "@/components/Hero";
import { About } from "@/components/About"; // <--- Importar

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <About /> {/* <--- Adicionar aqui */}
      {/* Mantém o espaço temporário em baixo só para podermos fazer scroll e testar */}
      <div className="h-[50vh] w-full bg-[#d9d9d9]"></div>
    </main>
  );
}
