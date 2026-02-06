import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  LayoutGrid,
  Download,
  Sparkles,
  PlayCircle,
  Star,
  Check,
  ArrowRight,
  Store,
  Utensils,
  Coffee,
  Pizza,
  IceCream,
  Sandwich,
  Fish,
  Cookie
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Seo from "@/components/layout/Seo";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import AvatarStack from "@/components/ui/AvatarStack";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const templates = [
  {
    name: "iFood Padrao",
    description: "Fundo claro, luz uniforme e foco no produto.",
    badge: "iFood",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
  },
  {
    name: "Gourmet Escuro",
    description: "Luz dramatica com sombras ricas e fundo escuro.",
    badge: "Restaurantes",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop"
  },
  {
    name: "Flat Lay Cardapio",
    description: "Composicao clean vista de cima.",
    badge: "Cardapio",
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1200&auto=format&fit=crop"
  },
  {
    name: "Stories Vibrante",
    description: "Cores vivas e formato vertical para redes sociais.",
    badge: "Stories",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop"
  },
  {
    name: "Minimalista",
    description: "Produto central com fundo branco e muito respiro.",
    badge: "Instagram",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
  },
  {
    name: "Rustico Artesanal",
    description: "Madeira, props naturais e clima caseiro.",
    badge: "Delivery",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop"
  }
];

const beforeAfter = [
  {
    before:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1200&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop"
  },
  {
    before:
      "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=1200&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
  },
  {
    before:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop"
  }
];

const faqs = [
  {
    question: "Como funciona a geracao de fotos?",
    answer:
      "Voce envia a foto do seu prato, escolhe o estilo e a plataforma. A IA melhora luz, textura e composicao mantendo o produto real."
  },
  {
    question: "Quanto tempo leva para gerar uma foto?",
    answer:
      "Normalmente entre 30 e 90 segundos, dependendo do numero de variacoes solicitadas."
  },
  {
    question: "Posso usar as fotos comercialmente?",
    answer:
      "Sim. As imagens sao suas e podem ser usadas em cardapios, delivery e redes sociais."
  },
  {
    question: "Como funcionam os creditos?",
    answer:
      "Cada foto gerada consome 1 credito. Voce pode comprar pacotes quando quiser."
  },
  {
    question: "Tem garantia de satisfacao?",
    answer:
      "Se a foto nao ficar boa, voce pode gerar novas variacoes usando o mesmo credito."
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim. Sem contratos longos. Voce controla seu plano e seus creditos."
  }
];

const testimonials = [
  {
    name: "Mariana Costa",
    business: "Doceria Nuvem",
    text:
      "As fotos ficaram absurdamente melhores. Aumentou a conversao no delivery em menos de uma semana."
  },
  {
    name: "Ricardo Alves",
    business: "Burger Garage",
    text:
      "A gente tira foto com celular e ja fica pronta pra iFood. Economizamos em fotografo todo mes."
  },
  {
    name: "Camila Ribeiro",
    business: "Sushi Leste",
    text:
      "O estilo gourmet escuro deixou nossos combos muito mais premium."
  }
];

const businessTypes = [
  { label: "Hamburgueria", icon: Sandwich },
  { label: "Pizzaria", icon: Pizza },
  { label: "Acaiteria", icon: IceCream },
  { label: "Marmitaria", icon: Store },
  { label: "Doceria", icon: Cookie },
  { label: "Sushi", icon: Fish },
  { label: "Padaria", icon: Utensils },
  { label: "Cafeteria", icon: Coffee }
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-bg-page">
      <Seo
        title="FoodPhoto Studio - Fotos profissionais para delivery"
        description="Transforme fotos simples em imagens profissionais para iFood, Instagram e cardapios digitais."
      />
      <Navbar />

      <section className="hero">
        <div className="absolute inset-0 bg-dot-pattern-subtle opacity-40" />
        <div className="hero__floating-elements">
          <div className="floating-stat floating-element--delay-1" style={{ bottom: "25%", left: "8%" }}>
            <div className="floating-stat__icon">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="floating-stat__value">95%</div>
              <div className="floating-stat__label">Aprovacao</div>
            </div>
          </div>
          <div className="floating-stat floating-element--delay-4" style={{ bottom: "20%", right: "8%" }}>
            <div className="floating-stat__icon">
              <Store size={18} />
            </div>
            <div>
              <div className="floating-stat__value">50k+</div>
              <div className="floating-stat__label">Fotos geradas</div>
            </div>
          </div>
        </div>
        <Container>
          <div className="hero__content animate-fade-in-up pt-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-700">
              <Sparkles size={14} />
              Fotos profissionais em minutos
            </div>
            <h1 className="text-hero-title mt-6">
              Transforme fotos simples em <span className="gradient">Fotos Profissionais</span>
            </h1>
            <p className="text-hero-subtitle mx-auto mt-4">
              Tire foto do seu prato com o celular e receba imagens de qualidade de estudio, prontas para iFood, Instagram e cardapio digital.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="rounded-full px-8 py-4 text-base animate-pulse-glow">
                Comecar Gratis
              </Button>
              <Button variant="secondary" size="lg" className="rounded-full px-8 py-4 text-base">
                Ver exemplos
              </Button>
            </div>
            <p className="mt-4 text-xs text-text-muted">✓ 5 fotos gratis • Sem cartao de credito</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <AvatarStack
                avatars={[
                  { src: "https://i.pravatar.cc/48?img=12", fallback: "MS" },
                  { src: "https://i.pravatar.cc/48?img=32", fallback: "RA" },
                  { src: "https://i.pravatar.cc/48?img=45", fallback: "CL" },
                  { src: "https://i.pravatar.cc/48?img=56", fallback: "TK" }
                ]}
              />
              <span className="text-sm text-text-muted">
                Usado por <strong className="text-white">+2.500 restaurantes</strong>
              </span>
            </div>
          </div>
        </Container>
      </section>

      <motion.section
        className="border-y border-border-subtle bg-bg-page py-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Container>
          <div className="text-center">
            <p className="text-sm font-medium text-text-muted">Usado por restaurantes em todo Brasil</p>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-10 text-sm font-semibold uppercase tracking-wide text-text-subtle">
            {[
              "Bistro 21",
              "Bella Pizza",
              "Sabor Nobre",
              "Doce & Cia",
              "Poke House",
              "Cafe Nuvem"
            ].map((logo) => (
              <span key={logo} className="opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0">
                {logo}
              </span>
            ))}
          </div>
        </Container>
      </motion.section>

      <motion.section
        id="como-funciona"
        className="bg-[#f8fafc] py-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Container>
          <div className="text-center">
            <p className="text-eyebrow text-primary-600">Como funciona</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">3 passos simples para vender mais</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              Um fluxo rapido para transformar fotos do celular em imagens prontas para cardapios e delivery.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Tire a foto",
                description: "Envie uma foto simples do seu produto.",
                icon: Camera
              },
              {
                step: "02",
                title: "Escolha o estilo",
                description: "Selecione o template ideal para o seu negocio.",
                icon: LayoutGrid
              },
              {
                step: "03",
                title: "Baixe e use",
                description: "Receba imagens prontas para publicar.",
                icon: Download
              }
            ].map((item) => (
              <Card key={item.step} hoverable className="relative overflow-hidden border border-slate-200 bg-white text-slate-900">
                <span className="text-sm font-semibold text-primary-600">{item.step}</span>
                <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <item.icon size={22} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </motion.section>

      <motion.section
        className="bg-[#5b21b6] py-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Container>
          <div className="text-center">
            <p className="text-eyebrow text-white/80">Antes e depois</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Veja a transformacao</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {beforeAfter.map((item, index) => (
              <Card key={`${item.after}-${index}`} className="overflow-hidden border border-slate-200 bg-white text-slate-900">
                <div className="grid gap-3">
                  <div>
                    <Badge variant="neutral">Antes</Badge>
                    <img
                      src={item.before}
                      alt="Antes"
                      className="mt-3 h-40 w-full rounded-xl object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <Badge variant="success">Depois</Badge>
                    <img
                      src={item.after}
                      alt="Depois"
                      className="mt-3 h-40 w-full rounded-xl object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </motion.section>

      <motion.section
        id="templates"
        className="bg-[#f8fafc] py-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div>
              <p className="text-eyebrow text-primary-600">Templates</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Estilos para cada necessidade</h2>
            </div>
            <Button variant="secondary" size="md" className="rounded-full px-6">
              Ver todos <ArrowRight size={16} />
            </Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.name} hoverable className="overflow-hidden border border-slate-200 bg-white text-slate-900">
                <div className="relative">
                  <img src={template.image} alt={template.name} className="h-40 w-full rounded-xl object-cover" loading="lazy" />
                  <Badge variant="primary" className="absolute left-3 top-3">
                    {template.badge}
                  </Badge>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{template.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{template.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </motion.section>

      <motion.section
        className="bg-[#f8fafc] py-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Container>
          <div className="text-center">
            <p className="text-eyebrow text-primary-600">Para quem</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Perfeito para seu negocio</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {businessTypes.map((item) => (
              <Card key={item.label} className="flex items-center gap-3 rounded-xl border border-slate-900 bg-[#0a0a0f] p-4 shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-500 text-white">
                  <item.icon size={20} />
                </div>
                <div className="text-sm font-semibold text-white">{item.label}</div>
              </Card>
            ))}
          </div>
        </Container>
      </motion.section>

      <motion.section
        id="precos"
        className="bg-[#0a0a0f] py-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Container>
          <div className="text-center">
            <p className="text-eyebrow text-white/70">Planos</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Planos simples, sem surpresas</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Card className="flex h-full flex-col border border-slate-200 bg-white text-slate-900">
              <h3 className="text-xl font-semibold text-slate-900">Starter</h3>
              <p className="mt-2 text-sm text-slate-600">Para testar sem compromisso</p>
              <div className="mt-6 text-3xl font-bold text-slate-900">Gratis</div>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2"><Check size={16} /> 5 creditos para testar</li>
                <li className="flex items-center gap-2"><Check size={16} /> Marca d'agua nas fotos</li>
                <li className="flex items-center gap-2"><Check size={16} /> Resolucao padrao</li>
              </ul>
              <Button className="mt-8 w-full rounded-full">Comecar Gratis</Button>
            </Card>
            <Card className="relative flex h-full flex-col border border-slate-200 bg-white text-slate-900 shadow-lg">
              <Badge variant="accent" className="absolute right-6 top-6">Mais Popular</Badge>
              <h3 className="text-xl font-semibold text-slate-900">Pro</h3>
              <p className="mt-2 text-sm text-slate-600">Para restaurantes em crescimento</p>
              <div className="mt-6 text-3xl font-bold text-slate-900">
                R$ 49<span className="text-base font-medium text-slate-600">/mes</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2"><Check size={16} /> 50 creditos por mes</li>
                <li className="flex items-center gap-2"><Check size={16} /> Sem marca d'agua</li>
                <li className="flex items-center gap-2"><Check size={16} /> Alta resolucao</li>
                <li className="flex items-center gap-2"><Check size={16} /> Todos os templates</li>
                <li className="flex items-center gap-2"><Check size={16} /> Suporte prioritario</li>
              </ul>
              <Button variant="accent" className="mt-8 w-full rounded-full">Assinar Pro</Button>
            </Card>
            <Card className="flex h-full flex-col border border-slate-200 bg-white text-slate-900">
              <h3 className="text-xl font-semibold text-slate-900">Business</h3>
              <p className="mt-2 text-sm text-slate-600">Para operacoes maiores</p>
              <div className="mt-6 text-3xl font-bold text-slate-900">
                R$ 149<span className="text-base font-medium text-slate-600">/mes</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2"><Check size={16} /> 200 creditos por mes</li>
                <li className="flex items-center gap-2"><Check size={16} /> API access</li>
                <li className="flex items-center gap-2"><Check size={16} /> Templates exclusivos</li>
                <li className="flex items-center gap-2"><Check size={16} /> Gerente de conta</li>
              </ul>
              <Button variant="secondary" className="mt-8 w-full rounded-full">Falar com vendas</Button>
            </Card>
          </div>
        </Container>
      </motion.section>

      <motion.section
        className="bg-[#f8fafc] py-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Container>
          <div className="text-center">
            <p className="text-eyebrow text-primary-600">Depoimentos</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">O que nossos clientes dizem</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item.name} className="border border-slate-200 bg-white text-slate-900 shadow-md">
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-slate-700">“{item.text}”</p>
                <div className="mt-6 text-sm font-semibold text-slate-900">{item.name}</div>
                <div className="text-xs text-slate-500">{item.business}</div>
              </Card>
            ))}
          </div>
        </Container>
      </motion.section>

      <motion.section
        className="bg-[#0a0a0f] py-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Container>
          <div className="text-center">
            <p className="text-eyebrow text-white/70">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Perguntas frequentes</h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {faqs.map((item, index) => (
              <Card key={item.question} className="border border-slate-200 bg-white p-0 text-slate-900">
                <button
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold text-slate-900"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {item.question}
                  <span className="text-primary-600">{openFaq === index ? "-" : "+"}</span>
                </button>
                {openFaq === index ? (
                  <div className="px-6 pb-5 text-sm text-slate-600">{item.answer}</div>
                ) : null}
              </Card>
            ))}
          </div>
        </Container>
      </motion.section>

      <motion.section
        className="bg-primary-600 py-20 text-white"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">Pronto para transformar suas fotos?</h2>
              <p className="mt-3 text-base text-primary-100">
                Comece gratis agora e veja a diferenca em poucos minutos.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button className="rounded-full bg-bg-page text-primary-700 hover:bg-bg-elevated">
                  Criar Conta Gratis
                </Button>
                <Button variant="ghost" className="rounded-full text-white hover:bg-bg-page/10">
                  Ver demo <PlayCircle size={16} />
                </Button>
              </div>
              <p className="mt-3 text-xs text-primary-100">Nao precisa de cartao de credito.</p>
            </div>
            <div className="rounded-3xl bg-bg-page/10 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg-page/20">
                  <Sparkles />
                </div>
                <div>
                  <div className="text-lg font-semibold">Entrega rapida</div>
                  <div className="text-sm text-primary-100">Fotos em ate 90 segundos.</div>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg-page/20">
                  <Camera />
                </div>
                <div>
                  <div className="text-lg font-semibold">Qualidade de estúdio</div>
                  <div className="text-sm text-primary-100">Prontas para iFood e Instagram.</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </motion.section>

      <Footer />
    </div>
  );
}
