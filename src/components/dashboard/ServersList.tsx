import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PenIcon } from "lucide-react";

// Tipagem simples para o mock
type Server = {
    id: number;
    name: string;
    status: "Online" | "Offline" | "Maintenance";
    ip: string;
    port: number;
}

const serversMock: Server[] = [
    { id: 1, name: "Servidor 1", status: "Online", ip: "192.168.2.1", port: 8080 },
    { id: 2, name: "Produção Leste", status: "Online", ip: "192.168.2.10", port: 443 },
    { id: 3, name: "Backup Global", status: "Offline", ip: "192.168.2.15", port: 22 },
    { id: 4, name: "Homologação API", status: "Online", ip: "192.168.2.20", port: 3000 },
    { id: 5, name: "Database Cluster", status: "Maintenance", ip: "192.168.2.25", port: 5432 },
    { id: 6, name: "Cache Redis", status: "Online", ip: "192.168.2.30", port: 6379 },
    { id: 7, name: "Serviço de Logs", status: "Online", ip: "192.168.2.35", port: 9200 }
];

// Helper para estilizar os status
const getStatusStyles = (status: string) => {
    switch (status) {
        case "Online":
            return "bg-emerald-100 text-emerald-700 border-emerald-200";
        case "Offline":
            return "bg-red-100 text-red-700 border-red-200";
        case "Maintenance":
            return "bg-amber-100 text-amber-700 border-amber-200";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

export default function ServersList() {
    return (
        <div className="w-full overflow-hidden">
            <Table>
                <TableHeader className="bg-gray-50/50">
                    <TableRow>
                        <TableHead className="w-[200px] font-semibold text-gray-700">Nome</TableHead>
                        <TableHead className="w-[150px] font-semibold text-gray-700">Status</TableHead>
                        <TableHead className="font-semibold text-gray-700">IP</TableHead>
                        <TableHead className="font-semibold text-gray-700">Porta</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {serversMock.map((server) => (
                        <TableRow key={server.id} className="hover:bg-gray-50/50 transition-colors">
                            <TableCell className="font-medium text-gray-900">
                                {server.name}
                            </TableCell>
                            <TableCell>
                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border ${getStatusStyles(server.status)}`}>
                                    <span className={`h-1.5 w-1.5 rounded-full ${server.status === 'Online' ? 'bg-emerald-500' : server.status === 'Offline' ? 'bg-red-500' : 'bg-amber-500'}`} />
                                    {server.status}
                                </span>
                            </TableCell>
                            <TableCell className="font-mono text-xs text-gray-500">
                                {server.ip}
                            </TableCell>
                            <TableCell className="font-mono text-xs text-gray-500">
                                {server.port}
                            </TableCell>
                            <TableCell className="text-right">
                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all group" title="Editar Servidor">
                                    <PenIcon className="h-4 w-4" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}