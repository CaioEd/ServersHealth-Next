"use client"

import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, HardDrive, PenIcon, Trash2Icon } from "lucide-react" // Adicionei Activity para ícone
import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getServerById, updateServer, deleteServer } from "@/services/server-service"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ser mais detalhada (mínimo 10 caracteres).",
  }).max(500, {
    message: "A descrição não pode passar de 500 caracteres.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function UpdateServer() {
  const [idNum, setIdNum] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Carrega os dados do servidor com base no parâmetro da rota [id]
  useEffect(() => {
    const idParam = (params as any)?.id as string | string[] | undefined;
    const idStr = Array.isArray(idParam) ? idParam[0] : idParam;
    const idNum = idStr ? Number(idStr) : NaN;
    setIdNum(idNum);

    if (!idStr || Number.isNaN(idNum)) return;

    (async () => {
      try {
        const server = await getServerById(idNum);
        if (server) {
          form.reset(server);
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro ao buscar servidor", {
          description: "Falha na comunicação com a API.",
        });
      }
    })();
    // Inclui apenas dependências estáveis
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, form]);

  async function onSubmit(data: FormValues) {
    setIsLoading(true);

    try {
      const idParam = (params as any)?.id as string | string[] | undefined;
      const idStr = Array.isArray(idParam) ? idParam[0] : idParam;
      const idNum = idStr ? Number(idStr) : NaN;

      if (!idStr || Number.isNaN(idNum)) {
        throw new Error("ID inválido para atualização");
      }

      await updateServer({ ...data, id: idNum });

      toast.success("Servidor editado com sucesso!", {
        description: `O servidor ${data.name} foi editado.`,
      });

      router.push("/servers");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao editar servidor", {
        description: "Falha na comunicação com a API.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Tem certeza que deseja deletar este servidor?"
    );
    if (!confirmed) return;

    setIsLoading(true);

    startTransition(async () => {
      try {
        await deleteServer(id); // Chama a função do serviço

        toast.success("Servidor deletado com sucesso!");
        router.push("/servers");
      } catch (error) {
        console.error(error);
        toast.error("Erro ao deletar servidor");
      } finally {
        setIsLoading(false);
      }
    });
  }

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-primary" />
            Editar Servidor
          </CardTitle>
          <CardDescription>Edite os dados do servidor.</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Campo Nome */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Servidor</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Backend Produção" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Descrição */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detalhes sobre a função deste servidor..."
                        className="resize-none min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-between border-t px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="cursor-pointer">
            Cancelar
          </Button>
          <div className="flex flex-col gap-2">
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-48 cursor-pointer">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando
                </>
              ) : (
                <>
                  Salvar Alterações
                  <PenIcon className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            <Button
              variant="destructive"
              onClick={() => idNum !== null && handleDelete(idNum)}
              disabled={isLoading || isPending}
              className="bg-red-500 hover:bg-red-600 cursor-pointer">
              {isPending ? "Deletando..." : "Deletar Servidor"}
              <Trash2Icon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}