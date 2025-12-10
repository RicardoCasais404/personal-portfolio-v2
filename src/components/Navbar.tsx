"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
// 1. Importamos o nosso Hook
import { useSmoothScroll } from "@/components/SmoothScroll";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const activeSection = useScrollSpy();
  // 2. Acedemos ao motor de scroll
  const lenis = useSmoothScroll();

  // 3. Função para lidar com o clique
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault(); // Impede o salto feio

    // Se o Lenis estiver carregado, usamos ele para navegar
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.5 }); // duration controla a velocidade da viagem
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex w-full flex-row items-center justify-between border-b border-[#26150f] bg-[#d9d9d9] px-6 py-4 md:h-screen md:w-[100px] md:flex-col md:border-b-0 md:border-r md:py-10">
      <Link
        href="#hero"
        aria-label="Voltar ao topo"
        // Também aplicamos ao Logo para voltar ao topo suavemente
        onClick={(e) => handleScroll(e, "#hero")}
      >
        <Logo className="h-8 w-auto transition-transform duration-500 hover:rotate-90 md:h-9" />
      </Link>

      <nav className="flex flex-row gap-6 md:flex-col md:gap-10">
        {navItems.map((item) => {
          const isActive = activeSection === item.href.substring(1);

          return (
            <Link
              key={item.name}
              href={item.href}
              // AQUI: Adicionamos o evento onClick
              onClick={(e) => handleScroll(e, item.href)}
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
                  "-bottom-2 left-0 h-[0.5px]",
                  isActive ? "w-full" : "w-0 group-hover:w-full",
                  "md:left-auto",
                  "md:bottom-0 md:top-auto",
                  "md:-right-1",
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
