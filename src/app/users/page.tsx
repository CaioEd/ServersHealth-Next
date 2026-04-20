import { UsersList } from "@/components/users/users-list";
import type { User } from "@/types/user";

const mockUsers: User[] = [
  {
    id: 1,
    name: "Lucas Andrade",
    email: "lucas@pulseteam.com",
    role: "ADMIN",
    status: "ACTIVE",
    team: "Infraestrutura",
    lastAccess: "há 2 min",
  },
  {
    id: 2,
    name: "Ana Moraes",
    email: "ana.moraes@pulseteam.com",
    role: "EDITOR",
    status: "ACTIVE",
    team: "Plataforma",
    lastAccess: "há 14 min",
  },
  {
    id: 3,
    name: "Rafael Souza",
    email: "rafa@pulseteam.com",
    role: "EDITOR",
    status: "PENDING",
    team: "Observabilidade",
    lastAccess: "—",
  },
  {
    id: 4,
    name: "Beatriz Lima",
    email: "bia.lima@pulseteam.com",
    role: "VIEWER",
    status: "ACTIVE",
    team: "Produto",
    lastAccess: "há 1h",
  },
  {
    id: 5,
    name: "Diego Ferreira",
    email: "diego@pulseteam.com",
    role: "VIEWER",
    status: "BLOCKED",
    team: "Suporte",
    lastAccess: "há 3 dias",
  },
];

export default function UsersPage() {
  return (
    <div className="sp-theme min-h-full bg-[var(--bg)] text-[var(--ink)]">
      <UsersList initialData={mockUsers} />
    </div>
  );
}
