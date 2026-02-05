import { cn } from "@/utils/cn";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-4"
};

export default function Spinner({ size = "md", color = "white" }: SpinnerProps) {
  return (
    <span
      className={cn(
        "animate-spin rounded-full border-transparent",
        sizeMap[size]
      )}
      style={{ borderTopColor: color, borderRightColor: color }}
    />
  );
}
