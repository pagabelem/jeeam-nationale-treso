import { Lightbulb, ShieldAlert, Wand2 } from "lucide-react"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { AssistantChat } from "@/components/assistant/assistant-chat"
import { AI_INSIGHTS, type AiInsight } from "@/lib/data"

const ICONS: Record<AiInsight["kind"], React.ElementType> = {
  SYNTHESE: Lightbulb,
  ANOMALIE: ShieldAlert,
  SUGGESTION: Wand2,
}

export default function AssistantPage() {
  return (
    <>
      <PageHeader
        title="Assistant IA"
        description="Analyse automatique des données financières, synthèses et prévisions en langage naturel."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AssistantChat />
        </div>

        <div className="space-y-3">
          {AI_INSIGHTS.map((ins) => {
            const Icon = ICONS[ins.kind]
            return (
              <Card key={ins.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Icon className="size-4 text-primary" />
                    {ins.title}
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground text-pretty">{ins.detail}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}
