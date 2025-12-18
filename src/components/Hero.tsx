"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";

const TRANSITION_DURATION = 1.4;
const CUSTOM_EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const slideVariants: Variants = {
  hidden: { x: "-5%", opacity: 0 },
  visible: {
    x: "0%",
    opacity: 1,
    transition: { duration: TRANSITION_DURATION, ease: CUSTOM_EASE },
  },
};

const iconRotationVariants: Variants = {
  hidden: { rotate: -180, scale: 0.5, opacity: 0 },
  visible: {
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: TRANSITION_DURATION, ease: CUSTOM_EASE },
  },
};

export function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center px-4 md:px-12"
    >
      <div className="w-full max-w-[1200px] mx-auto mask-[linear-gradient(to_bottom,black_90%,transparent_100%)] md:mask-[linear-gradient(to_bottom,black_95%,transparent_100%)]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{ y, opacity }}
          className="flex flex-col items-start pb-12 md:pb-10"
        >
          {/*
             TIPOGRAFIA:
             Mobile: text-[10vw] (Seguro para não cortar)
             Desktop: text-[clamp...] (Original)
          */}
          <h1 className="flex flex-col items-start w-full text-[10vw] md:text-[clamp(2.2rem,10vw,8rem)] font-bold leading-[0.85] md:leading-[1.1] tracking-normal text-[#26150f]">
            {/* LINHA 1: FULL-STACK */}
            <div className="w-full flex flex-col md:flex-row md:items-center">
              <motion.div variants={slideVariants}>FULL</motion.div>
              <motion.span
                variants={slideVariants}
                className="hidden md:inline"
              >
                -
              </motion.span>
              <motion.div variants={slideVariants}>STACK</motion.div>
            </div>

            {/* LINHA 2: DEVELOPMENT + ÍCONE */}
            <motion.div
              variants={slideVariants}
              className="flex items-center gap-[0.25em] w-full md:ml-[4%]"
            >
              <span>DEVELOPMENT</span>
              <motion.div
                variants={iconRotationVariants}
                className="flex items-center justify-center"
              >
                <svg
                  width="87"
                  height="92"
                  viewBox="0 0 87 92"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[0.7em] w-auto text-[#26150f] translate-y-[0.05em]"
                  aria-hidden="true"
                >
                  <path
                    d="M78.0537 46L43.5 82.54L8.94531 46L43.5 9.45898L78.0537 46Z"
                    stroke="currentColor"
                    strokeWidth="13"
                  />
                </svg>
              </motion.div>
            </motion.div>

            {/* LINHA 3: & CREATIVE */}
            {/* Mobile: Coluna (Empilhado) | Desktop: Linha (Lado a lado) */}
            <div className="w-full flex flex-col md:flex-row md:gap-[0.25em]">
              <motion.div variants={slideVariants}>&</motion.div>
              <motion.div variants={slideVariants}>CREATIVE</motion.div>
            </div>

            {/* LINHA 4: SOLUTIONS. */}
            {/* Sempre numa nova linha (bloco separado) para restaurar o design Desktop */}
            <div className="w-full">
              <motion.div variants={slideVariants} className="block">
                SOLUTIONS.
              </motion.div>
            </div>
          </h1>

          <div className="mt-6 md:mt-8">
            <motion.div
              variants={slideVariants}
              className="text-[4vw] md:text-[clamp(1rem,3vw,1.5rem)] font-bold uppercase tracking-[-0.08em]"
            >
              <span className="font-light">RICARDO</span>CASAIS
              <span className="font-light">404</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
