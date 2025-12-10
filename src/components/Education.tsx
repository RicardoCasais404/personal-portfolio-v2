"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { educationData, type EducationItem } from "@/data/content";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/SectionWrapper";

export function Education() {
  // A ref agora vai para o contentor principal da lista para medirmos o scroll relativo a ele
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // COMEÇA: Quando o topo da lista chega ao centro do ecrã (onde os teus olhos estão)
    // ACABA: Quando o fundo da lista chega ao centro do ecrã
    offset: ["start center", "end center"],
  });

  // FÍSICA DO PONTO (Coordenadas Absolutas)
  // 55px -> Ponto de partida (alinhado com o texto "MULTIMEDIA TECHNIQUES")
  // calc(100% - 150px) -> Ponto de chegada (alinhado com a descrição final)
  const pointTop = useTransform(
    scrollYProgress,
    [0, 1],
    ["55px", "calc(100% - 150px)"]
  );

  return (
    <SectionWrapper
      id="education"
      className="relative w-full min-h-screen py-20 px-6 md:px-12 md:py-32 bg-[#d9d9d9]"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        {/* TÍTULO */}
        <div className="mb-32 text-center">
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
        <div ref={containerRef} className="relative">
          {/* LINHA CENTRAL (TRACK) */}
          <div className="absolute left-5 top-0 h-full w-px bg-[#26150f]/30 md:left-1/2 md:-translate-x-1/2">
            {/* O PONTO ANIMADO */}
            <motion.div
              style={{ top: pointTop }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center"
            >
              {/* Símbolo com fundo para tapar a linha */}
              <span className="text-2xl text-[#26150f] leading-none bg-[#d9d9d9] px-1 pt-1">
                ❖
              </span>
            </motion.div>
          </div>

          {/* LISTA DE ITENS */}
          <div className="flex flex-col gap-12 md:gap-20 pt-12 pb-12">
            {educationData.items.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    "relative md:grid md:grid-cols-[1fr_80px_1fr] md:items-start",
                    "flex flex-col pl-12 md:pl-0"
                  )}
                >
                  {/* ESQUERDA */}
                  <div className="md:text-right md:py-0">
                    <TimelineHeader item={item} align="right" />
                  </div>

                  {/* MEIO (Vazio) */}
                  <div className="hidden md:block" />

                  {/* DIREITA */}
                  <div className="md:text-left md:pt-16">
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
  align,
}: {
  item: EducationItem;
  align: "left" | "right";
}) {
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
          className="mt-4 inline-block text-sm font-bold text-[#26150f] underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity w-fit"
          style={{ alignSelf: align === "right" ? "flex-end" : "flex-start" }}
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
