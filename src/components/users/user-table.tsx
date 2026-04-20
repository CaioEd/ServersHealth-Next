"use client";

import { PencilIcon, Trash2Icon, UsersIcon } from "lucide-react";
import { UserAvatar } from "./user-avatar";
import { UserRoleBadge, UserStatusBadge } from "./user-badges";
import type { User } from "@/types/user";

type UserTableProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="sp-card grid place-items-center gap-3 px-6 py-16 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--ink-3)]">
          <UsersIcon className="size-6" />
        </span>
        <div>
          <p className="text-sm font-semibold text-[var(--ink)]">
            Nenhum usuário encontrado
          </p>
          <p className="mt-1 text-xs text-[var(--ink-3)]">
            Ajuste os filtros ou adicione um novo usuário à equipe.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="sp-card overflow-hidden">
      {/* Desktop: tabela */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--line)] bg-[var(--surface-2)]/60">
              <Th>Usuário</Th>
              <Th>Cargo</Th>
              <Th>Status</Th>
              <Th>Último acesso</Th>
              <Th className="text-right">Ações</Th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={u.id}
                className={
                  i !== users.length - 1
                    ? "border-b border-[var(--line-2)]"
                    : undefined
                }>
                <Td>
                  <div className="flex items-center gap-3">
                    <UserAvatar name={u.name} src={u.avatarUrl} size="md" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[var(--ink)]">
                        {u.name}
                      </p>
                      <p className="truncate text-xs text-[var(--ink-3)]">
                        {u.email}
                      </p>
                    </div>
                  </div>
                </Td>
                <Td>
                  <UserRoleBadge role={u.role} />
                </Td>
                <Td>
                  <UserStatusBadge status={u.status} />
                </Td>
                <Td>
                  <span className="text-xs text-[var(--ink-2)]">
                    {u.lastAccess ?? "—"}
                  </span>
                </Td>
                <Td className="text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <IconAction
                      label="Editar"
                      onClick={() => onEdit(u)}
                      icon={PencilIcon}
                    />
                    <IconAction
                      label="Remover"
                      onClick={() => onDelete(u)}
                      icon={Trash2Icon}
                      tone="danger"
                    />
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: cards */}
      <ul className="divide-y divide-[var(--line-2)] md:hidden">
        {users.map((u) => (
          <li key={u.id} className="flex items-start gap-3 p-4">
            <UserAvatar name={u.name} src={u.avatarUrl} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[var(--ink)]">
                {u.name}
              </p>
              <p className="truncate text-xs text-[var(--ink-3)]">{u.email}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <UserRoleBadge role={u.role} />
                <UserStatusBadge status={u.status} />
              </div>
              <p className="mt-2 text-[11px] text-[var(--ink-3)]">
                Último acesso: {u.lastAccess ?? "—"}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <IconAction
                label="Editar"
                onClick={() => onEdit(u)}
                icon={PencilIcon}
              />
              <IconAction
                label="Remover"
                onClick={() => onDelete(u)}
                icon={Trash2Icon}
                tone="danger"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Th({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={
        "px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--ink-3)]" +
        (className ? " " + className : "")
      }>
      {children}
    </th>
  );
}

function Td({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td
      className={
        "px-5 py-3.5 align-middle text-sm text-[var(--ink)]" +
        (className ? " " + className : "")
      }>
      {children}
    </td>
  );
}

function IconAction({
  label,
  onClick,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  onClick: () => void;
  icon: React.ElementType;
  tone?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={
        "inline-flex size-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] transition-colors " +
        (tone === "danger"
          ? "text-[var(--red-600)] hover:border-[var(--red-400)] hover:bg-[var(--red-50)]"
          : "text-[var(--ink-2)] hover:bg-[var(--surface-2)]")
      }>
      <Icon className="size-4" />
    </button>
  );
}
