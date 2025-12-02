import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 91 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto w-auto", className)}
      aria-hidden="true"
    >
      <path
        d="M83.3477 57.5L45.5 105.33L7.65137 57.5L45.5 9.66895L83.3477 57.5Z"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
