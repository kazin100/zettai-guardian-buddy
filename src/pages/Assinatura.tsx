import { useState } from "react";
import { Crown, CheckCircle2, Loader2, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfile, type PlanTier } from "@/hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type PlanCard = {
  id: PlanTier;
  name: string;
  price: string;
  period: string;
  highlight: boolean;
  icon: typeof Crown;
  features: string[];
};

const plans: PlanCard[] = [
  {
    id: "gratuito",
    name: "Gratuito",
    price: "R$ 0",
    period: "/sempre",
    highlight: false,
    icon: Sparkles,
    features: [
      "3 mensagens/dia no chatbot",
      "1 análise no scanner",
      "Acesso a conteúdos educativos",
      "Dashboard bloqueado",
    ],
  },
  {
    id: "basico",
    name: "Básico",
    price: "R$ 14,99",
    period: "/mês",
    highlight: false,
    icon: Zap,
    features: [
      "20 mensagens/dia no chatbot",
      "5 análises/dia no scanner",
      "Dashboard parcial (métricas simples)",
      "Suporte por email",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "R$ 39,99",
    period: "/mês",
    highlight: true,
    icon: Crown,
    features: [
      "Chatbot ilimitado",
      "Scanner ilimitado",
      "Dashboard completo + gráficos",
      "Geolocalização e relatórios detalhados",
    ],
  },
];

const Assinatura = () => {
  const { user } = useAuth();
  const { plan: currentPlan, subscribeToPlan } = useProfile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activating, setActivating] = useState<PlanTier | null>(null);

  const handleSubscribe = async (planId: PlanTier) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (planId === "gratuito" || planId === currentPlan) return;
    setActivating(planId);
    await subscribeToPlan(planId);
    toast({
      title: planId === "premium" ? "🎉 Plano Premium ativado!" : "✅ Plano Básico ativado!",
      description: "Você agora tem acesso aos recursos do plano.",
    });
    setActivating(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="pt-24 pb-16 flex-1">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <Crown className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">Planos Zettai Security</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Escolha o plano ideal para seu <span className="text-gradient-cyber">e-commerce</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Compare os recursos e desbloqueie o nível de proteção que você precisa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => {
              const isCurrent = currentPlan === p.id;
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className={`card-cyber p-8 flex flex-col relative ${
                    p.highlight ? "border-glow scale-100 md:scale-105" : ""
                  }`}
                >
                  {p.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-cyber text-primary-foreground text-xs font-bold">
                      MAIS POPULAR
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{p.name}</h3>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-gradient-cyber">{p.price}</span>
                      <span className="text-muted-foreground text-sm">{p.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {isCurrent ? (
                    <div className="text-center py-3 border border-primary/30 rounded-lg bg-primary/5">
                      <span className="text-sm text-primary font-medium">✓ Plano atual</span>
                    </div>
                  ) : p.id === "gratuito" ? (
                    <Button variant="cyber-outline" disabled className="w-full">
                      Plano padrão
                    </Button>
                  ) : (
                    <Button
                      variant={p.highlight ? "cyber" : "cyber-outline"}
                      className="w-full gap-2"
                      onClick={() => handleSubscribe(p.id)}
                      disabled={activating !== null}
                    >
                      {activating === p.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                      {activating === p.id ? "Ativando..." : `Assinar ${p.name}`}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-8">
            💡 Simulação de pagamento para fins acadêmicos (TCC). Nenhum valor real é cobrado.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assinatura;
