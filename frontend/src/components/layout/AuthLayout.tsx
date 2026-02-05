import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-page">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden items-center justify-center overflow-hidden bg-gradient-mesh px-16 lg:flex">
          <div className="absolute inset-0 bg-dot-pattern-subtle opacity-30" />
          <div className="relative z-10 max-w-md space-y-4 text-left">
            <h1 className="text-3xl font-bold text-white">
              Fotos profissionais para delivery em minutos.
            </h1>
            <p className="text-sm text-text-muted">
              Envie uma foto simples e receba imagens prontas para iFood, Instagram e cardapios digitais.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-md rounded-2xl border border-border-subtle bg-bg-card p-8 shadow-card">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
