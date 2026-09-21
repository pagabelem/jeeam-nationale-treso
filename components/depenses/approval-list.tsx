"use client"

import { useState } from "react"
import { Check, X, ShieldAlert, Users, FileCheck2, CircleDollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { APPROVALS, categoryName, activityName, formatMAD, formatDate, type Approval } from "@/lib/data"
import { cn } from "@/lib/utils"

type Decision = "PENDING_APPROVAL" | "APPROVED" | "REJECTED"

export function ApprovalList() {
  const [state, setState] = useState<Record<string, Decision>>(
    Object.fromEntries(APPROVALS.map((a) => [a.id, a.status])),
  )

  const decide = (id: string, d: Decision) => setState((prev) => ({ ...prev, [id]: d }))

  return (
    <div className="space-y-4">
      {APPROVALS.map((a: Approval) => {
        const status = state[a.id]
        const decided = status !== "PENDING_APPROVAL"
        return (
          <Card
            key={a.id}
            className={cn(
              status === "APPROVED" && "border-emerald-200 bg-emerald-50/40",
              status === "REJECTED" && "border-red-200 bg-red-50/40",
            )}
          >
            <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{a.reference}</span>
                  {!a.budgetOk && (
                    <Badge variant="outline" className="gap-1 border-red-200 bg-red-100 text-red-800">
                      <ShieldAlert className="size-3" /> Hors budget
                    </Badge>
                  )}
                  {a.doubleValidation && (
                    <Badge variant="outline" className="gap-1 border-amber-200 bg-amber-100 text-amber-800">
                      <Users className="size-3" /> Double validation requise
                    </Badge>
                  )}
                </div>
                <p className="font-medium">{a.label}</p>
                <p className="text-sm text-muted-foreground">
                  {categoryName(a.categoryId)}
                  {activityName(a.activityId) ? ` · ${activityName(a.activityId)}` : ""} · Demandé par {a.requestedBy}{" "}
                  le {formatDate(a.requestedAt)}
                </p>
              </div>

              <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:gap-2">
                <p className="text-xl font-semibold tabular-nums">{formatMAD(a.amount)}</p>
                {decided ? (
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-medium",
                      status === "APPROVED"
                        ? "border-emerald-200 bg-emerald-100 text-emerald-800"
                        : "border-red-200 bg-red-100 text-red-800",
                    )}
                  >
                    {status === "APPROVED" ? "Autorisée" : "Refusée"}
                  </Badge>
                ) : (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => decide(a.id, "REJECTED")}>
                      <X className="size-4" /> Refuser
                    </Button>
                    <Button size="sm" onClick={() => decide(a.id, "APPROVED")}>
                      <Check className="size-4" /> Autoriser
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

const STEPS = [
  { icon: FileCheck2, title: "Saisie", who: "Trésorière", desc: "Demande de dépense + justificatif" },
  { icon: Check, title: "Autorisation", who: "Présidente", desc: "Validation (double si seuil dépassé)" },
  { icon: CircleDollarSign, title: "Paiement", who: "Trésorière", desc: "Décaissement & référence" },
  { icon: ShieldAlert, title: "Contrôle", who: "Commissaire", desc: "Vérification a posteriori" },
]

export function WorkflowStrip() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((s, i) => {
        const Icon = s.icon
        return (
          <div key={s.title} className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-4" />
              </span>
              <span className="text-xs font-medium text-muted-foreground">Étape {i + 1}</span>
            </div>
            <p className="mt-2 font-medium">{s.title}</p>
            <p className="text-xs text-muted-foreground">{s.who}</p>
            <p className="mt-1 text-xs text-muted-foreground text-pretty">{s.desc}</p>
          </div>
        )
      })}
    </div>
  )
}
