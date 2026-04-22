import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

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
      toast({ title: "Mensagem enviada!", description: "Entraremos em contato em breve." });
      form.reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-lg flex-1 w-full">
        <h1 className="text-3xl font-bold text-gradient-cyber text-center mb-8">Contato</h1>
        <form onSubmit={handleSubmit} className="card-cyber p-6 space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" name="name" placeholder="Seu nome" className="mt-1" maxLength={100} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="seu@email.com" className="mt-1" maxLength={255} />
          </div>
          <div>
            <Label htmlFor="message">Mensagem</Label>
            <Textarea id="message" name="message" placeholder="Sua mensagem..." className="mt-1 min-h-[120px]" maxLength={1000} />
          </div>
          <Button variant="cyber" type="submit" className="w-full" disabled={loading}>
            <Send className="h-4 w-4" /> {loading ? "Enviando..." : "Enviar Mensagem"}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
