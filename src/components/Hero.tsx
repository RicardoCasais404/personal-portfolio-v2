"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";

const TRANSITION_DURATION = 1.4;
const CUSTOM_EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const slideVariants: Variants = {
  hidden: { x: "-5%", opacity: 0 },
  visible: {
    x: "0%",
    opacity: 1,
    transition: {
      duration: TRANSITION_DURATION,
      ease: CUSTOM_EASE,
    },
  },
};

const iconRotationVariants: Variants = {
  hidden: { rotate: -180, scale: 0.5, opacity: 0 },
  visible: {
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: TRANSITION_DURATION,
      ease: CUSTOM_EASE,
    },
  },
};

export function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // --- SAÍDA ---
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  // AJUSTE 1: Opacidade [0, 550].
  // Mais rápido que 800, mas lento o suficiente para ser suave.
  // Isto evita que o texto esteja 100% opaco quando o About bate nele.
  const opacity = useTransform(scrollY, [0, 550], [1, 0]);

  const blurValue = useTransform(scrollY, [0, 550], [0, 4]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center px-6 pt-20 md:px-12 md:pt-0"
    >
      {/*
         AJUSTE 2: MÁSCARA DE GRADIENTE (A Solução da Harsh Line)
         Adicionei a classe [mask-image:...] no div abaixo.
         Isto faz com que os últimos 15-20% de baixo do container sejam transparentes.
         Assim, quando o About sobe, não há corte seco.
      */}
      <div className="w-full max-w-[1200px] mx-auto mask-[linear-gradient(to_bottom,black_80%,transparent_100%)]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{ y, opacity, filter }}
          className="flex flex-col items-start pb-10" // Adicionei pb-10 para dar margem à máscara
        >
          {/* TIPOGRAFIA */}
          <h1 className="flex flex-col items-start w-full text-[clamp(2.2rem,10vw,8rem)] font-extrabold leading-[1.1] tracking-normal text-[#26150f]">
            {/* LINHA 1 */}
            <div className="w-full">
              <motion.div variants={slideVariants} className="block">
                FULL-STACK
              </motion.div>
            </div>

            {/* LINHA 2 */}
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

            {/* LINHA 3 */}
            <div className="w-full">
              <motion.div variants={slideVariants} className="block">
                & CREATIVE SOLUTIONS.
              </motion.div>
            </div>
          </h1>

          {/* TAGLINE */}
          <div className="mt-6 md:mt-8">
            <motion.div
              variants={slideVariants}
              className="text-[clamp(1rem,3vw,1.5rem)] font-extrabold uppercase tracking-normal"
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
