import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 87 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto w-auto", className)}
      aria-hidden="true"
    >
      <path
        d="M78.0537 46L43.5 82.54L8.94531 46L43.5 9.45898L78.0537 46Z"
        stroke="currentColor"
        // Reduzi de 13 para 4.
        // Como o SVG tem 92px de altura, um traço de 4 resulta numa linha visual de ~2px quando o logo é pequeno.
        strokeWidth="8"
      />
    </svg>
  );
}
