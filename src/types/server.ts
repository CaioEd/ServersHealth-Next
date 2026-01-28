export type ServerStatusType = "ONLINE" | "OFFLINE" | "MAINTENANCE" | "UNKNOWN";

export interface Server {
  id: number;
  name: string;
  description?: string;
  ip: string;
  port: number;
  status: ServerStatusType;
  lastChecked?: string; // LocalDateTime vira string ISO no JSON
}
