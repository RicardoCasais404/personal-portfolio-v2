"use client";

import { motion } from "framer-motion";
import { educationData, type EducationItem } from "@/data/content";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/SectionWrapper";

export function Education() {
  return (
    // enableY={false} garante que a secção não se mexe verticalmente,
    // permitindo que o CSS Sticky funcione na perfeição.
    <SectionWrapper
      id="education"
      enableY={false}
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
        <div className="relative">
          {/*
             A "PISTA" (TRACK) DO PONTO
             Define os limites onde o ponto pode deslizar.
             top-[55px] -> Começa alinhado com o 1º Título.
             bottom-[150px] -> Acaba alinhado com a última descrição.
          */}
          <div className="absolute left-5 top-[55px] bottom-[150px] w-px md:left-1/2 md:-translate-x-1/2">
            {/* A Linha Visual de Fundo */}
            <div className="absolute inset-0 w-full h-full bg-[#26150f]/30"></div>

            {/* O PONTO STICKY */}
            <div className="sticky top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center">
              {/* Símbolo do Diamante */}
              <span className="text-2xl text-[#26150f] leading-none bg-[#d9d9d9] px-0.5">
                ❖
              </span>
            </div>
          </div>

          {/* LISTA DE ITENS */}
          {/* pt-12 (48px) + ajuste visual = 55px */}
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
                  {/* COLUNA 1: TÍTULO (Alinhado à Direita) */}
                  <div className="md:text-right md:py-0">
                    <TimelineHeader item={item} align="right" />
                  </div>

                  {/* COLUNA 2: ESPAÇO VAZIO (Onde passa a linha) */}
                  <div className="hidden md:block" />

                  {/* COLUNA 3: DESCRIÇÃO (Alinhada à Esquerda) */}
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

// --- SUB-COMPONENTES COM ANIMAÇÃO ---

function TimelineHeader({
  item,
  align,
}: {
  item: EducationItem;
  align: "left" | "right";
}) {
  // Se alinha à direita (está na esquerda), vem de -50px (slide-in da esquerda)
  const xOffset = align === "right" ? -50 : 50;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col"
    >
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
    </motion.div>
  );
}

function TimelineBody({
  item,
  align,
}: {
  item: EducationItem;
  align: "left" | "right";
}) {
  // Se alinha à esquerda (está na direita), vem de 50px (slide-in da direita)
  const xOffset = align === "right" ? -50 : 50;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} // Delay para efeito cascata
    >
      <p className="text-base leading-relaxed text-[#26150f] font-normal max-w-[45ch]">
        {item.description}
      </p>
    </motion.div>
  );
}
