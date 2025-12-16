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
          {/*
             CAMADA 1: A LINHA VISUAL (FUNDO)
             - Mobile: left-[20px]
             - Desktop: left-1/2
             - top-[55px]: Começa alinhada com o 1º Título.
             - bottom-0: Vai até ao fundo da lista (resolve o problema da linha curta).
          */}
          <div className="absolute left-5 top-[55px] bottom-0 w-px md:left-1/2 md:-translate-x-1/2 bg-[#26150f]/30"></div>

          {/*
             CAMADA 2: A PISTA DO SÍMBOLO (INVISIBLE TRACK)
             - top-[55px]: Começa no mesmo sítio.
             - bottom-[50px]: Acaba um pouco antes do fundo para o ponto não cair da linha visual.
             - pointer-events-none: Para não bloquear cliques.
          */}
          <div className="absolute left-5 top-[55px] bottom-[50px] w-px md:left-1/2 md:-translate-x-1/2 z-10 pointer-events-none">
            {/* O PONTO STICKY */}
            <div className="sticky top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center">
              <span className="text-2xl text-[#26150f] leading-none bg-[#d9d9d9] px-0.5">
                ❖
              </span>
            </div>
          </div>

          {/* LISTA DE ITENS */}
          {/* pt-12 (48px) + ajuste visual das fontes ≈ 55px (Início da linha) */}
          <div className="flex flex-col gap-16 md:gap-20 pt-12 pb-12">
            {educationData.items.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    // MOBILE: Flex Coluna, padding left para afastar da linha
                    "relative flex flex-col pl-12",
                    // DESKTOP: Grid 3 colunas, remove padding left, items-start
                    "md:grid md:grid-cols-[1fr_80px_1fr] md:items-start md:pl-0"
                  )}
                >
                  {/*
                     COLUNA 1: CABEÇALHO (Título + Link)
                     - Mobile: text-left
                     - Desktop: text-right
                  */}
                  <div className="text-left md:text-right md:py-0">
                    <TimelineHeader item={item} />
                  </div>

                  {/* COLUNA 2: ESPAÇO CENTRAL (Vazio) */}
                  <div className="hidden md:block" />

                  {/*
                     COLUNA 3: DESCRIÇÃO
                     - Mobile: mt-4 (Margem pequena entre link e descrição)
                     - Desktop: pt-16 (Padding para criar efeito escada), text-left
                  */}
                  <div className="mt-4 text-left md:mt-0 md:pt-16">
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

// SUB-COMPONENTES (Simplificados para garantir alinhamento)

function TimelineHeader({ item }: { item: EducationItem }) {
  return (
    <div className="flex flex-col md:items-end">
      {/* md:items-end força o alinhamento à direita no Desktop */}

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
