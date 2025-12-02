"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const activeSection = useScrollSpy();

  return (
    <aside className="fixed left-0 top-0 z-50 flex w-full flex-row items-center justify-between border-b border-[#26150f] bg-[#d9d9d9] px-6 py-4 md:h-screen md:w-[100px] md:flex-col md:border-b-0 md:border-r md:py-10">
      <Link href="#hero" aria-label="Voltar ao topo">
        <Logo className="h-10 w-auto transition-transform duration-500 hover:rotate-90 md:h-12" />
      </Link>

      <nav className="flex flex-row gap-6 md:flex-col md:gap-10">
        {navItems.map((item) => {
          const isActive = activeSection === item.href.substring(1);

          return (
            <Link
              key={item.name}
              href={item.href}
              className="group relative flex items-center justify-center"
            >
              <span
                className={cn(
                  "text-sm uppercase tracking-widest text-[#26150f] font-medium opacity-100",
                  "md:[writing-mode:vertical-rl] md:rotate-180"
                )}
              >
                {item.name}
              </span>

              <span
                className={cn(
                  "absolute bg-[#26150f] transition-all duration-300 ease-out",

                  // --- MOBILE (0.5px de altura) ---
                  "-bottom-2 left-0 h-[0.5px]",
                  isActive ? "w-full" : "w-0 group-hover:w-full",

                  // --- DESKTOP ---
                  "md:left-auto",
                  "md:bottom-0 md:top-auto",
                  "md:-right-1", // Distância de 4px

                  // --- DESKTOP (0.5px de largura) ---
                  "md:w-[0.5px] md:group-hover:w-[0.5px]",

                  isActive ? "md:h-full" : "md:h-0 md:group-hover:h-full"
                )}
              />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
