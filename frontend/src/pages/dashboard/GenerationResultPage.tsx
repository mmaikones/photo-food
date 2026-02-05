import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Repeat, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";
import toast from "react-hot-toast";
import { getGeneration, retryGeneration } from "@/services/generationsService";
import ImageCard, { type ImageCardData } from "@/components/features/ImageCard";
import ImageLightbox from "@/components/features/ImageLightbox";

interface GeneratedImage {
  image_url: string;
  width: number;
  height: number;
}

interface GenerationJob {
  id: string;
  template_id: string;
  business_type: string;
  platform_target: string;
  quantity_requested: number;
  credits_used: number;
  status: string;
  generated_images: GeneratedImage[];
  created_at: string;
}

export default function GenerationResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<GenerationJob | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingJob, setLoadingJob] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    setLoadingJob(true);
    getGeneration(id)
      .then((response) => setJob(response.data.job))
      .catch(() => toast.error("Nao foi possivel carregar a geracao"))
      .finally(() => setLoadingJob(false));
  }, [id]);

  const images = useMemo<ImageCardData[]>(() => {
    if (!job) return [];
    return (job.generated_images || []).map((image, index) => ({
      id: `${job.id}-${index}`,
      url: image.image_url,
      businessType: job.business_type,
      platform: job.platform_target,
      createdAt: new Date(job.created_at).toLocaleDateString()
    }));
  }, [job]);

  const handleRetry = async () => {
    if (!id) return;
    setLoading(true);
    try {
      await retryGeneration(id);
      const response = await getGeneration(id);
      setJob(response.data.job);
      toast.success("Novas variacoes geradas");
    } catch {
      toast.error("Falha ao gerar novas variacoes");
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sua foto esta pronta! 🎉</h1>
          <p className="text-sm text-text-muted">
            Template {job?.template_id} • {job?.quantity_requested || 0} imagens
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" leftIcon={<Repeat size={16} />} onClick={handleRetry} loading={loading}>
            Gerar mais variacoes
          </Button>
          <Button leftIcon={<Plus size={16} />} onClick={() => navigate("/app/nova-foto")}
          >
            Nova foto
          </Button>
        </div>
      </div>

      <Card>
        <div className="grid gap-6 md:grid-cols-3">
          {loadingJob ? (
            <>
              <Skeleton className="h-56 w-full" />
              <Skeleton className="h-56 w-full" />
              <Skeleton className="h-56 w-full" />
            </>
          ) : images.length > 0 ? (
            images.map((image, index) => (
              <ImageCard
                key={image.id}
                image={image}
                onClick={() => openLightbox(index)}
                onDownload={() => window.open(image.url, "_blank")}
                onFavorite={() => null}
              />
            ))
          ) : (
            <div className="col-span-full rounded-lg border border-dashed border-border-subtle p-8 text-center text-sm text-text-muted">
              Nenhuma imagem gerada ainda.
            </div>
          )}
        </div>
      </Card>

      <Card className="bg-bg-elevated">
        <div className="flex flex-col gap-3 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
          <div>
            Credito gasto: <strong className="text-white">{job?.credits_used || 0}</strong>
          </div>
          <div>
            Plataforma: <strong className="text-white">{job?.platform_target || "-"}</strong>
          </div>
          <div>
            Status: <strong className="text-white">{job?.status || "-"}</strong>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Link to="/app/minhas-fotos" className="text-sm font-medium text-primary-300">
          Ver no historico
        </Link>
      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        initialIndex={lightboxIndex}
      />
    </div>
  );
}
