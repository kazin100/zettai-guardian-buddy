import { Shield, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08)_0%,transparent_70%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px"
      }} />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
          <Lock className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary font-medium">Segurança para E-commerces</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight">
          <span className="text-foreground">Proteja seu</span>
          <br />
          <span className="text-gradient-cyber glow-text">E-commerce</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Plataforma inteligente de segurança com scanner de vulnerabilidades, 
          chatbot com IA e dashboard analítico para proteger sua loja virtual.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/scanner">
            <Button variant="cyber" size="lg" className="text-base gap-2">
              <Shield className="h-5 w-5" />
              Iniciar Scanner
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="cyber-outline" size="lg" className="text-base gap-2">
              Ver Dashboard
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto">
          {[
            { value: "500+", label: "Sites Analisados" },
            { value: "99.9%", label: "Uptime" },
            { value: "24/7", label: "Monitoramento" },
            { value: "IA", label: "Chatbot Inteligente" },
          ].map((stat) => (
            <div key={stat.label} className="card-cyber p-4">
              <div className="text-2xl font-bold text-gradient-cyber">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
