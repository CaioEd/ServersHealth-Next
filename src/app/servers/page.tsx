"use client";

import ServersList from "@/components/dashboard/ServersList";

export default function ServersListPage() {
    return (
        <div>
            <h1>Lista de servidores cadastrados no sistema</h1>
            <p>Veja informações em tempo real sobre seus servidores</p>

            <div className="rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <ServersList />
            </div>
        </div>
    )
}