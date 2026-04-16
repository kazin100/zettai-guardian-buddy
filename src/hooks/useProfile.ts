import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Profile {
  id: string;
  email: string | null;
  tipo_usuario: string;
  status_pagamento: string;
  mensagens_restantes: number;
  analises_restantes: number;
  ultima_interacao: string | null;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      const today = new Date().toISOString().slice(0, 10);
      const isPremium = data.tipo_usuario === "premium" && data.status_pagamento === "ativo";

      if (data.ultima_interacao !== today && !isPremium) {
        await supabase
          .from("profiles")
          .update({ mensagens_restantes: 3, analises_restantes: 1, ultima_interacao: today })
          .eq("id", user.id);
        setProfile({ ...data, mensagens_restantes: 3, analises_restantes: 1, ultima_interacao: today } as Profile);
      } else {
        setProfile(data as Profile);
      }
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const decrementMessages = async () => {
    if (!user || !profile) return;
    const today = new Date().toISOString().slice(0, 10);
    const newCount = Math.max(0, profile.mensagens_restantes - 1);
    await supabase
      .from("profiles")
      .update({ mensagens_restantes: newCount, ultima_interacao: today })
      .eq("id", user.id);
    setProfile((p) => p ? { ...p, mensagens_restantes: newCount, ultima_interacao: today } : null);
  };

  const decrementScans = async () => {
    if (!user || !profile) return;
    const today = new Date().toISOString().slice(0, 10);
    const newCount = Math.max(0, profile.analises_restantes - 1);
    await supabase
      .from("profiles")
      .update({ analises_restantes: newCount, ultima_interacao: today })
      .eq("id", user.id);
    setProfile((p) => p ? { ...p, analises_restantes: newCount, ultima_interacao: today } : null);
  };

  const upgradeToPremium = async () => {
    if (!user) return;
    await supabase
      .from("profiles")
      .update({ tipo_usuario: "premium", status_pagamento: "ativo" })
      .eq("id", user.id);
    setProfile((p) => p ? { ...p, tipo_usuario: "premium", status_pagamento: "ativo" } : null);
  };

  const isPremium = profile?.tipo_usuario === "premium" && profile?.status_pagamento === "ativo";

  return { profile, loading, isPremium, decrementMessages, decrementScans, upgradeToPremium, refetch: fetchProfile };
};
