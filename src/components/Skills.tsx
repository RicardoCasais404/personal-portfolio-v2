"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { skillsData } from "@/data/content";
import { SectionWrapper } from "@/components/SectionWrapper";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 1 },
  // Estado Normal (Visível mas apagado)
  visible: {
    opacity: 0.3,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  // Estado Ativo (Focado/Hover)
  active: {
    opacity: 1,
    scale: 1.1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export function Skills() {
  // Estado para saber qual skill está ativa (Hover ou Click)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <SectionWrapper
      id="skills"
      className="relative w-full min-h-screen py-12 px-6 md:px-12 md:py-32 bg-[#d9d9d9] flex flex-col justify-center items-center"
    >
      <div className="w-full max-w-[1200px] mx-auto text-center">
        <h2 className="mb-12 md:mb-20 text-[clamp(2.5rem,8vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-normal text-[#26150f]">
          {skillsData.title}
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-16 md:gap-y-8"
        >
          {skillsData.list.map((skill, index) => {
            // Verifica se este item é o ativo
            const isActive = activeIndex === index;

            return (
              <motion.span
                key={index}
                variants={itemVariants}
                // A MÁGICA:
                // Se estiver ativo, forçamos a variante "active".
                // Se não, deixamos a variante "visible" (padrão do pai).
                animate={isActive ? "active" : "visible"}
                // EVENTOS (Desktop + Mobile):
                onMouseEnter={() => setActiveIndex(index)} // Rato entra -> Ativa
                onMouseLeave={() => setActiveIndex(null)} // Rato sai -> Desativa
                onClick={() => {
                  // No mobile, clicar alterna o estado.
                  // Se já estiver ativo, desativa (null). Se não, ativa (index).
                  setActiveIndex(isActive ? null : index);
                }}
                className="cursor-pointer text-[clamp(1.8rem,6.5vw,3.8rem)] font-extrabold uppercase text-[#26150f] outline-none select-none"
              >
                {skill}
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
