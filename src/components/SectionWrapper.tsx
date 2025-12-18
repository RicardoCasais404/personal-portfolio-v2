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

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.95, 1, 1, 0.95]
  );
  const yValue = enableY ? [100, 0, 0, -100] : [0, 0, 0, 0];
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], yValue);

  return (
    <div className="relative w-full">
      <span
        id={id}
        className="absolute -top-[90px] left-0 w-full h-1 pointer-events-none opacity-0"
      />

      <motion.section
        ref={containerRef}
        style={{ opacity, scale, y }}
        className={cn("w-full", className)}
      >
        {children}
      </motion.section>
    </div>
  );
}
