"use client";

import { motion } from "framer-motion";
import { contactData } from "@/data/content";

export function Contact() {
  return (
    <section
      id="contact"
      // Padding normalizado: py-32
      className="relative w-full min-h-[60vh] snap-start py-20 px-6 md:px-12 md:py-32 bg-[#d9d9d9] flex flex-col justify-center"
    >
      <div className="w-full max-w-[1200px] mx-auto text-left">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold uppercase leading-[1.1] text-[#26150f] mb-6"
        >
          {contactData.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xl md:text-2xl font-normal text-[#26150f] max-w-[60ch] mb-12"
        >
          {contactData.text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center gap-8"
        >
          <a
            href={contactData.email.address}
            className="px-8 py-3 bg-[#26150f] text-[#d9d9d9] text-base font-bold uppercase tracking-wider border-2 border-[#26150f] transition-all duration-300 hover:bg-transparent hover:text-[#26150f]"
          >
            {contactData.email.label}
          </a>

          {contactData.socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative pb-1 text-base font-bold text-[#26150f] uppercase tracking-wide"
            >
              {social.name}
              <span className="absolute bottom-0 left-0 h-px w-full bg-[#26150f] transition-all duration-300 group-hover:w-0" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
