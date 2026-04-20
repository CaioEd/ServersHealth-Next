export type UserRole = "ADMIN" | "EDITOR" | "VIEWER";
export type UserStatus = "ACTIVE" | "PENDING" | "BLOCKED";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  team?: string;
  avatarUrl?: string;
  lastAccess?: string;
}
