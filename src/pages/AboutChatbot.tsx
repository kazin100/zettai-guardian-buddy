import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bot, Cpu, AlertCircle, Rocket } from "lucide-react";

const AboutChatbot = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-16 max-w-3xl space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient-cyber mb-4">Sobre o Chatbot</h1>
        <p className="text-muted-foreground">Entenda como funciona o assistente de IA do Zettai Security.</p>
      </div>

      <section className="card-cyber p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Como Funciona</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed text-sm">
          O chatbot do Zettai Security utiliza inteligência artificial para responder dúvidas sobre segurança digital para e-commerces. As mensagens do usuário são enviadas para um backend serverless que processa a requisição com um modelo de IA avançado, retornando respostas contextualizadas e didáticas em tempo real via streaming.
        </p>
      </section>

      <section className="card-cyber p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Cpu className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Tecnologia de IA</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed text-sm">
          O assistente utiliza o Lovable AI Gateway, que fornece acesso a modelos de linguagem de última geração. O modelo é configurado como especialista em segurança para e-commerces, orientando sobre boas práticas, alertando sobre riscos e sugerindo o uso do scanner de vulnerabilidades quando apropriado.
        </p>
      </section>

      <section className="card-cyber p-6 space-y-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-destructive" />
          <h2 className="text-xl font-bold text-foreground">Limitações</h2>
        </div>
        <ul className="text-muted-foreground text-sm space-y-2 list-disc list-inside">
          <li>Não substitui uma consultoria profissional de segurança</li>
          <li>As respostas são geradas por IA e podem conter imprecisões</li>
          <li>Não executa ações diretas nos sistemas do usuário</li>
          <li>Depende de conexão com a internet para funcionar</li>
          <li>Limitado ao contexto de segurança para e-commerces</li>
        </ul>
      </section>

      <section className="card-cyber p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-accent" />
          <h2 className="text-xl font-bold text-foreground">Possibilidades Futuras</h2>
        </div>
        <ul className="text-muted-foreground text-sm space-y-2 list-disc list-inside">
          <li>Integração direta com o scanner para análises via chat</li>
          <li>Histórico de conversas persistente por usuário</li>
          <li>Recomendações personalizadas baseadas em análises anteriores</li>
          <li>Integração com n8n para automação de fluxos complexos</li>
          <li>Suporte multilíngue para atender mercados internacionais</li>
        </ul>
      </section>
    </main>
    <Footer />
  </div>
);

export default AboutChatbot;
