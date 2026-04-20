"use client";

import { useEffect, useState } from "react";
import { MailIcon, UserIcon, UsersRoundIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { User, UserRole, UserStatus } from "@/types/user";

export type UserFormValues = {
  name: string;
  email: string;
  team: string;
  role: UserRole;
  status: UserStatus;
};

type UserFormDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode: "create" | "edit";
  initialUser?: User | null;
  onSubmit: (values: UserFormValues) => void;
};

const emptyValues: UserFormValues = {
  name: "",
  email: "",
  team: "",
  role: "VIEWER",
  status: "ACTIVE",
};

export function UserFormDialog({
  open,
  onOpenChange,
  mode,
  initialUser,
  onSubmit,
}: UserFormDialogProps) {
  const [values, setValues] = useState<UserFormValues>(emptyValues);

  useEffect(() => {
    if (!open) return;
    if (initialUser) {
      setValues({
        name: initialUser.name,
        email: initialUser.email,
        team: initialUser.team ?? "",
        role: initialUser.role,
        status: initialUser.status,
      });
    } else {
      setValues(emptyValues);
    }
  }, [open, initialUser]);

  const set = <K extends keyof UserFormValues>(key: K, v: UserFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.name.trim() || !values.email.trim()) return;
    onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sp-theme bg-[var(--surface)] text-[var(--ink)] border-[var(--line)] sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-extrabold tracking-[-0.02em]">
            {mode === "create" ? "Novo usuário" : "Editar usuário"}
          </DialogTitle>
          <DialogDescription className="text-[var(--ink-3)]">
            {mode === "create"
              ? "Convide alguém da sua equipe para monitorar a infraestrutura."
              : "Atualize as informações e permissões deste usuário."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label htmlFor="user-name" className="sp-label">
              Nome completo
            </label>
            <div className="sp-field">
              <UserIcon className="ml-3 size-4 shrink-0 text-[var(--ink-3)]" />
              <input
                id="user-name"
                className="sp-input"
                placeholder="Ex.: Ana Moraes"
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="user-email" className="sp-label">
              Email corporativo
            </label>
            <div className="sp-field">
              <MailIcon className="ml-3 size-4 shrink-0 text-[var(--ink-3)]" />
              <input
                id="user-email"
                type="email"
                className="sp-input"
                placeholder="ana@pulseteam.com"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="user-team" className="sp-label">
              Time
            </label>
            <div className="sp-field">
              <UsersRoundIcon className="ml-3 size-4 shrink-0 text-[var(--ink-3)]" />
              <input
                id="user-team"
                className="sp-input"
                placeholder="Ex.: Infraestrutura"
                value={values.team}
                onChange={(e) => set("team", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="user-role" className="sp-label">
                Cargo
              </label>
              <select
                id="user-role"
                className="sp-select"
                value={values.role}
                onChange={(e) => set("role", e.target.value as UserRole)}>
                <option value="ADMIN">Admin</option>
                <option value="EDITOR">Editor</option>
                <option value="VIEWER">Visualizador</option>
              </select>
            </div>

            <div>
              <label htmlFor="user-status" className="sp-label">
                Status
              </label>
              <select
                id="user-status"
                className="sp-select"
                value={values.status}
                onChange={(e) => set("status", e.target.value as UserStatus)}>
                <option value="ACTIVE">Ativo</option>
                <option value="PENDING">Pendente</option>
                <option value="BLOCKED">Bloqueado</option>
              </select>
            </div>
          </div>

          <DialogFooter className="mt-2">
            <button
              type="button"
              className="sp-btn-ghost"
              onClick={() => onOpenChange(false)}>
              Cancelar
            </button>
            <button type="submit" className="sp-btn-primary">
              {mode === "create" ? "Convidar usuário" : "Salvar alterações"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
