"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const config = {
  montant: { label: "Dépenses", color: "var(--chart-1)" },
} satisfies ChartConfig

export function CategoryChart({ data }: { data: { categorie: string; montant: number }[] }) {
  return (
    <ChartContainer config={config} className="h-[300px] w-full">
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
        <YAxis
          type="category"
          dataKey="categorie"
          tickLine={false}
          axisLine={false}
          width={120}
          tick={{ fontSize: 12 }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="montant" fill="var(--color-montant)" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
