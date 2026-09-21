import { Shield, UserPlus, MapPin, Building2 } from "lucide-react"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ROLES, REGIONS } from "@/lib/data"

const MEMBERS: { name: string; role: string; email: string; active: boolean }[] = [
  { name: "Esther Ait Benali", role: "Présidente", email: "presidente@jeeam.ma", active: true },
  { name: "Samuel Ouedraogo", role: "Vice-président(e)", email: "vice@jeeam.ma", active: true },
  { name: "Ruth Mbarki", role: "Secrétaire", email: "secretaire@jeeam.ma", active: true },
  { name: "Grace Diallo", role: "Secrétaire adjointe", email: "sec.adjointe@jeeam.ma", active: false },
  { name: "Déborah Kone", role: "Trésorière", email: "tresorerie@jeeam.ma", active: true },
  { name: "Jean Traoré", role: "Commissaire aux comptes", email: "audit@jeeam.ma", active: true },
]

export default function AdministrationPage() {
  return (
    <>
      <PageHeader
        title="Administration"
        description="Gestion des membres du bureau, des rôles, des accès et de la structure organisationnelle."
        actions={
          <Button>
            <UserPlus className="size-4" /> Inviter un membre
          </Button>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="size-4 text-primary" /> Membres du Bureau National
            </CardTitle>
            <CardDescription>Chaque membre reçoit des accès selon son rôle</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Membre</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead className="hidden sm:table-cell">Email</TableHead>
                    <TableHead className="pr-6 text-right">Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MEMBERS.map((m) => (
                    <TableRow key={m.email}>
                      <TableCell className="pl-6 font-medium">{m.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{m.role}</TableCell>
                      <TableCell className="hidden sm:table-cell font-mono text-xs text-muted-foreground">
                        {m.email}
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        {m.active ? (
                          <Badge variant="outline" className="border-emerald-200 bg-emerald-100 text-emerald-800">
                            Actif
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-zinc-200 bg-zinc-100 text-zinc-600">
                            Inactif
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="size-4 text-primary" /> Rôles & permissions
              </CardTitle>
              <CardDescription>Droits d'accès par fonction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {ROLES.map((r) => (
                <div key={r.key} className="rounded-lg border p-3">
                  <p className="font-medium">{r.label}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{r.access}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" /> Régions
              </CardTitle>
              <CardDescription>Structure géographique du mouvement</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {REGIONS.map((reg) => (
                <div key={reg.id} className="flex items-center justify-between rounded-md border px-3 py-2">
                  <span className="text-sm font-medium">{reg.name}</span>
                  <Badge variant="secondary" className="text-[11px]">
                    {reg.zone}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
