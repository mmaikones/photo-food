import { NavLink, Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  Camera,
  Image,
  Coins,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Sparkles,
  FolderOpen,
  Wand2,
  Grid3x3,
  HelpCircle,
  ChevronDown,
  LogOut
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useAuthStore } from "@/stores/authStore";
import { useCreditsStore } from "@/stores/creditsStore";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: "accent" | "neutral";
  showBalance?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "PRINCIPAL",
    items: [
      { to: "/app", label: "Dashboard", icon: Home },
      { to: "/app/minhas-fotos", label: "Minhas Fotos", icon: Image, badge: "38" },
      { to: "/app/colecoes", label: "Colecoes", icon: FolderOpen }
    ]
  },
  {
    title: "CRIAR",
    items: [
      { to: "/app/nova-foto", label: "Nova Foto", icon: Camera },
      { to: "/app/editor", label: "Editor AI", icon: Wand2, badge: "Novo", badgeColor: "accent" },
      { to: "/app/templates", label: "Templates", icon: Grid3x3 }
    ]
  },
  {
    title: "CONTA",
    items: [
      { to: "/app/creditos", label: "Creditos", icon: Coins, showBalance: true },
      { to: "/app/configuracoes", label: "Configuracoes", icon: Settings }
    ]
  }
];

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { balance, fetchBalance } = useCreditsStore();
  const location = useLocation();
  const navigate = useNavigate();
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
    fetchBalance();
  }, [fetchBalance]);

  return (
    <div className="min-h-screen bg-bg-page text-white">
      <aside className="fixed left-0 top-0 hidden h-full w-72 flex-col border-r border-border-subtle bg-bg-card px-4 py-6 lg:flex">
        <div className="flex items-center gap-2 px-3 text-lg font-semibold">
          <span className="text-2xl">🍔</span>
          <span className="font-display">FoodPhoto</span>
          <span className="font-display text-primary-400">Studio</span>
        </div>

        <div className="px-3 pt-6">
          <Button
            className="w-full gap-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:opacity-90 shadow-button-primary"
            onClick={() => navigate("/app/nova-foto")}
          >
            <Sparkles className="h-4 w-4" />
            Nova Geracao
          </Button>
        </div>

        <nav className="mt-6 space-y-6 px-2">
          {navGroups.map((group) => (
            <div key={group.title}>
              <div className="px-3 text-[11px] font-semibold uppercase tracking-wide text-text-subtle">
                {group.title}
              </div>
              <div className="mt-2 space-y-1">
                {group.items.map((item) => {
                  const active = location.pathname === item.to;
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-secondary transition",
                        active ? "bg-primary/10 text-primary-300" : "hover:bg-white/5"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-primary transition-opacity",
                          active ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                        )}
                      />
                      <Icon className={cn("h-5 w-5", active ? "text-primary-300" : "text-text-muted")} />
                      <span className="flex-1">{item.label}</span>
                      {item.showBalance ? (
                        <span className="text-sm font-semibold text-primary-300">{balance}</span>
                      ) : null}
                      {item.badge ? (
                        <Badge variant={item.badgeColor === "accent" ? "accent" : "neutral"} size="sm">
                          {item.badge}
                        </Badge>
                      ) : null}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-auto px-3 pb-4">
          <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/20 to-accent/20 p-4">
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <span>Creditos</span>
              <Coins className="h-4 w-4 text-primary-400" />
            </div>
            <div className="mt-2 text-2xl font-bold text-white">{balance}</div>
            <div className="text-xs text-text-muted">≈ {balance} fotos restantes</div>
            <Button variant="secondary" size="sm" className="mt-3 w-full" onClick={() => navigate("/app/creditos")}>
              Comprar mais
            </Button>
          </div>
        </div>

        <div className="border-t border-border-subtle px-3 pt-4">
          <button
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-text-secondary hover:bg-white/5"
          >
            <Avatar src={user?.avatarUrl} fallback={initials} size="sm" />
            <div className="flex-1">
              <div className="text-sm font-medium text-white">{user?.name || "Conta"}</div>
              <div className="text-xs text-text-muted">{user?.email || "usuario@email.com"}</div>
            </div>
            <ChevronDown className="h-4 w-4" />
          </button>
          {userMenuOpen ? (
            <div className="mt-2 rounded-lg border border-border-subtle bg-bg-elevated p-2 text-sm text-text-secondary">
              <Link className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-white/5" to="/app/configuracoes">
                <Settings className="h-4 w-4" />
                Configuracoes
              </Link>
              <button
                onClick={() => {
                  void logout().then(() => navigate("/login"));
                }}
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-white/5"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </div>
          ) : null}
        </div>
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 bg-black/70 lg:hidden" onClick={() => setMobileOpen(false)} />
      ) : null}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 transform border-r border-border-subtle bg-bg-card px-4 py-6 transition-transform lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-white">FoodPhoto Studio</div>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg border border-border-subtle p-2 text-text-secondary hover:bg-white/5"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title}>
              <div className="px-2 text-[11px] font-semibold uppercase tracking-wide text-text-subtle">
                {group.title}
              </div>
              <div className="mt-2 space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-secondary",
                          isActive ? "bg-primary/10 text-primary-300" : "hover:bg-white/5"
                        )
                      }
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-border-subtle pt-4">
          <div className="flex items-center gap-3 px-2">
            <Avatar src={user?.avatarUrl} fallback={initials} size="sm" />
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-white">{user?.name || "Conta"}</div>
              <div className="text-xs text-text-muted">{user?.email || "usuario@email.com"}</div>
            </div>
          </div>
          <button
            onClick={() => {
              void logout().then(() => navigate("/login"));
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-border-subtle px-3 py-2 text-sm text-text-secondary hover:bg-white/5"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      <div className="lg:ml-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border-subtle bg-bg-card/80 px-6 backdrop-blur">
          <div className="flex items-center gap-3">
            <button
              className="flex items-center justify-center rounded-lg border border-border-subtle p-2 text-text-secondary hover:bg-white/5 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-white">Dashboard</h1>
              <Badge variant="subtle">Beta</Badge>
            </div>
          </div>
          <div className="hidden max-w-md flex-1 px-6 md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input
                className="w-full rounded-lg border border-border-default bg-bg-input py-2 pl-9 pr-10 text-sm text-white placeholder:text-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
                placeholder="Buscar fotos, templates..."
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border-default bg-bg-elevated px-2 py-0.5 text-xs text-text-muted">
                ⌘K
              </kbd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <Coins className="h-4 w-4 text-primary-300" />
              <span className="font-semibold text-white">{balance}</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error-500" />
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <div className="relative hidden md:block">
              <button
                onClick={() => setHeaderMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-elevated px-2 py-1 text-left hover:bg-white/5"
              >
                <Avatar src={user?.avatarUrl} fallback={initials} size="sm" />
                <div className="text-left">
                  <div className="text-sm font-medium text-white">{user?.name || "Conta"}</div>
                  <div className="text-xs text-text-muted">Plano Pro</div>
                </div>
                <ChevronDown className="h-4 w-4 text-text-muted" />
              </button>
              {headerMenuOpen ? (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border-subtle bg-bg-elevated p-2 text-sm text-text-secondary shadow-lg">
                  <Link className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-white/5" to="/app">
                    <Home className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-white/5" to="/app/minhas-fotos">
                    <Image className="h-4 w-4" />
                    Minhas fotos
                  </Link>
                  <Link className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-white/5" to="/app/configuracoes">
                    <Settings className="h-4 w-4" />
                    Configuracoes
                  </Link>
                  <button
                    onClick={() => {
                      void logout().then(() => navigate("/login"));
                    }}
                    className="mt-1 flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-error-500 hover:bg-white/5"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>
        <main className="min-h-screen px-6 pb-16 pt-10 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
