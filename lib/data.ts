// Domaine métier JEEAM FINANCE — données de démonstration
// Ces données illustrent la plateforme. Elles seront remplacées par
// PostgreSQL (Prisma) lors de la phase d'intégration de la base de données.

export type TxType = "INCOME" | "EXPENSE"

export type TxStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "PAID"
  | "CONTROLLED"
  | "CANCELLED"

export type RoleKey =
  | "PRESIDENTE"
  | "VICE_PRESIDENT"
  | "SECRETAIRE"
  | "SECRETAIRE_ADJOINTE"
  | "TRESORIERE"
  | "COMMISSAIRE"

export type Role = {
  key: RoleKey
  label: string
  short: string
  access: string
}

export const ROLES: Role[] = [
  {
    key: "PRESIDENTE",
    label: "Présidente",
    short: "Présidente",
    access: "Vue globale, autorisation des dépenses, supervision générale",
  },
  {
    key: "VICE_PRESIDENT",
    label: "Vice-président(e)",
    short: "Vice-prés.",
    access: "Consultation étendue, autorisation par délégation",
  },
  {
    key: "SECRETAIRE",
    label: "Secrétaire",
    short: "Secrétaire",
    access: "Activités, procès-verbaux, documents administratifs",
  },
  {
    key: "SECRETAIRE_ADJOINTE",
    label: "Secrétaire adjointe",
    short: "Sec. adj.",
    access: "Assistance à la gestion des activités et documents",
  },
  {
    key: "TRESORIERE",
    label: "Trésorière",
    short: "Trésorière",
    access: "Saisie recettes/dépenses, demandes de paiement, justificatifs",
  },
  {
    key: "COMMISSAIRE",
    label: "Commissaire aux comptes",
    short: "Commissaire",
    access: "Contrôle global, observations d'audit, verrouillage de périodes",
  },
]

export type Region = { id: string; name: string; zone: string }

export const REGIONS: Region[] = [
  { id: "r-casa", name: "Casablanca", zone: "Centre" },
  { id: "r-rabat", name: "Rabat", zone: "Centre" },
  { id: "r-tanger", name: "Tanger", zone: "Nord" },
  { id: "r-fes", name: "Fès", zone: "Centre-Nord" },
  { id: "r-marrakech", name: "Marrakech", zone: "Sud" },
  { id: "r-agadir", name: "Agadir", zone: "Sud" },
  { id: "r-oujda", name: "Oujda", zone: "Est" },
  { id: "r-meknes", name: "Meknès", zone: "Centre-Nord" },
]

export type Account = {
  id: string
  name: string
  kind: "BANK" | "CASH" | "MOBILE" | "FUND"
  balance: number
}

export const ACCOUNTS: Account[] = [
  { id: "acc-bank", name: "Compte bancaire — Banque Populaire", kind: "BANK", balance: 184250 },
  { id: "acc-cash", name: "Caisse physique — Bureau National", kind: "CASH", balance: 12480 },
  { id: "acc-mobile", name: "Paiement mobile — CashPlus", kind: "MOBILE", balance: 8320 },
  { id: "acc-fund-conv", name: "Fonds réservé — Convention Nationale", kind: "FUND", balance: 45000 },
]

export type Category = { id: string; name: string; type: TxType }

export const CATEGORIES: Category[] = [
  { id: "c-cotis", name: "Cotisations", type: "INCOME" },
  { id: "c-dons", name: "Dons & offrandes", type: "INCOME" },
  { id: "c-contrib", name: "Contributions régionales", type: "INCOME" },
  { id: "c-inscr", name: "Inscriptions aux activités", type: "INCOME" },
  { id: "c-subv", name: "Subventions", type: "INCOME" },
  { id: "c-transport", name: "Transport", type: "EXPENSE" },
  { id: "c-heberg", name: "Hébergement", type: "EXPENSE" },
  { id: "c-resto", name: "Restauration", type: "EXPENSE" },
  { id: "c-materiel", name: "Matériel", type: "EXPENSE" },
  { id: "c-comm", name: "Communication", type: "EXPENSE" },
  { id: "c-formation", name: "Formation", type: "EXPENSE" },
  { id: "c-soutien", name: "Soutien aux régions", type: "EXPENSE" },
  { id: "c-event", name: "Organisation d'événements", type: "EXPENSE" },
]

export type Activity = {
  id: string
  name: string
  status: "PLANIFIEE" | "EN_COURS" | "TERMINEE" | "ANNULEE"
  regionId?: string
  budget: number
  spent: number
  income: number
  start: string
  end: string
}

export const ACTIVITIES: Activity[] = [
  {
    id: "act-conv",
    name: "Convention Nationale 2026",
    status: "EN_COURS",
    regionId: "r-casa",
    budget: 120000,
    spent: 74500,
    income: 96000,
    start: "2026-07-10",
    end: "2026-07-14",
  },
  {
    id: "act-retraite",
    name: "Retraite spirituelle des leaders",
    status: "TERMINEE",
    regionId: "r-tanger",
    budget: 42000,
    spent: 39800,
    income: 41000,
    start: "2026-03-20",
    end: "2026-03-23",
  },
  {
    id: "act-croisade",
    name: "Croisade d'évangélisation",
    status: "PLANIFIEE",
    regionId: "r-marrakech",
    budget: 65000,
    spent: 8200,
    income: 15000,
    start: "2026-10-02",
    end: "2026-10-05",
  },
  {
    id: "act-seminaire",
    name: "Séminaire de formation des trésoriers",
    status: "EN_COURS",
    regionId: "r-rabat",
    budget: 28000,
    spent: 16400,
    income: 22000,
    start: "2026-09-05",
    end: "2026-09-07",
  },
]

export type Transaction = {
  id: string
  reference: string
  type: TxType
  label: string
  amount: number
  status: TxStatus
  date: string
  categoryId: string
  accountId: string
  activityId?: string
  regionId?: string
  method: string
  createdBy: string
  hasAttachment: boolean
  controlled: boolean
}

export const TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    reference: "JEEAM-2026-0042",
    type: "INCOME",
    label: "Contribution régionale — Casablanca",
    amount: 18000,
    status: "CONTROLLED",
    date: "2026-09-18",
    categoryId: "c-contrib",
    accountId: "acc-bank",
    regionId: "r-casa",
    method: "Virement",
    createdBy: "Trésorière",
    hasAttachment: true,
    controlled: true,
  },
  {
    id: "t2",
    reference: "JEEAM-2026-0043",
    type: "EXPENSE",
    label: "Location de bus — Convention Nationale",
    amount: 9500,
    status: "PAID",
    date: "2026-09-17",
    categoryId: "c-transport",
    accountId: "acc-fund-conv",
    activityId: "act-conv",
    method: "Virement",
    createdBy: "Trésorière",
    hasAttachment: true,
    controlled: false,
  },
  {
    id: "t3",
    reference: "JEEAM-2026-0044",
    type: "EXPENSE",
    label: "Impression de flyers — Croisade",
    amount: 2200,
    status: "PENDING_APPROVAL",
    date: "2026-09-19",
    categoryId: "c-comm",
    accountId: "acc-bank",
    activityId: "act-croisade",
    method: "Carte",
    createdBy: "Trésorière",
    hasAttachment: false,
    controlled: false,
  },
  {
    id: "t4",
    reference: "JEEAM-2026-0045",
    type: "INCOME",
    label: "Inscriptions — Séminaire trésoriers",
    amount: 6400,
    status: "PAID",
    date: "2026-09-15",
    categoryId: "c-inscr",
    accountId: "acc-mobile",
    activityId: "act-seminaire",
    method: "Mobile money",
    createdBy: "Trésorière",
    hasAttachment: true,
    controlled: false,
  },
  {
    id: "t5",
    reference: "JEEAM-2026-0046",
    type: "EXPENSE",
    label: "Restauration — Séminaire trésoriers",
    amount: 4800,
    status: "PAID",
    date: "2026-09-14",
    categoryId: "c-resto",
    accountId: "acc-cash",
    activityId: "act-seminaire",
    method: "Espèces",
    createdBy: "Trésorière",
    hasAttachment: false,
    controlled: false,
  },
  {
    id: "t6",
    reference: "JEEAM-2026-0047",
    type: "INCOME",
    label: "Dons & offrandes — Culte national",
    amount: 12300,
    status: "CONTROLLED",
    date: "2026-09-10",
    categoryId: "c-dons",
    accountId: "acc-cash",
    method: "Espèces",
    createdBy: "Trésorière",
    hasAttachment: true,
    controlled: true,
  },
  {
    id: "t7",
    reference: "JEEAM-2026-0048",
    type: "EXPENSE",
    label: "Matériel de sonorisation",
    amount: 7600,
    status: "APPROVED",
    date: "2026-09-20",
    categoryId: "c-materiel",
    accountId: "acc-bank",
    activityId: "act-conv",
    method: "Virement",
    createdBy: "Trésorière",
    hasAttachment: true,
    controlled: false,
  },
  {
    id: "t8",
    reference: "JEEAM-2026-0049",
    type: "EXPENSE",
    label: "Soutien région Oujda",
    amount: 5000,
    status: "PENDING_APPROVAL",
    date: "2026-09-20",
    categoryId: "c-soutien",
    accountId: "acc-bank",
    regionId: "r-oujda",
    method: "Virement",
    createdBy: "Trésorière",
    hasAttachment: false,
    controlled: false,
  },
  {
    id: "t9",
    reference: "JEEAM-2026-0050",
    type: "INCOME",
    label: "Cotisations mensuelles — Septembre",
    amount: 21500,
    status: "PAID",
    date: "2026-09-05",
    categoryId: "c-cotis",
    accountId: "acc-bank",
    method: "Virement",
    createdBy: "Trésorière",
    hasAttachment: true,
    controlled: false,
  },
  {
    id: "t10",
    reference: "JEEAM-2026-0051",
    type: "EXPENSE",
    label: "Hébergement intervenants — Convention",
    amount: 13400,
    status: "PAID",
    date: "2026-09-12",
    categoryId: "c-heberg",
    accountId: "acc-fund-conv",
    activityId: "act-conv",
    method: "Virement",
    createdBy: "Trésorière",
    hasAttachment: true,
    controlled: false,
  },
]

export type Approval = {
  id: string
  reference: string
  label: string
  amount: number
  categoryId: string
  activityId?: string
  requestedBy: string
  requestedAt: string
  status: "PENDING_APPROVAL" | "APPROVED" | "REJECTED"
  budgetOk: boolean
  doubleValidation: boolean
}

export const APPROVALS: Approval[] = [
  {
    id: "ap1",
    reference: "JEEAM-2026-0044",
    label: "Impression de flyers — Croisade",
    amount: 2200,
    categoryId: "c-comm",
    activityId: "act-croisade",
    requestedBy: "Trésorière",
    requestedAt: "2026-09-19",
    status: "PENDING_APPROVAL",
    budgetOk: true,
    doubleValidation: false,
  },
  {
    id: "ap2",
    reference: "JEEAM-2026-0048",
    label: "Soutien région Oujda",
    amount: 5000,
    categoryId: "c-soutien",
    requestedBy: "Trésorière",
    requestedAt: "2026-09-20",
    status: "PENDING_APPROVAL",
    budgetOk: true,
    doubleValidation: true,
  },
  {
    id: "ap3",
    reference: "JEEAM-2026-0052",
    label: "Achat d'ordinateur portable — Secrétariat",
    amount: 11000,
    categoryId: "c-materiel",
    requestedBy: "Secrétaire",
    requestedAt: "2026-09-20",
    status: "PENDING_APPROVAL",
    budgetOk: false,
    doubleValidation: true,
  },
]

export type Observation = {
  id: string
  title: string
  reference: string
  status: "OUVERTE" | "REPONSE" | "VERIFIEE" | "CLOTUREE"
  openedAt: string
  description: string
}

export const OBSERVATIONS: Observation[] = [
  {
    id: "ob1",
    title: "Justificatif manquant sur dépense de restauration",
    reference: "JEEAM-2026-0046",
    status: "OUVERTE",
    openedAt: "2026-09-16",
    description: "La dépense de 4 800 MAD n'a pas de reçu associé. Merci de fournir la pièce justificative.",
  },
  {
    id: "ob2",
    title: "Écart budgétaire — ligne transport Convention",
    reference: "JEEAM-2026-0043",
    status: "REPONSE",
    openedAt: "2026-09-13",
    description: "Dépassement de 12% sur la ligne transport. Une réponse a été fournie par la Trésorière.",
  },
  {
    id: "ob3",
    title: "Doublon potentiel de saisie",
    reference: "JEEAM-2026-0050",
    status: "CLOTUREE",
    openedAt: "2026-09-06",
    description: "Vérification effectuée : aucune double saisie. Observation clôturée.",
  },
]

export type AiInsight = {
  id: string
  kind: "ANOMALIE" | "SUGGESTION" | "SYNTHESE"
  title: string
  detail: string
}

export const AI_INSIGHTS: AiInsight[] = [
  {
    id: "ai1",
    kind: "ANOMALIE",
    title: "Dépense inhabituelle détectée",
    detail: "L'achat d'ordinateur (11 000 MAD) dépasse le budget matériel restant. Autorisation double recommandée.",
  },
  {
    id: "ai2",
    kind: "ANOMALIE",
    title: "2 dépenses sans justificatif ce mois-ci",
    detail: "Références JEEAM-2026-0044 et JEEAM-2026-0046 — total 7 000 MAD à régulariser.",
  },
  {
    id: "ai3",
    kind: "SYNTHESE",
    title: "Santé financière du national",
    detail:
      "Trésorerie stable (+8% vs mois dernier). Convention Nationale à 62% de consommation budgétaire. 3 régions n'ont pas encore versé leur contribution.",
  },
]

export type NotificationItem = {
  id: string
  role: RoleKey
  title: string
  detail: string
  date: string
  read: boolean
}

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    role: "PRESIDENTE",
    title: "Demande de dépense en attente",
    detail: "Soutien région Oujda (5 000 MAD) attend votre autorisation.",
    date: "2026-09-20",
    read: false,
  },
  {
    id: "n2",
    role: "TRESORIERE",
    title: "Justificatif manquant",
    detail: "La dépense JEEAM-2026-0046 n'a pas de reçu associé.",
    date: "2026-09-16",
    read: false,
  },
  {
    id: "n3",
    role: "COMMISSAIRE",
    title: "Nouvelles opérations à contrôler",
    detail: "6 opérations payées attendent votre contrôle.",
    date: "2026-09-20",
    read: false,
  },
  {
    id: "n4",
    role: "TRESORIERE",
    title: "Dépense autorisée",
    detail: "Matériel de sonorisation (7 600 MAD) a été autorisé.",
    date: "2026-09-20",
    read: true,
  },
]

// ---------- Helpers ----------

export function formatMAD(amount: number): string {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

export function categoryName(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.name ?? "—"
}

export function accountName(id: string): string {
  return ACCOUNTS.find((a) => a.id === id)?.name ?? "—"
}

export function activityName(id?: string): string | undefined {
  if (!id) return undefined
  return ACTIVITIES.find((a) => a.id === id)?.name
}

export function regionName(id?: string): string | undefined {
  if (!id) return undefined
  return REGIONS.find((r) => r.id === id)?.name
}

export const STATUS_LABELS: Record<TxStatus, string> = {
  DRAFT: "Brouillon",
  PENDING_APPROVAL: "En attente d'autorisation",
  APPROVED: "Autorisée",
  REJECTED: "Refusée",
  PAID: "Payée",
  CONTROLLED: "Contrôlée",
  CANCELLED: "Annulée",
}

export function totals() {
  const income = TRANSACTIONS.filter((t) => t.type === "INCOME").reduce((s, t) => s + t.amount, 0)
  const expense = TRANSACTIONS.filter((t) => t.type === "EXPENSE").reduce((s, t) => s + t.amount, 0)
  const balance = ACCOUNTS.reduce((s, a) => s + a.balance, 0)
  return { income, expense, balance, net: income - expense }
}

export const MONTHLY = [
  { month: "Avr", recettes: 38000, depenses: 29500 },
  { month: "Mai", recettes: 42500, depenses: 31000 },
  { month: "Juin", recettes: 51000, depenses: 47800 },
  { month: "Juil", recettes: 96000, depenses: 88400 },
  { month: "Août", recettes: 34000, depenses: 22600 },
  { month: "Sep", recettes: 59700, depenses: 42500 },
]
