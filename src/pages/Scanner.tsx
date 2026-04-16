import { useState } from "react";
import { ScanSearch, Shield, AlertTriangle, CheckCircle2, XCircle, Loader2, Lock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/useProfile";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

interface ScanResult {
  url: string;
  https: boolean;
  headers: { name: string; present: boolean; value?: string }[];
  server?: string;
  score: number;
  timestamp: string;
}

const Scanner = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");
  const { profile, isPremium, decrementScans } = useProfile();

  const canScan = isPremium || (profile?.analises_restantes ?? 0) > 0;

  const handleScan = async () => {
    if (!url.trim() || !canScan) return;
    setLoading(true);
    setError("");
    setResult(null);

    if (!isPremium) {
      await decrementScans();
    }

    try {
      const { data, error: fnError } = await supabase.functions.invoke("scanner", {
        body: { url: url.trim() },
      });
      if (fnError) throw fnError;
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Erro ao realizar a análise. Verifique a URL.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-primary";
    if (score >= 50) return "text-yellow-400";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <ScanSearch className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">Scanner de Vulnerabilidades</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Analise a segurança do seu <span className="text-gradient-cyber">E-commerce</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Insira a URL do site para verificar HTTPS, headers de segurança, servidor e possíveis vulnerabilidades.
            </p>
            {profile && !isPremium && (
              <p className="text-xs text-muted-foreground mt-2">
                Análises restantes hoje: <span className="text-primary font-bold">{profile.analises_restantes}/1</span>
              </p>
            )}
          </div>

          {/* Limit banner */}
          {!canScan && !isPremium && (
            <div className="card-cyber p-6 border-glow mb-8 text-center space-y-4">
              <Lock className="h-8 w-8 text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">
                🔒 Você atingiu o limite gratuito de análises diárias.
              </p>
              <Link to="/assinatura">
                <Button variant="cyber" className="gap-2">
                  <Crown className="h-4 w-4" /> Assinar Plano Premium
                </Button>
              </Link>
            </div>
          )}

          {/* Input */}
          <div className="card-cyber p-6 border-glow mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                placeholder="https://exemplo.com.br"
                disabled={!canScan}
                className="flex-1 bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 font-mono text-sm disabled:opacity-50"
              />
              <Button variant="cyber" onClick={handleScan} disabled={loading || !canScan} className="gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanSearch className="h-4 w-4" />}
                {loading ? "Analisando..." : "Analisar"}
              </Button>
            </div>
          </div>

          {error && (
            <div className="card-cyber p-4 border-destructive/50 mb-6 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div className="card-cyber p-8 text-center border-glow">
                <div className={`text-6xl font-black mb-2 ${getScoreColor(result.score)}`}>{result.score}</div>
                <div className="text-muted-foreground text-sm">Pontuação de Segurança / 100</div>
                <div className="text-xs text-muted-foreground mt-1 font-mono">{result.url}</div>
              </div>

              <div className="card-cyber p-4 flex items-center gap-3">
                {result.https ? <CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> : <XCircle className="h-5 w-5 text-destructive shrink-0" />}
                <div>
                  <div className="font-medium text-sm">HTTPS</div>
                  <div className="text-xs text-muted-foreground">{result.https ? "Conexão segura ativa" : "Sem HTTPS - Conexão não segura!"}</div>
                </div>
              </div>

              {result.server && (
                <div className="card-cyber p-4 flex items-center gap-3">
                  <Shield className="h-5 w-5 text-accent shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Servidor</div>
                    <div className="text-xs text-muted-foreground font-mono">{result.server}</div>
                  </div>
                </div>
              )}

              <div className="card-cyber p-4">
                <h3 className="font-semibold mb-3 text-sm">Headers de Segurança</h3>
                <div className="space-y-2">
                  {result.headers.map((header) => (
                    <div key={header.name} className="flex items-center gap-2 text-sm">
                      {header.present ? <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> : <XCircle className="h-4 w-4 text-destructive shrink-0" />}
                      <span className="font-mono text-xs">{header.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Scanner;
