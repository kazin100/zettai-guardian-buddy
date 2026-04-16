import { useState } from "react";
import { Crown, CheckCircle2, Shield, Bot, ScanSearch, BarChart3, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const benefits = [
  { icon: Bot, text: "Chatbot ilimitado (sem limite de mensagens)" },
  { icon: ScanSearch, text: "Scanner de vulnerabilidades ilimitado" },
  { icon: BarChart3, text: "Acesso completo ao Dashboard analítico" },
  { icon: Shield, text: "Relatórios detalhados de segurança" },
];

const Assinatura = () => {
  const { user } = useAuth();
  const { isPremium, upgradeToPremium } = useProfile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activating, setActivating] = useState(false);

  const handleActivate = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setActivating(true);
    await upgradeToPremium();
    toast({ title: "🎉 Plano Premium ativado!", description: "Você agora tem acesso completo a todos os recursos." });
    setActivating(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <Crown className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">Plano Premium</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Desbloqueie o <span className="text-gradient-cyber">Zettai Security</span> completo
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Acesso ilimitado ao chatbot, scanner e dashboard analítico para proteger seu e-commerce.
            </p>
          </div>

          <div className="card-cyber p-8 border-glow">
            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-muted-foreground text-lg">R$</span>
                <span className="text-5xl font-black text-gradient-cyber">29,90</span>
                <span className="text-muted-foreground text-sm">/mês</span>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <b.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{b.text}</span>
                  <CheckCircle2 className="h-4 w-4 text-primary ml-auto shrink-0" />
                </div>
              ))}
            </div>

            {/* CTA */}
            {isPremium ? (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 text-primary font-medium">
                  <Crown className="h-5 w-5" />
                  Você já é Premium!
                </div>
              </div>
            ) : (
              <Button
                variant="cyber"
                className="w-full gap-2 py-6 text-base"
                onClick={handleActivate}
                disabled={activating}
              >
                {activating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Crown className="h-5 w-5" />}
                {activating ? "Ativando..." : "Ativar Plano Premium"}
              </Button>
            )}

            <p className="text-xs text-muted-foreground text-center mt-4">
              Simulação de pagamento para fins acadêmicos (TCC).
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assinatura;
