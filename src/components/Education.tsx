"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
// MUDANÇA 1: Importamos o tipo 'EducationItem' aqui
import { educationData, type EducationItem } from "@/data/content";
import { cn } from "@/lib/utils";

export function Education() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pointY = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      id="education"
      className="relative w-full py-20 px-6 md:px-12 md:py-32 bg-[#d9d9d9]"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        {/* TÍTULO */}
        <div className="mb-24 text-center">
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
        <div ref={containerRef} className="relative">
          {/* LINHA CENTRAL */}
          <div className="absolute left-5 top-0 h-full w-px bg-[#26150f]/30 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              style={{ top: pointY }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-[#26150f]"
            >
              ❖
            </motion.div>
          </div>

          {/* ITENS */}
          <div className="flex flex-col gap-12 md:gap-0">
            {educationData.items.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={cn(
                    "relative md:grid md:grid-cols-[1fr_80px_1fr] md:items-start",
                    "flex flex-col pl-12 md:pl-0"
                  )}
                >
                  <div
                    className={cn(
                      "mb-2 md:mb-0 md:py-6",
                      isEven
                        ? "md:col-start-1 md:text-right"
                        : "md:col-start-3 md:text-left"
                    )}
                  >
                    {isEven ? (
                      <TimelineHeader item={item} align="right" />
                    ) : (
                      <TimelineBody item={item} align="left" />
                    )}
                  </div>

                  <div className="hidden md:block md:col-start-2" />

                  <div
                    className={cn(
                      "md:py-6",
                      isEven
                        ? "md:col-start-3 md:text-left"
                        : "md:col-start-1 md:text-right"
                    )}
                  >
                    {isEven ? (
                      <TimelineBody item={item} align="left" />
                    ) : (
                      <TimelineHeader item={item} align="right" />
                    )}
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

// --- SUB-COMPONENTES TIPADOS ---

// MUDANÇA 2: 'item: any' passou a ser 'item: EducationItem'
function TimelineHeader({
  item,
  align,
}: {
  item: EducationItem;
  align: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className="flex flex-col"
    >
      <h3 className="text-2xl font-bold uppercase text-[#26150f]">
        {item.title}
      </h3>
      <span className="mt-1 text-base font-medium text-[#26150f]">
        {item.institution}
      </span>

      {item.link && (
        <a
          href={item.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm font-bold text-[#26150f] underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity w-fit"
          style={{ alignSelf: align === "right" ? "flex-end" : "flex-start" }}
        >
          {item.link.text}
        </a>
      )}
    </motion.div>
  );
}

// MUDANÇA 3: Mesma coisa aqui, 'item: EducationItem'
function TimelineBody({
  item,
  align,
}: {
  item: EducationItem;
  align: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <p className="text-base leading-relaxed text-[#26150f] font-normal">
        {item.description}
      </p>
    </motion.div>
  );
}
