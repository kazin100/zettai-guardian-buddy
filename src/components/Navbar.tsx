import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "Sobre" },
    { to: "/servicos", label: "Serviços" },
    { to: "/assinatura", label: "Planos" },
    { to: "/depoimentos", label: "Depoimentos" },
    { to: "/faq", label: "FAQ" },
    { to: "/scanner", label: "Scanner" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/contact", label: "Contato" },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Shield className="h-7 w-7 text-primary group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)] transition-all" />
          <span className="text-lg font-bold text-gradient-cyber">Zettai Security</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary glow-text" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="cyber-outline" size="sm" className="gap-2 max-w-[180px]">
                  <User className="h-4 w-4 shrink-0" />
                  <span className="truncate text-xs">{user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/historico-compras")} className="cursor-pointer">
                  Histórico de Compras
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                  <LogOut className="h-4 w-4 mr-2" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="cyber" size="sm">Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block py-2 text-sm font-medium ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <p className="text-xs text-primary truncate py-2">{user.email}</p>
              <Button variant="cyber-outline" size="sm" className="w-full" onClick={() => { setIsOpen(false); navigate("/historico-compras"); }}>
                Histórico de Compras
              </Button>
              <Button variant="cyber-outline" size="sm" className="w-full" onClick={() => { setIsOpen(false); handleLogout(); }}>
                <LogOut className="h-4 w-4 mr-2" /> Sair
              </Button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button variant="cyber" size="sm" className="w-full">Login</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
