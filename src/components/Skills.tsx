"use client";

import { motion, Variants } from "framer-motion";
import { skillsData } from "@/data/content";
import { SectionWrapper } from "@/components/SectionWrapper";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 0.3,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Skills() {
  return (
    <SectionWrapper
      id="skills"
      // py-12 / md:py-32
      className="relative w-full min-h-screen py-12 px-6 md:px-12 md:py-32 bg-[#d9d9d9] flex flex-col justify-center items-center"
    >
      <div className="w-full max-w-[1200px] mx-auto text-center">
        {/* TÍTULO: mb-12 / md:mb-20 */}
        <h2 className="mb-12 md:mb-20 text-[clamp(2.5rem,8vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-normal text-[#26150f]">
          {skillsData.title}
        </h2>

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
              whileHover={{ opacity: 1, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="cursor-default text-[clamp(1.8rem,6.5vw,3.8rem)] font-extrabold uppercase text-[#26150f]"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
