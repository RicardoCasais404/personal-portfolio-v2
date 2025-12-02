import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";

// 1. CONFIGURAÇÃO DA FONTE
const myFont = localFont({
  src: "../fonts/font.ttf",
  variable: "--font-main",
  display: "swap",
  // Se a fonte for variável, não definas weight. Se for estática, define o weight.
});

export const metadata: Metadata = {
  title: "Ricardo Casais | Full Stack Developer",
  description: "Portfólio de Ricardo Casais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          // 1. Base Tailwind
          "min-h-screen bg-[#d9d9d9] text-[#26150f] antialiased",

          // 2. A Variável CSS (para uso futuro)
          myFont.variable,

          // 3. A CORREÇÃO: Aplicamos a classe da fonte diretamente!
          // Isto sobrepõe-se a qualquer 'ui-sans-serif' padrão.
          myFont.className
        )}
      >
        <Navbar />
        <div className="pt-20 md:pl-[100px] md:pt-0">{children}</div>
      </body>
    </html>
  );
}
