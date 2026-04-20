import { cn } from "@/lib/utils";

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "size-8 text-[11px]",
  md: "size-10 text-xs",
  lg: "size-12 text-sm",
};

export function UserAvatar({
  name,
  src,
  size = "md",
  className,
}: {
  name: string;
  src?: string;
  size?: Size;
  className?: string;
}) {
  const initials = initialsFor(name);

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className={cn(
          "rounded-full object-cover ring-2 ring-[var(--surface)]",
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <span
      aria-label={name}
      className={cn(
        "grid place-items-center rounded-full font-bold text-white shadow-[0_8px_18px_-10px_rgba(255,107,107,0.65)]",
        "bg-[linear-gradient(135deg,#FF6B6B_0%,#FF8C77_55%,#FFB48E_100%)]",
        sizes[size],
        className
      )}>
      {initials}
    </span>
  );
}
