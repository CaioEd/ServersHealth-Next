export type ServerStatusType = "ONLINE" | "OFFLINE" | "MAINTENANCE" | "UNKNOWN";

export interface Server {
  id: number;
  token: string;
  name: string;
  description?: string;
  ip: string;
  status: ServerStatusType;
  usageCpu: number;
  usageRam: number;
  usageDisk: number;
  lastHeartbeat?: string; // LocalDateTime vira string ISO no JSON
}
