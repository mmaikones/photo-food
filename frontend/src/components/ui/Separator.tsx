import { cn } from "@/utils/cn";

interface SeparatorProps {
  className?: string;
}

export default function Separator({ className }: SeparatorProps) {
  return <div className={cn("h-px w-full bg-border-subtle", className)} />;
}
