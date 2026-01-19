import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"; 
import { AppSidebar } from "@/components/app-sidebar"; 
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "System Pulse - Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50`}>
        <SidebarProvider defaultOpen={true}>
          {" "}
          {/* ou use cookie pra persistir */}
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
      </body>
    </html>
  );
}
