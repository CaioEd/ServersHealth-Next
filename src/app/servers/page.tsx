// app/servers/page.tsx
import ServersList from "@/components/servers/ServersList";
import { getServers } from "@/services/server-service";
import { HardDriveIcon } from "lucide-react";
import Link from 'next/link';


export default async function ServersListPage() {
  const initialData = await getServers();

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Servidores</h1>
          <p className="text-muted-foreground">
            Monitoramento em tempo real ({initialData.length} ativos)
          </p>
        </div>  

        <Link
          href="/servers/new"
          className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          +
          Adicionar Novo Servidor
          <HardDriveIcon className="inline-block ml-2 h-5 w-5" />
        </Link>

      </div>

      <div className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <ServersList initialData={initialData} />
      </div>
    </div>
  );
}
