import { Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useCreditsStore } from "@/stores/creditsStore";
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, Images, Settings } from "lucide-react";
import { cn } from "@/utils/cn";
import Avatar from "@/components/ui/Avatar";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { balance, fetchBalance } = useCreditsStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = useMemo(() => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [user?.name]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBalance();
    }
  }, [isAuthenticated, fetchBalance]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border-subtle bg-bg-card shadow-lg">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            className="flex items-center justify-center rounded-lg border border-border-subtle p-2 text-text-secondary hover:bg-white/5 md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-white">
            <span className="text-2xl">🍔</span>
            FoodPhoto Studio
          </Link>
        </div>

        <nav className="hidden items-center gap-2 text-sm font-medium text-text-secondary md:flex">
          <Link className="rounded-lg px-3 py-2 hover:bg-white/5" to="/">
            Home
          </Link>
          <a className="rounded-lg px-3 py-2 hover:bg-white/5" href="#como-funciona">
            Como Funciona
          </a>
          <a className="rounded-lg px-3 py-2 hover:bg-white/5" href="#templates">
            Templates
          </a>
          <a className="rounded-lg px-3 py-2 hover:bg-white/5" href="#precos">
            Precos
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-white/5" to="/login">
                Login
              </Link>
              <Link
                className={cn(
                  "rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-button-primary transition-all hover:opacity-90"
                )}
                to="/cadastro"
              >
                Comecar Gratis
              </Link>
            </>
          ) : (
            <div className="relative flex items-center gap-3">
              <div className="hidden text-sm text-text-secondary md:block">
                Creditos: <span className="font-semibold text-white">{balance}</span>
              </div>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-lg border border-border-subtle px-2 py-1 text-sm font-medium text-text-secondary hover:bg-white/5"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <Avatar src={user?.avatarUrl} fallback={initials} size="sm" />
                <span className="hidden md:inline">{user?.name || "Conta"}</span>
                <ChevronDown size={16} />
              </button>
              {menuOpen ? (
                <div
                  className="absolute right-0 top-12 w-56 rounded-xl border border-border-subtle bg-bg-card p-2 shadow-dropdown"
                  role="menu"
                >
                  <Link className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-white/5" to="/app">
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <Link className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-white/5" to="/app/minhas-fotos">
                    <Images size={16} />
                    Minhas Fotos
                  </Link>
                  <Link className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-white/5" to="/app/configuracoes">
                    <Settings size={16} />
                    Configuracoes
                  </Link>
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-white/5"
              >
                    <LogOut size={16} />
                    Sair
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setMobileOpen(false)} />
      ) : null}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 transform border-r border-border-subtle bg-bg-card p-6 transition-transform md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <span className="text-xl">🍔</span>
            FoodPhoto Studio
          </div>
          <button
            className="rounded-lg border border-border-subtle p-2 text-text-secondary hover:bg-white/5"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="mt-8 space-y-2 text-sm font-medium text-text-secondary">
          <Link className="block rounded-lg px-3 py-2 hover:bg-white/5" to="/" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <a className="block rounded-lg px-3 py-2 hover:bg-white/5" href="#como-funciona">
            Como Funciona
          </a>
          <a className="block rounded-lg px-3 py-2 hover:bg-white/5" href="#templates">
            Templates
          </a>
          <a className="block rounded-lg px-3 py-2 hover:bg-white/5" href="#precos">
            Precos
          </a>
        </nav>
        <div className="mt-8 space-y-2">
          {!isAuthenticated ? (
            <>
              <Link
                className="block rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-white/5"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="block rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-3 py-2 text-sm font-semibold text-white shadow-button-primary hover:opacity-90"
                to="/cadastro"
              >
                Comecar Gratis
              </Link>
            </>
          ) : (
            <>
              <Link className="block rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-white/5" to="/app">
                Dashboard
              </Link>
              <Link
                className="block rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-white/5"
                to="/app/minhas-fotos"
              >
                Minhas Fotos
              </Link>
              <Link
                className="block rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-white/5"
                to="/app/configuracoes"
              >
                Configuracoes
              </Link>
              <button
                onClick={logout}
                className="w-full rounded-lg border border-border-subtle px-3 py-2 text-left text-sm font-medium text-text-secondary hover:bg-white/5"
              >
                Sair
              </button>
            </>
          )}
        </div>
      </aside>
    </header>
  );
}
