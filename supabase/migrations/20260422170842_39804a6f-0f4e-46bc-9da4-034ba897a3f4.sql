CREATE TABLE public.historico_compras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL,
  plano TEXT NOT NULL,
  valor NUMERIC(10,2) NOT NULL,
  data_compra TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'ativo',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT historico_compras_plano_check CHECK (plano IN ('gratuito', 'basico', 'premium')),
  CONSTRAINT historico_compras_status_check CHECK (status IN ('ativo', 'inativo', 'expirado'))
);

ALTER TABLE public.historico_compras ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own purchase history"
ON public.historico_compras
FOR SELECT
TO authenticated
USING (auth.uid() = usuario_id);

CREATE POLICY "Users can create own purchase history"
ON public.historico_compras
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = usuario_id);

CREATE INDEX idx_historico_compras_usuario_data
ON public.historico_compras (usuario_id, data_compra DESC);

CREATE INDEX idx_historico_compras_status
ON public.historico_compras (status);