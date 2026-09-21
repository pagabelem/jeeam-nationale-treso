import Link from "next/link"
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  TrendingUp,
  Building2,
  Landmark,
  Smartphone,
  PiggyBank,
  AlertTriangle,
  Clock,
  Sparkles,
} from "lucide-react"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { MonthlyChart, ContributionsChart } from "@/components/dashboard/finance-charts"
import {
  ACCOUNTS,
  ACTIVITIES,
  APPROVALS,
  AI_INSIGHTS,
  formatMAD,
  totals,
  type Account,
} from "@/lib/data"

const accountIcon = {
  BANK: Landmark,
  CASH: Wallet,
  MOBILE: Smartphone,
  FUND: PiggyBank,
} as const

function Kpi({
  label,
  value,
  hint,
  icon: Icon,
  tone,
}: {
  label: string
  value: string
  hint: string
  icon: React.ElementType
  tone: "primary" | "income" | "expense" | "net"
}) {
  const toneClass = {
    primary: "text-primary bg-primary/10",
    income: "text-emerald-600 bg-emerald-500/10",
    expense: "text-red-600 bg-red-500/10",
    net: "text-indigo-600 bg-indigo-500/10",
  }[tone]
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
        </div>
        <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${toneClass}`}>
          <Icon className="size-5" />
        </span>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const { income, expense, balance, net } = totals()

  const regionContrib = [
    { name: "Casablanca", value: 18000 },
    { name: "Rabat", value: 9500 },
    { name: "Tanger", value: 7200 },
    { name: "Marrakech", value: 5400 },
    { name: "Autres", value: 6100 },
  ]

  const pendingCount = APPROVALS.filter((a) => a.status === "PENDING_APPROVAL").length

  return (
    <>
      <PageHeader
        title="Tableau de bord national"
        description="Vue d'ensemble de la trésorerie du Bureau National — période en cours (septembre 2026)."
        actions={
          <>
            <Button variant="outline" render={<Link href="/rapports" />}>
              Exporter le rapport
            </Button>
            <Button render={<Link href="/tresorerie" />}>Nouvelle opération</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          label="Solde de trésorerie"
          value={formatMAD(balance)}
          hint="Tous comptes confondus"
          icon={Wallet}
          tone="primary"
        />
        <Kpi
          label="Recettes (période)"
          value={formatMAD(income)}
          hint="+8% vs mois précédent"
          icon={ArrowUpRight}
          tone="income"
        />
        <Kpi
          label="Dépenses (période)"
          value={formatMAD(expense)}
          hint="62% du budget consommé"
          icon={ArrowDownRight}
          tone="expense"
        />
        <Kpi
          label="Résultat net"
          value={formatMAD(net)}
          hint="Excédent sur la période"
          icon={TrendingUp}
          tone="net"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Évolution financière mensuelle</CardTitle>
            <CardDescription>Recettes et dépenses des 6 derniers mois (MAD)</CardDescription>
          </CardHeader>
          <CardContent>
            <MonthlyChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition par compte</CardTitle>
            <CardDescription>Soldes actuels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {ACCOUNTS.map((acc: Account) => {
              const Icon = accountIcon[acc.kind]
              const pct = Math.round((acc.balance / balance) * 100)
              return (
                <div key={acc.id} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="flex min-w-0 items-center gap-2">
                      <Icon className="size-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">{acc.name}</span>
                    </span>
                    <span className="font-medium tabular-nums">{formatMAD(acc.balance)}</span>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activités en cours</CardTitle>
            <CardDescription>Taux de consommation des budgets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ACTIVITIES.filter((a) => a.status === "EN_COURS" || a.status === "PLANIFIEE").map((act) => {
              const pct = Math.min(100, Math.round((act.spent / act.budget) * 100))
              const over = pct >= 90
              return (
                <div key={act.id} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="truncate font-medium">{act.name}</span>
                    <span className={`tabular-nums ${over ? "text-red-600" : "text-muted-foreground"}`}>
                      {formatMAD(act.spent)} / {formatMAD(act.budget)}
                    </span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              )
            })}
            <Button variant="ghost" size="sm" asChild className="mt-1">
              <Link href="/activites">Voir toutes les activités →</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contributions par région</CardTitle>
            <CardDescription>Origine des recettes</CardDescription>
          </CardHeader>
          <CardContent>
            <ContributionsChart data={regionContrib} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-amber-200 bg-amber-50/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <AlertTriangle className="size-4" /> Alertes & actions requises
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between gap-3 rounded-md border bg-background p-3">
              <span className="flex items-center gap-2 text-sm">
                <Clock className="size-4 text-amber-600" />
                {pendingCount} demande(s) de dépense en attente d'autorisation
              </span>
              <Button size="sm" variant="outline" asChild>
                <Link href="/depenses">Traiter</Link>
              </Button>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md border bg-background p-3">
              <span className="flex items-center gap-2 text-sm">
                <AlertTriangle className="size-4 text-red-600" />2 dépenses sans justificatif complet
              </span>
              <Button size="sm" variant="outline" asChild>
                <Link href="/documents">Régulariser</Link>
              </Button>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md border bg-background p-3">
              <span className="flex items-center gap-2 text-sm">
                <Building2 className="size-4 text-muted-foreground" />3 régions n'ont pas versé leur contribution
                mensuelle
              </span>
              <Button size="sm" variant="outline" asChild>
                <Link href="/rapports">Détails</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Sparkles className="size-4" /> Synthèse IA
            </CardTitle>
            <CardDescription>Assistant JEEAM Finance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-pretty leading-relaxed">{AI_INSIGHTS.find((i) => i.kind === "SYNTHESE")?.detail}</p>
            <Badge variant="outline" className="mt-1 bg-background">
              Généré automatiquement
            </Badge>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
