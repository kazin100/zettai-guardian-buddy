import { Bot, ScanSearch, BarChart3, Globe, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Chatbot com IA",
    description: "Assistente inteligente especializado em segurança para e-commerces, pronto para tirar suas dúvidas.",
  },
  {
    icon: ScanSearch,
    title: "Scanner de Vulnerabilidades",
    description: "Análise automatizada de segurança: HTTPS, headers, servidor e páginas sensíveis.",
  },
  {
    icon: BarChart3,
    title: "Dashboard Analítico",
    description: "Visualize dados de acessos, análises realizadas e vulnerabilidades encontradas.",
  },
  {
    icon: Globe,
    title: "Geolocalização",
    description: "Rastreamento de localização dos usuários com consentimento para análises regionais.",
  },
  {
    icon: ShieldCheck,
    title: "Boas Práticas",
    description: "Orientações e alertas sobre as melhores práticas de segurança para lojas virtuais.",
  },
  {
    icon: Zap,
    title: "Automação Inteligente",
    description: "Processos automatizados para análise contínua e geração de relatórios.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recursos <span className="text-gradient-cyber">Poderosos</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ferramentas avançadas para proteger seu e-commerce contra ameaças digitais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="card-cyber p-6 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
