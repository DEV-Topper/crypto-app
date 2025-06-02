import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"
import { FormsModule } from "@angular/forms"
import { ButtonComponent } from "../../components/button/button.component"
import { NotificationsComponent } from "../notifications/notifications.component"

// Add this type definition after the imports and before the @Component decorator
type CryptoCurrency = "BTC" | "USDT" | "ETH" | "KAITO"

interface RecentContact {
  name: string
  id: string
  idType: string
  avatar?: string
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ButtonComponent, NotificationsComponent],
})
export class DashboardComponent {
  currentView = "dashboard" // 'dashboard', 'portfolio', 'account-balance', 'convert', 'buy-sell', 'send-to-rizo', 'notifications'

  // Eye visibility states
  dashboardAmountVisible = true
  portfolioAmountVisible = true

  // Trading states
  tradingPair = "KAITO/USDT"
  tradingMode = "BUY" // 'BUY' or 'SELL'
  orderType = "Limit"
  tradingAmount = ""
  tradingPrice = "2.0345"
  tradingTotal = "2.0335"
  tradingPercentChange = "12.98%"

  // Convert states
  convertFrom: CryptoCurrency = "BTC"
  convertTo: CryptoCurrency = "USDT"
  convertAmount = ""
  convertFromAmount = ""
  convertToAmount = ""
  activeInputField = "from" // 'from' or 'to'

  // Send to Rizo states
  selectedTab: "email" | "rizo" = "email"
  recipientInput = ""

  // Available balances - add proper typing
  availableBalances: Record<CryptoCurrency, number> = {
    BTC: 0.12345678,
    USDT: 1000.5,
    ETH: 2.5,
    KAITO: 5000,
  }

  // User data
  user = {
    name: "Akindele paul",
    totalValue: 0.230989,
  }

  // Recent contacts for send functionality
  recentContacts: RecentContact[] = [
    {
      name: "David Paul",
      id: "1236758976",
      idType: "Binance ID",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Crypto holdings
  cryptoHoldings = [
    {
      name: "BTC",
      fullName: "Bitcoin",
      amount: "12000",
      value: "0.20328USDT",
      change: "-0.02 USDT(-9.60%)",
      changeColor: "text-red-500",
      pnl: "Today's PNL",
    },
    {
      name: "Ethereum",
      fullName: "Ethereum",
      amount: "12000",
      value: "0.20328USDT",
      change: "-0.02 USDT(-9.60%)",
      changeColor: "text-red-500",
      pnl: "Today's PNL",
    },
    {
      name: "BTC",
      fullName: "Bitcoin",
      amount: "12000",
      value: "0.20328USDT",
      change: "-0.02 USDT(-9.60%)",
      changeColor: "text-red-500",
      pnl: "Today's PNL",
    },
    {
      name: "Ethereum",
      fullName: "Ethereum",
      amount: "12000",
      value: "0.20328USDT",
      change: "-0.02 USDT(-9.60%)",
      changeColor: "text-red-500",
      pnl: "Today's PNL",
    },
    {
      name: "KAITO",
      fullName: "KAITO",
      amount: "12000",
      value: "0.20328USDT",
      change: "-0.02 USDT(-9.60%)",
      changeColor: "text-red-500",
      pnl: "Today's PNL",
    },
  ]

  // Account balance crypto data
  accountCrypto = [
    {
      name: "Bonk",
      symbol: "Bonk",
      amount: "12000",
      value: "0.20328USDT",
      change: "-0.02 USDT(-9.60%)",
      changeColor: "text-red-500",
      pnl: "Today's PNL",
    },
    {
      name: "USDT",
      symbol: "TetherUS",
      amount: "",
      value: "0.0123018",
      change: "",
      changeColor: "",
      pnl: "",
    },
    {
      name: "Bonk",
      symbol: "Bonk",
      amount: "12000",
      value: "0.20328USDT",
      change: "-0.02 USDT(-9.60%)",
      changeColor: "text-red-500",
      pnl: "Today's PNL",
    },
  ]

  // Trading data
  tradingData = {
    price: "2.0345",
    amount: "",
    total: "2.0335",
    availableBalance: "0.01256373568 USDT",
    maxBuy: "0 KAITO",
    estFee: "-- KAITO",
  }

  // Order book data
  orderBookData = Array(10).fill({
    price: "2.0987",
    amount: "3.7",
  })

  constructor() {}

  navigateToView(view: string) {
    this.currentView = view
    console.log("Navigating to:", view) // Debug log
  }

  goToSettings() {
    console.log("Navigate to settings")
  }

  goToNotifications() {
    console.log("Navigate to notifications")
    this.currentView = "notifications"
  }

  onNotificationGoBack() {
    console.log("Going back from notifications")
    this.currentView = "dashboard"
  }

  toggleDashboardAmount() {
    this.dashboardAmountVisible = !this.dashboardAmountVisible
  }

  togglePortfolioAmount() {
    this.portfolioAmountVisible = !this.portfolioAmountVisible
  }

  getDisplayAmount(amount: number, isVisible: boolean): string {
    return isVisible ? `$${amount.toFixed(7)}` : "••••••••"
  }

  getEyeIcon(isVisible: boolean): string {
    return isVisible ? "eye-outline" : "eye-off-outline"
  }

  goBack() {
    console.log("goBack called, current view:", this.currentView)
    if (this.currentView === "send-to-rizo" || this.currentView === "notifications") {
      this.currentView = "dashboard"
    } else {
      this.currentView = "dashboard"
    }
    console.log("Going back to:", this.currentView) // Debug log
  }

  // Convert functions
  appendToConvertAmount(digit: string) {
    if (digit === "backspace") {
      if (this.activeInputField === "from") {
        this.convertFromAmount = this.convertFromAmount.slice(0, -1)
      } else {
        this.convertToAmount = this.convertToAmount.slice(0, -1)
      }
    } else {
      if (this.activeInputField === "from") {
        this.convertFromAmount += digit
      } else {
        this.convertToAmount += digit
      }
    }
  }

  convert() {
    console.log("Converting:", this.convertFromAmount, this.convertFrom, "to", this.convertTo)
  }

  // Set max amount for conversion
  setMaxAmount() {
    // Set active field to "from" to ensure typing happens there
    this.activeInputField = "from"

    // Get available balance for the selected currency with proper type checking
    const availableBalance = this.availableBalances[this.convertFrom as CryptoCurrency] || 0

    // Set the amount to the available balance
    this.convertFromAmount = availableBalance.toString()

    console.log("Set max amount:", this.convertFromAmount)
  }

  // Trading functions
  setTradingMode(mode: string) {
    this.tradingMode = mode
  }

  setOrderType(type: string) {
    this.orderType = type
  }

  executeTrade() {
    console.log("Executing trade:", this.tradingMode, this.tradingPair)
  }

  // Bottom navigation
  navigateToHome() {
    this.currentView = "dashboard"
  }

  navigateToInvestment() {
    this.currentView = "buy-sell" // Changed to go to trading screen
  }

  navigateToDonate() {
    console.log("Navigate to donate")
  }

  navigateToProfile() {
    console.log("Navigate to profile")
  }

  addFunds() {
    console.log("Add Funds clicked!") // Debug log
    this.currentView = "account-balance"
    console.log("Current view set to:", this.currentView) // Debug log
  }

  goToConvert() {
    console.log("Convert clicked!") // Debug log
    this.currentView = "convert"
    console.log("Current view set to:", this.currentView) // Debug log
  }

  // SIMPLIFIED: Send functionality without ChangeDetectorRef
  goToSend() {
    console.log("Send button clicked!") // Debug log
    console.log("Current view before:", this.currentView) // Debug log

    // Simple direct assignment
    this.currentView = "send-to-rizo"

    console.log("Current view after:", this.currentView) // Debug log
  }

  selectTab(tab: "email" | "rizo") {
    console.log("Tab selected:", tab)
    this.selectedTab = tab
    this.recipientInput = ""
  }

  onContinue() {
    if (this.recipientInput.trim()) {
      console.log("Continue with recipient:", this.recipientInput)
      // Navigate to next step or process the recipient
    }
  }

  selectRecentContact(contact: RecentContact) {
    console.log("Contact selected:", contact)
    this.recipientInput = this.selectedTab === "email" ? contact.name : contact.id
  }

  onEditRecent() {
    console.log("Edit recent contacts")
  }

  setActiveInputField(field: string) {
    this.activeInputField = field
  }

  getAvailableBalance(currency: string): string {
    return (this.availableBalances[currency as CryptoCurrency] || 0).toString()
  }

  // Trading amount and price functions
  decreasePrice() {
    const price = Number.parseFloat(this.tradingPrice)
    this.tradingPrice = (price - 0.0001).toFixed(4)
    this.updateTotal()
  }

  increasePrice() {
    const price = Number.parseFloat(this.tradingPrice)
    this.tradingPrice = (price + 0.0001).toFixed(4)
    this.updateTotal()
  }

  decreaseAmount() {
    const amount = Number.parseFloat(this.tradingData.amount || "0")
    if (amount > 0) {
      this.tradingData.amount = (amount - 0.1).toFixed(1)
      this.updateTotal()
    }
  }

  increaseAmount() {
    const amount = Number.parseFloat(this.tradingData.amount || "0")
    this.tradingData.amount = (amount + 0.1).toFixed(1)
    this.updateTotal()
  }

  updateTotal() {
    const price = Number.parseFloat(this.tradingPrice)
    const amount = Number.parseFloat(this.tradingData.amount || "0")
    this.tradingData.total = (price * amount).toFixed(4)
  }

  // SIMPLE: Test method without ChangeDetectorRef
  testSendNavigation() {
    console.log("Test method called")
    this.currentView = "send-to-rizo"
    console.log("View set to:", this.currentView)
  }

  // SIMPLE: Emergency method without ChangeDetectorRef
  forceNavigateToSend() {
    console.log("FORCE NAVIGATE TO SEND")
    this.currentView = "send-to-rizo"
  }
}
