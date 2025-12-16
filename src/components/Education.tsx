"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
import { educationData, type EducationItem } from "@/data/content";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/SectionWrapper";

export function Education() {
  const listRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  // Usamos o scroll global da janela, que é 100% fiável
  const { scrollY } = useScroll();

  // CÁLCULO MANUAL DAS COORDENADAS (Corre apenas uma vez ao montar)
  useLayoutEffect(() => {
    const element = listRef.current;
    if (!element) return;

    // Função para recalcular posições (importante se o ecrã mudar de tamanho)
    const onResize = () => {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // A posição absoluta do elemento na página
      const elementTop = rect.top + scrollTop;
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // DEFINIR OS GATILHOS:
      // Início: Quando o topo da lista chega ao meio do ecrã
      const startPoint = elementTop - viewportHeight / 2;
      // Fim: Quando o fundo da lista chega ao meio do ecrã
      const endPoint = elementTop + elementHeight - viewportHeight / 2;

      setStart(startPoint);
      setEnd(endPoint);
    };

    // Calcular logo no início e sempre que a janela muda
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // FÍSICA E MAPEAMENTO
  // Mapeamos o Scroll Global (scrollY) entre os nossos pontos calculados (start -> end).
  // Saída: 0px -> 100% (menos o padding do fim).
  const rawPointTop = useTransform(
    scrollY,
    [start, end],
    ["55px", "calc(100% - 150px)"]
  );

  // Suavização para eliminar "soluços"
  const pointTop = useSpring(rawPointTop, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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
        <div className="relative">
          {/* TRACK (LINHA) */}
          <div className="absolute left-5 top-[55px] bottom-[150px] w-px md:left-1/2 md:-translate-x-1/2">
            <div className="absolute inset-0 w-full h-full bg-[#26150f]/30"></div>

            {/* O PONTO ANIMADO */}
            <motion.div
              style={{ top: pointTop }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center will-change-transform"
            >
              <span className="text-2xl text-[#26150f] leading-none bg-[#d9d9d9] px-0.5">
                ❖
              </span>
            </motion.div>
          </div>

          {/* LISTA DE ITENS (A REF ESTÁ AQUI) */}
          {/* É este elemento que medimos com o getBoundingClientRect */}
          <div
            ref={listRef}
            className="flex flex-col gap-16 md:gap-24 pt-12 pb-12"
          >
            {educationData.items.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    "relative flex flex-col pl-12", // Mobile
                    "md:grid md:grid-cols-[1fr_80px_1fr] md:items-start md:pl-0" // Desktop
                  )}
                >
                  <div className="text-left md:col-start-1 md:text-right md:py-0">
                    <TimelineHeader item={item} align="right" />
                  </div>
                  <div className="hidden md:block md:col-start-2" />
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
  align,
}: {
  item: EducationItem;
  align: "left" | "right";
}) {
  const xStart = align === "right" ? -30 : 30;
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
  align,
}: {
  item: EducationItem;
  align: "left" | "right";
}) {
  const xStart = align === "right" ? -30 : 30;
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
