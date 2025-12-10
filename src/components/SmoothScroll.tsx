"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

// 1. Contexto
const SmoothScrollContext = createContext<Lenis | null>(null);

// 2. Hook
export const useSmoothScroll = () => useContext(SmoothScrollContext);

// 3. Provider
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Inicializar o Lenis
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // CORREÇÃO DO ERRO:
    // Não fazemos setLenisInstance(lenis) diretamente.
    // Usamos requestAnimationFrame para "agendar" a atualização para o próximo frame.
    // Isto evita o "cascading render" e deixa o React feliz.
    requestAnimationFrame(() => {
      setLenisInstance(lenis);
    });

    // O Loop de Animação necessário para o Lenis funcionar
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Limpeza
    return () => {
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenisInstance}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
