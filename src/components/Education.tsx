"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { educationData, type EducationItem } from "@/data/content";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/SectionWrapper";

export function Education() {
  const listRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    // Trigger: Começa quando o topo da lista chega ao centro, acaba quando o fundo chega ao centro.
    offset: ["start center", "end center"],
  });

  // 1. SUAVIZAÇÃO (SMOOTHING)
  // O useSpring cria uma "mola" virtual. O ponto segue o scroll mas com inércia.
  // stiffness: 50 (baixo = movimento suave/preguiçoso)
  // damping: 20 (amortecimento para não oscilar como gelatina)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  // 2. FÍSICA DO PONTO (COM PADDING NA PISTA)
  // A linha visual começa no 0 e acaba no 100%.
  // Mas o ponto só viaja de '20px' até '100% - 20px'.
  // Isto cria o padding no topo e no fundo que pediste.
  const pointTop = useTransform(
    smoothProgress,
    [0, 1],
    ["20px", "calc(100% - 20px)"]
  );

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

        {/* TIMELINE CONTAINER */}
        <div ref={listRef} className="relative">
          {/*
             LINHA CENTRAL (VISUAL)
             top-[0.6rem] / bottom-[0.6rem]: Alinha com as letras.
          */}
          <div className="absolute left-5 top-[0.6rem] bottom-[0.6rem] w-px bg-[#26150f]/30 md:left-1/2 md:-translate-x-1/2">
            {/* O PONTO ANIMADO */}
            <motion.div
              style={{ top: pointTop }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center"
            >
              <span className="text-2xl text-[#26150f] leading-none bg-[#d9d9d9] px-px">
                ❖
              </span>
            </motion.div>
          </div>

          {/* LISTA DE ITENS (LAYOUT FIXO AGORA) */}
          <div className="flex flex-col gap-16 md:gap-24">
            {educationData.items.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    // MOBILE: Flex coluna, padding left
                    "relative flex flex-col pl-12",
                    // DESKTOP: Grid 3 colunas, sem padding
                    "md:grid md:grid-cols-[1fr_80px_1fr] md:items-start md:pl-0"
                  )}
                >
                  {/*
                     COLUNA 1 (ESQUERDA): SEMPRE CABEÇALHO
                     md:col-start-1: Força sempre na 1ª coluna.
                     md:text-right: Alinha texto à direita (contra a linha).
                  */}
                  <div className="text-left md:col-start-1 md:text-right md:py-0">
                    <TimelineHeader item={item} align="right" />
                  </div>

                  {/* COLUNA 2: ESPAÇO CENTRAL */}
                  <div className="hidden md:block md:col-start-2" />

                  {/*
                     COLUNA 3 (DIREITA): SEMPRE DESCRIÇÃO
                     md:col-start-3: Força sempre na 3ª coluna.
                     md:text-left: Alinha texto à esquerda.
                     md:pt-16: Mantém o efeito escada.
                  */}
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

// SUB-COMPONENTES
function TimelineHeader({
  item,
}: {
  item: EducationItem;
  align: "left" | "right";
}) {
  return (
    // Em desktop, forçamos align-items-end para o texto encostar à linha
    <div className={cn("flex flex-col", "items-start md:items-end")}>
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

function TimelineBody({
  item,
}: {
  item: EducationItem;
  align: "left" | "right";
}) {
  return (
    <div>
      <p className="text-base leading-relaxed text-[#26150f] font-normal max-w-[45ch]">
        {item.description}
      </p>
    </div>
  );
}
