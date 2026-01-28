// src/services/server-service.ts
import { Server } from "@/types/server";

export async function getServers(): Promise<Server[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Lendo do .env1

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL não está definida no .env");
  }

  try {
    // cache: 'no-store' é vital para dashboards!
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
