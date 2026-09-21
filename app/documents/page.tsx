import { FileText, Upload, AlertTriangle, Paperclip } from "lucide-react"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TRANSACTIONS, categoryName, formatMAD, formatDate } from "@/lib/data"

export default function DocumentsPage() {
  const withDoc = TRANSACTIONS.filter((t) => t.hasAttachment)
  const missing = TRANSACTIONS.filter((t) => !t.hasAttachment && t.type === "EXPENSE")

  return (
    <>
      <PageHeader
        title="Justificatifs"
        description="Chaque opération doit être appuyée par une pièce justificative (reçu, facture, bordereau)."
        actions={
          <Button>
            <Upload className="size-4" /> Téléverser une pièce
          </Button>
        }
      />

      {missing.length > 0 && (
        <Card className="mb-4 border-red-200 bg-red-50/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="size-4" /> {missing.length} dépense(s) sans justificatif
            </CardTitle>
            <CardDescription>À régulariser avant le contrôle du commissaire aux comptes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {missing.map((t) => (
              <div
                key={t.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-md border bg-background p-3"
              >
                <div>
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-mono">{t.reference}</span> · {formatMAD(t.amount)} · {formatDate(t.date)}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  <Upload className="size-4" /> Ajouter
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Pièces justificatives</CardTitle>
          <CardDescription>{withDoc.length} document(s) archivé(s)</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {withDoc.map((t) => (
            <div key={t.id} className="flex items-center gap-3 rounded-lg border p-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                <FileText className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{t.label}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {categoryName(t.categoryId)} · {formatMAD(t.amount)}
                </p>
              </div>
              <Badge variant="outline" className="gap-1">
                <Paperclip className="size-3" /> {t.reference.replace("JEEAM-2026-", "#")}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
