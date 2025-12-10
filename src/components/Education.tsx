"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { educationData, type EducationItem } from "@/data/content";
import { cn } from "@/lib/utils";

export function Education() {
  // A ref vai para o contentor que tem a altura real do conteúdo
  const listRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    // Lógica Simples:
    // 0% = Quando o topo da lista toca no meio do ecrã.
    // 100% = Quando o fundo da lista toca no meio do ecrã.
    offset: ["start center", "end center"],
  });

  // Movimento Linear Puro: de 0% a 100% da altura da linha.
  const pointTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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

        {/* LISTA E LINHA (O Contentor Principal) */}
        {/* A ref está aqui. A animação baseia-se na altura DESTE div. */}
        <div ref={listRef} className="relative">
          {/*
             LINHA CENTRAL
             top-[8px]: Ajuste visual para alinhar o início da linha com o texto "HIGH SCHOOL".
             h-full: A linha tem a mesma altura que os itens todos juntos.
          */}
          <div className="absolute left-5 top-2 h-full w-px bg-[#26150f]/30 md:left-1/2 md:-translate-x-1/2">
            {/* O PONTO (Símbolo) */}
            <motion.div
              style={{ top: pointTop }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-[#26150f] leading-none bg-[#d9d9d9] z-10"
            >
              ❖
            </motion.div>
          </div>

          {/* ITENS */}
          <div className="flex flex-col gap-24 md:gap-32 pb-8">
            {" "}
            {/* pb-8 dá margem no fim */}
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
                  <div className="md:text-left md:pt-40">
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

// SUB-COMPONENTES SIMPLES

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
          className="mt-6 inline-block text-sm font-bold text-[#26150f] underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity w-fit"
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
