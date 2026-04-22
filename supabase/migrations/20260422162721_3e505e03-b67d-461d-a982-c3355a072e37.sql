ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS full_name text,
ADD COLUMN IF NOT EXISTS phone text;

CREATE OR REPLACE FUNCTION public.validate_profile_fields()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  normalized_phone text;
BEGIN
  IF NEW.full_name IS NOT NULL THEN
    NEW.full_name := btrim(NEW.full_name);

    IF char_length(NEW.full_name) < 3 THEN
      RAISE EXCEPTION 'O nome completo deve ter pelo menos 3 caracteres';
    END IF;

    IF NEW.full_name !~ '^[A-Za-zÀ-ÿ\s]+$' THEN
      RAISE EXCEPTION 'O nome completo deve conter apenas letras e espaços';
    END IF;
  END IF;

  IF NEW.phone IS NOT NULL AND btrim(NEW.phone) <> '' THEN
    normalized_phone := regexp_replace(NEW.phone, '\D', '', 'g');

    IF char_length(normalized_phone) < 10 OR char_length(normalized_phone) > 11 THEN
      RAISE EXCEPTION 'O telefone deve conter 10 ou 11 dígitos';
    END IF;

    NEW.phone := normalized_phone;
  ELSE
    NEW.phone := NULL;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_profiles_fields ON public.profiles;
CREATE TRIGGER validate_profiles_fields
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.validate_profile_fields();