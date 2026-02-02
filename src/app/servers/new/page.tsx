"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { HardDrive, Loader2, Send,  } from "lucide-react" // Adicionei Activity para ícone
import { toast } from "sonner"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createServer } from "@/services/server-service"

// Tipos definidos conforme solicitado
export type ServerStatusType = "ONLINE" | "OFFLINE" | "MAINTENANCE" | "UNKNOWN";
const statusOptions: ServerStatusType[] = ["ONLINE", "OFFLINE", "MAINTENANCE", "UNKNOWN"];

const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  ip: z.string().regex(ipv4Regex, {
    message: "Insira um endereço IPv4 válido (ex: 192.168.1.1).",
  }),
  port: z.coerce.number()
    .min(1, { message: "Porta inválida." })
    .max(65535, { message: "A porta não pode exceder 65535." }),
  // Zod Enum garante que apenas os valores de ServerStatusType sejam aceitos
  status: z.enum(["ONLINE", "OFFLINE", "MAINTENANCE", "UNKNOWN"]).catch("UNKNOWN"),
  description: z.string().min(10, {
    message: "A descrição deve ser mais detalhada (mínimo 10 caracteres).",
  }).max(500, {
    message: "A descrição não pode passar de 500 caracteres.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function CreateNewServer() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ip: "",
      port: 8080,
      status: "UNKNOWN", // Valor padrão inicial
      description: "",
    },
  })

  async function onSubmit(data: FormValues) {
      setIsLoading(true)
      
      try {
      // 2. Chamada da API
      // Se 'data' já tem os campos exatos que a API espera, você pode passar direto.
      await createServer(data) 

      // 3. Sucesso
      // Se o código chegou aqui, é porque o await acima não deu erro.
      toast.success("Servidor criado!", {
          description: `O servidor ${data.name} (${data.status}) foi registrado.`,
      })
      
      // 4. Limpeza do formulário
      form.reset({
          name: "",
          ip: "",
          port: 8080,
          status: "UNKNOWN",
          description: ""
      })

      } catch (error) {
      console.error(error)
      toast.error("Erro ao criar", {
          description: "Falha na comunicação com a API.",
      })
      } finally {
      setIsLoading(false)
      }
   }

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-primary" />
            Criar Novo Servidor
          </CardTitle>
          <CardDescription>
            Configure os dados de conexão, status e identificação.
          </CardDescription>
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

              {/* Grid: IP (2 cols), Porta (1 col), Status (1 col) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Campo IP */}
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="ip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço IP</FormLabel>
                        <FormControl>
                          <Input placeholder="192.168.0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Campo Porta */}
                <div className="md:col-span-1">
                  <FormField
                    control={form.control}
                    name="port"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Porta</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="80" {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Campo Status (Novo) */}
                <div className="md:col-span-1">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {statusOptions.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

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
          <Button variant="ghost" onClick={() => form.reset()} className="cursor-pointer">
            Cancelar
          </Button>
          <Button 
            onClick={form.handleSubmit(onSubmit)} 
            disabled={isLoading}
            className="w-32 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando
              </>
            ) : (
              <>
                Criar
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}