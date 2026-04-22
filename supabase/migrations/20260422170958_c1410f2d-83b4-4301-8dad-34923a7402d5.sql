CREATE POLICY "Users can update own purchase history"
ON public.historico_compras
FOR UPDATE
TO authenticated
USING (auth.uid() = usuario_id)
WITH CHECK (auth.uid() = usuario_id);