import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, RefreshCw, SlidersHorizontal, Upload, Wand2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const DEFAULT_ADJUSTMENTS = {
  brightness: 1,
  contrast: 1,
  saturation: 1
};

export default function EditorPage() {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [adjustments, setAdjustments] = useState(DEFAULT_ADJUSTMENTS);

  const filterStyle = useMemo(
    () =>
      `brightness(${adjustments.brightness}) contrast(${adjustments.contrast}) saturate(${adjustments.saturation})`,
    [adjustments]
  );

  const handleUpload = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    await img.decode();

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.filter = filterStyle;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `editor-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Editor AI</h1>
        <p className="text-text-muted">Ajustes finos de luz e contraste para suas imagens.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Pré-visualização</h2>
              <p className="text-sm text-text-muted">Ajuste brilho, contraste e saturação.</p>
            </div>
            <Button variant="secondary" size="sm" className="gap-2" onClick={() => navigate("/app/nova-foto")}>
              <Wand2 className="h-4 w-4" />
              Nova geração
            </Button>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-border-subtle bg-bg-elevated p-6 text-center">
            {image ? (
              <div className="space-y-4">
                <div className="mx-auto max-w-xl overflow-hidden rounded-2xl">
                  <img src={image} alt={fileName} className="w-full object-cover" style={{ filter: filterStyle }} />
                </div>
                <p className="text-xs text-text-muted">{fileName}</p>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center gap-4 text-text-muted">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent-300">
                  <Upload className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm text-white">Envie uma imagem para editar</p>
                  <p className="text-xs text-text-muted">JPG, PNG ou WebP</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => handleUpload(event.target.files?.[0])}
                />
              </label>
            )}
          </div>
        </Card>

        <Card className="space-y-6 p-6">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <SlidersHorizontal className="h-4 w-4 text-primary-300" />
            Ajustes
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-text-secondary">
                <span>Brilho</span>
                <span className="text-xs text-text-muted">{adjustments.brightness.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.2"
                step="0.01"
                value={adjustments.brightness}
                onChange={(event) =>
                  setAdjustments((prev) => ({ ...prev, brightness: Number(event.target.value) }))
                }
                className="w-full accent-primary-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-text-secondary">
                <span>Contraste</span>
                <span className="text-xs text-text-muted">{adjustments.contrast.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.2"
                step="0.01"
                value={adjustments.contrast}
                onChange={(event) =>
                  setAdjustments((prev) => ({ ...prev, contrast: Number(event.target.value) }))
                }
                className="w-full accent-primary-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-text-secondary">
                <span>Saturação</span>
                <span className="text-xs text-text-muted">{adjustments.saturation.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.3"
                step="0.01"
                value={adjustments.saturation}
                onChange={(event) =>
                  setAdjustments((prev) => ({ ...prev, saturation: Number(event.target.value) }))
                }
                className="w-full accent-primary-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button className="w-full gap-2" onClick={handleDownload} disabled={!image}>
              <Download className="h-4 w-4" />
              Baixar imagem ajustada
            </Button>
            <Button
              variant="secondary"
              className="w-full gap-2"
              onClick={() => setAdjustments(DEFAULT_ADJUSTMENTS)}
              disabled={!image}
            >
              <RefreshCw className="h-4 w-4" />
              Resetar ajustes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
