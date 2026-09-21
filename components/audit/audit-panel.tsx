"use client"

import { useMemo, useState } from "react"
import { ShieldCheck, CircleCheck, MessageSquareWarning, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  TRANSACTIONS,
  OBSERVATIONS,
  categoryName,
  formatMAD,
  formatDate,
  type Observation,
} from "@/lib/data"
import { cn } from "@/lib/utils"

const OBS_STYLES: Record<Observation["status"], string> = {
  OUVERTE: "border-red-200 bg-red-100 text-red-800",
  REPONSE: "border-amber-200 bg-amber-100 text-amber-800",
  VERIFIEE: "border-blue-200 bg-blue-100 text-blue-800",
  CLOTUREE: "border-emerald-200 bg-emerald-100 text-emerald-800",
}
const OBS_LABELS: Record<Observation["status"], string> = {
  OUVERTE: "Ouverte",
  REPONSE: "Réponse fournie",
  VERIFIEE: "Vérifiée",
  CLOTUREE: "Clôturée",
}

export function AuditPanel() {
  const controllable = useMemo(
    () => TRANSACTIONS.filter((t) => t.status === "PAID" || t.status === "APPROVED" || t.status === "CONTROLLED"),
    [],
  )
  const [controlled, setControlled] = useState<Record<string, boolean>>(
    Object.fromEntries(controllable.map((t) => [t.id, t.controlled])),
  )

  const done = Object.values(controlled).filter(Boolean).length
  const total = controllable.length
  const pct = Math.round((done / total) * 100)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" /> Avancement du contrôle
            </CardTitle>
            <CardDescription>Opérations vérifiées sur la période en cours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-end justify-between">
              <p className="text-3xl font-semibold tabular-nums">
                {done}
                <span className="text-lg text-muted-foreground">/{total}</span>
              </p>
              <p className="text-sm text-muted-foreground">{pct}% contrôlé</p>
            </div>
            <Progress value={pct} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="size-4 text-primary" /> Intégrité
            </CardTitle>
            <CardDescription>Journal d'audit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <CircleCheck className="size-4 text-emerald-600" /> Aucune modification non tracée
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              Toutes les écritures sont horodatées et non modifiables après validation.
            </p>
            <Button variant="outline" size="sm" className="mt-1 w-full">
              Verrouiller la période
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Opérations à contrôler</CardTitle>
          <CardDescription>Vérification a posteriori des pièces et écritures</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Référence</TableHead>
                  <TableHead>Libellé</TableHead>
                  <TableHead className="hidden md:table-cell">Catégorie</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="hidden sm:table-cell">Justificatif</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                  <TableHead className="pr-6 text-right">Contrôle</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {controllable.map((t) => {
                  const isDone = controlled[t.id]
                  return (
                    <TableRow key={t.id} className={cn(isDone && "bg-emerald-50/40")}>
                      <TableCell className="pl-6 font-mono text-xs text-muted-foreground">{t.reference}</TableCell>
                      <TableCell className="font-medium">{t.label}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                        {categoryName(t.categoryId)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {formatDate(t.date)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {t.hasAttachment ? (
                          <Badge variant="outline" className="border-emerald-200 bg-emerald-100 text-emerald-800">
                            Présent
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-red-200 bg-red-100 text-red-800">
                            Manquant
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-medium tabular-nums">{formatMAD(t.amount)}</TableCell>
                      <TableCell className="pr-6 text-right">
                        {isDone ? (
                          <Badge className="gap-1 bg-emerald-600 hover:bg-emerald-600">
                            <CircleCheck className="size-3" /> Contrôlée
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setControlled((p) => ({ ...p, [t.id]: true }))}
                          >
                            Marquer contrôlée
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquareWarning className="size-4 text-amber-600" /> Observations d'audit
          </CardTitle>
          <CardDescription>Remarques adressées au bureau, avec suivi jusqu'à clôture</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {OBSERVATIONS.map((o) => (
            <div key={o.id} className="rounded-lg border p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium">{o.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    <span className="font-mono">{o.reference}</span> · Ouverte le {formatDate(o.openedAt)}
                  </p>
                </div>
                <Badge variant="outline" className={OBS_STYLES[o.status]}>
                  {OBS_LABELS[o.status]}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">{o.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
