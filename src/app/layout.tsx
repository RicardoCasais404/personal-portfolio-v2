import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
// MUDANÇA: Importamos o Provider
import { SmoothScrollProvider } from "@/components/SmoothScroll";

const myFont = localFont({
  src: "../fonts/font.ttf",
  variable: "--font-main",
  display: "swap",
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
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-[#d9d9d9] text-[#26150f] antialiased",
          myFont.variable,
          myFont.className
        )}
      >
        {/* O Provider envolve TUDO dentro do Body */}
        <SmoothScrollProvider>
          <Navbar />
          <div className="pt-20 md:pl-[100px] md:pt-0">{children}</div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
