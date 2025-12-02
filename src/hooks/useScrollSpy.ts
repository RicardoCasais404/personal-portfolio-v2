import { useEffect, useState } from "react";

export function useScrollSpy() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // 1. Seleciona todas as secções que têm um ID (hero, about, projects, etc)
    const sections = document.querySelectorAll("section[id], header[id]");

    // 2. Configura o "Observador"
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Se a secção entrar no ecrã, guarda o ID dela
            setActiveId(entry.target.id);
          }
        });
      },
      {
        // rootMargin define a "zona ativa" no meio do ecrã
        // -50% significa que só ativa quando o elemento toca no meio exato
        rootMargin: "-50% 0px -50% 0px",
      }
    );

    // 3. Começa a vigiar cada secção
    sections.forEach((section) => observer.observe(section));

    // 4. Limpeza (quando saíres da página, para de vigiar)
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return activeId;
}
