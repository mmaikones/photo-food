import * as React from "react";
import { cn } from "@/utils/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <label className="flex w-full flex-col gap-2 text-sm text-text-secondary">
        {label ? <span className="font-medium text-white">{label}</span> : null}
        <textarea
          ref={ref}
          className={cn(
            "w-full rounded-lg border bg-bg-input px-3 py-2 text-sm text-white outline-none transition-all placeholder:text-text-muted",
            error ? "border-error-500" : "border-border-subtle",
            "focus:border-primary focus:ring-1 focus:ring-primary/50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {error ? (
          <span className="text-xs text-error-500">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-text-muted">{helperText}</span>
        ) : null}
      </label>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
