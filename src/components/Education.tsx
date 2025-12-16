"use client";

import { educationData, type EducationItem } from "@/data/content";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/SectionWrapper";

export function Education() {
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

        {/*
           TIMELINE CONTAINER (Relative)
           Este div cresce com o conteúdo dos items.
        */}
        <div className="relative">
          {/*
             === SISTEMA DE PISTA (TRACK SYSTEM) ===
             Posicionado de forma absoluta em relação à lista.
             Mobile: left-[20px] | Desktop: left-1/2
             inset-y-0: Ocupa a altura TOTAL da lista.
          */}
          <div className="absolute top-0 bottom-0 left-5 w-px md:left-1/2 md:-translate-x-1/2">
            {/* 1. LINHA VISUAL (FUNDO) */}
            {/* padding-y de 12px só para a linha não "furar" visualmente os limites */}
            <div className="absolute inset-y-2 w-full bg-[#26150f]/30"></div>

            {/* 2. O CONTENTOR DO SÍMBOLO (COM PADDING) */}
            {/*
               py-[55px]: É AQUI QUE DEFINES O INÍCIO E FIM.
               O símbolo só pode deslizar DENTRO deste padding.
               55px = Alinha com o 1º título (aprox).
            */}
            <div className="absolute inset-0 py-[55px] pointer-events-none">
              {/* Wrapper para o sticky ter altura para percorrer */}
              <div className="h-full w-full relative">
                {/*
                     O PONTO STICKY
                     sticky: Agarra-se ao ecrã.
                     top-1/2: Fica no centro do ecrã.
                  */}
                <div className="sticky top-1/2 -translate-y-1/2 flex justify-center items-center">
                  <span className="text-2xl text-[#26150f] leading-none bg-[#d9d9d9] px-0.5">
                    ❖
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* LISTA DE ITENS */}
          {/* pt-12 (48px) para empurrar o texto para baixo, alinhando com os 55px da linha */}
          <div className="flex flex-col gap-16 md:gap-24 pt-12 pb-12">
            {educationData.items.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    // Mobile: Flex (Esquerda)
                    "relative flex flex-col pl-12",
                    // Desktop: Grid (Esquerda/Direita)
                    "md:grid md:grid-cols-[1fr_80px_1fr] md:items-start md:pl-0"
                  )}
                >
                  {/* TÍTULO (Sempre Coluna 1) */}
                  <div className="text-left md:col-start-1 md:text-right md:py-0">
                    <TimelineHeader item={item} />
                  </div>

                  {/* VAZIO (Coluna 2) */}
                  <div className="hidden md:block md:col-start-2" />

                  {/* DESCRIÇÃO (Sempre Coluna 3) */}
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
