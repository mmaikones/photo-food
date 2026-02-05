import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-page p-8 text-center">
      <div className="text-6xl font-bold text-primary-300">404</div>
      <h1 className="mt-4 text-2xl font-bold text-white">Pagina nao encontrada</h1>
      <p className="mt-2 text-sm text-text-muted">A pagina que voce tentou acessar nao existe.</p>
      <Button className="mt-6">
        <Link to="/">Voltar para a home</Link>
      </Button>
    </div>
  );
}
