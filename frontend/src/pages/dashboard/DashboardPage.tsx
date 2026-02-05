import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Coins,
  Image as ImageIcon,
  TrendingUp,
  Heart,
  Camera,
  Grid3x3,
  FolderOpen,
  Settings,
  ArrowRight,
  Lightbulb,
  X
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useCreditsStore } from "@/stores/creditsStore";
import { useAuthStore } from "@/stores/authStore";
import { listGenerations } from "@/services/generationsService";

interface GenerationItem {
  id: string;
  business_type: string;
  template_name?: string;
  created_at: string;
  generated_images: { image_url: string }[];
}

function QuickActionCard({
  icon: Icon,
  title,
  description,
  onClick,
  color
}: {
  icon: typeof Camera;
  title: string;
  description: string;
  onClick: () => void;
  color: "primary" | "violet" | "emerald" | "amber";
}) {
  const colorMap = {
    primary: "bg-primary/15 text-primary-300",
    violet: "bg-accent/15 text-accent-300",
    emerald: "bg-emerald-500/15 text-emerald-400",
    amber: "bg-amber-500/15 text-amber-400"
  };
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-border-subtle bg-bg-card p-5 text-left transition hover:-translate-y-1 hover:border-primary/30"
    >
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colorMap[color]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-1 text-xs text-text-muted">{description}</p>
    </button>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { balance, fetchBalance, loading } = useCreditsStore();
  const { user } = useAuthStore();
  const [recentGenerations, setRecentGenerations] = useState<GenerationItem[]>([]);
  const [loadingGenerations, setLoadingGenerations] = useState(false);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  useEffect(() => {
    setLoadingGenerations(true);
    listGenerations()
      .then((response) => setRecentGenerations((response.data.generations || []).slice(0, 6)))
      .finally(() => setLoadingGenerations(false));
  }, []);

  const favoriteTemplates = useMemo(() => {
    return recentGenerations
      .map((item) => ({
        id: item.id,
        thumbnail: item.generated_images?.[0]?.image_url || "",
        name: item.template_name || "Template"
      }))
      .slice(0, 4);
  }, [recentGenerations]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Ola, {user?.name || ""}! 👋</h1>
          <p className="text-text-muted">Vamos criar fotos incriveis hoje?</p>
        </div>
        <Button
          size="lg"
          className="gap-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:opacity-90 shadow-button-primary"
          onClick={() => navigate("/app/nova-foto")}
        >
          <Sparkles className="h-5 w-5" />
          Nova Geracao
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/20 to-accent/20 p-6">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <span>Saldo de creditos</span>
              <div className="rounded-lg bg-primary/20 p-2">
                <Coins className="h-5 w-5 text-primary-300" />
              </div>
            </div>
            {loading ? <Skeleton className="mt-4 h-10 w-20" /> : <div className="mt-4 text-4xl font-bold text-white">{balance}</div>}
            <p className="mt-1 text-sm text-text-muted">≈ {balance} fotos disponiveis</p>
            <Button variant="secondary" size="sm" className="mt-4 w-full" onClick={() => navigate("/app/creditos")}
            >
              Comprar mais creditos
            </Button>
          </div>
        </div>

        <Card>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Fotos este mes</span>
            <div className="rounded-lg bg-emerald-500/10 p-2">
              <ImageIcon className="h-5 w-5 text-emerald-500" />
            </div>
          </div>
          <div className="mt-4 flex items-end gap-2">
            <span className="text-4xl font-bold text-white">38</span>
            <span className="mb-1 flex items-center text-sm font-medium text-emerald-400">
              <TrendingUp className="mr-1 h-4 w-4" />
              +12%
            </span>
          </div>
          <p className="mt-1 text-sm text-text-muted">vs. mes anterior</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Templates favoritos</span>
            <div className="rounded-lg bg-accent/10 p-2">
              <Heart className="h-5 w-5 text-accent-300" />
            </div>
          </div>
          <div className="mt-4 text-4xl font-bold text-white">{favoriteTemplates.length || 0}</div>
          <p className="mt-1 text-sm text-text-muted">templates usados</p>
          <div className="mt-4 flex gap-2">
            {favoriteTemplates.map((item) => (
              <div key={item.id} className="h-8 w-8 overflow-hidden rounded-lg bg-bg-elevated">
                {item.thumbnail ? <img src={item.thumbnail} alt="" className="h-full w-full object-cover" /> : null}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <QuickActionCard
          icon={Camera}
          title="Nova Foto"
          description="Gerar foto profissional"
          onClick={() => navigate("/app/nova-foto")}
          color="primary"
        />
        <QuickActionCard
          icon={Grid3x3}
          title="Templates"
          description="Explorar estilos"
          onClick={() => navigate("/app/templates")}
          color="violet"
        />
        <QuickActionCard
          icon={FolderOpen}
          title="Colecoes"
          description="Organizar fotos"
          onClick={() => navigate("/app/colecoes")}
          color="emerald"
        />
        <QuickActionCard
          icon={Settings}
          title="Configuracoes"
          description="Ajustar preferencias"
          onClick={() => navigate("/app/configuracoes")}
          color="amber"
        />
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Ultimas geracoes</h2>
          <Link to="/app/minhas-fotos" className="flex items-center text-sm text-text-muted">
            Ver todas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {loadingGenerations ? (
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-40 w-full" />
            ))}
          </div>
        ) : recentGenerations.length === 0 ? (
          <EmptyState
            icon={ImageIcon}
            title="Nenhuma geracao ainda"
            description="Crie sua primeira foto profissional"
            action={{ label: "Nova Geracao", onClick: () => navigate("/app/nova-foto") }}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-4">
            {recentGenerations.map((item) => (
              <Card key={item.id} hoverable className="overflow-hidden p-4">
                <img
                  src={
                    item.generated_images?.[0]?.image_url ||
                    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={item.business_type}
                  className="h-36 w-full rounded-xl object-cover"
                />
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-white">{item.business_type}</h3>
                  <p className="text-xs text-text-muted">{item.template_name || "Template"}</p>
                  <p className="mt-2 text-xs text-text-subtle">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Card>
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-amber-500/10 p-3">
            <Lightbulb className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Dica do dia</h3>
            <p className="mt-1 text-sm text-text-muted">
              Fotos tiradas com luz natural (perto de janelas) geram resultados mais realistas. Evite flash direto que
              cria sombras duras no prato.
            </p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
