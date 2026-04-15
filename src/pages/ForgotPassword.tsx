import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Mail, Loader2, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
    } catch {}
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.05)_0%,transparent_70%)]" />

      <div className={`card-cyber p-8 w-full max-w-md border-glow relative z-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gradient-cyber">Zettai Security</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Recuperar Senha</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Insira seu email para receber instruções de recuperação
          </p>
        </div>

        {sent ? (
          <div className="space-y-6 text-center">
            <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-4">
              <p className="text-sm text-foreground">
                Se o email estiver cadastrado, você receberá instruções para redefinir sua senha.
              </p>
            </div>
            <Link to="/login">
              <Button variant="cyber" className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" /> Voltar para Login
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            <Button variant="cyber" className="w-full" type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Recuperar Senha"}
            </Button>
          </form>
        )}

        <div className="flex justify-between mt-6">
          <Link to="/login" className="text-sm text-primary hover:underline font-medium">
            Voltar para Login
          </Link>
          <Link to="/">
            <Button variant="cyber-outline" size="sm" className="gap-2">
              <Home className="h-4 w-4" /> Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
