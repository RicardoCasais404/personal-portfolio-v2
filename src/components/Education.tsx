"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { educationData, type EducationItem } from "@/data/content";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/SectionWrapper";

export function Education() {
  // 1. Ref para o contentor da lista (onde a linha vive)
  const listRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    // TRUQUE DO MOVIMENTO:
    // Começa quando o TOPO da lista toca no CENTRO do ecrã.
    // Acaba quando o FUNDO da lista toca no CENTRO do ecrã.
    // Resultado: O ponto parece "preso" ao centro do ecrã enquanto lês.
    offset: ["start center", "end center"],
  });

  // Mapeamos o progresso (0 a 1) para a altura da linha (0% a 100%)
  const pointTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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

        {/* TIMELINE CONTAINER (A LISTA) */}
        <div ref={listRef} className="relative">
          {/*
             A LINHA DE FUNDO (TRACK)
             top-[0.6rem] -> Alinha com o topo das letras do 1º Título.
             bottom-[0.6rem] -> Alinha com a base das letras da última Descrição.
             Desta forma, a linha tem o tamanho EXATO do conteúdo de texto.
          */}
          <div className="absolute left-5 top-[0.6rem] bottom-[0.6rem] w-px bg-[#26150f]/30 md:left-1/2 md:-translate-x-1/2">
            {/* O PONTO ANIMADO */}
            <motion.div
              style={{ top: pointTop }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center"
            >
              {/* Símbolo com fundo para apagar a linha atrás dele */}
              <span className="text-2xl text-[#26150f] leading-none bg-[#d9d9d9] px-px">
                ❖
              </span>
            </motion.div>
          </div>

          {/*
             LISTA DE ITENS
             Sem padding vertical extra no pai, para que a linha (absolute)
             bata certo com o primeiro e último filho.
          */}
          <div className="flex flex-col gap-16 md:gap-24">
            {educationData.items.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    // MOBILE: Flex Coluna, padding left para afastar da linha
                    "relative flex flex-col pl-12",
                    // DESKTOP: Grid 3 colunas
                    "md:grid md:grid-cols-[1fr_80px_1fr] md:items-start md:pl-0"
                  )}
                >
                  {/* COLUNA 1: CABEÇALHO */}
                  <div
                    className={cn(
                      "text-left", // Mobile: Esquerda
                      // Desktop: Alterna (Ímpar->Dir, Par->Esq)
                      // Nota: index 0 é o primeiro.
                      index % 2 === 0
                        ? "md:col-start-1 md:text-right"
                        : "md:col-start-3 md:text-left"
                    )}
                  >
                    <TimelineHeader item={item} />
                  </div>

                  {/* COLUNA 2: ESPAÇO CENTRAL (Vazio) */}
                  <div className="hidden md:block md:col-start-2" />

                  {/* COLUNA 3: DESCRIÇÃO */}
                  <div
                    className={cn(
                      "mt-4 text-left", // Mobile: Margem topo
                      "md:mt-0 md:pt-16", // Desktop: Padding topo (Escada)
                      // Desktop: Coluna oposta ao cabeçalho
                      index % 2 === 0
                        ? "md:col-start-3 md:text-left"
                        : "md:col-start-1 md:text-right"
                    )}
                  >
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
    <div className="flex flex-col">
      <h3 className="text-2xl font-bold uppercase text-[#26150f] leading-tight">
        {item.title}
      </h3>
      <span className="mt-2 text-base font-medium text-[#26150f]">
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
