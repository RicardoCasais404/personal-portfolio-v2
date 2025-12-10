"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  id?: string;
  className?: string;
  enableY?: boolean; // Nova propriedade opcional
}

export function SectionWrapper({
  children,
  id,
  className,
  enableY = true,
}: Props) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // --- A FÍSICA ---
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95]
  );

  // LÓGICA CONDICIONAL:
  // Se enableY for falso, o valor é sempre 0 (sem movimento).
  // Se for verdadeiro (padrão), faz a animação normal.
  const yValue = enableY ? [100, 0, 0, -100] : [0, 0, 0, 0];
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], yValue);

  return (
    <motion.section
      ref={containerRef}
      id={id}
      style={{ opacity, scale, y }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.section>
  );
}
