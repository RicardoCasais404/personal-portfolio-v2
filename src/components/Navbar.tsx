"use client";

import Link from "next/link";
import { useState, useEffect } from "react"; // Adicionado useEffect
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
  const [isOpen, setIsOpen] = useState(false);

  // 1. BLOQUEAR SCROLL QUANDO O MENU ESTÁ ABERTO
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Bloqueia
    } else {
      document.body.style.overflow = ""; // Desbloqueia
    }
    return () => {
      document.body.style.overflow = ""; // Limpeza
    };
  }, [isOpen]);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsOpen(false);
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.5 });
    }
  };

  return (
    <>
      {/*
         --- BARRA FIXA (HEADER) ---
         z-[60]: Garante que fica ACIMA do menu fullscreen (que será z-50).
         Assim o Logo e o Botão X estão sempre visíveis e clicáveis.
      */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-60 flex w-full items-center bg-[#d9d9d9] border-b border-[#26150f]",
          // Mobile: Horizontal, Logo à Esq, Botão à Dir
          "flex-row justify-between px-6 py-4",
          // Desktop: Vertical Sidebar
          "md:h-screen md:w-[100px] md:flex-col md:border-b-0 md:border-r md:py-10 md:px-0 md:justify-between"
        )}
      >
        {/* LOGÓTIPO */}
        <Link
          href="#hero"
          aria-label="Voltar ao topo"
          onClick={(e) => handleScroll(e, "#hero")}
          className="shrink-0"
        >
          {/* Mobile: h-8 | Desktop: h-9 */}
          <Logo className="h-8 w-auto transition-transform duration-500 hover:rotate-90 md:h-9" />
        </Link>

        {/* BOTÃO HAMBÚRGUER / CRUZ (Só Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 md:hidden p-2 justify-center items-center w-10 h-10"
          aria-label="Toggle Menu"
        >
          {/* Linha Superior: Roda 45deg e desce */}
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-8 h-0.5 bg-[#26150f] origin-center"
          />
          {/* Linha do Meio: Desaparece */}
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-8 h-0.5 bg-[#26150f]"
          />
          {/* Linha Inferior: Roda -45deg e sobe */}
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-8 h-0.5 bg-[#26150f] origin-center"
          />
        </button>

        {/* NAVEGAÇÃO DESKTOP (Escondida no Mobile) */}
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

      {/*
         --- MENU FULLSCREEN MOBILE ---
         z-[50]: Fica debaixo da barra (z-60) mas em cima do site.
         h-[100dvh]: Garante altura total mesmo com barras do navegador móvel.
      */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#d9d9d9] flex flex-col px-6 md:hidden"
          >
            {/*
               Conteúdo do Menu:
               pt-32: Dá espaço para não ficar debaixo da barra fixa.
               items-end: Alinha tudo à direita.
            */}
            <nav className="flex flex-col gap-8 items-end pt-32 h-full">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="text-4xl font-extrabold uppercase tracking-tight text-[#26150f] active:text-[#26150f]/70"
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
