"use client";

import { motion } from "framer-motion";
import { educationData, type EducationItem } from "@/data/content";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/SectionWrapper";

export function Education() {
  return (
    <SectionWrapper
      id="education"
      enableY={false} // Importante: Desliga o movimento da secção para o Sticky funcionar
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

        {/* TIMELINE CONTAINER */}
        <div className="relative">
          {/*
             CAMADA 1: A LINHA VISUAL (FUNDO)
             Vai do topo do 1º título até ao fundo da última descrição.
          */}
          <div className="absolute left-5 top-[0.6rem] bottom-[0.6rem] w-px md:left-1/2 md:-translate-x-1/2 bg-[#26150f]/30"></div>

          {/*
             CAMADA 2: A PISTA DO SÍMBOLO (TRACK)
             Começa mais abaixo (55px) e acaba mais cedo (150px).
             Isto cria o "Padding" para o símbolo não bater nas pontas.
          */}
          <div className="absolute left-5 top-14 bottom-36 w-px md:left-1/2 md:-translate-x-1/2 z-10 pointer-events-none">
            {/* O PONTO STICKY */}
            {/* sticky top-1/2: Cola ao centro do ecrã enquanto estiver dentro da Pista */}
            <div className="sticky top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center">
              <span className="text-2xl text-[#26150f] leading-none bg-[#d9d9d9] px-0.5">
                ❖
              </span>
            </div>
          </div>

          {/* LISTA DE ITENS */}
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
                  {/* COLUNA 1: TÍTULOS (Esquerda) */}
                  <div className="text-left md:col-start-1 md:text-right md:py-0">
                    <TimelineHeader item={item} align="right" />
                  </div>

                  {/* COLUNA 2: VAZIO */}
                  <div className="hidden md:block md:col-start-2" />

                  {/* COLUNA 3: DESCRIÇÕES (Direita) */}
                  <div className="mt-4 text-left md:col-start-3 md:mt-0 md:pt-16">
                    <TimelineBody item={item} align="left" />
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

// SUB-COMPONENTES (COM ANIMAÇÕES RESTAURADAS)

function TimelineHeader({
  item,
  align,
}: {
  item: EducationItem;
  align: "left" | "right";
}) {
  // Desktop: Se align="right" (coluna esq), vem de -50.
  // Mobile: Vem sempre de -30 (esquerda).
  const xStart = align === "right" ? -50 : -30;

  return (
    <motion.div
      initial={{ opacity: 0, x: xStart }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn("flex flex-col", "items-start md:items-end")}
    >
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
    </motion.div>
  );
}

function TimelineBody({
  item,
}: {
  item: EducationItem;
  align: "left" | "right";
}) {
  // Vem sempre da direita (+30) pois está na coluna da direita ou por baixo
  const xStart = 30;

  return (
    <motion.div
      initial={{ opacity: 0, x: xStart }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    >
      <p className="text-base leading-relaxed text-[#26150f] font-normal max-w-[45ch]">
        {item.description}
      </p>
    </motion.div>
  );
}
