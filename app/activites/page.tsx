import { Plus, CalendarRange, MapPin } from "lucide-react"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ACTIVITIES, regionName, formatMAD, formatDate, type Activity } from "@/lib/data"
import { cn } from "@/lib/utils"

const STATUS: Record<Activity["status"], { label: string; cls: string }> = {
  PLANIFIEE: { label: "Planifiée", cls: "border-blue-200 bg-blue-100 text-blue-800" },
  EN_COURS: { label: "En cours", cls: "border-amber-200 bg-amber-100 text-amber-800" },
  TERMINEE: { label: "Terminée", cls: "border-emerald-200 bg-emerald-100 text-emerald-800" },
  ANNULEE: { label: "Annulée", cls: "border-zinc-200 bg-zinc-100 text-zinc-600" },
}

export default function ActivitesPage() {
  return (
    <>
      <PageHeader
        title="Activités & événements"
        description="Chaque activité dispose de son budget, de son suivi de dépenses et de son bilan financier."
        actions={
          <Button>
            <Plus className="size-4" /> Nouvelle activité
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {ACTIVITIES.map((act) => {
          const pct = Math.min(100, Math.round((act.spent / act.budget) * 100))
          const net = act.income - act.spent
          const st = STATUS[act.status]
          return (
            <Card key={act.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-base">{act.name}</CardTitle>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarRange className="size-3.5" />
                        {formatDate(act.start)} → {formatDate(act.end)}
                      </span>
                      {regionName(act.regionId) && (
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3.5" />
                          {regionName(act.regionId)}
                        </span>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className={st.cls}>
                    {st.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Budget consommé</span>
                    <span className="tabular-nums">
                      {formatMAD(act.spent)} / {formatMAD(act.budget)}
                    </span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
                <div className="grid grid-cols-3 gap-2 border-t pt-3 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Recettes</p>
                    <p className="font-medium tabular-nums text-emerald-600">{formatMAD(act.income)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Dépenses</p>
                    <p className="font-medium tabular-nums">{formatMAD(act.spent)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Bilan</p>
                    <p className={cn("font-medium tabular-nums", net >= 0 ? "text-emerald-600" : "text-red-600")}>
                      {net >= 0 ? "+" : "−"}
                      {formatMAD(Math.abs(net))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
