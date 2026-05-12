import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { QrCode, Barcode, CreditCard, Lock, CheckCircle2, Loader2, Copy, Download, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useProfile, PLAN_CONFIG, type PlanTier } from "@/hooks/useProfile";
import { toast } from "sonner";

type Method = "pix" | "boleto" | "cartao";

const methods: { id: Method; label: string; description: string; icon: typeof QrCode }[] = [
  { id: "pix", label: "PIX", description: "Aprovação imediata", icon: QrCode },
  { id: "boleto", label: "Boleto Bancário", description: "Vencimento em 3 dias", icon: Barcode },
  { id: "cartao", label: "Cartão de Crédito/Débito", description: "Visa, Master, Elo", icon: CreditCard },
];

const genTxId = () =>
  "TX-" + Math.random().toString(36).slice(2, 8).toUpperCase() + "-" + Date.now().toString().slice(-6);

const genPixCode = () =>
  "00020126360014BR.GOV.BCB.PIX0114zettai" +
  Math.random().toString(36).slice(2, 10).toUpperCase() +
  "5204000053039865802BR5913ZETTAI SEC6009SAO PAULO62070503***6304" +
  Math.random().toString(16).slice(2, 6).toUpperCase();

const genBoletoCode = () => {
  const block = () => Math.floor(10000 + Math.random() * 89999).toString();
  return `${block()}.${block()} ${block()}.${block()} ${block()}.${block()} 1 ${Date.now().toString().slice(-14)}`;
};

const maskCardNumber = (v: string) =>
  v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ").trim();
const maskExpiry = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};
const maskCvv = (v: string) => v.replace(/\D/g, "").slice(0, 4);

const Checkout = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscribeToPlan } = useProfile();

  const planParam = (params.get("plan") as PlanTier) || "premium";
  const plan: Exclude<PlanTier, "gratuito"> = planParam === "basico" ? "basico" : "premium";
  const planInfo = PLAN_CONFIG[plan];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [method, setMethod] = useState<Method>("pix");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const pixCode = useMemo(() => genPixCode(), []);
  const boletoCode = useMemo(() => genBoletoCode(), []);
  const dueDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toLocaleDateString("pt-BR");
  }, []);

  // Card form
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const validateCard = () => {
    if (cardName.trim().length < 3) return "Informe o nome impresso no cartão";
    if (cardNumber.replace(/\s/g, "").length < 13) return "Número do cartão inválido";
    if (!/^\d{2}\/\d{2}$/.test(cardExp)) return "Validade inválida (MM/AA)";
    if (cardCvv.length < 3) return "CVV inválido";
    return null;
  };

  const handleFinalize = async () => {
    if (!user) {
      toast.info("Faça login para concluir sua assinatura");
      navigate(`/login?redirect=/checkout?plan=${plan}`);
      return;
    }
    if (method === "cartao") {
      const err = validateCard();
      if (err) {
        toast.error(err);
        return;
      }
    }
    setProcessing(true);
    const txId = genTxId();
    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 2200));
    try {
      await subscribeToPlan(plan, {
        metodo_pagamento: method,
        id_transacao: txId,
      });
      setSuccess(true);
      toast.success("Pagamento aprovado com sucesso!");
      setStep(3);
    } catch (e) {
      toast.error("Não foi possível processar o pagamento. Tente novamente.");
    } finally {
      setProcessing(false);
    }
  };

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado!`);
  };

  const Stepper = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
              step >= s
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground"
            }`}
          >
            {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
          </div>
          {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-primary" : "bg-border"}`} />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="pt-24 pb-16 flex-1">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link to="/assinatura" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Voltar para planos
          </Link>

          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-4">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">Checkout seguro Zettai</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Finalize sua <span className="text-gradient-cyber">assinatura</span>
            </h1>
          </div>

          <Stepper />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Steps */}
            <div className="lg:col-span-2 space-y-6">
              {step === 1 && (
                <div className="card-cyber p-6 animate-fade-in">
                  <h2 className="text-lg font-bold mb-4">Selecione o método de pagamento</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {methods.map((m) => {
                      const Icon = m.icon;
                      const active = method === m.id;
                      return (
                        <button
                          key={m.id}
                          onClick={() => setMethod(m.id)}
                          className={`p-4 rounded-xl border text-left transition-all hover:-translate-y-0.5 hover:border-primary/60 ${
                            active ? "border-primary bg-primary/10 shadow-[0_0_24px_-8px_hsl(var(--primary))]" : "border-border bg-card"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="font-semibold">{m.label}</div>
                          <div className="text-xs text-muted-foreground mt-1">{m.description}</div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button variant="cyber" onClick={() => setStep(2)}>
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="card-cyber p-6 animate-fade-in space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">Dados de pagamento</h2>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3" /> Conexão criptografada
                    </span>
                  </div>

                  {method === "pix" && (
                    <div className="space-y-4">
                      <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-muted/30 border border-border">
                        <div className="w-44 h-44 bg-white p-3 rounded-lg grid grid-cols-12 grid-rows-12 gap-[2px]">
                          {Array.from({ length: 144 }).map((_, i) => (
                            <div key={i} className={`${Math.random() > 0.5 ? "bg-black" : "bg-white"} rounded-[1px]`} />
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">Aponte a câmera do seu app bancário</div>
                      </div>
                      <div>
                        <Label className="text-xs">PIX copia e cola</Label>
                        <div className="flex gap-2 mt-1">
                          <Input value={pixCode} readOnly className="font-mono text-xs" />
                          <Button type="button" variant="cyber-outline" size="icon" onClick={() => copy(pixCode, "Código PIX")}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-yellow-500">
                        <Loader2 className="h-4 w-4 animate-spin" /> Aguardando pagamento...
                      </div>
                    </div>
                  )}

                  {method === "boleto" && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-muted/30 border border-border">
                        <Label className="text-xs">Linha digitável</Label>
                        <div className="font-mono text-xs md:text-sm mt-1 break-all">{boletoCode}</div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-xs text-muted-foreground">Vencimento</div>
                          <div className="font-semibold">{dueDate}</div>
                        </div>
                        <Button variant="cyber-outline" className="gap-2" onClick={() => copy(boletoCode, "Código de barras")}>
                          <Download className="h-4 w-4" /> Baixar Boleto
                        </Button>
                      </div>
                      <div className="text-sm text-yellow-500 flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Aguardando pagamento...
                      </div>
                    </div>
                  )}

                  {method === "cartao" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="cardName">Nome no cartão</Label>
                        <Input id="cardName" value={cardName} onChange={(e) => setCardName(e.target.value.toUpperCase())} placeholder="COMO IMPRESSO NO CARTÃO" maxLength={50} />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="cardNumber">Número do cartão</Label>
                        <Input id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(maskCardNumber(e.target.value))} placeholder="0000 0000 0000 0000" inputMode="numeric" />
                      </div>
                      <div>
                        <Label htmlFor="cardExp">Validade</Label>
                        <Input id="cardExp" value={cardExp} onChange={(e) => setCardExp(maskExpiry(e.target.value))} placeholder="MM/AA" inputMode="numeric" />
                      </div>
                      <div>
                        <Label htmlFor="cardCvv">CVV</Label>
                        <Input id="cardCvv" value={cardCvv} onChange={(e) => setCardCvv(maskCvv(e.target.value))} placeholder="123" inputMode="numeric" type="password" />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-2">
                    <Button variant="cyber-outline" onClick={() => setStep(1)} disabled={processing}>
                      Voltar
                    </Button>
                    <Button variant="cyber" onClick={handleFinalize} disabled={processing} className="gap-2">
                      {processing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Processando pagamento...
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4" /> Finalizar assinatura
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && success && (
                <div className="card-cyber p-10 animate-fade-in text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-4 animate-scale-in">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Pagamento aprovado com sucesso!</h2>
                  <p className="text-muted-foreground mb-6">
                    Seu plano <span className="text-primary font-semibold">{planInfo.label}</span> já está ativo.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="cyber" onClick={() => navigate("/dashboard")}>Ir para Dashboard</Button>
                    <Button variant="cyber-outline" onClick={() => navigate("/historico-compras")}>Ver histórico</Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Summary */}
            <aside className="card-cyber p-6 h-fit lg:sticky lg:top-24">
              <h3 className="font-bold mb-4">Resumo da compra</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plano</span>
                  <span className="font-semibold">{planInfo.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recorrência</span>
                  <span>Mensal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Método</span>
                  <span className="capitalize">{method}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-base">
                  <span>Total</span>
                  <span className="text-gradient-cyber font-bold">{planInfo.price}</span>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Pagamento simulado para fins acadêmicos. Nenhum valor real será cobrado.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;