import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { LifeBuoy, MessageCircle, BookOpen, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const options = [
  {
    icon: LifeBuoy,
    title: "Abrir Chamado",
    description: "Registre uma solicitação técnica e nossa equipe responderá em até 24h.",
    cta: "Abrir chamado",
    to: "/contact",
  },
  {
    icon: MessageCircle,
    title: "Chat com Suporte",
    description: "Converse em tempo real com nosso assistente inteligente.",
    cta: "Iniciar chat",
    to: "/about-chatbot",
  },
  {
    icon: BookOpen,
    title: "Base de Conhecimento",
    description: "Artigos, tutoriais e guias para tirar o máximo da plataforma.",
    cta: "Acessar artigos",
    to: "/dicas",
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description: "Respostas rápidas para as dúvidas mais comuns.",
    cta: "Ver FAQ",
    to: "/faq",
  },
];

const Suporte = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-16 flex-1 w-full">
      <h1 className="text-3xl md:text-4xl font-bold text-gradient-cyber text-center mb-4">Central de Suporte</h1>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Estamos aqui para ajudar você a manter seu e-commerce sempre seguro.
      </p>
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {options.map((o) => (
          <div key={o.title} className="card-cyber p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <o.icon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">{o.title}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">{o.description}</p>
            <Link to={o.to}>
              <Button variant="cyber-outline" size="sm">{o.cta}</Button>
            </Link>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Suporte;