// src/services/user-service.ts
import { User } from "@/types/user";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function getAuthHeaders(): Promise<Record<string, string>> {
  let token: string | null | undefined = null;

  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    token = cookieStore.get("token")?.value;
  } else {
    token = localStorage.getItem("token");
  }

  return token ? { Authorization: `Bearer ${token}` } : {};
}

export type UserRequestDTO = Omit<User, "id" | "avatarUrl" | "lastAccess">;

export async function getUsers(): Promise<User[]> {
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não está definida no .env");
  }

  try {
    const authHeaders = await getAuthHeaders();
    const response = await fetch(`${apiUrl}/users`, {
      cache: "no-store",
      headers: authHeaders,
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Falha ao buscar usuários:", error);
    return [];
  }
}

export async function getUserById(id: number): Promise<User | null> {
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não está definida no .env");
  }

  try {
    const authHeaders = await getAuthHeaders();
    const response = await fetch(`${apiUrl}/users/${id}`, {
      cache: "no-store",
      headers: authHeaders,
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Falha ao buscar usuário por ID:", error);
    return null;
  }
}

export async function createUser(userData: UserRequestDTO): Promise<User> {
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não está definida no .env");
  }

  try {
    const authHeaders = await getAuthHeaders();
    const response = await fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Falha ao criar usuário:", error);
    throw error;
  }
}

export async function updateUser(id: number, userData: UserRequestDTO): Promise<User> {
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não está definida no .env");
  }

  try {
    const authHeaders = await getAuthHeaders();
    const response = await fetch(`${apiUrl}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Falha ao atualizar usuário:", error);
    throw error;
  }
}

export async function deleteUser(id: number): Promise<void> {
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não está definida no .env");
  }

  try {
    const authHeaders = await getAuthHeaders();
    const response = await fetch(`${apiUrl}/users/${id}`, {
      method: "DELETE",
      headers: authHeaders,
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
  } catch (error) {
    console.error("Falha ao deletar usuário:", error);
    throw error;
  }
}
