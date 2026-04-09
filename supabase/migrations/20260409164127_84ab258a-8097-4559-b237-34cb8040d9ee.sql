
-- Create table for geolocation data
CREATE TABLE public.geolocations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'BR',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.geolocations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (visitors don't need to be logged in)
CREATE POLICY "Anyone can insert geolocation" 
ON public.geolocations 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to read (for dashboard aggregation)
CREATE POLICY "Anyone can read geolocations" 
ON public.geolocations 
FOR SELECT 
USING (true);
