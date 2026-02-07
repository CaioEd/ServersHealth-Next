// components/dashboard/ServersList.tsx
"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PenIcon, Wifi, WifiOff, AlertTriangle } from "lucide-react";
import { useWebSocket } from "@/context/WebSocketContext";
import { Server } from "@/types/server"; 

interface ServersListProps {
  initialData: Server[]; // Recebendo via props
}

export default function ServersList({ initialData }: ServersListProps) {
  const { serverStatuses } = useWebSocket();

  const getServerData = (server: Server) => {
    const live = serverStatuses[server.id];

    // Se tiver dados live, usa eles. Se não, usa o inicial (banco de dados)
    return {
      status: live?.status || server.status,
      cpu: live?.usageCpu ?? server.usageCpu, // ?? permite que 0 seja válido
      ram: live?.usageRam ?? server.usageRam,
      disk: live?.usageDisk ?? server.usageDisk,
      ip: live?.ip || server.ip
    };
  }

  // Lógica de "Merge": Dados Iniciais + Atualizações do Socket
  const getStatus = (server: Server) => {
    // Se o WebSocket mandou um status novo para este ID, usamos ele.
    // Caso contrário, usamos o que veio da API REST (initialData).
    return serverStatuses[server.id] || server.status;
  };

  const getStatusBadge = (status: string) => {
    // Normalizando para minúsculo/maiúsculo se necessário
    const s = status.toLowerCase();

    if (s === "online")
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <Wifi className="w-3 h-3 mr-1" /> Online
        </Badge>
      );
    if (s === "offline")
      return (
        <Badge variant="destructive">
          <WifiOff className="w-3 h-3 mr-1" /> Offline
        </Badge>
      );
    return (
      <Badge variant="secondary">
        <AlertTriangle className="w-3 h-3 mr-1" /> {status}
      </Badge>
    );
  };

  return (
    <Table className="text-base w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Nome</TableHead>
          <TableHead className="text-center">Descrição</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">IP</TableHead>
          <TableHead className="text-center">CPU</TableHead>
          <TableHead className="text-center">RAM</TableHead>
          <TableHead className="text-center">Uso de Disco</TableHead>
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {initialData.map((server) => {
          const currentStatus = getServerData(server);

          return (
            <TableRow key={server.id}>
              <TableCell className="text-center font-medium">{server.name}</TableCell>
              <TableCell className="text-center">{server.description}</TableCell>
              <TableCell className="text-center">
                {getStatusBadge(currentStatus.status)}
              </TableCell>
              <TableCell className="text-center text-zinc-500">
                {currentStatus.ip}
              </TableCell>
              <TableCell className="text-center text-zinc-500">
                {currentStatus.cpu.toFixed(2)}%
              </TableCell>
              <TableCell className="text-center text-zinc-500">
                {currentStatus.ram.toFixed(2)}%
              </TableCell>
              <TableCell className="text-center text-zinc-500">
                {currentStatus.disk.toFixed(2)}%
              </TableCell>
              <TableCell className="text-center">
                <Link href={`/servers/${server.id}`}>
                  <button className="p-2 hover:bg-zinc-100 rounded-md transition cursor-pointer">
                    <PenIcon className="h-4 w-4 text-zinc-600" />
                  </button>
                </Link>
              </TableCell>
            </TableRow>
          );
        })}

        {initialData.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center h-24 text-muted-foreground">
              Nenhum servidor encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
