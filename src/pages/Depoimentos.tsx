import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, Quote, ChevronLeft, ChevronRight, ShieldCheck, TrendingUp, Users, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  { name: "Mariana Silva", role: "CEO", company: "Loja Bella Moda", initials: "MS", text: "Reduzimos em 87% as tentativas de fraude no primeiro mês. A Zettai Security é parte essencial do nosso e-commerce.", result: "−87% de fraudes" },
  { name: "Carlos Mendes", role: "CTO", company: "TechStore BR", initials: "CM", text: "O scanner identificou vulnerabilidades críticas que passavam despercebidas. Suporte técnico incrível e dashboard intuitivo.", result: "12 vulnerabilidades corrigidas" },
  { name: "Juliana Rocha", role: "Fundadora", company: "Mimos Kids", initials: "JR", text: "Plataforma simples e poderosa. Hoje meus clientes confiam mais na loja graças aos selos de segurança da Zettai.", result: "+34% de conversão" },
  { name: "Rafael Augusto", role: "Diretor de TI", company: "MegaShop", initials: "RA", text: "O chatbot com IA economiza horas do nosso time. Recomendo para qualquer e-commerce que leva segurança a sério.", result: "−60% chamados" },
  { name: "Patrícia Lima", role: "Gerente de E-commerce", company: "Casa & Decor", initials: "PL", text: "A Zettai nos ajudou a identificar falhas importantes no nosso e-commerce antes que virassem problemas reais.", result: "Risco reduzido" },
  { name: "Diego Faria", role: "Desenvolvedor Full-Stack", company: "Outletz", initials: "DF", text: "O dashboard é extremamente intuitivo e o scanner transmite muita confiança. Integração levou minutos.", result: "Setup em 5 min" },
  { name: "Bruna Castro", role: "COO", company: "Bella Cosméticos", initials: "BC", text: "Gostamos da praticidade do chatbot e da rapidez nas análises. Nosso time conseguiu focar em estratégia.", result: "+40% produtividade" },
  { name: "Henrique Alves", role: "CEO", company: "GameStorePro", initials: "HA", text: "A plataforma passa sensação de software profissional desde o primeiro acesso. Vale cada centavo do investimento.", result: "ROI em 30 dias" },
];

const cases = [
  { title: "LojaX", desc: "Reduziu vulnerabilidades em 78% após utilizar o scanner da Zettai Security em apenas 2 meses.", metric: "−78%" },
  { title: "ShopFast", desc: "Implementou o dashboard analítico e diminuiu o tempo de resposta a incidentes em 65%.", metric: "−65%" },
  { title: "ModaPlus", desc: "Aumentou a confiança dos clientes com selos de segurança e elevou a taxa de conversão em 42%.", metric: "+42%" },
];

const metrics = [
  { icon: TrendingUp, value: "+2.300", label: "análises realizadas" },
  { icon: ShieldCheck, value: "97%", label: "de satisfação" },
  { icon: Users, value: "+500", label: "usuários cadastrados" },
  { icon: Activity, value: "24/7", label: "monitoramento ativo" },
];

const Depoimentos = () => {
  const [page, setPage] = useState(0);
  const perPage = 4;
  const pages = Math.ceil(testimonials.length / perPage);
  const current = testimonials.slice(page * perPage, page * perPage + perPage);

  useEffect(() => {
    const t = setInterval(() => setPage((p) => (p + 1) % pages), 7000);
    return () => clearInterval(t);
  }, [pages]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 flex-1 w-full">
        {/* Hero */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 -z-10 opacity-30 blur-3xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20" />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Confiança comprovada</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-cyber mb-4">Depoimentos de quem confia</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mais de 500 e-commerces brasileiros já contam com a Zettai Security para proteger seus negócios.
          </p>
        </div>

        {/* Métricas */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
          {metrics.map((m) => (
            <div key={m.label} className="card-cyber p-5 text-center hover-scale">
              <m.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-black text-gradient-cyber">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
            </div>
          ))}
        </section>

        {/* Carrossel */}
        <section className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">O que nossos clientes dizem</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setPage((p) => (p - 1 + pages) % pages)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setPage((p) => (p + 1) % pages)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div key={page} className="grid md:grid-cols-2 gap-6 animate-fade-in">
            {current.map((t) => (
              <div key={t.name} className="card-cyber p-6 space-y-4 hover-scale relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
                <Quote className="h-8 w-8 text-primary/60" />
                <p className="text-foreground leading-relaxed italic">"{t.text}"</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-primary-foreground text-sm">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
                    </div>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium whitespace-nowrap">{t.result}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-2 rounded-full transition-all ${i === page ? "w-8 bg-primary" : "w-2 bg-muted"}`}
                aria-label={`Página ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Cases */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-mono tracking-widest text-primary/80 uppercase mb-2">Cases de sucesso</span>
            <h2 className="text-3xl font-bold text-gradient-cyber">Resultados reais</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((c) => (
              <div key={c.title} className="card-cyber p-6 hover-scale border-glow">
                <p className="text-4xl font-black text-gradient-cyber mb-2">{c.metric}</p>
                <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Depoimentos;
