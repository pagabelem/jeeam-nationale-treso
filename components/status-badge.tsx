import { Badge } from "@/components/ui/badge"
import { STATUS_LABELS, type TxStatus } from "@/lib/data"
import { cn } from "@/lib/utils"

const STYLES: Record<TxStatus, string> = {
  DRAFT: "bg-muted text-muted-foreground border-transparent",
  PENDING_APPROVAL: "bg-amber-100 text-amber-800 border-amber-200",
  APPROVED: "bg-blue-100 text-blue-800 border-blue-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200",
  PAID: "bg-indigo-100 text-indigo-800 border-indigo-200",
  CONTROLLED: "bg-emerald-100 text-emerald-800 border-emerald-200",
  CANCELLED: "bg-zinc-200 text-zinc-600 border-transparent line-through",
}

export function StatusBadge({ status }: { status: TxStatus }) {
  return (
    <Badge variant="outline" className={cn("font-medium", STYLES[status])}>
      {STATUS_LABELS[status]}
    </Badge>
  )
}
