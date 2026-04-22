import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Mail, Lock, Loader2, Home, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isEmailValid = email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isConfirmPasswordValid = confirmPassword.length > 0 && password === confirmPassword;
  const emailTouched = email.length > 0;
  const passwordTouched = password.length > 0;
  const confirmPasswordTouched = confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    if (isSignUp && password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
         toast({ title: "Conta criada!", description: "Verifique seu email para confirmar." });
         setConfirmPassword("");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError("Email ou senha inválidos");
      toast({ title: "Erro", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const inputBorder = (touched: boolean, valid: boolean) =>
    !touched
      ? "border-border"
      : valid
        ? "border-emerald-500/60"
        : "border-destructive/50";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.05)_0%,transparent_70%)]" />

      <div
        className={`card-cyber p-8 w-full max-w-md border-glow relative z-10 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
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

        {error && (
          <div className="mb-4 flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
            <XCircle className="h-4 w-4 shrink-0" />
            <span>❌ {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="seu@email.com"
                required
                className={`w-full bg-input border rounded-lg pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors ${inputBorder(emailTouched, isEmailValid)}`}
              />
              {emailTouched && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isEmailValid ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive/60" />
                  )}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                required
                minLength={6}
                className={`w-full bg-input border rounded-lg pl-10 pr-20 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors ${inputBorder(passwordTouched, isPasswordValid)}`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {passwordTouched && (
                  isPasswordValid ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive/60" />
                  )
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {passwordTouched && !isPasswordValid && (
              <p className="text-xs text-muted-foreground mt-1">Mínimo 6 caracteres</p>
            )}
          </div>

          {isSignUp && (
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Confirmar senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                  placeholder="Repita sua senha"
                  required={isSignUp}
                  minLength={6}
                  className={`w-full bg-input border rounded-lg pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors ${inputBorder(confirmPasswordTouched, isConfirmPasswordValid)}`}
                />
                {confirmPasswordTouched && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isConfirmPasswordValid ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive/60" />
                    )}
                  </span>
                )}
              </div>
              {confirmPasswordTouched && !isConfirmPasswordValid && (
                <p className="text-xs text-destructive mt-1">❌ As senhas não coincidem</p>
              )}
              {confirmPasswordTouched && isConfirmPasswordValid && (
                <p className="text-xs text-primary mt-1">✅ Senhas coincidem</p>
              )}
            </div>
          )}

          <Button variant="cyber" className="w-full" type="submit" disabled={loading || (isSignUp && !isConfirmPasswordValid)}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : isSignUp ? "Criar Conta" : "Entrar"}
          </Button>
        </form>

        {!isSignUp && (
          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Esqueci minha senha
            </Link>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground mt-4">
          {isSignUp ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
          <button onClick={() => { setIsSignUp(!isSignUp); setError(""); setConfirmPassword(""); }} className="text-primary hover:underline font-medium">
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
