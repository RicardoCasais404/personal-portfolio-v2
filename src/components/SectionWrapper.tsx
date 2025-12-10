"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function SectionWrapper({ children, id, className }: Props) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start end": Quando o TOPO da secção entra no FUNDO do ecrã (Início da animação)
    // "end start": Quando o FUNDO da secção sai pelo TOPO do ecrã (Fim da animação)
    offset: ["start end", "end start"],
  });

  // --- A FÍSICA DA ELEGÂNCIA ---
  // 0 -> 0.15: Entrada (primeiros 15% do scroll da secção)
  // 0.15 -> 0.85: Mantém-se visível (zona de leitura segura)
  // 0.85 -> 1: Saída (últimos 15% do scroll)

  // Opacidade: Transparente -> Visível -> Visível -> Transparente
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Escala: Pequeno -> Normal -> Normal -> Pequeno (Efeito 3D subtil)
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95]
  );

  // Movimento Y: Vem de baixo -> Sítio certo -> Sítio certo -> Sobe um pouco
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <motion.section
      ref={containerRef}
      id={id}
      style={{ opacity, scale, y }}
      className={cn("w-full", className)} // Permite receber as classes de cor e padding originais
    >
      {children}
    </motion.section>
  );
}
