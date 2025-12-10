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
  const opacity = useTransform(scrollY, [0, 550], [1, 0]);

  // REMOVI O BLUR (Defini como 0 fixo, ou podes remover a linha)
  // const filter = useTransform(blurValue, (v) => `blur(${v}px)`);
  // Para simplificar, removemos a prop style 'filter' do componente abaixo.

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen w-full snap-start items-center px-6 pt-20 md:px-12 md:pt-0"
    >
      {/*
         MÁSCARA CORRIGIDA:
         Mudei de black_80% para black_95%.
         Agora a transparência só afeta os últimos 5% do contentor,
         deixando a Tagline (que está nos 90%) totalmente visível.
      */}
      <div className="w-full max-w-[1200px] mx-auto mask-[linear-gradient(to_bottom,black_95%,transparent_100%)]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          // Removi o 'filter' daqui. Apenas Y e Opacity.
          style={{ y, opacity }}
          className="flex flex-col items-start pb-10"
        >
          {/* TIPOGRAFIA */}
          <h1 className="flex flex-col items-start w-full text-[clamp(2.2rem,10vw,8rem)] font-bold leading-[1.1] tracking-normal text-[#26150f]">
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

          {/* TAGLINE (Agora deve estar 100% visível) */}
          <div className="mt-6 md:mt-8">
            <motion.div
              variants={slideVariants}
              className="text-[clamp(1rem,3vw,1.5rem)] font-bold uppercase tracking-[-0.08em]"
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
