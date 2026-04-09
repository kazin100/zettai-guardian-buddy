import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Coleta de Dados",
    content: "O Zettai Security coleta dados mínimos necessários para o funcionamento da plataforma: informações de cadastro (nome e email), mensagens enviadas ao chatbot, resultados de análises de segurança e, com consentimento explícito, dados de geolocalização aproximada.",
  },
  {
    title: "2. Uso dos Dados",
    content: "Os dados coletados são utilizados exclusivamente para: fornecer os serviços da plataforma, gerar estatísticas anônimas no dashboard analítico, melhorar a experiência do usuário e fins acadêmicos relacionados ao TCC.",
  },
  {
    title: "3. Geolocalização",
    content: "A coleta de geolocalização é opcional e requer consentimento explícito do usuário. Os dados de localização são armazenados de forma aproximada (cidade/estado) e utilizados apenas para estatísticas no dashboard. O usuário pode revogar o consentimento a qualquer momento nas configurações.",
  },
  {
    title: "4. LGPD — Lei Geral de Proteção de Dados",
    content: "O Zettai Security segue os princípios da LGPD (Lei nº 13.709/2018): finalidade, adequação, necessidade, transparência, segurança e prevenção. Os dados são tratados com medidas técnicas de segurança adequadas.",
  },
  {
    title: "5. Direitos do Usuário",
    content: "Conforme a LGPD, o usuário tem direito a: acessar seus dados, corrigir informações, solicitar exclusão, revogar consentimento e obter informações sobre o tratamento de seus dados. Para exercer esses direitos, entre em contato pela página de Contato.",
  },
  {
    title: "6. Segurança",
    content: "Utilizamos criptografia, autenticação segura e boas práticas de desenvolvimento para proteger os dados armazenados. Senhas são armazenadas com hash seguro e nunca em texto puro.",
  },
  {
    title: "7. Consentimento",
    content: "Ao utilizar o Zettai Security, o usuário concorda com esta política de privacidade. O consentimento para geolocalização é solicitado separadamente e pode ser gerenciado nas configurações do sistema.",
  },
];

const Privacy = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold text-gradient-cyber text-center mb-4">Política de Privacidade</h1>
      <p className="text-muted-foreground text-center mb-10">Última atualização: Abril de 2026</p>
      <div className="space-y-6">
        {sections.map((s) => (
          <section key={s.title} className="card-cyber p-6 space-y-2">
            <h2 className="text-lg font-semibold text-foreground">{s.title}</h2>
            <p className="text-muted-foreground leading-relaxed text-sm">{s.content}</p>
          </section>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Privacy;
