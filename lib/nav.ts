import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  Wallet,
  ReceiptText,
  CalendarRange,
  ShieldCheck,
  BarChart3,
  FolderArchive,
  Bot,
  Bell,
  Settings,
} from "lucide-react"

export type NavItem = {
  href: string
  label: string
  icon: LucideIcon
  description: string
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Tableau de bord", icon: LayoutDashboard, description: "Vue d'ensemble" },
  { href: "/tresorerie", label: "Trésorerie", icon: Wallet, description: "Comptes & transactions" },
  { href: "/depenses", label: "Dépenses", icon: ReceiptText, description: "Circuit de validation" },
  { href: "/activites", label: "Activités", icon: CalendarRange, description: "Budgets & bilans" },
  { href: "/audit", label: "Commissaire aux comptes", icon: ShieldCheck, description: "Contrôle & audit" },
  { href: "/rapports", label: "Rapports", icon: BarChart3, description: "Statistiques & exports" },
  { href: "/documents", label: "Justificatifs", icon: FolderArchive, description: "Documents" },
  { href: "/assistant", label: "Assistant IA", icon: Bot, description: "Aide & synthèses" },
  { href: "/notifications", label: "Notifications", icon: Bell, description: "Alertes internes" },
  { href: "/administration", label: "Administration", icon: Settings, description: "Utilisateurs & config" },
]
