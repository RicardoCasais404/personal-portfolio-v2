"use client";

import { motion, Variants } from "framer-motion";
import { skillsData } from "@/data/content";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    // CORREÇÃO: Define o estado final como 0.3 (30%)
    // O Framer Motion vai animar de 0 até 0.3 e parar lá.
    opacity: 0.3,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full min-h-screen snap-start py-20 px-6 md:px-12 md:py-32 bg-[#d9d9d9] flex flex-col justify-center items-center"
    >
      <div className="w-full max-w-[1200px] mx-auto text-center">
        {/* TÍTULO */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-[clamp(2.5rem,8vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-normal text-[#26150f]"
        >
          {skillsData.title}
        </motion.h2>

        {/* LISTA DE SKILLS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-16 md:gap-y-8"
        >
          {skillsData.list.map((skill, index) => (
            <motion.span
              key={index}
              variants={itemVariants}
              // ADICIONADO: whileHover
              // O Framer Motion gere a interação. Quando passas o rato, ele anima para 1 e escala.
              whileHover={{ opacity: 1, scale: 1.1 }}
              transition={{ duration: 0.3 }} // Suavidade do hover
              // REMOVIDO: opacity-30, hover:opacity..., hover:scale...
              // Mantivemos apenas a tipografia e o cursor.
              className="cursor-default text-[clamp(1.8rem,6.5vw,3.8rem)] font-extrabold uppercase text-[#26150f]"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
