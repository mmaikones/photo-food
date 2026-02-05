import * as React from "react";
import { cn } from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className, ...props }, ref) => {
    return (
      <label className="flex w-full flex-col gap-2 text-sm text-text-secondary">
        {label ? <span className="font-medium text-white">{label}</span> : null}
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg border bg-bg-input px-3 py-2 transition-all",
            error ? "border-error-500" : "border-border-subtle",
            "focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50"
          )}
        >
          {leftIcon}
          <input
            ref={ref}
            className={cn(
              "w-full bg-transparent text-sm text-white outline-none placeholder:text-text-muted disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />
          {rightIcon}
        </div>
        {error ? (
          <span className="text-xs text-error-500">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-text-muted">{helperText}</span>
        ) : null}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
