import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Mail, Lock, Loader2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast({ title: "Conta criada!", description: "Verifique seu email para confirmar." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.05)_0%,transparent_70%)]" />

      <div className="card-cyber p-8 w-full max-w-md border-glow relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gradient-cyber">Zettai Security</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            {isSignUp ? "Criar Conta" : "Entrar"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isSignUp ? "Crie sua conta para acessar" : "Acesse a plataforma de segurança"}
          </p>
        </div>

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
                className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          <Button variant="cyber" className="w-full" type="submit" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : isSignUp ? "Criar Conta" : "Entrar"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {isSignUp ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary hover:underline font-medium">
            {isSignUp ? "Entrar" : "Criar conta"}
          </button>
        </p>

        <div className="text-center mt-4">
          <Link to="/">
            <Button variant="cyber-outline" size="sm" className="gap-2">
              <Home className="h-4 w-4" /> Voltar para Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
