import { FileText, FileSpreadsheet, FileDown } from "lucide-react"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryChart } from "@/components/rapports/category-chart"
import { ContributionsChart } from "@/components/dashboard/finance-charts"
import { TRANSACTIONS, CATEGORIES, formatMAD, totals } from "@/lib/data"

export default function RapportsPage() {
  const { income, expense, net } = totals()

  const byCategory = CATEGORIES.filter((c) => c.type === "EXPENSE")
    .map((c) => ({
      categorie: c.name,
      montant: TRANSACTIONS.filter((t) => t.categoryId === c.id).reduce((s, t) => s + t.amount, 0),
    }))
    .filter((d) => d.montant > 0)
    .sort((a, b) => b.montant - a.montant)

  const regionContrib = [
    { name: "Casablanca", value: 18000 },
    { name: "Rabat", value: 9500 },
    { name: "Tanger", value: 7200 },
    { name: "Marrakech", value: 5400 },
    { name: "Autres", value: 6100 },
  ]

  return (
    <>
      <PageHeader
        title="Rapports & statistiques"
        description="Synthèses financières exportables pour les assemblées, le bureau et les audits."
        actions={
          <>
            <Button variant="outline">
              <FileText className="size-4" /> PDF
            </Button>
            <Button variant="outline">
              <FileSpreadsheet className="size-4" /> Excel
            </Button>
            <Button>
              <FileDown className="size-4" /> Rapport complet
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total recettes</p>
            <p className="mt-1 text-2xl font-semibold text-emerald-600 tabular-nums">{formatMAD(income)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total dépenses</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{formatMAD(expense)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Résultat net</p>
            <p className="mt-1 text-2xl font-semibold text-indigo-600 tabular-nums">{formatMAD(net)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Dépenses par catégorie</CardTitle>
            <CardDescription>Répartition sur la période en cours</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryChart data={byCategory} />
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
    </>
  )
}
