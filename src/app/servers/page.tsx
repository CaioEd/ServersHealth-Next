// app/servers/page.tsx
import ServersList from "@/components/servers/ServersList";
import { getServers } from "@/services/server-service";

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
        {/* Aqui poderia entrar um botão de "Novo Servidor" */}
      </div>

      <div className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        {/* 2. Passamos os dados iniciais via props */}
        <ServersList initialData={initialData} />
      </div>
    </div>
  );
}
