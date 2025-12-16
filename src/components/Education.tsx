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

        {/* TIMELINE CONTAINER */}
        <div className="relative">
          {/* PISTA (TRACK) */}
          <div className="absolute left-5 top-[103px] bottom-[198px] w-px md:left-1/2 md:-translate-x-1/2">
            <div className="absolute inset-0 w-full h-full bg-[#26150f]/30"></div>
            <div className="sticky top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center">
              <span className="text-2xl text-[#26150f] leading-none bg-[#d9d9d9] px-0.5">
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
                    // MOBILE: Flex coluna, padding left para dar espaço à linha
                    "relative flex flex-col pl-12",
                    // DESKTOP: Grid 3 colunas, sem padding left extra
                    "md:grid md:grid-cols-[1fr_80px_1fr] md:items-start md:pl-0"
                  )}
                >
                  {/*
                     BLOCO 1: TÍTULO + LINK
                     Mobile: Sempre em cima.
                     Desktop: Coluna 1 (Esquerda) ou Coluna 3 (Direita) dependendo do índice.
                  */}
                  <div
                    className={cn(
                      // Mobile: Texto sempre à esquerda
                      "text-left",
                      // Desktop: Alterna alinhamento
                      "md:py-0",
                      index % 2 === 0
                        ? "md:col-start-1 md:text-right"
                        : "md:col-start-3 md:text-left"
                    )}
                  >
                    <TimelineHeader item={item} isEven={index % 2 === 0} />
                  </div>

                  {/* BLOCO 2: ESPAÇO CENTRAL (Só Desktop) */}
                  <div className="hidden md:block md:col-start-2" />

                  {/*
                     BLOCO 3: DESCRIÇÃO
                     Mobile: Aparece por baixo, com margem.
                     Desktop: Coluna oposta ao título.
                  */}
                  <div
                    className={cn(
                      // Mobile: Margem no topo para separar do link (o pedido da "margem por baixo")
                      "mt-4 text-left",
                      // Desktop: Remove margem topo, adiciona padding topo para efeito escada, alterna coluna
                      "md:mt-0 md:pt-16",
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

// --- SUB-COMPONENTES ADAPTADOS ---

// Recebe isEven para saber como alinhar o link no Desktop
function TimelineHeader({
  item,
  isEven,
}: {
  item: EducationItem;
  isEven: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        // Mobile: items-start (Esquerda). Desktop: Alterna.
        "items-start",
        isEven ? "md:items-end" : "md:items-start"
      )}
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
