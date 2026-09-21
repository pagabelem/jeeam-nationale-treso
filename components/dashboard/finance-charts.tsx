"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { MONTHLY } from "@/lib/data"

const monthlyConfig = {
  recettes: { label: "Recettes", color: "var(--chart-2)" },
  depenses: { label: "Dépenses", color: "var(--chart-3)" },
} satisfies ChartConfig

export function MonthlyChart() {
  return (
    <ChartContainer config={monthlyConfig} className="h-[280px] w-full">
      <AreaChart data={MONTHLY} margin={{ left: 4, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="fillRec" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-recettes)" stopOpacity={0.35} />
            <stop offset="95%" stopColor="var(--color-recettes)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillDep" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-depenses)" stopOpacity={0.35} />
            <stop offset="95%" stopColor="var(--color-depenses)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={44}
          tickFormatter={(v) => `${Math.round(v / 1000)}k`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="recettes"
          type="monotone"
          stroke="var(--color-recettes)"
          fill="url(#fillRec)"
          strokeWidth={2}
        />
        <Area
          dataKey="depenses"
          type="monotone"
          stroke="var(--color-depenses)"
          fill="url(#fillDep)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  )
}

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-4)", "var(--chart-5)", "var(--chart-3)"]

export function ContributionsChart({
  data,
}: {
  data: { name: string; value: number }[]
}) {
  const config: ChartConfig = Object.fromEntries(
    data.map((d, i) => [d.name, { label: d.name, color: COLORS[i % COLORS.length] }]),
  )
  return (
    <ChartContainer config={config} className="mx-auto aspect-square h-[240px]">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} strokeWidth={4}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
