import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Flame, Lock, ShieldCheck, Activity, Layers } from "lucide-react";

const services = [
  {
    icon: Flame,
    title: "Firewall",
    description: "Camada de proteção que filtra tráfego malicioso, bloqueia bots e ataques DDoS antes que cheguem ao seu e-commerce.",
  },
  {
    icon: Lock,
    title: "SSL / HTTPS",
    description: "Certificados SSL configurados para criptografar todas as comunicações entre cliente e servidor, evitando interceptação de dados sensíveis.",
  },
  {
    icon: ShieldCheck,
    title: "Antifraude",
    description: "Análise inteligente de transações para detectar comportamentos suspeitos, chargebacks e tentativas de fraude em tempo real.",
  },
  {
    icon: Activity,
    title: "Monitoramento com IA",
    description: "Inteligência artificial monitora 24/7 padrões de acesso, identifica anomalias e dispara alertas automáticos contra ameaças.",
  },
  {
    icon: Layers,
    title: "Visão Geral dos Serviços",
    description: "Todos os serviços integrados em uma única plataforma, com dashboard centralizado e relatórios consolidados de segurança.",
  },
];

const Servicos = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-16 flex-1 w-full">
      <h1 className="text-3xl md:text-4xl font-bold text-gradient-cyber text-center mb-4">Nossos Serviços</h1>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Soluções completas de segurança para proteger seu e-commerce em todas as camadas.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((s) => (
          <div key={s.title} className="card-cyber p-6 space-y-4 hover-scale">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">{s.title}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Servicos;