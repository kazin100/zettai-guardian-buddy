import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [name, setName] = useState("Usuário");
  const [email] = useState(user?.email ?? "");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [geolocation, setGeolocation] = useState(false);

  const handleSave = () => {
    toast({ title: "Configurações salvas", description: "Suas preferências foram atualizadas." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-2xl">
        <h1 className="text-3xl font-bold text-gradient-cyber mb-8">Configurações</h1>

        <div className="space-y-8">
          {/* Profile */}
          <section className="card-cyber p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Dados do Usuário</h2>
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} readOnly className="mt-1 opacity-70" />
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="card-cyber p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Preferências</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notif">Notificações por email</Label>
                <Switch id="notif" checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="dark">Modo escuro</Label>
                <Switch id="dark" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="geo">Permitir geolocalização</Label>
                <Switch id="geo" checked={geolocation} onCheckedChange={setGeolocation} />
              </div>
            </div>
          </section>

          <Button variant="cyber" className="w-full" onClick={handleSave}>Salvar Configurações</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
