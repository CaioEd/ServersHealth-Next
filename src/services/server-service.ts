// src/services/server-service.ts
import { Server } from "@/types/server";

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

export async function getServers(): Promise<Server[]> {

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não está definida no .env");
  }

  try {
    const authHeaders = await getAuthHeaders();
    const response = await fetch(`${apiUrl}/servers`, {
      cache: "no-store",
      headers: authHeaders,
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Falha ao buscar servidores:", error);
    return []; // Retorna lista vazia para não quebrar a tela inteira
  }
}

export async function createServer(serverData: Omit<Server, "id" | "status" | "lastChecked">): Promise<Server> {
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não está definida no .env");
  }

  try {
    const authHeaders = await getAuthHeaders();
    const response = await fetch(`${apiUrl}/servers`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify(serverData),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
      console.error("Falha ao criar servidor:", error);
      throw error; // Re-lança o erro para que o chamador possa tratá-lo
  }
  
}

export async function updateServer(serverData: Server): Promise<Server> {
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não está definida no .env");
  }

  try {
    const authHeaders = await getAuthHeaders();
    const response = await fetch(`${apiUrl}/servers/${serverData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify(serverData),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
      console.error("Falha ao atualizar servidor:", error);
      throw error; // Re-lança o erro para que o chamador possa tratá-lo
  }
  
}

export async function getServerById(id: number): Promise<Server | null> {
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não está definida no .env");
  }

  try {
    const authHeaders = await getAuthHeaders();
    const response = await fetch(`${apiUrl}/servers/${id}`, {
      cache: "no-store",
      headers: authHeaders,
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
      console.error("Falha ao buscar servidor por ID:", error);
      return null;
  }
}

export async function deleteServer(id: number): Promise<void> {
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não está definida no .env");
  }

  try {
    const authHeaders = await getAuthHeaders();
    const response = await fetch(`${apiUrl}/servers/${id}`, {
      method: "DELETE",
      headers: authHeaders,
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
  } catch (error) {
    console.error("Falha ao deletar servidor:", error);
    throw error;
  }
}