"use client";

import { footerData } from "@/data/content";

export function Footer() {
  return (
    <footer className="w-full py-6 px-6 md:px-12 bg-[#d9d9d9] border-t border-[#26150f]/10">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold uppercase tracking-wide text-[#26150f]">
        <p className="flex items-center gap-2">
          <span>{footerData.copyright}</span>
          <span className="tracking-tight">
            <span className="font-light">{footerData.author.first}</span>
            <span className="font-extrabold">{footerData.author.last}</span>
            <span className="font-light">{footerData.author.code}</span>
          </span>
          <span>{footerData.year}</span>
        </p>

        <p className="font-medium opacity-80 text-center md:text-right">
          {footerData.tagline}
        </p>
      </div>
    </footer>
  );
}
