import { PageHeader } from "@/components/page-header"
import { ApprovalList, WorkflowStrip } from "@/components/depenses/approval-list"

export default function DepensesPage() {
  return (
    <>
      <PageHeader
        title="Circuit des dépenses"
        description="Toute dépense suit un circuit de validation traçable : saisie, autorisation, paiement, puis contrôle."
      />

      <WorkflowStrip />

      <div className="mt-8 mb-3">
        <h2 className="text-lg font-semibold tracking-tight">Demandes en attente d'autorisation</h2>
        <p className="text-sm text-muted-foreground">
          Les décisions sont horodatées et consignées dans le journal d'audit.
        </p>
      </div>

      <ApprovalList />
    </>
  )
}
