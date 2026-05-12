
ALTER TABLE public.historico_compras
  ADD COLUMN IF NOT EXISTS metodo_pagamento TEXT,
  ADD COLUMN IF NOT EXISTS id_transacao TEXT,
  ADD COLUMN IF NOT EXISTS data_pagamento TIMESTAMP WITH TIME ZONE;
