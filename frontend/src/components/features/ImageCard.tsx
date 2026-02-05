import { Heart, Download, Expand, Calendar } from "lucide-react";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export interface ImageCardData {
  id: string;
  url: string;
  alt?: string;
  template?: string;
  businessType?: string;
  platform?: string;
  createdAt?: string;
  isFavorite?: boolean;
}

interface ImageCardProps {
  image: ImageCardData;
  onClick: () => void;
  onDownload?: () => void;
  onFavorite?: () => void;
  showInfo?: boolean;
}

export default function ImageCard({ image, onClick, onDownload, onFavorite, showInfo = true }: ImageCardProps) {
  return (
    <div>
      <div
        className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated transition-all duration-300 hover:border-primary/50"
        onClick={onClick}
      >
        <img
          src={image.url}
          alt={image.alt || image.businessType || "Imagem"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute right-3 top-3 flex gap-2">
          {onFavorite ? (
            <button
              onClick={(event) => {
                event.stopPropagation();
                onFavorite();
              }}
              className="rounded-lg bg-black/50 p-2 backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <Heart
                className={cn("h-4 w-4", image.isFavorite ? "fill-red-500 text-red-500" : "text-white")}
              />
            </button>
          ) : null}
        </div>

        {image.template ? (
          <div className="absolute left-3 top-3">
            <Badge variant="dark">{image.template}</Badge>
          </div>
        ) : null}

        <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">{image.businessType || "Foto"}</p>
              <p className="text-xs text-white/60">{image.createdAt || ""}</p>
            </div>
            <div className="flex gap-2">
              {onDownload ? (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDownload();
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
              ) : null}
              <Button size="sm" onClick={onClick}>
                <Expand className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showInfo ? (
        <div className="mt-3 space-y-1">
          <h3 className="truncate text-sm font-medium text-white">{image.businessType || "Foto"}</h3>
          <p className="text-xs text-text-muted">
            {image.template ? `${image.template} • ` : ""}
            {image.platform || ""}
          </p>
          {image.createdAt ? (
            <div className="flex items-center gap-2 text-xs text-text-subtle">
              <Calendar className="h-3 w-3" />
              {image.createdAt}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
