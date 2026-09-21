"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown, Search, Check } from "lucide-react"

import { NAV_ITEMS } from "@/lib/nav"
import { ROLES, type RoleKey } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3 px-2 py-1">
      <Image
        src="/jeeam-logo.png"
        alt="Logo JEEAM"
        width={40}
        height={40}
        className="rounded-md bg-white p-0.5 ring-1 ring-border"
      />
      <div className="leading-tight">
        <p className="text-sm font-semibold tracking-tight">JEEAM Finance</p>
        <p className="text-[11px] text-muted-foreground">Bureau National</p>
      </div>
    </Link>
  )
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-1 px-2" aria-label="Navigation principale">
      {NAV_ITEMS.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

function RoleSwitcher() {
  const [role, setRole] = useState<RoleKey>("COMMISSAIRE")
  const current = ROLES.find((r) => r.key === role)!
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="gap-2" />}>
        <span className="hidden sm:inline text-muted-foreground">Rôle&nbsp;:</span>
        <span className="font-medium">{current.short}</span>
        <ChevronDown className="size-4 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Simuler un rôle (démo RBAC)</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {ROLES.map((r) => (
          <DropdownMenuItem key={r.key} onClick={() => setRole(r.key)} className="flex-col items-start gap-0.5 py-2">
            <div className="flex w-full items-center justify-between">
              <span className="font-medium">{r.label}</span>
              {r.key === role && <Check className="size-4 text-primary" />}
            </div>
            <span className="text-xs text-muted-foreground">{r.access}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-svh bg-muted/30">
      {/* Sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-sidebar lg:flex">
        <div className="flex h-16 items-center border-b px-2">
          <Brand />
        </div>
        <ScrollArea className="flex-1 py-3">
          <NavList />
        </ScrollArea>
        <div className="border-t p-3">
          <p className="px-2 text-[11px] leading-relaxed text-muted-foreground">
            Contrôle interne &amp; audit — traçabilité complète et immuable.
          </p>
        </div>
      </aside>

      {/* Main column */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger render={<Button variant="outline" size="icon" className="lg:hidden" />}>
              <Menu className="size-5" />
              <span className="sr-only">Ouvrir le menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-16 items-center border-b px-2">
                <Brand />
              </div>
              <ScrollArea className="h-[calc(100svh-4rem)] py-3">
                <NavList onNavigate={() => setMobileOpen(false)} />
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <div className="relative hidden max-w-sm flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher une opération, une référence…" className="pl-9" />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <RoleSwitcher />
            <div className="flex items-center gap-2 rounded-md border px-2 py-1.5">
              <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                BP
              </span>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-medium leading-none">B. Pagabelem</p>
                <p className="text-[11px] text-muted-foreground">Commissaire</p>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
