import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid3x3, ImageOff, Search } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Skeleton from "@/components/ui/Skeleton";
import { listTemplates } from "@/services/templatesService";

interface TemplateItem {
  id: string;
  slug?: string | null;
  name: string;
  description: string;
  category?: string | null;
  aspect_ratio?: string | null;
  example_image_url?: string | null;
  platform_suggestions?: string[];
}

const templateFallbackImages: Record<string, string> = {
  "ifood-padrao": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
  "gourmet-escuro": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop",
  "flat-lay-cardapio": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop",
  "stories-vibrante": "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1200&auto=format&fit=crop",
  "minimalista-clean": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
  "rustico-artesanal": "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop",
  "fast-food-apetitoso": "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
  "sobremesa-elegante": "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?q=80&w=1200&auto=format&fit=crop",
  "bebidas-refrescantes": "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=1200&auto=format&fit=crop",
  "saudavel-fitness": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop"
};

const isAbsoluteUrl = (value?: string | null) =>
  !!value &&
  (value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:") ||
    value.startsWith("blob:"));

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLoading(true);
    listTemplates()
      .then((response) => setTemplates(response.data.templates || []))
      .finally(() => setLoading(false));
  }, []);

  const filteredTemplates = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return templates;
    return templates.filter(
      (template) =>
        template.name.toLowerCase().includes(term) ||
        template.description.toLowerCase().includes(term) ||
        (template.category || "").toLowerCase().includes(term)
    );
  }, [query, templates]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Templates</h1>
          <p className="text-text-muted">Explore todos os estilos disponiveis para suas fotos.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar templates..."
              className="h-10 w-full rounded-lg border border-border-subtle bg-bg-input pl-9 pr-3 text-sm text-white placeholder:text-text-muted focus:border-primary focus:outline-none"
            />
          </div>
          <Button className="gap-2" onClick={() => navigate("/app/nova-foto")}>
            Nova geracao
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-60 w-full" />
          ))}
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border-subtle bg-bg-card p-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary-300">
            <Grid3x3 className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-semibold text-white">Nenhum template encontrado</h2>
          <p className="mt-2 text-sm text-text-muted">Tente ajustar sua busca ou volte mais tarde.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => {
            const fallbackKey = (template.slug || template.id || "").toString();
            const fallbackImage =
              templateFallbackImages[fallbackKey] ||
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop";
            const imageSrc = isAbsoluteUrl(template.example_image_url)
              ? template.example_image_url
              : fallbackImage;

            return (
            <div
              key={template.id}
              className="group overflow-hidden rounded-2xl border border-border-subtle bg-bg-card transition hover:-translate-y-1 hover:border-primary/30"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {!imageErrors[template.id] ? (
                  <img
                    src={imageSrc}
                    alt={template.name}
                    loading="lazy"
                    onError={() =>
                      setImageErrors((prev) => ({
                        ...prev,
                        [template.id]: true
                      }))
                    }
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-transparent to-accent/20">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      <ImageOff className="h-4 w-4" />
                      Sem imagem
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="truncate text-lg font-semibold text-white">{template.name}</h3>
                  <p className="mt-1 max-h-12 overflow-hidden text-sm leading-snug text-white/70">
                    {template.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4 p-4">
                <div className="flex flex-wrap gap-2">
                  {(template.platform_suggestions || []).slice(0, 4).map((platform) => (
                    <Badge key={platform} variant="neutral" size="sm">
                      {platform}
                    </Badge>
                  ))}
                </div>
                <Button
                  className="w-full"
                  onClick={() => navigate(`/app/nova-foto?templateId=${template.id}`)}
                >
                  Usar template
                </Button>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
