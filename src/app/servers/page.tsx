"use client";

import ServersList from "@/components/dashboard/ServersList";

export default function ServersListPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Servidores
                </h1>
                <p className="text-sm text-gray-500">
                    Gerencie o status e configurações da sua infraestrutura em tempo real.
                </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <ServersList />
            </div>
        </div>
    )
}