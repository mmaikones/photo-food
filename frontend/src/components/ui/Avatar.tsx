import { cn } from "@/utils/cn";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg"
};

export default function Avatar({ src, alt, fallback, size = "md" }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-bg-elevated font-semibold text-white",
        sizeMap[size]
      )}
    >
      {src ? <img src={src} alt={alt} className="h-full w-full object-cover" /> : fallback}
    </div>
  );
}
