import { PageHeader } from "@/components/page-header"
import { AuditPanel } from "@/components/audit/audit-panel"

export default function AuditPage() {
  return (
    <>
      <PageHeader
        title="Commissaire aux comptes"
        description="Contrôle indépendant, observations d'audit et garantie d'intégrité des écritures."
      />
      <AuditPanel />
    </>
  )
}
