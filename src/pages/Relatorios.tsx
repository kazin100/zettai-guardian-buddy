import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, Download, Activity, AlertTriangle, ShieldOff } from "lucide-react";

const reports = [
  { icon: Activity, title: "Atividades Recentes", description: "Resumo das últimas análises e eventos de segurança da sua conta.", date: "Atualizado hoje" },
  { icon: AlertTriangle, title: "Tentativas de Ataque", description: "Lista detalhada de tentativas de invasão bloqueadas no período.", date: "Últimos 30 dias" },
  { icon: ShieldOff, title: "Tráfego Bloqueado", description: "Volume de requisições maliciosas filtradas pelo firewall.", date: "Últimos 7 dias" },
  { icon: FileText, title: "Relatório Consolidado", description: "Documento PDF completo com todos os indicadores do mês.", date: "Mensal" },
];

const Relatorios = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-16 flex-1 w-full">
      <h1 className="text-3xl md:text-4xl font-bold text-gradient-cyber text-center mb-4">Relatórios</h1>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Acompanhe e exporte os dados de segurança do seu e-commerce.
      </p>
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {reports.map((r) => (
          <div key={r.title} className="card-cyber p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <r.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">{r.title}</h2>
                <p className="text-xs text-muted-foreground">{r.date}</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">{r.description}</p>
            <Button variant="cyber-outline" size="sm">
              <Download className="h-4 w-4 mr-2" /> Baixar relatório
            </Button>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Relatorios;