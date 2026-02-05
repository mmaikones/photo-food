import * as React from "react";
import { cn } from "@/utils/cn";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  error?: string;
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, error, placeholder, className, ...props }, ref) => {
    return (
      <label className="flex w-full flex-col gap-2 text-sm text-text-secondary">
        {label ? <span className="font-medium text-white">{label}</span> : null}
        <select
          ref={ref}
          className={cn(
            "w-full rounded-lg border bg-bg-input px-3 py-2 text-sm text-white outline-none transition-all",
            error ? "border-error-500" : "border-border-subtle",
            "focus:border-primary focus:ring-1 focus:ring-primary/50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error ? <span className="text-xs text-error-500">{error}</span> : null}
      </label>
    );
  }
);

Select.displayName = "Select";

export default Select;
