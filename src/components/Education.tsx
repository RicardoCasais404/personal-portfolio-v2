"use client";

import { educationData, type EducationItem } from "@/data/content";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Education() {
  return (
    <section
      id="education"
      className="relative w-full min-h-screen snap-start py-20 px-6 md:px-12 md:py-32 bg-[#d9d9d9]"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        {/* TÍTULO */}
        <div className="mb-32 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#26150f] font-extrabold uppercase leading-[0.9] tracking-normal"
          >
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
          </motion.h2>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative">
          {/* LINHA CENTRAL (TRACK) */}
          <div className="absolute left-5 top-0 h-full w-px bg-[#26150f]/30 md:left-1/2 md:-translate-x-1/2">
            {/*
               O PONTO (STICKY) - VERSÃO LIMPA
               1. Removi w-8 h-8 e o background deste div container.
               2. Usei left-1/2 e -translate-x-1/2 para centrar matematicamente na linha.
            */}
            <div className="sticky top-[30vh] mt-14 mb-44 left-1/2 -translate-x-1/2 z-10 flex justify-center">
              {/*
                 AQUI ESTÁ O SEGREDO:
                 O bg-[#d9d9d9] está no span.
                 px-1: Dá apenas 1 pixel de respiração de lado.
                 leading-none: Garante que a altura é apenas o tamanho do símbolo.
                 Resultado: A linha toca quase nas pontas do losango.
              */}
              <span className="text-2xl text-[#26150f] leading-none bg-[#d9d9d9] px-1">
                ❖
              </span>
            </div>
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
    </section>
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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ margin: "-100px" }}
      transition={{ duration: 0.5 }}
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
}: {
  item: EducationItem;
  align: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <p className="text-base leading-relaxed text-[#26150f] font-normal max-w-[45ch]">
        {item.description}
      </p>
    </motion.div>
  );
}
