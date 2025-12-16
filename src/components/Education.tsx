"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { educationData, type EducationItem } from "@/data/content";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/SectionWrapper";

export function Education() {
  // A referência é colocada especificamente na "Pista" (a linha vertical)
  const trackRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    // Lógica:
    // Quando o TOPO da linha toca no CENTRO do ecrã -> 0%
    // Quando o FUNDO da linha toca no CENTRO do ecrã -> 100%
    offset: ["start center", "end center"],
  });

  // Usamos 'y' (TranslateY) em vez de 'top'.
  // Isto usa a GPU para renderizar, garantindo suavidade máxima.
  // Vai de 0% (topo da linha) a 100% (fundo da linha).
  const pointTranslateY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <SectionWrapper
      id="education"
      enableY={false}
      className="relative w-full min-h-screen py-20 px-6 md:px-12 md:py-32 bg-[#d9d9d9]"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        {/* TÍTULO */}
        <div className="mb-24 md:mb-32 text-center">
          <h2 className="text-[#26150f] font-extrabold uppercase leading-[0.9] tracking-normal">
            <span className="block text-[clamp(2.5rem,8vw,5rem)]">
              {educationData.titlePart1}
            </span>
            <span className="flex items-center justify-center gap-4 text-[clamp(2.5rem,8vw,5rem)]">
              <svg
                viewBox="0 0 87 92"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[0.6em] w-auto text-[#26150f]"
                aria-hidden="true"
              >
                <path d="M78.0537 46L43.5 82.54L8.94531 46L43.5 9.45898L78.0537 46Z" />
              </svg>
              {educationData.titlePart2}
            </span>
          </h2>
        </div>

        {/* CONTENTOR GERAL */}
        <div className="relative">
          {/*
             === A PISTA (TRACK) ===
             Esta div define fisicamente onde a animação começa e acaba.
             top-[55px]: Alinha com o 1º Título (pt-12 do container + ajuste visual).
             bottom-[150px]: Alinha com o último texto (dependendo do tamanho da descrição).
          */}
          <div
            ref={trackRef}
            className="absolute left-5 top-[55px] bottom-[150px] w-px md:left-1/2 md:-translate-x-1/2"
          >
            {/* A Linha de Fundo (Estática) */}
            <div className="absolute inset-0 w-full h-full bg-[#26150f]/30"></div>

            {/*
               O PONTO ANIMADO
               Posição: absolute top-0 (Começa no topo da Pista).
               style={{ y }}: O Framer Motion empurra-o para baixo via GPU.
            */}
            <motion.div
              style={{ y: pointTranslateY }}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center will-change-transform"
            >
              <span className="text-2xl text-[#26150f] leading-none bg-[#d9d9d9] px-0.5">
                ❖
              </span>
            </motion.div>
          </div>

          {/* LISTA DE ITENS */}
          {/* pt-12 (48px) para empurrar o conteúdo para baixo */}
          <div className="flex flex-col gap-16 md:gap-24 pt-12 pb-12">
            {educationData.items.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    "relative flex flex-col pl-12", // Mobile
                    "md:grid md:grid-cols-[1fr_80px_1fr] md:items-start md:pl-0" // Desktop
                  )}
                >
                  {/* TÍTULO */}
                  <div className="text-left md:col-start-1 md:text-right md:py-0">
                    <TimelineHeader item={item} />
                  </div>

                  {/* VAZIO */}
                  <div className="hidden md:block md:col-start-2" />

                  {/* DESCRIÇÃO */}
                  <div className="mt-4 text-left md:col-start-3 md:mt-0 md:pt-16">
                    <TimelineBody item={item} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

// SUB-COMPONENTES
function TimelineHeader({ item }: { item: EducationItem }) {
  return (
    <div className={cn("flex flex-col", "items-start md:items-end")}>
      <h3 className="text-2xl font-bold uppercase text-[#26150f] leading-tight text-left md:text-right">
        {item.title}
      </h3>
      <span className="mt-2 text-base font-medium text-[#26150f] text-left md:text-right">
        {item.institution}
      </span>
      {item.link && (
        <a
          href={item.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-bold text-[#26150f] underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity w-fit active:opacity-70"
        >
          {item.link.text}
        </a>
      )}
    </div>
  );
}

function TimelineBody({ item }: { item: EducationItem }) {
  return (
    <div>
      <p className="text-base leading-relaxed text-[#26150f] font-normal max-w-[45ch]">
        {item.description}
      </p>
    </div>
  );
}
