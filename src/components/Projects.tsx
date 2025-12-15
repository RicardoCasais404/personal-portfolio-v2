"use client";

import { projectsData, type ProjectItem } from "@/data/content";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/SectionWrapper";

export function Projects() {
  return (
    <SectionWrapper
      id="projects"
      className="relative w-full min-h-screen py-12 px-6 md:px-12 md:py-32 bg-[#d9d9d9] flex flex-col justify-center"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <h2 className="mb-12 md:mb-32 text-center text-[clamp(2.5rem,8vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-normal text-[#26150f]">
          {projectsData.title}
        </h2>
        <div className="flex flex-col gap-20 md:gap-40">
          {projectsData.items.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "w-full md:w-1/2 aspect-video bg-[#26150f]/5 flex items-center justify-center border border-[#26150f]/10 relative overflow-hidden group cursor-pointer",
          isEven ? "md:order-1" : "md:order-2"
        )}
      >
        <span className="text-6xl text-[#26150f]/20 transition-transform duration-700 group-hover:scale-110 group-active:scale-110 group-focus:scale-110">
          ❖
        </span>
      </a>

      <div
        className={cn(
          "w-full md:w-1/2 flex flex-col",
          "items-start text-left",
          isEven
            ? "md:order-2 md:text-left"
            : "md:order-1 md:text-right md:items-end"
        )}
      >
        <h3 className="text-3xl font-bold uppercase text-[#26150f] mb-6 leading-none">
          {project.title}
        </h3>
        <p className="text-lg leading-relaxed text-[#26150f] font-normal mb-8 max-w-[40ch]">
          {project.description}
        </p>

        {/* TAGS INTERATIVAS */}
        <div
          className={cn(
            "flex flex-wrap gap-3 mb-10",
            "justify-start",
            !isEven && "md:justify-end"
          )}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              tabIndex={0}
              onClick={() => {}} // <--- O TRUQUE PARA iOS
              className="px-3 py-1 text-xs font-bold border border-[#26150f] text-[#26150f] uppercase tracking-wider transition-colors cursor-pointer outline-none hover:bg-[#26150f] hover:text-[#d9d9d9] focus:bg-[#26150f] focus:text-[#d9d9d9]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="w-full">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group relative flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#26150f] pb-3 w-full outline-none",
              "justify-start",
              !isEven && "md:justify-end"
            )}
          >
            View Project
            <span
              className={cn(
                "absolute bottom-0 h-0.5 w-full bg-[#26150f] transition-all duration-300 group-hover:w-0 group-focus:w-0 group-active:w-0",
                "left-0",
                !isEven && "md:right-0 md:left-auto"
              )}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
