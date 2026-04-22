import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

const profileSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(3, "O nome completo deve ter pelo menos 3 caracteres")
    .max(120, "O nome completo deve ter no máximo 120 caracteres")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Use apenas letras e espaços no nome"),
  email: z
    .string()
    .trim()
    .email("Digite um email válido")
    .max(255, "O email deve ter no máximo 255 caracteres"),
  password: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((value) => !value || value.length >= 6, "A senha deve ter no mínimo 6 caracteres"),
  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine((value) => !value || /^\d{10,11}$/.test(value.replace(/\D/g, "")), "Digite um telefone com 10 ou 11 dígitos"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const CadastroUsuario = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { profile, loading, updateProfileDetails } = useProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      email: user?.email ?? "",
      password: "",
      phone: "",
    },
  });

  useEffect(() => {
    form.reset({
      full_name: profile?.full_name ?? "",
      email: user?.email ?? profile?.email ?? "",
      password: "",
      phone: profile?.phone ?? "",
    });
  }, [form, profile, user?.email]);

  const handleSubmit = async (values: ProfileFormValues) => {
    try {
      await updateProfileDetails({
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        password: values.password || undefined,
      });

      form.reset({ ...values, password: "" });
      toast({
        title: "Dados atualizados",
        description: "✅ Dados atualizados com sucesso!",
      });
    } catch (error: any) {
      const description = error?.message?.includes("email")
        ? "Esse email já está em uso ou precisa ser confirmado antes da troca."
        : error?.message ?? "Não foi possível salvar suas alterações.";

      toast({
        title: "Erro ao atualizar cadastro",
        description,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 pb-16 pt-24">
        <header className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-gradient-cyber">Cadastro do Usuário</h1>
          <p className="text-sm text-muted-foreground">
            Atualize seus dados pessoais e mantenha sua conta segura.
          </p>
        </header>

        <section className="card-cyber p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" autoComplete="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="11999999999" inputMode="numeric" autoComplete="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="voce@empresa.com" autoComplete="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Nova senha (opcional)" autoComplete="new-password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button type="button" variant="cyber-outline" onClick={() => form.reset()}>
                  Restaurar dados
                </Button>
                <Button type="submit" variant="cyber" disabled={loading || form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Salvando..." : "Salvar alterações"}
                </Button>
              </div>
            </form>
          </Form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CadastroUsuario;