import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { PenIcon } from "lucide-react";

const serversMock = [
    {
        id: 1,
        name: "Servidor 1",
        status: "Online",
        ip: "192.168.2.1",
        port: 8080
    },
    {
        id: 2,
        name: "Produção Leste",
        status: "Online",
        ip: "192.168.2.10",
        port: 443
    },
    {
        id: 3,
        name: "Backup Global",
        status: "Offline",
        ip: "192.168.2.15",
        port: 22
    },
    {
        id: 4,
        name: "Homologação API",
        status: "Online",
        ip: "192.168.2.20",
        port: 3000
    },
    {
        id: 5,
        name: "Database Cluster",
        status: "Maintenance",
        ip: "192.168.2.25",
        port: 5432
    },
    {
        id: 6,
        name: "Cache Redis",
        status: "Online",
        ip: "192.168.2.30",
        port: 6379
    },
    {
        id: 7,
        name: "Serviço de Logs",
        status: "Online",
        ip: "192.168.2.35",
        port: 9200
    }
];

export default function ServersList() {
    return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>IP</TableHead>
          <TableHead className="text-right">Port</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {serversMock.map((server) => (
          <TableRow key={server.id}>
            <TableCell className="font-medium">{server.name}</TableCell>
            <TableCell>{server.status}</TableCell>
            <TableCell>{server.ip}</TableCell>
            <TableCell className="text-right">{server.port}</TableCell>
            <TableCell><PenIcon className="h-4 w-4" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

}
