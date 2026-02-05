import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

interface ErrorStateProps {
  title?: string;
  message: string;
  code?: string;
  onRetry?: () => void;
  onBack?: () => void;
}

export default function ErrorState({ title = "Ops! Algo deu errado", message, code, onRetry, onBack }: ErrorStateProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-error/10">
          <AlertCircle className="h-10 w-10 text-error-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="mt-2 max-w-md text-text-muted">{message}</p>
          {code ? <p className="mt-2 text-xs text-text-subtle">Codigo: {code}</p> : null}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {onRetry ? (
            <Button onClick={onRetry} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Recarregar
            </Button>
          ) : null}
          {onBack ? (
            <Button variant="outline" onClick={onBack}>
              Voltar ao inicio
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
