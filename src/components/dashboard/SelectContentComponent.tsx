import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function SelectContentComponent() {
  return (
    <Tabs defaultValue="servers" className="mt-6 w-full">
      <TabsList className="grid w-full max-w-[400px] grid-cols-2">
        <TabsTrigger value="servers">Lista de Servidores</TabsTrigger>
        <TabsTrigger value="charts">Gráfico de informações</TabsTrigger>
      </TabsList>

      <TabsContent value="servers">
        <div className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm text-zinc-500">
            Aqui vai a sua tabela de servidores (Servers Table).
          </p>
          {/* <ServerTableComponent /> */}
        </div>
      </TabsContent>

      {/* Conteúdo: Gráficos */}
      <TabsContent value="charts">
        <div className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
           <p className="text-sm text-zinc-500">
            Aqui vão os seus gráficos (Charts).
           </p>
           {/* <ServerChartsComponent /> */}
        </div>
      </TabsContent>
    </Tabs>
  )
}