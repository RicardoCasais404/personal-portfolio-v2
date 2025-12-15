"use client";

import { motion } from "framer-motion";
import { aboutData } from "@/data/content";
import { SectionWrapper } from "@/components/SectionWrapper";

export function About() {
  return (
    <SectionWrapper
      id="about"
      // Mobile: pt-0 pb-12 | Desktop: md:py-32 (Original)
      className="relative min-h-screen pt-0 pb-12 px-6 md:px-12 md:py-32 bg-[#d9d9d9] flex flex-col justify-center"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-12 md:flex-row md:gap-20 items-center">
          <div className="w-full md:w-[35%]">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-start text-[#26150f] font-extrabold uppercase leading-[0.9] tracking-normal"
            >
              <span className="block text-[clamp(2.5rem,8vw,5rem)]">ABOUT</span>
              <span className="block text-[clamp(2.5rem,8vw,5rem)]">ME</span>
            </motion.h2>
          </div>

          <div className="w-full md:w-[65%]">
            <div className="space-y-8 text-[1.1rem] leading-[1.6] font-normal text-[#26150f]">
              {aboutData.paragraphs.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-8">
              {aboutData.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative pb-[5px] text-base font-semibold text-[#26150f] transition-opacity duration-300 hover:opacity-70"
                >
                  {social.name}
                  <span className="absolute bottom-0 left-0 h-px w-full bg-[#26150f] transition-all duration-300 group-hover:w-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
