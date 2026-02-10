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
import {
  PenIcon,
  Wifi,
  WifiOff,
  AlertTriangle,
  Key,
  Check,
  Copy,
} from "lucide-react";
import { useWebSocket } from "@/context/WebSocketContext";
import { Server } from "@/types/server";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // ← imports corretos do shadcn/ui
import { toast } from "sonner";

interface ServersListProps {
  initialData: Server[]; // Recebendo via props
}

export default function ServersList({ initialData }: ServersListProps) {
  const { serverStatuses } = useWebSocket();
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState(false);

  const getServerData = (server: Server) => {
    const live = serverStatuses[server.id];
    return {
      status: live?.status || server.status,
      cpu: live?.usageCpu ?? server.usageCpu,
      ram: live?.usageRam ?? server.usageRam,
      disk: live?.usageDisk ?? server.usageDisk,
      ip: live?.ip || server.ip,
    };
  };

  const getStatus = (server: Server) => {
    return serverStatuses[server.id] || server.status;
  };

  const getStatusBadge = (status: string) => {
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
      <Badge variant="secondary" className="bg-zinc-300">
        <AlertTriangle className="w-3 h-3 mr-1" /> {status === "UNKNOWN" ? (
          "Desconhecido"
        ) : (
          status
        )}
      </Badge>
    );
  };

  const openTokenModal = (token: string) => {
    setToken(token);
    setCopied(false);
    setOpenModal(true);
  };

  const copyToClipboard = async () => {
    if (!token) return;
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      toast.success("Token copiado! Agora é só colar no seu servidor.");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Erro ao copiar. Tente selecionar o texto manualmente.");
    }
  };

  return (
    <>
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
            <TableHead className="text-center">Token</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialData.map((server) => {
            const currentStatus = getServerData(server);
            return (
              <TableRow key={server.id}>
                <TableCell className="server-list-table-cell font-medium">
                  {server.name}
                </TableCell>
                <TableCell className="server-list-table-cell">
                  {server.description}
                </TableCell>
                <TableCell className="server-list-table-cell">
                  {getStatusBadge(currentStatus.status)}
                </TableCell>
                <TableCell className="server-list-table-cell">
                  {currentStatus.ip != null ? (
                    `${currentStatus.ip}`
                  ) : (
                    <span className="text-gray-400">---</span>
                  )}
                </TableCell>
                <TableCell className="server-list-table-cell">
                  {currentStatus.cpu != null ? (
                    `${currentStatus.cpu.toFixed(2)}%`
                  ) : (
                    <span className="text-gray-400">---</span>
                  )}
                </TableCell>
                <TableCell className="server-list-table-cell">
                  {currentStatus.ram != null ? (
                    `${currentStatus.ram.toFixed(2)}%`
                  ) : (
                    <span className="text-gray-400">---</span>
                  )}
                </TableCell>
                <TableCell className="server-list-table-cell">
                  {currentStatus.disk != null ? (
                    `${currentStatus.disk.toFixed(2)}%`
                  ) : (
                    <span className="text-gray-400">---</span>
                  )}
                </TableCell>

                <TableCell className="server-list-table-cell">
                  <Link href={`/servers/${server.id}`}>
                    <button className="p-2 hover:bg-zinc-300 rounded-md transition cursor-pointer mt-1">
                      <PenIcon className="h-4 w-4 text-zinc-600" />
                    </button>
                  </Link>
                </TableCell>

                <TableCell className="server-list-table-cell">
                  <button
                    className="p-2 hover:bg-zinc-300 rounded-md transition cursor-pointer"
                    onClick={() => openTokenModal(server.token)}>
                    <Key className="h-4 w-4 text-zinc-600 mt-1" />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
          {initialData.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={9} // corrigido para 9 colunas
                className="text-center h-24 text-muted-foreground">
                Nenhum servidor encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Token do servidor</DialogTitle>
            <DialogDescription>
              Copie e cole esse token no seu servidor para conectá-lo.
              <span className="block mt-1 text-destructive font-medium">
                Atenção: Guarde em um local seguro.
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-6">
            <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm break-all">
              {token || "Carregando..."}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              disabled={!token}
              title="Copiar token"
              className="cursor-pointer">
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            <p>Exemplo de uso no seu servidor:</p>
            <pre className="bg-black/80 text-white p-2 rounded mt-1 overflow-x-auto">
              {`TOKEN=${token || "SEU_TOKEN_AQUI"}`}
            </pre>
          </div>
          <div className="flex justify-end mt-6">
            <Button className="cursor-pointer" variant="secondary" onClick={() => setOpenModal(false)}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
