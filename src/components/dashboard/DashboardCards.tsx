import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getServers } from "@/services/server-service";
import { useWebSocket } from "@/context/WebSocketContext";
import { Server } from "@/types/server";

const DashboardCards = () => {
  const { serverStatuses } = useWebSocket();
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const data = await getServers();
        setServers(data);
      } catch (error) {
        console.error("Error fetching servers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServers();
  }, []);

  const counts = useMemo(() => {
    const totals = { ONLINE: 0, OFFLINE: 0, MAINTENANCE: 0 };
    servers.forEach((server) => {
      const currentStatus = serverStatuses[server.id]?.status || server.status;
      if (currentStatus === "ONLINE") totals.ONLINE++;
      else if (currentStatus === "OFFLINE") totals.OFFLINE++;
      else if (currentStatus === "MAINTENANCE") totals.MAINTENANCE++;
    });
    return totals;
  }, [servers, serverStatuses]);

  if (loading) return <div className="p-4 text-center">Carregando indicadores...</div>;

  return (
    <div className="flex flex-row items-center justify-center p-4 gap-4 w-full">
      
      <Card className="w-1/3 cursor-pointer hover:bg-zinc-50 transition-colors border-t-4 border-t-emerald-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-sm font-medium text-muted-foreground">Servidores Online</h2>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{counts.ONLINE}</div>
        </CardContent>
      </Card>

      <Card className="w-1/3 cursor-pointer hover:bg-zinc-50 transition-colors border-t-4 border-t-rose-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-sm font-medium text-muted-foreground">Servidores Offline</h2>
          <span className="h-3 w-3 rounded-full bg-rose-500"></span>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{counts.OFFLINE}</div>
        </CardContent>
      </Card>

      <Card className="w-1/3 cursor-pointer hover:bg-zinc-50 transition-colors border-t-4 border-t-amber-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-sm font-medium text-muted-foreground">Em Manutenção</h2>
          <span className="h-3 w-3 rounded-full bg-amber-500 animate-pulse"></span>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{counts.MAINTENANCE}</div>
        </CardContent>
      </Card>
      
    </div>
  );
};

export default DashboardCards;