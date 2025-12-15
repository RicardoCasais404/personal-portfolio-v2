"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/components/SmoothScroll";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
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
        "flex-row px-5 py-4 gap-10",
        "md:h-screen md:w-[100px] md:flex-col md:border-b-0 md:border-r md:py-10 md:px-0 md:justify-between md:gap-0"
      )}
    >
      <Link
        href="#hero"
        aria-label="Voltar ao topo"
        onClick={(e) => handleScroll(e, "#hero")}
        className="shrink-0 z-20"
      >
        <Logo className="h-8 w-auto transition-transform duration-500 hover:rotate-90 md:h-9" />
      </Link>

      <div className="flex-1 relative overflow-hidden md:overflow-visible md:w-full md:flex-1 md:flex md:flex-col md:items-center md:justify-center">
        <nav
          className={cn(
            "flex items-center",
            "flex-row w-full overflow-x-auto no-scrollbar gap-6 pr-32 mask-[linear-gradient(to_right,black_85%,transparent_100%)]",
            "md:w-auto md:flex-col md:gap-10 md:overflow-visible md:pr-0 md:mask-none"
          )}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
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
                    "-bottom-2 left-0 h-[0.5px]",
                    // MUDANÇA: Adicionei group-active:w-full
                    // Quando tocas (active), a linha enche, tal como no hover.
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full group-active:w-full",

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

        <div className="absolute top-0 right-0 h-full flex items-center justify-end w-28 bg-linear-to-l from-[#d9d9d9] via-[#d9d9d9] to-transparent pointer-events-none md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-[#26150f] animate-pulse mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </aside>
  );
}
