import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ScanSearch, Bot, BarChart3, Shield, Lock, Activity, Zap, Eye, Globe,
  AlertTriangle, MessageSquare, Clock, Database, TrendingUp, Cpu, Sparkles,
  CheckCircle2, ArrowRight, Server, FileBarChart,
} from "lucide-react";

const scannerFeatures = [
  { icon: Lock, label: "Análise HTTPS", desc: "Verifica criptografia TLS/SSL e segurança da conexão." },
  { icon: Shield, label: "Headers de Segurança", desc: "Detecta CSP, HSTS, X-Frame e cabeçalhos ausentes." },
  { icon: Server, label: "Portas e Servidor", desc: "Identifica serviços expostos e versões vulneráveis." },
  { icon: CheckCircle2, label: "Certificado SSL", desc: "Valida emissor, expiração e cadeia de certificação." },
  { icon: AlertTriangle, label: "Proteção contra Ataques", desc: "Identifica vetores comuns de XSS, CSRF e injeções." },
  { icon: Eye, label: "Análise Preventiva", desc: "Recomendações automáticas para mitigação de riscos." },
];

const chatbotFeatures = [
  { icon: Bot, label: "Suporte Automatizado", desc: "Responde dúvidas sem intervenção humana." },
  { icon: Zap, label: "Respostas Rápidas", desc: "IA otimizada com baixa latência." },
  { icon: Clock, label: "Atendimento 24/7", desc: "Disponível a qualquer momento, sem filas." },
  { icon: Database, label: "Histórico Salvo", desc: "Conversas persistidas para consulta posterior." },
  { icon: Sparkles, label: "Assistência Inteligente", desc: "Contextual e adaptada ao seu e-commerce." },
];

const dashboardFeatures = [
  { icon: TrendingUp, label: "Gráficos em Tempo Real", desc: "Visualize ameaças conforme acontecem." },
  { icon: BarChart3, label: "Métricas Visuais", desc: "KPIs claros e fáceis de interpretar." },
  { icon: Activity, label: "Monitoramento Contínuo", desc: "Operação 24/7 sem interrupções." },
  { icon: AlertTriangle, label: "Indicadores de Risco", desc: "Alertas categorizados por severidade." },
  { icon: FileBarChart, label: "Relatórios Rápidos", desc: "Exportação em poucos cliques." },
];

const differentials = [
  { icon: Cpu, title: "Monitoramento Inteligente", desc: "IA analisa padrões e identifica anomalias automaticamente." },
  { icon: Shield, title: "Proteção Contínua", desc: "Defesa ativa em todas as camadas, sem janelas vulneráveis." },
  { icon: Sparkles, title: "Tecnologia Moderna", desc: "Stack atualizado com práticas de segurança de ponta." },
  { icon: Globe, title: "Foco em E-commerce", desc: "Soluções pensadas para o varejo digital brasileiro." },
  { icon: Bot, title: "Automação com IA", desc: "Tarefas repetitivas resolvidas por agentes inteligentes." },
  { icon: Zap, title: "Plataforma Intuitiva", desc: "Curva de aprendizado mínima, valor imediato." },
];

const ServiceBlock = ({
  icon: Icon, badge, title, description, features,
}: { icon: any; badge: string; title: string; description: string; features: { icon: any; label: string; desc: string }[] }) => (
  <section className="card-cyber p-8 md:p-10 space-y-8 backdrop-blur-sm">
    <div className="flex flex-col md:flex-row md:items-center gap-6">
      <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30 w-fit">
        <Icon className="h-10 w-10 text-primary" />
      </div>
      <div className="space-y-2 flex-1">
        <span className="inline-block text-xs font-mono tracking-widest text-primary/80 uppercase">{badge}</span>
        <h2 className="text-2xl md:text-3xl font-bold text-gradient-cyber">{title}</h2>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((f) => (
        <div key={f.label} className="group p-4 rounded-xl border border-border/60 bg-background/40 hover:border-primary/50 hover:bg-primary/5 transition-all hover-scale">
          <f.icon className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
          <p className="font-semibold text-sm text-foreground">{f.label}</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const Servicos = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="flex-1 pt-24 pb-16">
      {/* Hero */}
      <section className="container mx-auto px-4 mb-16 text-center relative">
        <div className="absolute inset-0 -z-10 opacity-30 blur-3xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20" />
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary font-medium">Soluções de Segurança Empresarial</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Tecnologia <span className="text-gradient-cyber">avançada</span> para proteger seu e-commerce
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Plataforma completa que une scanner inteligente, IA conversacional e dashboard analítico
          em uma única solução pensada para o varejo digital.
        </p>
      </section>

      <div className="container mx-auto px-4 max-w-6xl space-y-12">
        <ServiceBlock
          icon={ScanSearch}
          badge="Serviço 01"
          title="Scanner Inteligente"
          description="O Scanner Inteligente da Zettai Security realiza análises automáticas em sites e e-commerces para identificar vulnerabilidades, falhas de configuração e riscos de segurança digital."
          features={scannerFeatures}
        />
        <ServiceBlock
          icon={Bot}
          badge="Serviço 02"
          title="Chatbot com IA"
          description="Nosso assistente inteligente utiliza automação e IA para responder dúvidas, auxiliar usuários e fornecer orientações rápidas sobre segurança digital."
          features={chatbotFeatures}
        />
        <ServiceBlock
          icon={BarChart3}
          badge="Serviço 03"
          title="Dashboard Analítico"
          description="O dashboard centraliza métricas, análises e dados de segurança para facilitar a visualização de ameaças e o monitoramento do sistema."
          features={dashboardFeatures}
        />

        {/* Diferenciais */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <span className="inline-block text-xs font-mono tracking-widest text-primary/80 uppercase">Diferenciais</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-cyber">Por que escolher a Zettai?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Combinamos inteligência artificial, automação e design moderno para entregar uma experiência única.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {differentials.map((d) => (
              <div key={d.title} className="card-cyber p-6 hover-scale group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
                <d.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="card-cyber border-glow p-10 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Pronto para proteger seu e-commerce?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Experimente nosso scanner gratuitamente ou conheça os planos para uso ilimitado.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/scanner"><Button variant="cyber" className="gap-2">Testar Scanner <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link to="/assinatura"><Button variant="outline">Ver Planos</Button></Link>
          </div>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default Servicos;
