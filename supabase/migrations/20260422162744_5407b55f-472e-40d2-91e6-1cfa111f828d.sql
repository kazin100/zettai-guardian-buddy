DROP POLICY IF EXISTS "Anyone can insert geolocation" ON public.geolocations;

CREATE POLICY "Anyone can insert geolocation with session"
ON public.geolocations
FOR INSERT
TO public
WITH CHECK (session_id IS NOT NULL AND btrim(session_id) <> '');