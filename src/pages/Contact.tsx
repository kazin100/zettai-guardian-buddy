import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Send, Mail, MessageSquare, ShieldCheck, Clock, MapPin, Bot,
  Activity, Users, ScanSearch, Lock, User, Sparkles, CheckCircle2, ChevronDown
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const message = data.get("message")?.toString().trim();

    if (!name || !email || !message) {
      toast({ title: "Erro", description: "Preencha todos os campos.", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Erro", description: "Email inválido.", variant: "destructive" });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast({ title: "Mensagem enviada!", description: "Nossa equipe responderá em breve." });
      form.reset();
      setTimeout(() => setSent(false), 4000);
    }, 1200);
  };

  const contactCards = [
    { icon: Mail, title: "E-mail", value: "suporte@zettai-security.com", desc: "Resposta em até 24h" },
    { icon: MessageSquare, title: "Chat em tempo real", value: "Atendimento via IA", desc: "Disponível 24/7" },
    { icon: ShieldCheck, title: "Segurança", value: "Mensagens criptografadas", desc: "Privacidade garantida" },
    { icon: Clock, title: "Tempo de resposta", value: "< 15 minutos", desc: "Tempo médio atual" },
  ];

  const metrics = [
    { icon: ScanSearch, value: "+2.341", label: "Análises realizadas" },
    { icon: ShieldCheck, value: "97%", label: "Ameaças detectadas" },
    { icon: Users, value: "500+", label: "Usuários monitorados" },
    { icon: Activity, value: "24/7", label: "Proteção automatizada" },
  ];

  const testimonials = [
    { name: "Mariana S.", role: "E-commerce de moda", text: "A Zettai ajudou nossa loja a identificar falhas críticas rapidamente." },
    { name: "Rafael T.", role: "Marketplace digital", text: "O dashboard trouxe uma visão muito mais profissional da segurança do nosso e-commerce." },
    { name: "Carla M.", role: "Loja virtual", text: "Atendimento rápido e inteligente. Sentimos que estamos protegidos de verdade." },
  ];

  const team = [
    { initials: "SL", name: "Security Lead", badge: "Security Team" },
    { initials: "AI", name: "AI Monitoring", badge: "AI Monitoring" },
    { initials: "TA", name: "Threat Analyst", badge: "Threat Analysis" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background tech grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px"
      }} />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "3s" }} />

      <Navbar />

      <main className="flex-1 w-full relative z-10">
        {/* HERO */}
        <section className="container mx-auto px-4 pt-28 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6 animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-primary font-medium">Suporte online agora</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl mx-auto animate-fade-in">
            <span className="text-foreground">Fale com </span>
            <span className="text-gradient-cyber glow-text">especialistas em segurança digital</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
            Nossa equipe está pronta para ajudar seu e-commerce a operar com mais proteção, estabilidade e confiança.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <a href="#form">
              <Button variant="cyber" size="lg" className="gap-2 hover-scale">
                <Send className="h-5 w-5" /> Enviar Mensagem
              </Button>
            </a>
            <Link to="/assinatura">
              <Button variant="cyber-outline" size="lg" className="hover-scale">Ver Planos</Button>
            </Link>
          </div>
        </section>

        {/* CONTACT CARDS */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactCards.map((c) => (
              <Card key={c.title} className="card-cyber p-5 hover-scale">
                <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-3">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">{c.title}</h3>
                <p className="text-sm text-primary mt-1 break-words">{c.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* FORM */}
        <section id="form" className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gradient-cyber mb-2">Envie sua mensagem</h2>
              <p className="text-muted-foreground">Nossa equipe responderá em breve.</p>
            </div>
            <form onSubmit={handleSubmit} className="card-cyber p-8 space-y-5 relative">
              <div>
                <Label htmlFor="name">Nome</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="name" name="name" placeholder="Seu nome" className="pl-10 focus-visible:ring-primary" maxLength={100} />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" name="email" type="email" placeholder="seu@email.com" className="pl-10 focus-visible:ring-primary" maxLength={255} />
                </div>
              </div>
              <div>
                <Label htmlFor="message">Mensagem</Label>
                <div className="relative mt-1">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea id="message" name="message" placeholder="Como podemos ajudar?" className="pl-10 min-h-[140px] focus-visible:ring-primary" maxLength={1000} />
                </div>
              </div>
              <Button variant="cyber" type="submit" className="w-full gap-2" disabled={loading}>
                {loading ? (
                  <><Sparkles className="h-4 w-4 animate-spin" /> Enviando...</>
                ) : sent ? (
                  <><CheckCircle2 className="h-4 w-4" /> Mensagem enviada!</>
                ) : (
                  <><Send className="h-4 w-4" /> Enviar Mensagem</>
                )}
              </Button>
              {sent && (
                <div className="text-center text-sm text-green-500 animate-fade-in">
                  Nossa equipe responderá em breve.
                </div>
              )}
            </form>
          </div>
        </section>

        {/* METRICS */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <Badge variant="outline" className="border-primary/30 text-primary mb-3">Empresa ativa</Badge>
            <h2 className="text-3xl font-bold text-gradient-cyber">Operação em tempo real</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <Card key={m.label} className="card-cyber p-6 text-center hover-scale">
                <m.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-3xl font-black text-gradient-cyber">{m.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* TEAM */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gradient-cyber mb-2">Equipe especializada</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Especialistas em proteção para e-commerces, automação e monitoramento inteligente.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {team.map((t) => (
              <Card key={t.initials} className="card-cyber p-6 text-center hover-scale">
                <div className="relative mx-auto h-16 w-16 mb-3">
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl" />
                  <div className="relative h-16 w-16 rounded-full bg-gradient-cyber flex items-center justify-center font-black text-primary-foreground text-lg">
                    {t.initials}
                  </div>
                </div>
                <div className="font-bold">{t.name}</div>
                <Badge variant="outline" className="mt-2 border-primary/30 text-primary text-xs">{t.badge}</Badge>
              </Card>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gradient-cyber">O que dizem nossos clientes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <Card key={t.name} className="card-cyber p-6 hover-scale">
                <p className="text-sm text-foreground/90 italic mb-4">"{t.text}"</p>
                <div className="border-t border-primary/10 pt-3">
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="container mx-auto px-4 py-8">
          <Card className="card-cyber p-6 flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2"><Lock className="h-4 w-4 text-primary" /> Conexão protegida</div>
            <div className="hidden md:block h-4 w-px bg-primary/20" />
            <div className="flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> Monitoramento ativo</div>
            <div className="hidden md:block h-4 w-px bg-primary/20" />
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Privacidade garantida</div>
          </Card>
        </section>

        {/* CHATBOT CTA + LOCATION */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="card-cyber p-8 text-center">
              <Bot className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Prefere atendimento instantâneo?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Converse agora com o assistente inteligente da Zettai Security.
              </p>
              <Button
                variant="cyber"
                onClick={() => window.dispatchEvent(new CustomEvent("open-chatbot"))}
                className="gap-2"
              >
                <MessageSquare className="h-4 w-4" /> Abrir Chatbot
              </Button>
            </Card>
            <Card className="card-cyber p-8 text-center">
              <MapPin className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">São Paulo • Brasil</h3>
              <p className="text-sm text-muted-foreground mb-4">Atendimento digital global</p>
              <div className="flex items-center justify-center gap-2 text-xs text-green-500">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Todos os sistemas operacionais
              </div>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gradient-cyber">Perguntas frequentes</h2>
          </div>
          <Card className="card-cyber p-2">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger className="px-4">Quanto tempo demora a resposta?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground">
                  Em média menos de 15 minutos durante horário comercial. Fora do horário, em até 24h.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger className="px-4">O suporte é automatizado?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground">
                  Combinamos IA para respostas instantâneas com analistas humanos para casos complexos.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger className="px-4">O scanner é seguro?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground">
                  Sim. O scanner faz apenas verificações públicas e não armazena dados sensíveis do seu site.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </section>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Contact;
