import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"; 
import { AppSidebar } from "@/components/app-sidebar"; 
import { WebSocketProvider } from "@/context/WebSocketContext";
import "@/app/globals.css";



export const metadata: Metadata = {
  title: "System Pulse - Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <WebSocketProvider> 
        <SidebarProvider defaultOpen={true}>
          {" "}
          <div className="flex min-h-screen w-full">
            {/* Sidebar fixa à esquerda */}
            <AppSidebar />

            {/* Área principal: header + conteúdo */}
            <main className="flex-1 flex flex-row">
              {/* Trigger pra mobile / colapsar */}
              <header className="p-4 border-b">
                <SidebarTrigger />
              </header>

              {/* Conteúdo real das páginas */}
              <div className="flex-1 p-6 overflow-auto">{children}</div>
            </main>
          </div>
        </SidebarProvider>
      </WebSocketProvider>
  );
}
