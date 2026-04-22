import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export type PlanTier = "gratuito" | "basico" | "premium";

export interface PlanLimits {
  messagesPerDay: number; // Infinity = unlimited
  scansPerDay: number;
  dashboardAccess: "none" | "partial" | "full";
}

export const PLAN_CONFIG: Record<PlanTier, PlanLimits & { label: string; price: string }> = {
  gratuito: { messagesPerDay: 3, scansPerDay: 1, dashboardAccess: "none", label: "Gratuito", price: "R$ 0,00" },
  basico:   { messagesPerDay: 20, scansPerDay: 5, dashboardAccess: "partial", label: "Básico", price: "R$ 14,99" },
  premium:  { messagesPerDay: Infinity, scansPerDay: Infinity, dashboardAccess: "full", label: "Premium", price: "R$ 39,99" },
};

export interface Profile {
  id: string;
  email: string | null;
  full_name?: string | null;
  phone?: string | null;
  tipo_usuario: string;
  tipo_plano: PlanTier;
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
      const plan = (data.tipo_plano as PlanTier) ?? "gratuito";
      const limits = PLAN_CONFIG[plan];

      // Daily reset based on plan limits (skip when unlimited)
      if (data.ultima_interacao !== today && plan !== "premium") {
        const resetMsgs = limits.messagesPerDay === Infinity ? data.mensagens_restantes : limits.messagesPerDay;
        const resetScans = limits.scansPerDay === Infinity ? data.analises_restantes : limits.scansPerDay;
        await supabase
          .from("profiles")
          .update({ mensagens_restantes: resetMsgs, analises_restantes: resetScans, ultima_interacao: today })
          .eq("id", user.id);
        setProfile({ ...data, mensagens_restantes: resetMsgs, analises_restantes: resetScans, ultima_interacao: today, tipo_plano: plan } as Profile);
      } else {
        setProfile({ ...data, tipo_plano: plan } as Profile);
      }
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const decrementMessages = async () => {
    if (!user || !profile) return;
    if (profile.tipo_plano === "premium") return;
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
    if (profile.tipo_plano === "premium") return;
    const today = new Date().toISOString().slice(0, 10);
    const newCount = Math.max(0, profile.analises_restantes - 1);
    await supabase
      .from("profiles")
      .update({ analises_restantes: newCount, ultima_interacao: today })
      .eq("id", user.id);
    setProfile((p) => p ? { ...p, analises_restantes: newCount, ultima_interacao: today } : null);
  };

  const updateProfileDetails = async (values: {
    full_name: string;
    email: string;
    phone?: string;
    password?: string;
  }) => {
    if (!user || !profile) {
      throw new Error("Usuário não autenticado");
    }

    const updates: { email?: string; password?: string } = {};

    if (values.email !== user.email) {
      updates.email = values.email;
    }

    if (values.password) {
      updates.password = values.password;
    }

    if (Object.keys(updates).length > 0) {
      const { error: authError } = await supabase.auth.updateUser(updates);
      if (authError) throw authError;
    }

    const normalizedPhone = values.phone?.trim() || null;
    const profilePayload = {
      full_name: values.full_name,
      email: values.email,
      phone: normalizedPhone,
    };

    const { error: profileError } = await supabase
      .from("profiles")
      .update(profilePayload as never)
      .eq("id", user.id);

    if (profileError) throw profileError;

    setProfile((current) => current ? {
      ...current,
      full_name: values.full_name,
      email: values.email,
      phone: normalizedPhone,
    } : current);

    await fetchProfile();
  };

  const subscribeToPlan = async (plan: "basico" | "premium") => {
    if (!user) return;
    const limits = PLAN_CONFIG[plan];
    const tipo_usuario = plan === "premium" ? "premium" : "comum";
    await supabase
      .from("profiles")
      .update({
        tipo_plano: plan,
        tipo_usuario,
        status_pagamento: "ativo",
        mensagens_restantes: limits.messagesPerDay === Infinity ? 9999 : limits.messagesPerDay,
        analises_restantes: limits.scansPerDay === Infinity ? 9999 : limits.scansPerDay,
      })
      .eq("id", user.id);
    setProfile((p) => p ? {
      ...p,
      tipo_plano: plan,
      tipo_usuario,
      status_pagamento: "ativo",
      mensagens_restantes: limits.messagesPerDay === Infinity ? 9999 : limits.messagesPerDay,
      analises_restantes: limits.scansPerDay === Infinity ? 9999 : limits.scansPerDay,
    } : null);
  };

  // Backwards compat with previous API
  const upgradeToPremium = () => subscribeToPlan("premium");

  const plan: PlanTier = profile?.tipo_plano ?? "gratuito";
  const planLimits = PLAN_CONFIG[plan];
  const isPremium = plan === "premium" && profile?.status_pagamento === "ativo";
  const isBasico = plan === "basico" && profile?.status_pagamento === "ativo";
  const hasDashboardAccess = planLimits.dashboardAccess !== "none";
  const hasFullDashboard = planLimits.dashboardAccess === "full";

  return {
    profile,
    loading,
    plan,
    planLimits,
    isPremium,
    isBasico,
    hasDashboardAccess,
    hasFullDashboard,
    decrementMessages,
    decrementScans,
    updateProfileDetails,
    subscribeToPlan,
    upgradeToPremium,
    refetch: fetchProfile,
  };
};
