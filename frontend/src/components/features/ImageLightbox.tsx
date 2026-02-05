import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layout,
  Calendar,
  Maximize,
  FileType,
  Download,
  Heart,
  Share2,
  RefreshCw
} from "lucide-react";
import Button from "@/components/ui/Button";
import Separator from "@/components/ui/Separator";
import { cn } from "@/utils/cn";
import type { ImageCardData } from "@/components/features/ImageCard";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageCardData[];
  initialIndex: number;
  onDownload?: (image: ImageCardData) => void;
}

export default function ImageLightbox({ isOpen, onClose, images, initialIndex, onDownload }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setZoom(1);
    }
  }, [isOpen, initialIndex]);

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const currentImage = images[currentIndex];
  const otherImages = useMemo(() => images.filter((_, index) => index !== currentIndex), [images, currentIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && hasPrevious) setCurrentIndex((prev) => prev - 1);
      if (event.key === "ArrowRight" && hasNext) setCurrentIndex((prev) => prev + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, hasPrevious, hasNext, onClose]);

  if (!isOpen || !currentImage) return null;

  const handleDownload = () => {
    if (onDownload) onDownload(currentImage);
    else window.open(currentImage.url, "_blank");
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2.5));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.6));
  const resetZoom = () => setZoom(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="relative flex h-[90vh] w-[95vw] max-w-7xl overflow-hidden rounded-2xl border border-border-subtle bg-black">
        <div className="relative flex flex-1 items-center justify-center p-8">
          <button
            onClick={() => hasPrevious && setCurrentIndex((prev) => prev - 1)}
            disabled={!hasPrevious}
            className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="relative max-h-full max-w-full">
            <img
              src={currentImage.url}
              alt={currentImage.alt || "Imagem"}
              className="max-h-[calc(90vh-4rem)] max-w-full rounded-lg object-contain shadow-2xl"
              style={{ transform: `scale(${zoom})` }}
            />
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/50 px-3 py-2 backdrop-blur-sm">
              <button onClick={zoomOut} className="rounded p-1 hover:bg-white/10">
                <ZoomOut className="h-4 w-4 text-white" />
              </button>
              <span className="min-w-[3rem] text-center text-sm text-white">{Math.round(zoom * 100)}%</span>
              <button onClick={zoomIn} className="rounded p-1 hover:bg-white/10">
                <ZoomIn className="h-4 w-4 text-white" />
              </button>
              <div className="h-4 w-px bg-white/20" />
              <button onClick={resetZoom} className="rounded p-1 hover:bg-white/10">
                <Maximize2 className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          <button
            onClick={() => hasNext && setCurrentIndex((prev) => prev + 1)}
            disabled={!hasNext}
            className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="w-80 border-l border-border-subtle bg-bg-card p-6 overflow-y-auto">
          <div className="flex justify-end">
            <button onClick={onClose} className="rounded-lg p-2 text-text-muted hover:bg-white/5">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 aspect-square overflow-hidden rounded-xl border border-border-subtle">
            <img src={currentImage.url} alt="" className="h-full w-full object-cover" />
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white">{currentImage.businessType || "Foto"}</h3>
              <p className="text-sm text-text-muted">{currentImage.template || ""}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <Layout className="h-4 w-4 text-text-muted" />
                {currentImage.platform || "-"}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-text-muted" />
                {currentImage.createdAt || "-"}
              </div>
              <div className="flex items-center gap-2">
                <Maximize className="h-4 w-4 text-text-muted" />
                1024x1024
              </div>
              <div className="flex items-center gap-2">
                <FileType className="h-4 w-4 text-text-muted" />
                PNG
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Button className="w-full gap-2" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                Download HD
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" className="gap-2">
                  <Heart className="h-4 w-4" />
                  Favoritar
                </Button>
                <Button variant="secondary" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Compartilhar
                </Button>
              </div>
              <Button variant="ghost" className="w-full gap-2 text-text-muted">
                <RefreshCw className="h-4 w-4" />
                Gerar variacao
              </Button>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium text-white">Outras variacoes ({otherImages.length})</h4>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {otherImages.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentIndex(images.findIndex((item) => item.id === image.id))}
                    className={cn(
                      "aspect-square overflow-hidden rounded-lg border-2 transition-colors",
                      image.id === currentImage.id ? "border-primary" : "border-transparent hover:border-white/20"
                    )}
                  >
                    <img src={image.url} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 hidden items-center gap-4 text-xs text-white/40 md:flex">
          <span>
            <kbd className="rounded bg-white/10 px-1.5 py-0.5">←</kbd>{" "}
            <kbd className="rounded bg-white/10 px-1.5 py-0.5">→</kbd> Navegar
          </span>
          <span>
            <kbd className="rounded bg-white/10 px-1.5 py-0.5">ESC</kbd> Fechar
          </span>
        </div>
      </div>
    </div>
  );
}
