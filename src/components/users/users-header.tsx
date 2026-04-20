"use client";

import { SearchIcon, UserPlusIcon } from "lucide-react";

type UsersHeaderProps = {
  total: number;
  query: string;
  onQueryChange: (v: string) => void;
  onNew: () => void;
};

export function UsersHeader({
  total,
  query,
  onQueryChange,
  onNew,
}: UsersHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-[24px] font-extrabold tracking-[-0.02em] text-[var(--ink)] sm:text-[28px]">
          Usuários
        </h1>
        <p className="mt-1 text-sm text-[var(--ink-3)]">
          Gerencie o acesso da equipe ao System Pulse ({total}{" "}
          {total === 1 ? "pessoa" : "pessoas"})
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="sp-field w-full sm:w-[280px]">
          <SearchIcon className="ml-3 size-4 shrink-0 text-[var(--ink-3)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar por nome ou email..."
            className="sp-input"
          />
        </div>

        <button type="button" onClick={onNew} className="sp-btn-primary">
          <UserPlusIcon className="size-4" />
          Novo usuário
        </button>
      </div>
    </div>
  );
}
