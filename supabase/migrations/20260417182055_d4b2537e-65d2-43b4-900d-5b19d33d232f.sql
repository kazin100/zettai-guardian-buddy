-- Add tipo_plano column to support 3-tier SaaS (gratuito | basico | premium)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS tipo_plano text NOT NULL DEFAULT 'gratuito'
  CHECK (tipo_plano IN ('gratuito', 'basico', 'premium'));

-- Backfill: existing 'premium' users (tipo_usuario) become 'premium' plan
UPDATE public.profiles
SET tipo_plano = 'premium'
WHERE tipo_usuario = 'premium' AND status_pagamento = 'ativo';