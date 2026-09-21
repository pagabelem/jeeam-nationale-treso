"use client"

import { useState } from "react"
import { Bell, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NOTIFICATIONS, ROLES, formatDate, type NotificationItem } from "@/lib/data"
import { cn } from "@/lib/utils"

function roleLabel(role: NotificationItem["role"]) {
  return ROLES.find((r) => r.key === role)?.label ?? role
}

export function NotificationFeed() {
  const [items, setItems] = useState(NOTIFICATIONS)
  const unread = items.filter((i) => !i.read).length

  const markAll = () => setItems((prev) => prev.map((i) => ({ ...i, read: true })))
  const markOne = (id: string) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, read: true } : i)))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {unread > 0 ? `${unread} notification(s) non lue(s)` : "Vous êtes à jour."}
        </p>
        <Button variant="outline" size="sm" onClick={markAll} disabled={unread === 0}>
          <Check className="size-4" /> Tout marquer comme lu
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((n) => (
          <div
            key={n.id}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-4 transition-colors",
              n.read ? "bg-card" : "border-primary/20 bg-primary/5",
            )}
          >
            <span
              className={cn(
                "mt-0.5 grid size-9 shrink-0 place-items-center rounded-full",
                n.read ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary",
              )}
            >
              <Bell className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{n.title}</p>
                <Badge variant="outline" className="text-[11px]">
                  {roleLabel(n.role)}
                </Badge>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{n.detail}</p>
              <p className="mt-1 text-xs text-muted-foreground">{formatDate(n.date)}</p>
            </div>
            {!n.read && (
              <Button variant="ghost" size="sm" onClick={() => markOne(n.id)}>
                Lu
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
