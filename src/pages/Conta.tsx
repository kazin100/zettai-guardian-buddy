import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfile, PLAN_CONFIG } from "@/hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { User, KeyRound, CreditCard, LogOut, History } from "lucide-react";

const Conta = () => {
  const { user, signOut } = useAuth();
  const { profile, plan } = useProfile();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 flex-1 w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient-cyber text-center mb-4">Minha Conta</h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Gerencie seus dados, segurança e formas de pagamento.
        </p>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="card-cyber p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><User className="h-6 w-6 text-primary" /></div>
              <h2 className="text-xl font-semibold">Dados Cadastrais</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Nome:</span> <span className="text-foreground">{profile?.full_name ?? "—"}</span></div>
              <div><span className="text-muted-foreground">E-mail:</span> <span className="text-foreground">{user?.email ?? "—"}</span></div>
              <div><span className="text-muted-foreground">Telefone:</span> <span className="text-foreground">{profile?.phone ?? "—"}</span></div>
              <div><span className="text-muted-foreground">Plano atual:</span> <span className="text-primary font-medium">{PLAN_CONFIG[plan].label}</span></div>
            </div>
            <Link to="/settings"><Button variant="cyber-outline" size="sm">Editar dados</Button></Link>
          </div>

          <div className="card-cyber p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><KeyRound className="h-6 w-6 text-primary" /></div>
              <h2 className="text-xl font-semibold">Alterar Senha</h2>
            </div>
            <p className="text-muted-foreground text-sm">Mantenha sua conta segura atualizando sua senha periodicamente.</p>
            <Link to="/settings"><Button variant="cyber-outline" size="sm">Alterar senha</Button></Link>
          </div>

          <div className="card-cyber p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><CreditCard className="h-6 w-6 text-primary" /></div>
              <h2 className="text-xl font-semibold">Formas de Pagamento</h2>
            </div>
            <p className="text-muted-foreground text-sm">Aceitamos cartão de crédito, boleto e PIX. Gerencie sua assinatura na página de planos.</p>
            <Link to="/assinatura"><Button variant="cyber-outline" size="sm">Gerenciar assinatura</Button></Link>
          </div>

          <div className="card-cyber p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><History className="h-6 w-6 text-primary" /></div>
              <h2 className="text-xl font-semibold">Histórico de Compras</h2>
            </div>
            <p className="text-muted-foreground text-sm">Veja todas as suas transações e faturas anteriores.</p>
            <Link to="/historico-compras"><Button variant="cyber-outline" size="sm">Ver histórico</Button></Link>
          </div>

          <div className="card-cyber p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10"><LogOut className="h-6 w-6 text-destructive" /></div>
              <h2 className="text-xl font-semibold">Sair da Conta</h2>
            </div>
            <p className="text-muted-foreground text-sm">Encerre sua sessão atual neste dispositivo.</p>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Sair
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Conta;