import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import Spinner from "@/components/ui/Spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-button-primary hover:opacity-90",
        secondary:
          "border border-border-subtle bg-bg-elevated text-text-primary hover:bg-bg-card-hover",
        accent:
          "bg-accent-600 text-white shadow-button-accent hover:bg-accent-500 hover:shadow-button-accent-hover",
        ghost: "text-text-secondary hover:bg-white/5 hover:text-white",
        danger: "bg-error-500 text-white hover:bg-error-600",
        outline: "border border-border-default text-text-primary hover:bg-white/5"
      },
      size: {
        sm: "px-3 py-2 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        icon: "h-10 w-10 p-0"
      },
      fullWidth: {
        true: "w-full"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, leftIcon, rightIcon, loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? <Spinner size="sm" color="current" /> : leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
