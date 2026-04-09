import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/useGeolocation";

const GeoConsentBanner = () => {
  const { consent, grantConsent, denyConsent } = useGeolocation();

  if (consent !== null) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-40 card-cyber p-4 border border-primary/20 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <MapPin className="h-4 w-4 text-primary" />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-foreground font-medium">Permitir geolocalização?</p>
          <p className="text-xs text-muted-foreground">
            Usamos sua localização de forma anônima para exibir dados regionais no dashboard. Nenhum dado pessoal é coletado.
          </p>
          <div className="flex gap-2 pt-1">
            <Button size="sm" variant="cyber" onClick={grantConsent} className="text-xs h-8">
              Permitir
            </Button>
            <Button size="sm" variant="cyber-outline" onClick={denyConsent} className="text-xs h-8">
              Negar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoConsentBanner;
