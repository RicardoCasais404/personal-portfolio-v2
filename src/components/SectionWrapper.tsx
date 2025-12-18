"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  id?: string;
  className?: string;
  enableY?: boolean;
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

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95]
  );

  const yValue = enableY ? [100, 0, 0, -100] : [0, 0, 0, 0];
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], yValue);

  return (
    <motion.section
      ref={containerRef}
      id={id}
      style={{ opacity, scale, y }}
      // ADICIONADO: scroll-mt-[150px]
      // Isto define uma margem de topo para o scroll nativo.
      className={cn("w-full scroll-mt-[150px]", className)}
    >
      {children}
    </motion.section>
  );
}
