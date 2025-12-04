"use client";
import { motion } from "framer-motion";

export function Marquee() {
  return (
    <div className="w-full overflow-hidden py-12 bg-[#d9d9d9]">
      <div className="relative flex max-w-[600px] mx-auto overflow-hidden mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        <motion.div
          animate={{ x: "-50%" }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          className="flex flex-nowrap gap-12 whitespace-nowrap"
        >
          {/* Repetimos o conteúdo para criar o loop infinito */}
          <span className="text-2xl tracking-[1rem] text-[#26150f]">
            ❖❖❖❖❖❖❖❖❖❖
          </span>
          <span className="text-2xl tracking-[1rem] text-[#26150f]">
            ❖❖❖❖❖❖❖❖❖❖
          </span>
        </motion.div>
      </div>
    </div>
  );
}
