import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        primary: "bg-primary/20 text-primary-300 border border-primary/30",
        accent: "bg-accent/20 text-accent-300 border border-accent/30",
        success: "bg-success/15 text-success border border-success/30",
        warning: "bg-warning/15 text-warning border border-warning/30",
        error: "bg-error/15 text-error border border-error/30",
        neutral: "bg-white/5 text-text-secondary border border-white/10",
        dark: "bg-black/40 text-white border border-white/10",
        subtle: "bg-bg-elevated text-text-muted border border-border-subtle",
        secondary: "bg-bg-card text-text-secondary border border-border-subtle"
      },
      size: {
        sm: "text-[11px]",
        md: "text-xs"
      }
    },
    defaultVariants: {
      variant: "neutral",
      size: "md"
    }
  }
);

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export default function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
