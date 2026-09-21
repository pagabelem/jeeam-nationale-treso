import { Plus, Download, Landmark, Wallet, Smartphone, PiggyBank } from "lucide-react"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TransactionsTable } from "@/components/tresorerie/transactions-table"
import { ACCOUNTS, formatMAD } from "@/lib/data"

const icons = { BANK: Landmark, CASH: Wallet, MOBILE: Smartphone, FUND: PiggyBank } as const
const kindLabel = { BANK: "Banque", CASH: "Caisse", MOBILE: "Mobile", FUND: "Fonds réservé" } as const

export default function TresoreriePage() {
  return (
    <>
      <PageHeader
        title="Trésorerie"
        description="Suivi en temps réel des comptes, recettes et dépenses du Bureau National."
        actions={
          <>
            <Button variant="outline">
              <Download className="size-4" /> Exporter
            </Button>
            <Button>
              <Plus className="size-4" /> Nouvelle opération
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ACCOUNTS.map((acc) => {
          const Icon = icons[acc.kind]
          return (
            <Card key={acc.id}>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="size-4" />
                  {kindLabel[acc.kind]}
                </div>
                <p className="mt-2 text-xl font-semibold tracking-tight tabular-nums">{formatMAD(acc.balance)}</p>
                <p className="mt-1 truncate text-xs text-muted-foreground">{acc.name}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-6">
        <TransactionsTable />
      </div>
    </>
  )
}
