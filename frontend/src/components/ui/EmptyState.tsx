import { type LucideIcon, Sparkles, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ icon: Icon, title, description, action, secondaryAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border-subtle bg-bg-card px-6 py-16 text-center">
      <div className="relative mb-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20">
          <Icon className="h-12 w-12 text-primary-300" />
        </div>
        <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
          <Sparkles className="h-3 w-3 text-accent-300" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-text-muted">{description}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {action ? (
          <Button onClick={action.onClick} className="gap-2">
            <Plus className="h-4 w-4" />
            {action.label}
          </Button>
        ) : null}
        {secondaryAction ? (
          <Button variant="outline" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
