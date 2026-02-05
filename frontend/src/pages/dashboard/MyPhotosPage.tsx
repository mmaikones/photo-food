import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Grid3x3, List, X, ImageOff, ChevronLeft, ChevronRight } from "lucide-react";
import { listGenerations } from "@/services/generationsService";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import ImageCard, { type ImageCardData } from "@/components/features/ImageCard";
import ImageLightbox from "@/components/features/ImageLightbox";

interface GenerationItem {
  id: string;
  business_type: string;
  platform_target: string;
  quantity_requested: number;
  status: "COMPLETED" | "PROCESSING" | "FAILED" | "PENDING";
  generated_images: { image_url: string }[];
  created_at: string;
  template_name?: string;
}

export default function MyPhotosPage() {
  const [jobs, setJobs] = useState<GenerationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("recent");
  const [templateFilter, setTemplateFilter] = useState("all");
  const [businessFilter, setBusinessFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    listGenerations()
      .then((response) => setJobs(response.data.generations || []))
      .finally(() => setLoading(false));
  }, []);

  const images = useMemo<ImageCardData[]>(() => {
    return jobs.flatMap((job) =>
      (job.generated_images || []).map((image, index) => ({
        id: `${job.id}-${index}`,
        url: image.image_url,
        template: job.template_name || "Template",
        businessType: job.business_type,
        platform: job.platform_target,
        createdAt: new Date(job.created_at).toLocaleDateString()
      }))
    );
  }, [jobs]);

  const filteredImages = useMemo(() => {
    let result = [...images];
    if (templateFilter !== "all") {
      result = result.filter((img) => img.template?.toLowerCase().includes(templateFilter));
    }
    if (businessFilter !== "all") {
      result = result.filter((img) => img.businessType?.toLowerCase().includes(businessFilter));
    }
    if (statusFilter !== "all") {
      const jobIds = new Set(
        jobs.filter((job) => job.status.toLowerCase() === statusFilter).map((job) => job.id)
      );
      result = result.filter((img) => jobIds.has(img.id.split("-")[0]));
    }
    if (sort === "oldest") {
      result = result.reverse();
    }
    return result;
  }, [images, jobs, templateFilter, businessFilter, statusFilter, sort]);

  const activeFilters = useMemo(() => {
    const filters = [] as { key: string; label: string }[];
    if (templateFilter !== "all") filters.push({ key: "template", label: `Template: ${templateFilter}` });
    if (businessFilter !== "all") filters.push({ key: "business", label: `Negocio: ${businessFilter}` });
    if (statusFilter !== "all") filters.push({ key: "status", label: `Status: ${statusFilter}` });
    return filters;
  }, [templateFilter, businessFilter, statusFilter]);

  const clearFilters = () => {
    setTemplateFilter("all");
    setBusinessFilter("all");
    setStatusFilter("all");
  };

  const openLightbox = (image: ImageCardData) => {
    const index = filteredImages.findIndex((item) => item.id === image.id);
    setLightboxIndex(index >= 0 ? index : 0);
    setLightboxOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Minhas Fotos</h1>
          <p className="text-text-muted">
            {filteredImages.length} imagens em {jobs.length} geracoes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg bg-bg-elevated p-1">
            <button
              onClick={() => setView("grid")}
              className={
                view === "grid" ? "rounded-md bg-primary px-2 py-1 text-white" : "px-2 py-1 text-text-muted"
              }
            >
              <Grid3x3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={
                view === "list" ? "rounded-md bg-primary px-2 py-1 text-white" : "px-2 py-1 text-text-muted"
              }
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          <Select
            options={[
              { value: "recent", label: "Mais recentes" },
              { value: "oldest", label: "Mais antigas" }
            ]}
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border-subtle bg-bg-card p-4">
        <div className="flex items-center gap-2 text-text-muted">
          <Filter className="h-4 w-4" />
          <span className="text-sm">Filtros:</span>
        </div>
        <Select
          options={[
            { value: "all", label: "Todos templates" },
            { value: "ifood", label: "iFood Padrao" },
            { value: "gourmet", label: "Gourmet Escuro" },
            { value: "flat", label: "Flat Lay" }
          ]}
          value={templateFilter}
          onChange={(event) => setTemplateFilter(event.target.value)}
        />
        <Select
          options={[
            { value: "all", label: "Todos tipos" },
            { value: "hamburgueria", label: "Hamburgueria" },
            { value: "pizzaria", label: "Pizzaria" },
            { value: "doceria", label: "Doceria" }
          ]}
          value={businessFilter}
          onChange={(event) => setBusinessFilter(event.target.value)}
        />
        <Select
          options={[
            { value: "all", label: "Todos" },
            { value: "completed", label: "Completo" },
            { value: "processing", label: "Processando" },
            { value: "failed", label: "Falhou" }
          ]}
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        />
        {activeFilters.length ? (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-text-muted">
            <X className="mr-1 h-4 w-4" />
            Limpar
          </Button>
        ) : null}
      </div>

      {activeFilters.length ? (
        <div className="flex flex-wrap items-center gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter.key} variant="secondary" className="gap-1 pr-1">
              {filter.label}
              <button
                onClick={() => {
                  if (filter.key === "template") setTemplateFilter("all");
                  if (filter.key === "business") setBusinessFilter("all");
                  if (filter.key === "status") setStatusFilter("all");
                }}
                className="rounded p-0.5 hover:bg-white/10"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      ) : null}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="aspect-square" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredImages.length === 0 ? (
        <EmptyState
          icon={ImageOff}
          title="Nenhuma foto encontrada"
          description="Tente ajustar os filtros ou crie sua primeira geracao"
          action={{ label: "Nova Geracao", onClick: () => navigate("/app/nova-foto") }}
        />
      ) : (
        <div className={view === "grid" ? "grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : "space-y-4"}>
          {filteredImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onClick={() => openLightbox(image)}
              onDownload={() => window.open(image.url, "_blank")}
              onFavorite={() => null}
              showInfo={view === "grid"}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-center gap-2 pt-6">
        <Button variant="outline" size="sm" disabled>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button size="sm">1</Button>
        <Button variant="outline" size="sm" disabled>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={filteredImages}
        initialIndex={lightboxIndex}
      />
    </div>
  );
}
