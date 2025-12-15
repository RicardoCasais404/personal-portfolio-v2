"use client";
import { motion } from "framer-motion";

export function Marquee() {
  const symbol = "❖";
  const items = Array(8).fill(symbol);
  const loopItems = [...items, ...items];

  return (
    // AQUI ESTÁ O SEGREDO:
    // 'hidden': Display none por defeito (Telemóvel).
    // 'md:block': Display block a partir de 768px (Tablet/PC).
    <div className="hidden md:block w-full overflow-hidden py-0.5 bg-[#d9d9d9]">
      <div className="relative flex w-1/3 mx-auto overflow-hidden mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="flex flex-nowrap w-max"
        >
          {loopItems.map((item, index) => (
            <span
              key={index}
              className="text-xl text-[#26150f] font-light pr-16 select-none"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
