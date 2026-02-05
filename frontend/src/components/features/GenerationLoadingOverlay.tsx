import { useEffect, useMemo, useState } from "react";
import { Lightbulb, Wand2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";

const statusMessages = [
  "Analisando sua foto...",
  "Identificando o alimento...",
  "Aplicando estilo profissional...",
  "Ajustando iluminacao...",
  "Melhorando cores e contraste...",
  "Refinando detalhes...",
  "Finalizando composicao...",
  "Quase pronto..."
];

const tips = [
  "Fotos com luz natural geram melhores resultados",
  "Voce pode gerar ate 4 variacoes de uma vez",
  "Experimente diferentes templates para o mesmo prato",
  "Use as notas adicionais para detalhes especificos"
];

interface GenerationLoadingOverlayProps {
  isOpen: boolean;
  originalImage?: string | null;
  onCancel: () => void;
}

export default function GenerationLoadingOverlay({ isOpen, originalImage, onCancel }: GenerationLoadingOverlayProps) {
  const [progress, setProgress] = useState(10);
  const [messageIndex, setMessageIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    setProgress(10);
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + Math.random() * 8 : prev));
    }, 1200);
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % statusMessages.length);
    }, 2200);
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearInterval(tipInterval);
    };
  }, [isOpen]);

  const estimatedTime = useMemo(() => Math.max(12, Math.round((100 - progress) / 2)), [progress]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-page">
      <div className="mx-4 w-full max-w-md space-y-8 text-center">
        <div className="relative">
          <div className="relative mx-auto h-48 w-48">
            {originalImage ? (
              <img src={originalImage} alt="" className="h-full w-full rounded-2xl object-cover opacity-30" />
            ) : (
              <div className="h-full w-full rounded-2xl bg-bg-elevated" />
            )}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0 animate-shimmer bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0"
                style={{ backgroundSize: "200% 100%" }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 animate-pulse">
                <Wand2 className="h-8 w-8 text-primary-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-2 overflow-hidden rounded-full bg-bg-elevated">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-sm text-text-muted">
            <span>{Math.round(progress)}%</span>
            <span>~{estimatedTime}s restantes</span>
          </div>
        </div>

        <div className="space-y-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg font-medium text-white"
            >
              {statusMessages[messageIndex]}
            </motion.p>
          </AnimatePresence>
          <p className="text-sm text-text-muted">Isso geralmente leva entre 30-60 segundos</p>
        </div>

        <div className="rounded-xl border border-border-subtle bg-bg-card p-4 text-left">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-5 w-5 text-amber-500" />
            <div>
              <p className="text-sm font-medium text-white">Dica</p>
              <p className="text-sm text-text-muted">{tips[tipIndex]}</p>
            </div>
          </div>
        </div>

        <Button variant="ghost" onClick={onCancel} className="text-text-muted">
          Cancelar
        </Button>
      </div>
    </div>
  );
}
