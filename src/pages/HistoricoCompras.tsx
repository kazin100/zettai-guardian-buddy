import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type PurchaseStatus = "ativo" | "inativo" | "expirado";

type Purchase = {
  id: string;
  plano: string;
  valor: number;
  data_compra: string;
  status: PurchaseStatus;
};

const statusLabel: Record<PurchaseStatus, string> = {
  ativo: "Ativo",
  inativo: "Inativo",
  expirado: "Expirado",
};

const statusVariant: Record<PurchaseStatus, "default" | "secondary" | "destructive" | "outline"> = {
  ativo: "default",
  inativo: "secondary",
  expirado: "outline",
};

const HistoricoCompras = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("historico_compras" as never)
        .select("id, plano, valor, data_compra, status")
        .eq("usuario_id", user.id)
        .order("data_compra", { ascending: false });

      if (error) {
        toast({
          title: "Erro ao carregar histórico",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setPurchases((data as Purchase[]) ?? []);
      }

      setLoading(false);
    };

    fetchPurchases();
  }, [toast, user]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto max-w-5xl px-4 pb-16 pt-24 flex-1 w-full">
        <header className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-gradient-cyber">Histórico de Compras</h1>
          <p className="text-sm text-muted-foreground">
            Visualize todos os planos adquiridos na plataforma.
          </p>
        </header>

        <section className="card-cyber p-4 md:p-6">
          {loading ? (
            <div className="py-10 text-center text-muted-foreground">Carregando histórico...</div>
          ) : purchases.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              Nenhuma compra registrada até o momento.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plano adquirido</TableHead>
                  <TableHead>Valor pago</TableHead>
                  <TableHead>Data da compra</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchases.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell className="font-medium capitalize">{purchase.plano}</TableCell>
                    <TableCell>
                      {purchase.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    <TableCell>
                      {new Date(purchase.data_compra).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[purchase.status]}>{statusLabel[purchase.status]}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HistoricoCompras;