"use client"

import { useMemo, useState } from "react"
import { ArrowDownRight, ArrowUpRight, Paperclip, Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/status-badge"
import {
  TRANSACTIONS,
  categoryName,
  accountName,
  activityName,
  formatMAD,
  formatDate,
  type TxType,
} from "@/lib/data"
import { cn } from "@/lib/utils"

type Filter = "ALL" | TxType

export function TransactionsTable() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<Filter>("ALL")

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return TRANSACTIONS.filter((t) => {
      if (filter !== "ALL" && t.type !== filter) return false
      if (!q) return true
      return (
        t.label.toLowerCase().includes(q) ||
        t.reference.toLowerCase().includes(q) ||
        categoryName(t.categoryId).toLowerCase().includes(q)
      )
    })
  }, [query, filter])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
          <TabsList>
            <TabsTrigger value="ALL">Toutes</TabsTrigger>
            <TabsTrigger value="INCOME">Recettes</TabsTrigger>
            <TabsTrigger value="EXPENSE">Dépenses</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher…"
            className="pl-9"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[130px]">Référence</TableHead>
              <TableHead>Libellé</TableHead>
              <TableHead className="hidden md:table-cell">Catégorie</TableHead>
              <TableHead className="hidden lg:table-cell">Compte</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((t) => {
              const income = t.type === "INCOME"
              return (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{t.reference}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-full",
                          income ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600",
                        )}
                      >
                        {income ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{t.label}</p>
                        {activityName(t.activityId) && (
                          <p className="truncate text-xs text-muted-foreground">{activityName(t.activityId)}</p>
                        )}
                      </div>
                      {t.hasAttachment && <Paperclip className="size-3.5 shrink-0 text-muted-foreground" />}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {categoryName(t.categoryId)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {accountName(t.accountId).replace(/ —.*/, "")}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {formatDate(t.date)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={t.status} />
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-medium tabular-nums",
                      income ? "text-emerald-600" : "text-foreground",
                    )}
                  >
                    {income ? "+" : "−"}
                    {formatMAD(t.amount)}
                  </TableCell>
                </TableRow>
              )
            })}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  Aucune opération ne correspond à votre recherche.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
