import { cn } from "@/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "floating" | "glass";
  hoverable?: boolean;
}

const variantClasses: Record<NonNullable<CardProps["variant"]>, string> = {
  default: "bg-bg-card border border-border-subtle shadow-card",
  elevated: "bg-bg-elevated border border-border-subtle shadow-lg",
  floating: "bg-bg-card border border-border-subtle shadow-floating",
  glass: "glass-card shadow-card"
};

export default function Card({
  variant = "default",
  hoverable = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all",
        variantClasses[variant],
        hoverable && "hover:-translate-y-1 hover:shadow-card-hover",
        className
      )}
      {...props}
    />
  );
}
