import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, AlertTriangle, Lock, CheckCircle2 } from "lucide-react";

const tips = [
  "Sempre utilize HTTPS com certificado SSL válido",
  "Configure headers de segurança: CSP, HSTS, X-Frame-Options",
  "Nunca armazene senhas em texto puro — use hashing (bcrypt)",
  "Implemente autenticação de dois fatores (2FA)",
  "Mantenha dependências e frameworks atualizados",
  "Valide todas as entradas do usuário no frontend e backend",
  "Utilize prepared statements para prevenir SQL Injection",
  "Limite tentativas de login para evitar ataques de força bruta",
  "Faça backups regulares do banco de dados",
  "Monitore logs de acesso e erros constantemente",
];

const attacks = [
  { name: "SQL Injection", desc: "Injeção de código SQL malicioso em campos de formulário para acessar ou manipular o banco de dados." },
  { name: "Cross-Site Scripting (XSS)", desc: "Inserção de scripts maliciosos em páginas web que são executados no navegador de outros usuários." },
  { name: "Cross-Site Request Forgery (CSRF)", desc: "Forçar um usuário autenticado a executar ações não intencionais em uma aplicação web." },
  { name: "Phishing", desc: "Criação de páginas falsas que imitam sites legítimos para roubar credenciais de acesso." },
  { name: "DDoS", desc: "Ataque de negação de serviço que sobrecarrega o servidor com tráfego excessivo, tornando-o indisponível." },
];

const checklist = [
  "Certificado SSL ativo e válido",
  "Headers de segurança configurados",
  "Firewall de aplicação web (WAF)",
  "Política de senhas fortes",
  "Backups automáticos diários",
  "Monitoramento de vulnerabilidades",
  "Política de privacidade atualizada",
  "Conformidade com LGPD",
];

const SecurityCenter = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-16 space-y-16 flex-1 w-full">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient-cyber mb-4">Dicas</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Conteúdo educativo sobre segurança digital para proteger seu e-commerce.
        </p>
      </div>

      {/* Tips */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Dicas de Segurança</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 card-cyber p-4">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span className="text-muted-foreground text-sm">{tip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Attacks */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          <h2 className="text-2xl font-bold text-foreground">Tipos de Ataques</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {attacks.map((a) => (
            <div key={a.name} className="card-cyber p-5 space-y-2">
              <h3 className="font-semibold text-foreground">{a.name}</h3>
              <p className="text-sm text-muted-foreground">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Checklist */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Lock className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Checklist de Proteção</h2>
        </div>
        <div className="card-cyber p-6">
          <div className="grid md:grid-cols-2 gap-3">
            {checklist.map((item, i) => (
              <label key={i} className="flex items-center gap-3 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" className="accent-[hsl(var(--primary))] h-4 w-4" />
                {item}
              </label>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default SecurityCenter;
