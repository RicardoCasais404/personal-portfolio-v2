"use client";

import { motion } from "framer-motion";
import { projectsData, type ProjectItem } from "@/data/content";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section
      id="projects"
      // Adicionámos 'min-h-screen' e 'snap-start' para manter o efeito de scroll magnético
      className="relative w-full min-h-screen snap-start py-20 px-6 md:px-12 md:py-32 bg-[#d9d9d9] flex flex-col justify-center"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        {/* TÍTULO */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          // Estilo consistente com as outras secções (Clamp, ExtraBold, Leading apertado)
          className="mb-32 text-center text-[clamp(2.5rem,8vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-normal text-[#26150f]"
        >
          {projectsData.title}
        </motion.h2>

        {/* LISTA DE PROJETOS */}
        <div className="flex flex-col gap-32 md:gap-40">
          {projectsData.items.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// SUB-COMPONENTE DO PROJETO INDIVIDUAL
function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const isEven = index % 2 === 0; // Verifica se é par para alternar o layout

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex flex-col md:flex-row gap-12 md:gap-20 items-center"
    >
      {/*
         IMAGEM (PLACEHOLDER)
         No desktop: Se for par (isEven), ordem 1 (esquerda). Se for ímpar, ordem 2 (direita).
      */}
      <div
        className={cn(
          "w-full md:w-1/2 aspect-video bg-[#26150f]/5 flex items-center justify-center border border-[#26150f]/10 relative overflow-hidden group",
          isEven ? "md:order-1" : "md:order-2"
        )}
      >
        {/* Aqui depois podes por a tag <Image /> real */}
        <span className="text-6xl text-[#26150f]/20 group-hover:scale-110 transition-transform duration-700">
          ❖
        </span>
      </div>

      {/*
         TEXTO
         No desktop: Se for par, ordem 2 (direita). Se for ímpar, ordem 1 (esquerda).
      */}
      <div
        className={cn(
          "w-full md:w-1/2 flex flex-col",
          isEven
            ? "md:order-2 md:text-left"
            : "md:order-1 md:text-right items-end"
        )}
      >
        <h3 className="text-3xl font-bold uppercase text-[#26150f] mb-6 leading-none">
          {project.title}
        </h3>

        <p className="text-lg leading-relaxed text-[#26150f] font-normal mb-8 max-w-[40ch]">
          {project.description}
        </p>

        {/* TAGS (Tecnologias) */}
        <div
          className={cn(
            "flex flex-wrap gap-3 mb-10",
            isEven ? "justify-start" : "justify-end"
          )}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-bold border border-[#26150f] text-[#26150f] uppercase tracking-wider hover:bg-[#26150f] hover:text-[#d9d9d9] transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* BOTÃO VER PROJETO */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#26150f] pb-1"
        >
          View Project
          <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#26150f] transition-all duration-300 group-hover:w-0" />
        </a>
      </div>
    </motion.div>
  );
}
