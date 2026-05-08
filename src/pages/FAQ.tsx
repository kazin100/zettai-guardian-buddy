import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const groups = [
  {
    title: "Perguntas Frequentes",
    items: [
      { q: "O que é a Zettai Security?", a: "Uma plataforma SaaS de segurança para e-commerces que oferece scanner de vulnerabilidades, chatbot com IA e monitoramento contínuo." },
      { q: "Preciso instalar algo no meu site?", a: "Não. A análise é feita remotamente a partir da URL pública do seu e-commerce." },
    ],
  },
  {
    title: "Dúvidas sobre Serviços",
    items: [
      { q: "Quais ataques o scanner detecta?", a: "HTTPS, headers de segurança (HSTS, CSP, X-Frame-Options), exposição de servidor e configurações inseguras comuns no OWASP Top 10." },
      { q: "O monitoramento é em tempo real?", a: "Sim, no plano Premium o monitoramento roda continuamente e dispara alertas automáticos." },
    ],
  },
  {
    title: "Dúvidas sobre Planos",
    items: [
      { q: "Posso testar gratuitamente?", a: "Sim, o plano Gratuito permite 1 análise por dia e 3 mensagens com o chatbot." },
      { q: "Posso mudar de plano depois?", a: "Sim, o upgrade é imediato e o downgrade vale a partir do próximo ciclo." },
    ],
  },
  {
    title: "Dúvidas sobre Pagamento",
    items: [
      { q: "Quais formas de pagamento são aceitas?", a: "Cartão de crédito, boleto e PIX." },
      { q: "Existe fidelidade?", a: "Não. Você pode cancelar quando quiser, sem multas." },
    ],
  },
  {
    title: "Outras Dúvidas",
    items: [
      { q: "Vocês emitem nota fiscal?", a: "Sim, emitimos NF-e automaticamente após cada cobrança." },
      { q: "Como entro em contato com o suporte?", a: "Pelo chatbot, pela página de Contato ou via Central de Suporte no painel." },
    ],
  },
];

const FAQ = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-16 flex-1 w-full">
      <h1 className="text-3xl md:text-4xl font-bold text-gradient-cyber text-center mb-4">Perguntas Frequentes</h1>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Tire suas principais dúvidas sobre a Zettai Security.
      </p>
      <div className="max-w-3xl mx-auto space-y-8">
        {groups.map((g) => (
          <div key={g.title} className="card-cyber p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">{g.title}</h2>
            <Accordion type="single" collapsible className="w-full">
              {g.items.map((item, idx) => (
                <AccordionItem key={idx} value={`${g.title}-${idx}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default FAQ;