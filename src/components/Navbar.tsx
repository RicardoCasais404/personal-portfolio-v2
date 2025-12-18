"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { motion, AnimatePresence } from "framer-motion";

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

  // ESTADO: Controla se o menu mobile está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    // Ao clicar num link, fechamos o menu mobile primeiro
    setIsOpen(false);
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.5 });
    }
  };

  return (
    <>
      {/* --- BARRA FIXA (Header) --- */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex w-full items-center bg-[#d9d9d9] border-b border-[#26150f]",
          // MOBILE: Barra horizontal simples (Logo esq + Botão dir)
          "flex-row justify-between px-6 py-4",
          // DESKTOP: Barra lateral vertical (Como estava antes)
          "md:h-screen md:w-[100px] md:flex-col md:border-b-0 md:border-r md:py-10 md:px-0 md:justify-between"
        )}
      >
        {/* 1. LOGÓTIPO (Visível sempre) */}
        <Link
          href="#hero"
          aria-label="Voltar ao topo"
          onClick={(e) => handleScroll(e, "#hero")}
          className="shrink-0 z-60" // z-60 para ficar acima do menu aberto
        >
          <Logo className="h-8 w-auto transition-transform duration-500 hover:rotate-90 md:h-9" />
        </Link>

        {/* 2. BOTÃO HAMBÚRGUER (Só Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 z-60 md:hidden p-2"
          aria-label="Toggle Menu"
        >
          {/* Linhas do hambúrguer que rodam para fazer um X */}
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-8 h-0.5 bg-[#26150f] origin-center"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-8 h-0.5 bg-[#26150f]"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-8 h-0.5 bg-[#26150f] origin-center"
          />
        </button>

        {/* 3. NAVEGAÇÃO DESKTOP (Escondida no Mobile) */}
        <nav className="hidden md:flex md:flex-col md:gap-10 md:items-center">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <Link
                key={item.name}
                href={item.href}
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
                    "md:left-auto md:bottom-0 md:top-auto md:-right-1 md:w-[0.5px] md:group-hover:w-[0.5px]",
                    isActive ? "md:h-full" : "md:h-0 md:group-hover:h-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* --- MENU FULLSCREEN MOBILE (Overlay) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }} // Entra de cima
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }} // Sai para cima
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            // Fixed inset-0: Cobre o ecrã todo. z-50: Fica por baixo do Logo/Botão (que são z-60)
            className="fixed inset-0 z-50 bg-[#d9d9d9] flex flex-col justify-center px-6 md:hidden"
          >
            <nav className="flex flex-col gap-8 items-end">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }} // Cascata
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="text-4xl font-extrabold uppercase tracking-tight text-[#26150f]"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
