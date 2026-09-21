"use client"

import { useState } from "react"
import { Sparkles, Send, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Msg = { role: "user" | "ai"; text: string }

const CANNED: { q: string; a: string }[] = [
  {
    q: "Quel est le solde disponible actuellement ?",
    a: "Le solde consolidé de trésorerie s'élève à 250 050 MAD, réparti entre le compte bancaire (184 250 MAD), la caisse (12 480 MAD), le compte mobile CashPlus (8 320 MAD) et le fonds réservé Convention Nationale (45 000 MAD).",
  },
  {
    q: "Quelles activités dépassent leur budget ?",
    a: "Le Camp d'été régional a consommé 92% de son budget et présente un risque de dépassement. Le Séminaire de formation reste maîtrisé à 58%. Je recommande de suspendre les engagements non essentiels sur le camp.",
  },
  {
    q: "Y a-t-il des anomalies à signaler ?",
    a: "Deux dépenses sont enregistrées sans justificatif complet et trois régions n'ont pas versé leur contribution mensuelle. Ces points doivent être régularisés avant le prochain contrôle du commissaire aux comptes.",
  },
]

export function AssistantChat() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Bonjour ! Je suis l'assistant financier JEEAM. Posez-moi une question sur la trésorerie, les activités ou les rapports.",
    },
  ])
  const [input, setInput] = useState("")

  const answer = (q: string) => {
    const match = CANNED.find((c) => c.q === q) ?? CANNED.find((c) => q.toLowerCase().includes("solde")) ?? CANNED[2]
    setMessages((prev) => [...prev, { role: "user", text: q }, { role: "ai", text: match.a }])
    setInput("")
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    answer(input.trim())
  }

  return (
    <div className="flex flex-col rounded-lg border bg-card">
      <div className="flex-1 space-y-4 p-4">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}>
            <span
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full",
                m.role === "ai" ? "bg-primary/10 text-primary" : "bg-muted text-foreground",
              )}
            >
              {m.role === "ai" ? <Sparkles className="size-4" /> : <User className="size-4" />}
            </span>
            <div
              className={cn(
                "max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed text-pretty",
                m.role === "ai" ? "bg-muted" : "bg-primary text-primary-foreground",
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 border-t p-3">
        {CANNED.map((c) => (
          <Button key={c.q} size="sm" variant="outline" className="text-xs" onClick={() => answer(c.q)}>
            {c.q}
          </Button>
        ))}
      </div>

      <form onSubmit={submit} className="flex gap-2 border-t p-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question…"
        />
        <Button type="submit" size="icon" aria-label="Envoyer">
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  )
}
