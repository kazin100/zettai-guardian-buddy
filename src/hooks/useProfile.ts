import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Profile {
  id: string;
  email: string | null;
  tipo_usuario: string;
  mensagens_restantes: number;
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
      // Daily reset: if ultima_interacao is not today, reset counter
      const today = new Date().toISOString().slice(0, 10);
      if (data.ultima_interacao !== today && data.tipo_usuario !== "premium") {
        await supabase
          .from("profiles")
          .update({ mensagens_restantes: 3, ultima_interacao: today })
          .eq("id", user.id);
        setProfile({ ...data, mensagens_restantes: 3, ultima_interacao: today });
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

  const upgradeToPremium = async () => {
    if (!user) return;
    await supabase
      .from("profiles")
      .update({ tipo_usuario: "premium" })
      .eq("id", user.id);
    setProfile((p) => p ? { ...p, tipo_usuario: "premium" } : null);
  };

  return { profile, loading, decrementMessages, upgradeToPremium, refetch: fetchProfile };
};
