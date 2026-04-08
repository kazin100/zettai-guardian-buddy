import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10 bg-card/50">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-bold text-gradient-cyber">Zettai Security</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 Zettai Security — TCC Desenvolvimento de Sistemas
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
