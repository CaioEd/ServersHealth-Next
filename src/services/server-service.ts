// src/services/server-service.ts
import { Server } from "@/types/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Lendo do .env1


export async function getServers(): Promise<Server[]> {

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não está definida no .env");
  }

  try {
    // Garante que o Next.js não cacheie a resposta e sempre traga dados frescos ao dar F5.
    const response = await fetch(`${apiUrl}/servers`, {
      cache: "no-store",
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
    const response = await fetch(`${apiUrl}/servers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    const response = await fetch(`${apiUrl}/servers/${serverData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
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
    const response = await fetch(`${apiUrl}/servers/${id}`, {
      cache: "no-store",
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
    const response = await fetch(`${apiUrl}/servers/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
  } catch (error) {
    console.error("Falha ao deletar servidor:", error);
    throw error;
  }
}