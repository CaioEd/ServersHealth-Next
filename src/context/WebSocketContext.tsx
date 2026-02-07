"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// Interface do payload que vem da API
interface ServerStatusUpdate {
  id: number;
  status: "ONLINE" | "OFFLINE" | "MAINTENANCE";
  usageCpu: number;
  usageRam: number;
  usageDisk: number;
  ip?: string;
}

interface WebSocketContextType {
  isConnected: boolean;
  serverStatuses: Record<number, ServerStatusUpdate>; 
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [serverStatuses, setServerStatuses] = useState<Record<number, ServerStatusUpdate>>(
    {}
  );
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    // Configuração do Cliente STOMP
    const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKETS_URL; // URL da API (defina em .env.local)

    // Garantir que a variável de ambiente exista em tempo de build
    if (!socketUrl) {
      console.error(
        "ENV NEXT_PUBLIC_WEBSOCKETS_URL não definida. Configure em .env.local, ex.: NEXT_PUBLIC_WEBSOCKETS_URL=https://sua-api"
      );
      return;
    }

    const client = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      reconnectDelay: 5000, // Tenta reconectar a cada 5s se cair
      onConnect: () => {
        console.log("🟢 Conectado ao WebSocket!");
        setIsConnected(true);

        // Se inscreve no tópico onde o Spring manda as atualizações
        client.subscribe("/topic/status", (message) => {
          const update: ServerStatusUpdate = JSON.parse(message.body);

          // Atualiza o estado global dos status
          setServerStatuses((prev) => ({
            ...prev,
            [update.id]: update, // Armazena o update completo para cada servidor pelo ID
          }));
        });
      },
      
      onDisconnect: () => {
        console.log("🔴 Desconectado");
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error("Broker error: " + frame.headers["message"]);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ isConnected, serverStatuses }}>
      {children}
    </WebSocketContext.Provider>
  );
}

// Hook personalizado para facilitar o uso
export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      "useWebSocket deve ser usado dentro de um WebSocketProvider"
    );
  }
  return context;
}
