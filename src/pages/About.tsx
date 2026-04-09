import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Code, Brain, BarChart3 } from "lucide-react";

const techs = [
  { name: "React + TypeScript", desc: "Frontend moderno com tipagem estática e componentes reutilizáveis." },
  { name: "Tailwind CSS", desc: "Estilização utilitária para design responsivo e consistente." },
  { name: "Supabase", desc: "Backend completo com autenticação, banco de dados e Edge Functions." },
  { name: "Lovable AI", desc: "Integração de IA para o chatbot inteligente de segurança." },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-16 max-w-3xl space-y-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient-cyber mb-4">Sobre o Projeto</h1>
        <p className="text-muted-foreground">Trabalho de Conclusão de Curso — Desenvolvimento de Sistemas</p>
      </div>

      <section className="card-cyber p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">O que é o Zettai Security?</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          O Zettai Security é uma plataforma web informativa e tecnológica focada em segurança para e-commerces. O sistema oferece um chatbot inteligente com IA, um scanner de vulnerabilidades, um dashboard analítico e conteúdos educativos sobre segurança digital.
        </p>
      </section>

      <section className="card-cyber p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Objetivo</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Demonstrar domínio em desenvolvimento web completo, integrando inteligência artificial, automação de processos, segurança da informação e criação de um sistema moderno, funcional e responsivo — tudo em um único projeto acadêmico.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Tecnologias Utilizadas</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {techs.map((t) => (
            <div key={t.name} className="card-cyber p-4 space-y-1">
              <h3 className="font-semibold text-foreground">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card-cyber p-6 space-y-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Contexto do TCC</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Este projeto foi desenvolvido como Trabalho de Conclusão de Curso para o curso técnico em Desenvolvimento de Sistemas, demonstrando a capacidade de criar soluções completas que integram múltiplas tecnologias em um cenário real de segurança digital.
        </p>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
