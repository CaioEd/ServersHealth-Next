import {
  ShieldCheckIcon,
  PencilIcon,
  EyeIcon,
  CheckCircle2Icon,
  ClockIcon,
  BanIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserRole, UserStatus } from "@/types/user";

const roleMeta: Record<
  UserRole,
  { label: string; icon: React.ElementType; className: string }
> = {
  ADMIN: {
    label: "Admin",
    icon: ShieldCheckIcon,
    className:
      "bg-[var(--red-50)] text-[var(--red-700)] border border-[var(--red-400)]/40",
  },
  EDITOR: {
    label: "Editor",
    icon: PencilIcon,
    className:
      "bg-[var(--surface-2)] text-[var(--ink-2)] border border-[var(--line)]",
  },
  VIEWER: {
    label: "Visualizador",
    icon: EyeIcon,
    className:
      "bg-[var(--surface-2)] text-[var(--ink-3)] border border-[var(--line)]",
  },
};

const statusMeta: Record<
  UserStatus,
  { label: string; icon: React.ElementType; dot: string; text: string }
> = {
  ACTIVE: {
    label: "Ativo",
    icon: CheckCircle2Icon,
    dot: "bg-emerald-500",
    text: "text-emerald-600",
  },
  PENDING: {
    label: "Pendente",
    icon: ClockIcon,
    dot: "bg-amber-500",
    text: "text-amber-600",
  },
  BLOCKED: {
    label: "Bloqueado",
    icon: BanIcon,
    dot: "bg-[var(--red-500)]",
    text: "text-[var(--red-700)]",
  },
};

export function UserRoleBadge({ role }: { role: UserRole }) {
  const meta = roleMeta[role];
  const Icon = meta.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[-0.01em]",
        meta.className
      )}>
      <Icon className="size-3.5" />
      {meta.label}
    </span>
  );
}

export function UserStatusBadge({ status }: { status: UserStatus }) {
  const meta = statusMeta[status];
  const Icon = meta.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-[11px] font-semibold",
        meta.text
      )}>
      <Icon className="size-3.5" />
      {meta.label}
    </span>
  );
}
