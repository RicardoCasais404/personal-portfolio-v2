"use client";

import { contactData } from "@/data/content";
import { SectionWrapper } from "@/components/SectionWrapper"; // <--- Importar

export function Contact() {
  return (
    <SectionWrapper
      id="contact"
      className="relative w-full min-h-[60vh] py-20 px-6 md:px-12 md:py-32 bg-[#d9d9d9] flex flex-col justify-center"
    >
      <div className="w-full max-w-[1200px] mx-auto text-left">
        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold uppercase leading-[1.1] text-[#26150f] mb-6">
          {contactData.title}
        </h2>

        <p className="text-xl md:text-2xl font-normal text-[#26150f] max-w-[60ch] mb-12">
          {contactData.text}
        </p>

        <div className="flex flex-wrap items-center gap-8">
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
        </div>
      </div>
    </SectionWrapper>
  );
}
