import Link from "next/link";
import { Logo } from "@/components/Logo";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex w-full flex-row items-center justify-between border-b border-[#26150f] bg-[#d9d9d9] px-6 py-4 md:h-screen md:w-[100px] md:flex-col md:border-b-0 md:border-r md:py-10">
      {/* 1. O Logótipo */}
      <Link href="#hero" aria-label="Voltar ao topo">
        <Logo className="h-10 w-auto transition-transform hover:rotate-90 md:h-12" />
      </Link>

      {/* 2. Os Links */}
      <nav className="flex flex-row gap-4 md:flex-col md:gap-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group relative text-sm font-medium uppercase text-[#26150f] transition-colors hover:opacity-70 md:[writing-mode:vertical-rl] md:rotate-180"
          >
            {item.name}
            {/* A linha animada ao passar o rato */}
            <span className="absolute bottom-0 left-0 h-px w-0 bg-[#26150f] transition-all duration-300 group-hover:w-full md:top-0 md:h-full md:w-px md:group-hover:h-full" />
          </Link>
        ))}
      </nav>
    </aside>
  );
}
