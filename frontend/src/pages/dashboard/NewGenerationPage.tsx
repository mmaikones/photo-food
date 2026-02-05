import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Upload,
  X,
  Lightbulb,
  Target,
  Smartphone,
  Check,
  ArrowLeft,
  Coins,
  Sparkles,
  Store,
  Instagram,
  FileText,
  LayoutGrid,
  ImageOff
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";
import Separator from "@/components/ui/Separator";
import Skeleton from "@/components/ui/Skeleton";
import { listTemplates } from "@/services/templatesService";
import { createGeneration } from "@/services/generationsService";
import { useCreditsStore } from "@/stores/creditsStore";
import GenerationLoadingOverlay from "@/components/features/GenerationLoadingOverlay";

interface TemplateItem {
  id: string;
  slug?: string | null;
  name: string;
  description: string;
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

const businessTypes = [
  { id: "hamburgueria", name: "Hamburgueria", emoji: "🍔" },
  { id: "pizzaria", name: "Pizzaria", emoji: "🍕" },
  { id: "acaiteria", name: "Acaiteria", emoji: "🍧" },
  { id: "marmitaria", name: "Marmitaria", emoji: "🥘" },
  { id: "sushi", name: "Sushi", emoji: "🍣" },
  { id: "padaria", name: "Padaria", emoji: "🥐" },
  { id: "doceria", name: "Doceria", emoji: "🍰" },
  { id: "cafeteria", name: "Cafeteria", emoji: "☕" }
];

const platforms = [
  { id: "iFood", name: "iFood", ratio: "1:1", icon: Store, color: "#ef4444", bgColor: "bg-red-500/10" },
  { id: "Instagram Feed", name: "Instagram Feed", ratio: "4:5", icon: Instagram, color: "#ec4899", bgColor: "bg-pink-500/10" },
  { id: "Instagram Stories", name: "Instagram Stories", ratio: "9:16", icon: LayoutGrid, color: "#f59e0b", bgColor: "bg-amber-500/10" },
  { id: "Cardapio PDF", name: "Cardapio PDF", ratio: "16:9", icon: FileText, color: "#22c55e", bgColor: "bg-emerald-500/10" }
];

const tips = [
  { icon: Lightbulb, title: "Boa iluminacao", description: "Fotos com luz natural funcionam melhor" },
  { icon: Target, title: "Foco no prato", description: "Centralize o alimento na imagem" },
  { icon: Smartphone, title: "Qualquer celular", description: "Nao precisa de camera profissional" }
];

const steps = [
  { id: 1, title: "Upload", description: "Envie sua foto" },
  { id: 2, title: "Negocio", description: "Contexto e plataforma" },
  { id: 3, title: "Template", description: "Escolha o estilo" },
  { id: 4, title: "Resumo", description: "Ajustes finais" }
];

export default function NewGenerationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { balance, fetchBalance, updateBalance } = useCreditsStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [templateImageErrors, setTemplateImageErrors] = useState<Record<string, boolean>>({});
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [businessType, setBusinessType] = useState("");
  const [platformTarget, setPlatformTarget] = useState("");
  const [quantity, setQuantity] = useState(2);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTemplatesLoading(true);
    listTemplates()
      .then((response) => setTemplates(response.data.templates || []))
      .catch(() => toast.error("Nao foi possivel carregar templates"))
      .finally(() => setTemplatesLoading(false));
    fetchBalance();
  }, [fetchBalance]);

  useEffect(() => {
    if (!templates.length) return;
    const templateId = searchParams.get("templateId");
    const templateSlug = searchParams.get("template");
    if (!templateId && !templateSlug) return;

    const match = templates.find(
      (template) => template.id === templateId || (templateSlug && template.slug === templateSlug)
    );
    if (match) {
      setSelectedTemplate(match.id);
    }
  }, [templates, searchParams]);

  const selectedTemplateData = useMemo(
    () => templates.find((template) => template.id === selectedTemplate),
    [templates, selectedTemplate]
  );

  const handleUploadFile = (selected: File) => {
    setFile(selected);
    const reader = new FileReader();
    reader.onload = () => setFilePreview(reader.result as string);
    reader.readAsDataURL(selected);
  };

  const handleGenerate = async () => {
    if (!file || !selectedTemplate) return;
    if (balance < quantity) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("templateId", selectedTemplate);
      formData.append("businessType", businessType);
      formData.append("platformTarget", platformTarget);
      formData.append("quantityRequested", quantity.toString());
      formData.append("additionalNotes", notes);

      const response = await createGeneration(formData);
      updateBalance(balance - quantity);
      toast.success("Fotos geradas com sucesso!");
      navigate(`/app/geracao/${response.data.jobId}`);
    } catch {
      toast.error("Falha ao gerar imagens");
    } finally {
      setLoading(false);
    }
  };

  const canContinueStep1 = !!filePreview;
  const canContinueStep2 = businessType && platformTarget;
  const canContinueStep3 = !!selectedTemplate;

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Envie sua foto</h2>
            <p className="mt-2 text-text-muted">Tire uma foto do seu prato com o celular - nos transformamos em profissional</p>
          </div>

          <div
            className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
              isDragActive ? "border-primary bg-primary/5" : "border-border-subtle hover:border-primary/50 hover:bg-white/[0.02]"
            } ${filePreview ? "border-solid border-primary/30" : ""}`}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragActive(true);
            }}
            onDragLeave={() => setIsDragActive(false)}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragActive(false);
              const dropped = event.dataTransfer.files?.[0];
              if (dropped) handleUploadFile(dropped);
            }}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const selected = event.target.files?.[0];
                if (selected) handleUploadFile(selected);
              }}
            />

            {filePreview ? (
              <div className="space-y-6">
                <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-xl shadow-2xl">
                  <img src={filePreview} alt="" className="h-full w-full object-cover" />
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      setFile(null);
                      setFilePreview(null);
                    }}
                    className="absolute right-2 top-2 rounded-full bg-black/50 p-2 hover:bg-black/70"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
                <div>
                  <p className="font-medium text-white">{file?.name}</p>
                  <p className="text-sm text-text-muted">Clique para trocar</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <Upload className="h-8 w-8 text-primary-300" />
                </div>
                <div>
                  <p className="text-lg font-medium text-white">Arraste sua foto aqui</p>
                  <p className="text-text-muted">ou clique para selecionar</p>
                </div>
                <p className="text-sm text-text-subtle">JPG, PNG ou WebP • Max 10MB</p>
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {tips.map((tip) => (
              <div key={tip.title} className="rounded-2xl border border-border-subtle bg-bg-card p-4">
                <tip.icon className="h-5 w-5 text-primary-300" />
                <h4 className="mt-3 text-sm font-semibold text-white">{tip.title}</h4>
                <p className="mt-1 text-xs text-text-muted">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 1) {
      return (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Sobre seu negocio</h2>
            <p className="mt-2 text-text-muted">Isso ajuda a IA a criar fotos mais adequadas</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <label className="text-sm font-medium text-white">Tipo de negocio</label>
              <div className="grid grid-cols-2 gap-3">
                {businessTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setBusinessType(type.id)}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                      businessType === type.id
                        ? "border-primary bg-primary/10"
                        : "border-border-subtle bg-bg-card hover:border-primary/50"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl ${
                        businessType === type.id ? "bg-primary/20" : "bg-bg-elevated"
                      }`}
                    >
                      {type.emoji}
                    </div>
                    <span className={businessType === type.id ? "font-medium text-white" : "text-text-secondary"}>
                      {type.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-white">Onde vai usar?</label>
              <div className="space-y-3">
                {platforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <button
                      key={platform.id}
                      onClick={() => setPlatformTarget(platform.id)}
                      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                        platformTarget === platform.id
                          ? "border-primary bg-primary/10"
                          : "border-border-subtle bg-bg-card hover:border-primary/50"
                      }`}
                    >
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${platform.bgColor}`}>
                        <Icon className="h-6 w-6" style={{ color: platform.color }} />
                      </div>
                      <div>
                        <div className={platformTarget === platform.id ? "font-medium text-white" : "text-text-secondary"}>
                          {platform.name}
                        </div>
                        <div className="text-sm text-text-muted">{platform.ratio}</div>
                      </div>
                      <div className="ml-auto">
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                            platformTarget === platform.id ? "border-primary bg-primary" : "border-border-default"
                          }`}
                        >
                          {platformTarget === platform.id ? <Check className="h-3 w-3 text-white" /> : null}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Escolha o estilo</h2>
            <p className="mt-2 text-text-muted">Selecione o visual que combina com sua marca</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templatesLoading ? (
              Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-56 w-full" />)
            ) : templates.length === 0 ? (
              <div className="col-span-full rounded-xl border border-border-subtle bg-bg-card p-8 text-center text-sm text-text-muted">
                Nenhum template ativo encontrado.
              </div>
            ) : (
              templates.map((template) => {
                const fallbackKey = (template.slug || template.id || "").toString();
                const fallbackImage =
                  templateFallbackImages[fallbackKey] ||
                  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop";
                const imageSrc = isAbsoluteUrl(template.example_image_url)
                  ? template.example_image_url
                  : fallbackImage;

                return (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`group relative overflow-hidden rounded-2xl border-2 transition-all ${
                      selectedTemplate === template.id
                        ? "border-primary ring-4 ring-primary/20"
                        : "border-transparent hover:border-primary/30"
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      {!templateImageErrors[template.id] ? (
                        <img
                          src={imageSrc}
                          alt={template.name}
                          loading="lazy"
                          onError={() =>
                            setTemplateImageErrors((prev) => ({
                              ...prev,
                              [template.id]: true
                            }))
                          }
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-transparent to-accent/20">
                          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                            <ImageOff className="h-4 w-4 text-white/70" />
                            Sem imagem
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="truncate text-lg font-semibold text-white">{template.name}</h3>
                          <p className="mt-1 max-h-12 overflow-hidden text-sm leading-snug text-white/70">
                            {template.description}
                          </p>
                        </div>
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                            selectedTemplate === template.id ? "border-primary bg-primary" : "border-white/50"
                          }`}
                        >
                          {selectedTemplate === template.id ? <Check className="h-4 w-4 text-white" /> : null}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(template.platform_suggestions || ["iFood"]).map((platform) => (
                          <Badge key={platform} variant="dark" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Quase la!</h2>
          <p className="mt-2 text-text-muted">Ajuste as ultimas configuracoes</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-medium text-white">Quantidade de variacoes</label>
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setQuantity(num)}
                    className={`flex-1 rounded-xl border py-4 text-center font-semibold transition-all ${
                      quantity === num
                        ? "border-primary bg-primary/10 text-white"
                        : "border-border-subtle text-text-muted hover:border-primary/50"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <p className="text-sm text-text-subtle">Cada variacao gera uma foto diferente com o mesmo estilo</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-white">
                Notas adicionais <span className="text-text-muted">(opcional)</span>
              </label>
              <Textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Ex: destacar o queijo derretido, mostrar mais vapor, adicionar folhas de manjericao..."
                className="min-h-[100px] resize-none"
              />
              <p className="text-sm text-text-subtle">Descreva detalhes especificos que voce quer na foto</p>
            </div>
          </div>

          <div className="h-fit lg:sticky lg:top-32">
            <div className="space-y-6 rounded-2xl border border-border-subtle bg-bg-card p-6">
              <h3 className="text-lg font-semibold text-white">Resumo da geracao</h3>
              <div className="aspect-square overflow-hidden rounded-xl bg-bg-elevated">
                {filePreview ? <img src={filePreview} alt="" className="h-full w-full object-cover" /> : null}
              </div>
              <div className="space-y-4 text-sm text-text-muted">
                <div className="flex items-center justify-between">
                  <span>Negocio</span>
                  <span className="text-white">{businessTypes.find((b) => b.id === businessType)?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Plataforma</span>
                  <span className="text-white">{platformTarget}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Template</span>
                  <span className="text-white">{selectedTemplateData?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Variacoes</span>
                  <span className="text-white">{quantity}</span>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Custo total</span>
                <div className="flex items-center gap-2 text-white">
                  <Coins className="h-5 w-5 text-primary-300" />
                  <span className="text-2xl font-bold">{quantity}</span>
                  <span className="text-text-muted">creditos</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">Saldo apos geracao</span>
                <span className="text-text-secondary">{balance - quantity} creditos</span>
              </div>
              <Button
                className="h-12 w-full gap-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:opacity-90 shadow-button-primary"
                onClick={handleGenerate}
                disabled={loading || balance < quantity}
              >
                {loading ? (
                  "Gerando..."
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Gerar Fotos
                  </>
                )}
              </Button>
              {balance < quantity ? (
                <div className="rounded-lg border border-error-500/50 bg-error/10 p-3 text-sm text-error-500">
                  Creditos insuficientes. <button className="underline" onClick={() => navigate("/app/creditos")}>Comprar mais</button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-bg-page">
      <div className="sticky top-0 z-10 border-b border-border-subtle bg-bg-card/80 backdrop-blur-lg">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <div className="mb-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <Coins className="h-4 w-4 text-primary-300" />
              <span>
                <strong className="text-white">{balance}</strong> creditos
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-1 items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                      index < currentStep
                        ? "bg-primary text-white"
                        : index === currentStep
                          ? "border-2 border-primary bg-primary/20 text-primary"
                          : "bg-bg-elevated text-text-muted"
                    }`}
                  >
                    {index < currentStep ? <Check className="h-5 w-5" /> : index + 1}
                  </div>
                  <div className="hidden md:block">
                    <div className={index <= currentStep ? "text-sm font-medium text-white" : "text-sm text-text-muted"}>
                      {step.title}
                    </div>
                    <div className="text-xs text-text-subtle">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 ? (
                  <div
                    className={`mx-4 h-0.5 flex-1 ${index < currentStep ? "bg-primary" : "bg-border-subtle"}`}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mx-auto flex max-w-5xl justify-between px-6 pb-10">
        <Button
          variant="secondary"
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          disabled={currentStep === 0}
        >
          Voltar
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
            disabled={
              (currentStep === 0 && !canContinueStep1) ||
              (currentStep === 1 && !canContinueStep2) ||
              (currentStep === 2 && !canContinueStep3)
            }
          >
            Continuar
          </Button>
        ) : null}
      </div>

      <GenerationLoadingOverlay isOpen={loading} originalImage={filePreview} onCancel={() => setLoading(false)} />
    </div>
  );
}
