import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useProfile";

const Settings = () => {
  const { toast } = useToast();
  const { profile, updateProfileDetails } = useProfile();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("zettai-theme");
    return stored ? stored === "dark" : true;
  });
  const [geolocation, setGeolocation] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(profile?.full_name ?? "");
    setEmail(profile?.email ?? "");
  }, [profile]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove("light");
    } else {
      root.classList.add("light");
    }
    localStorage.setItem("zettai-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfileDetails({
        full_name: name,
        email: email,
        phone: profile?.phone ?? "",
      });
      toast({ title: "Configurações salvas", description: "✅ Suas preferências foram atualizadas." });
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error?.message ?? "Não foi possível salvar suas alterações.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16 max-w-2xl w-full">
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
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
              </div>
            </div>
            <Link to="/cadastro-usuario">
              <Button variant="cyber-outline" className="w-full">Editar cadastro do usuário</Button>
            </Link>
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

          <Button variant="cyber" className="w-full" onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
