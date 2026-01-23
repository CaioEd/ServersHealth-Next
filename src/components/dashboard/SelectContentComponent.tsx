import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { HardDriveIcon, SquareActivityIcon } from "lucide-react"
import ServersList from "./ServersList"
import ServerChartsComponent from "./ServerChartsComponent"

export default function SelectContentComponent() {
  return (
    <Tabs defaultValue="servers" className="mt-6 w-full">
      <TabsList className="grid w-full max-w-[400px] grid-cols-2">
        <TabsTrigger value="servers">
          <HardDriveIcon className="mr-2 inline h-4 w-4" />
          Lista de Servidores
        </TabsTrigger>

        <TabsTrigger value="charts">
          <SquareActivityIcon className="mr-2 inline h-4 w-4" />
          Gráfico de informações
        </TabsTrigger>
      </TabsList>

      <TabsContent value="servers">
        <div className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <ServersList />
        </div>
      </TabsContent>

      <TabsContent value="charts">
        <div className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <ServerChartsComponent />
        </div>
      </TabsContent>
    </Tabs>
  )
}