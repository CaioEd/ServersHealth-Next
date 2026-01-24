"use client";

import DashboardCards from "@/components/dashboard/DashboardCards";
import ServerChartsComponent from "@/components/dashboard/ServerChartsComponent"

export default function Home() {  

  return (
    <div className="w-full min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      <div className="flex flex-col justify-center p-4">
        
        <h1 className="text-2xl font-bold">Informações gerais</h1>
        <p className="text-zinc-500">Aqui você pode ver as informações gerais sobre os seus servidores</p>
        <DashboardCards />

        <div className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <ServerChartsComponent />
        </div>

      </div>

    </div>
  );
}
