
-- Add monetization columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN status_pagamento text NOT NULL DEFAULT 'inativo' CHECK (status_pagamento IN ('ativo', 'inativo')),
ADD COLUMN analises_restantes integer NOT NULL DEFAULT 1;
