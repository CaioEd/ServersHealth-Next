// app/servers/page.tsx
import ServersList from "@/components/servers/ServersList";
import { getServers } from "@/services/server-service";
import Link from 'next/link';


export default async function ServersListPage() {
  const initialData = await getServers();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Servidores</h1>
          <p className="text-muted-foreground">
            Monitoramento em tempo real ({initialData.length} ativos)
          </p>
        </div>
      </div>

      <div>
        <Link
          href="/servers/new"
          className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Adicionar Novo Servidor
        </Link>
      </div>

      <div className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <ServersList initialData={initialData} />
      </div>
    </div>
  );
}
