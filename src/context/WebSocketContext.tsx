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

// Interface do payload que vem do Java
interface ServerStatusUpdate {
  id: number;
  status: "Online" | "Offline" | "Maintenance";
}

interface WebSocketContextType {
  isConnected: boolean;
  serverStatuses: Record<number, string>; // Mapa { 1: "Online", 2: "Offline" }
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [serverStatuses, setServerStatuses] = useState<Record<number, string>>(
    {}
  );
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    // Configuração do Cliente STOMP
    const socketUrl = "http://localhost:8080/ws-pulse"; // URL do seu Spring Boot

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
            [update.id]: update.status,
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
