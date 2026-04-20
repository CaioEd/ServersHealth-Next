"use client";

import { useMemo, useState } from "react";
import { UsersHeader } from "./users-header";
import { UserTable } from "./user-table";
import { UserFormDialog, type UserFormValues } from "./user-form-dialog";
import type { User } from "@/types/user";

type UsersListProps = {
  initialData: User[];
};

export function UsersList({ initialData }: UsersListProps) {
  const [users, setUsers] = useState<User[]>(initialData);
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, query]);

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (user: User) => {
    setEditing(user);
    setDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  const handleSubmit = (values: UserFormValues) => {
    if (editing) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editing.id ? { ...u, ...values } : u))
      );
    } else {
      const nextId = users.reduce((acc, u) => Math.max(acc, u.id), 0) + 1;
      setUsers((prev) => [
        ...prev,
        { id: nextId, ...values, lastAccess: "agora" },
      ]);
    }
    setDialogOpen(false);
    setEditing(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <UsersHeader
        total={users.length}
        query={query}
        onQueryChange={setQuery}
        onNew={openCreate}
      />

      <UserTable
        users={filtered}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <UserFormDialog
        open={dialogOpen}
        onOpenChange={(v) => {
          setDialogOpen(v);
          if (!v) setEditing(null);
        }}
        mode={editing ? "edit" : "create"}
        initialUser={editing}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
