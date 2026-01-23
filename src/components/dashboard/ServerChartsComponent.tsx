"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"

// Dados formatados para Pizza/Donut
const chartData = [
  { status: "serversOn", count: 12, fill: "var(--color-serversOn)" },
  { status: "serversOff", count: 7, fill: "var(--color-serversOff)" },
  { status: "maintenance", count: 3, fill: "var(--color-maintenance)" },
]

const chartConfig = {
  count: {
    label: "Servidores",
  },
  serversOn: {
    label: "Online",
    color: "#22c55e", // Verde
  },
  serversOff: {
    label: "Offline",
    color: "#ef4444", // Vermelho
  },
  maintenance: {
    label: "Manutenção",
    color: "#f59e0b", // Laranja/Amber
  },
} satisfies ChartConfig

export default function ServerDonutChart() {
  // Calculamos o total para exibir no centro
  const totalServers = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [])

  return (
    <div className="flex flex-col gap-4 border rounded-xl p-4 shadow-sm w-full max-w-md">
        <div className="space-y-1">
            <h2 className="text-lg font-semibold leading-none tracking-tight">Status da Infraestrutura</h2>
            <p className="text-sm text-muted-foreground">Monitoramento em tempo real</p>
        </div>
        
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] w-full">
            <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                    data={chartData}
                    dataKey="count"
                    nameKey="status"
                    innerRadius={60} // Isso cria o buraco do Donut
                    strokeWidth={5}   // Espaço branco entre as fatias
                >
                    {/* Texto centralizado no buraco do Donut */}
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold"
                                        >
                                            {totalServers.toLocaleString()}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground text-xs"
                                        >
                                            Total
                                        </tspan>
                                    </text>
                                )
                            }
                        }}
                    />
                </Pie>
                <ChartLegend 
                  content={<ChartLegendContent nameKey="status" />} 
                  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center" 
                />
            </PieChart>
        </ChartContainer>
    </div>
  )
}