import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, TrendingDown, Scale, Users, ExternalLink } from "lucide-react";

const benefits = [
  {
    icon: TrendingDown,
    title: "Redução de Fraudes",
    description: "Sistemas de segurança robustos reduzem drasticamente tentativas de fraude, protegendo receita e reputação do e-commerce.",
    link: "https://www.cert.br/stats/",
    linkLabel: "CERT.br - Estatísticas",
  },
  {
    icon: Shield,
    title: "Proteção contra Ataques",
    description: "Headers de segurança, HTTPS e boas práticas previnem ataques como XSS, SQL Injection e CSRF que podem comprometer dados de clientes.",
    link: "https://owasp.org/www-project-top-ten/",
    linkLabel: "OWASP Top 10",
  },
  {
    icon: Scale,
    title: "Conformidade com a LGPD",
    description: "A Lei Geral de Proteção de Dados exige que e-commerces protejam dados pessoais. Investir em segurança garante conformidade e evita multas.",
    link: "https://www.gov.br/anpd/pt-br",
    linkLabel: "ANPD - Autoridade Nacional",
  },
  {
    icon: Users,
    title: "Confiança do Cliente",
    description: "Clientes compram mais em lojas que demonstram segurança. Selos de segurança e HTTPS aumentam a taxa de conversão em até 42%.",
    link: "https://www.consumidor.gov.br/",
    linkLabel: "Consumidor.gov.br",
  },
];

const Benefits = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gradient-cyber text-center mb-4">Ver Benefícios</h1>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Descubra por que investir em segurança digital é essencial para o sucesso do seu e-commerce.
      </p>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {benefits.map((b) => (
          <div key={b.title} className="card-cyber p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <b.icon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">{b.title}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">{b.description}</p>
            <a href={b.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
              <ExternalLink className="h-4 w-4" /> {b.linkLabel}
            </a>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Benefits;
