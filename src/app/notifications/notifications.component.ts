import { Component, EventEmitter, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  icon?: string
  read: boolean
}

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class NotificationsComponent {
  @Output() goBack = new EventEmitter<void>()

  notifications: Notification[] = [
    {
      id: "1",
      title: "Peer to peer donation system",
      message: "You have been assigned a receiver",
      time: "2 minutes ago",
      icon: "/placeholder.svg?height=60&width=60",
      read: false,
    },
    {
      id: "2",
      title: "Crypto P2P",
      message: "New crypto P2p offer of 0.237586BTC received",
      time: "2 minutes ago",
      icon: "/placeholder.svg?height=60&width=60",
      read: false,
    },
    {
      id: "3",
      title: "Payment Reminder",
      message: "This is a reminder to not forget your donation",
      time: "2 minutes ago",
      icon: "/placeholder.svg?height=60&width=60",
      read: false,
    },
    {
      id: "4",
      title: "Rizo's Admin",
      message: "There will be a maintenance from Thursday 4:00pm to Sunday 12am",
      time: "2 minutes ago",
      icon: "/placeholder.svg?height=60&width=60",
      read: false,
    },
  ]

  constructor() {}

  onGoBack() {
    this.goBack.emit()
  }

  markAsRead(id: string) {
    const notification = this.notifications.find((n) => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  getUnreadCount(): number {
    return this.notifications.filter((n) => !n.read).length
  }

  markAllAsRead() {
    this.notifications.forEach((notification) => {
      notification.read = true
    })
  }

  deleteNotification(id: string) {
    this.notifications = this.notifications.filter((n) => n.id !== id)
  }

  getNotificationIcon(title: string): string {
    switch (title.toLowerCase()) {
      case "peer to peer donation system":
        return "heart-outline"
      case "crypto p2p":
        return "swap-horizontal-outline"
      case "payment reminder":
        return "alarm-outline"
      case "rizo's admin":
        return "settings-outline"
      default:
        return "notifications-outline"
    }
  }

  getNotificationColor(title: string): string {
    switch (title.toLowerCase()) {
      case "peer to peer donation system":
        return "bg-red-500"
      case "crypto p2p":
        return "bg-green-500"
      case "payment reminder":
        return "bg-yellow-500"
      case "rizo's admin":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }
}
