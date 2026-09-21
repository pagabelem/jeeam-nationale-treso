import { PageHeader } from "@/components/page-header"
import { NotificationFeed } from "@/components/notifications/notification-feed"

export default function NotificationsPage() {
  return (
    <>
      <PageHeader
        title="Notifications"
        description="Alertes automatiques adressées à chaque responsable selon son rôle."
      />
      <NotificationFeed />
    </>
  )
}
