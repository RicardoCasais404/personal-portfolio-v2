"use client";

import { motion } from "framer-motion";
import { aboutData } from "@/data/content";

export function About() {
  return (
    <section
      id="about"
      className="relative w-full py-20 px-6 md:px-12 md:py-32 bg-[#d9d9d9]"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-12 md:flex-row md:gap-20 items-center">
          {/* ESQUERDA: TÍTULO */}
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

          {/* DIREITA: TEXTO */}
          <div className="w-full md:w-[65%]">
            <div className="space-y-8 text-[1.1rem] leading-[1.6] font-normal text-[#26150f]">
              {aboutData.paragraphs.map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* LINKS SOCIAIS (CSS Original) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-12 flex flex-wrap gap-8"
            >
              {aboutData.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  // AQUI ESTÁ A TRADUÇÃO EXATA:
                  // text-base = 1rem
                  // font-semibold = 600
                  // pb-[5px] = padding-bottom: 5px
                  // hover:opacity-70 = opacity: 0.7
                  // Removi 'uppercase' e 'tracking'
                  className="group relative pb-[5px] text-base font-semibold text-[#26150f] transition-opacity duration-300 hover:opacity-70"
                >
                  {social.name}

                  {/*
                     SUBLINHADO (Do style.css original):
                     w-full (começa visível) -> group-hover:w-0 (desaparece no hover)
                     h-[1px] (altura original)
                  */}
                  <span className="absolute bottom-0 left-0 h-px w-full bg-[#26150f] transition-all duration-300 group-hover:w-0" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
