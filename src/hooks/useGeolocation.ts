import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "zettai_geo_session";
const CONSENT_KEY = "zettai_geo_consent";

function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

async function reverseGeocode(lat: number, lon: number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=pt-BR`,
      { headers: { "User-Agent": "ZettaiSecurity/1.0" } }
    );
    const data = await res.json();
    const addr = data.address || {};
    return {
      city: addr.city || addr.town || addr.village || addr.municipality || null,
      state: addr.state || null,
      country: addr.country_code?.toUpperCase() || "BR",
    };
  } catch {
    return { city: null, state: null, country: "BR" };
  }
}

export function useGeolocation() {
  const [consent, setConsent] = useState<boolean | null>(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored === null ? null : stored === "true";
  });
  const [submitted, setSubmitted] = useState(false);

  const grantConsent = () => {
    localStorage.setItem(CONSENT_KEY, "true");
    setConsent(true);
  };

  const denyConsent = () => {
    localStorage.setItem(CONSENT_KEY, "false");
    setConsent(false);
  };

  useEffect(() => {
    if (consent !== true || submitted) return;
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const geo = await reverseGeocode(latitude, longitude);
        const sessionId = getSessionId();

        await supabase.from("geolocations").insert({
          latitude,
          longitude,
          city: geo.city,
          state: geo.state,
          country: geo.country,
          session_id: sessionId,
        });
        setSubmitted(true);
      },
      () => {
        // User denied browser geolocation
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }, [consent, submitted]);

  return { consent, grantConsent, denyConsent };
}
