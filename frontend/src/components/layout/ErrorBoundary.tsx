import { Component, type ReactNode } from "react";
import Button from "@/components/ui/Button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-bg-page p-8 text-center">
          <h1 className="text-3xl font-bold text-white">Algo deu errado</h1>
          <p className="mt-2 text-sm text-text-muted">Recarregue a pagina e tente novamente.</p>
          <Button className="mt-6" onClick={this.handleReload}>
            Voltar ao inicio
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
