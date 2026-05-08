import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mariana Silva",
    role: "CEO, Loja Bella Moda",
    text: "Reduzimos em 87% as tentativas de fraude no primeiro mês. A Zettai Security é parte essencial do nosso e-commerce.",
    result: "−87% de fraudes",
  },
  {
    name: "Carlos Mendes",
    role: "CTO, TechStore BR",
    text: "O scanner identificou vulnerabilidades críticas que passavam despercebidas. Suporte técnico incrível.",
    result: "12 vulnerabilidades corrigidas",
  },
  {
    name: "Juliana Rocha",
    role: "Fundadora, Mimos Kids",
    text: "Plataforma simples e poderosa. Hoje meus clientes confiam mais na loja graças aos selos de segurança.",
    result: "+34% de conversão",
  },
  {
    name: "Rafael Augusto",
    role: "Diretor, MegaShop",
    text: "O chatbot com IA economiza horas do nosso time. Recomendo para qualquer e-commerce que leva segurança a sério.",
    result: "−60% chamados de suporte",
  },
];

const Depoimentos = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-16 flex-1 w-full">
      <h1 className="text-3xl md:text-4xl font-bold text-gradient-cyber text-center mb-4">Depoimentos</h1>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        O que nossos clientes dizem sobre a Zettai Security.
      </p>
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t) => (
          <div key={t.name} className="card-cyber p-6 space-y-4">
            <Quote className="h-8 w-8 text-primary/60" />
            <p className="text-foreground leading-relaxed italic">"{t.text}"</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <div className="pt-3 border-t border-border flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{t.result}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Depoimentos;