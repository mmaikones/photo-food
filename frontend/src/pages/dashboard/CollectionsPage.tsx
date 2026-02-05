import { FolderOpen } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CollectionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Colecoes</h1>
        <p className="text-text-muted">Organize suas geracoes em pastas personalizadas.</p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border-subtle bg-bg-card p-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary-300">
          <FolderOpen className="h-8 w-8" />
        </div>
        <h2 className="text-lg font-semibold text-white">Em breve</h2>
        <p className="mt-2 text-sm text-text-muted">Estamos preparando colecoes para voce organizar tudo em um so lugar.</p>
        <Button className="mt-6">Criar nova geracao</Button>
      </div>
    </div>
  );
}
