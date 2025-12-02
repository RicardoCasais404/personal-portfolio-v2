import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar"; // <--- Importação nova

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Ricardo Casais | Full Stack Developer",
  description:
    "Portfólio de Ricardo Casais, Full-Stack Developer focado em interfaces modernas e animadas.",
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
          "min-h-screen bg-[#d9d9d9] font-sans text-[#26150f] antialiased",
          inter.variable
        )}
      >
        <Navbar /> {/* <--- A Navbar entra aqui */}
        {/* Adicionamos margem à esquerda no desktop para o conteúdo não ficar debaixo da barra */}
        <div className="pt-20 md:pl-[100px] md:pt-0">{children}</div>
      </body>
    </html>
  );
}
