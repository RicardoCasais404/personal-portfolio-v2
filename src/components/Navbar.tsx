"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
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
  const lenis = useSmoothScroll();

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.5 });
    }
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex w-full items-center bg-[#d9d9d9] border-b border-[#26150f]",
        // MOBILE (Layout Horizontal):
        // px-5: Margem lateral.
        // py-4: Altura da barra.
        // gap-8: Espaço OBRIGATÓRIO de 32px entre o Logo e os Links.
        "flex-row px-5 py-4 gap-8",

        // DESKTOP (Layout Vertical):
        // Resetamos o gap, mudamos padding e bordas.
        "md:h-screen md:w-[100px] md:flex-col md:border-b-0 md:border-r md:py-10 md:px-0 md:justify-between md:gap-0"
      )}
    >
      {/* 1. LOGÓTIPO */}
      <Link
        href="#hero"
        aria-label="Voltar ao topo"
        onClick={(e) => handleScroll(e, "#hero")}
        // shrink-0: Impede o logo de ser esmagado.
        className="shrink-0"
      >
        <Logo className="h-8 w-auto transition-transform duration-500 hover:rotate-90 md:h-9" />
      </Link>

      {/* 2. LINKS DE NAVEGAÇÃO */}
      <nav
        className={cn(
          "flex items-center",

          // MOBILE (Scrollable):
          // overflow-x-auto: Permite deslizar para o lado se não couber.
          // no-scrollbar: Esconde a barra feia.
          // w-full: Ocupa o resto do espaço disponível.
          // gap-6: Espaço entre cada palavra.
          // pr-6: Margem de segurança no fim da lista (para não cortar o último item).
          "flex-row w-full overflow-x-auto no-scrollbar gap-6 pr-6",

          // DESKTOP (Vertical):
          // Desliga o scroll (overflow-visible) e muda para coluna.
          "md:w-auto md:flex-col md:gap-10 md:overflow-visible md:pr-0"
        )}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.href.substring(1);

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              // shrink-0: Garante que o texto não quebra de linha nem encolhe.
              className="group relative flex items-center justify-center shrink-0"
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

                  // Mobile
                  "-bottom-2 left-0 h-[0.5px]",
                  isActive ? "w-full" : "w-0 group-hover:w-full",

                  // Desktop
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
