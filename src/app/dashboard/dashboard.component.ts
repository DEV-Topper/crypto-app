import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { RoutePath } from '../../interfaces/route-path';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ButtonComponent
  ]
})
export class DashboardComponent {
  currentView = 'dashboard'; // 'dashboard', 'portfolio', 'add-card'
  
  // Eye visibility states
  dashboardAmountVisible = true;
  portfolioAmountVisible = true;
  
  // Selected payment method
  selectedPaymentMethod = 'mastercard'; // Default selection
  
  // Payment methods
  paymentMethods = [
    { id: 'paypal', name: 'PayPal', shortName: 'PP', color: 'text-blue-600' },
    { id: 'visa', name: 'Visa', shortName: 'VISA', color: 'text-blue-600' },
    { id: 'mastercard', name: 'Mastercard', shortName: 'MC', color: 'text-red-500' },
    { id: 'diners', name: 'Diners Club', shortName: 'DC', color: 'text-blue-600' },
    { id: 'amex', name: 'American Express', shortName: 'AMEX', color: 'text-blue-600' }
  ];
  
  // User data
  user = {
    name: 'Akindele paul',
    totalValue: 0.2309890
  };

  // Transaction history
  transactions = [
    {
      type: 'Receive',
      user: 'User-42345',
      amount: '933.28 USDT',
      date: 'April 23, 2014 4:56 AM',
      status: 'Completed'
    },
    {
      type: 'Receive',
      user: 'User-42345',
      amount: '933.28 USDT',
      date: 'April 23, 2014 4:56 AM',
      status: 'Completed'
    },
    {
      type: 'Receive',
      user: 'User-42345',
      amount: '933.28 USDT',
      date: 'April 23, 2014 4:56 AM',
      status: 'Completed'
    },
    {
      type: 'Receive',
      user: 'User-42345',
      amount: '933.28 USDT',
      date: 'April 23, 2014 4:56 AM',
      status: 'Completed'
    },
    {
      type: 'Receive',
      user: 'User-42345',
      amount: '933.28 USDT',
      date: 'April 23, 2014 4:56 AM',
      status: 'Completed'
    }
  ];

  // Crypto holdings
  cryptoHoldings = [
    {
      name: 'Bonk',
      symbol: 'Bonk',
      amount: '12000',
      value: '0.20328USDT',
      change: '-0.02 USDT(-9.60%)',
      changeColor: 'text-red-500',
      pnl: "Today's PNL"
    },
    {
      name: 'USDT',
      symbol: 'TetherUS',
      amount: '',
      value: '0.0123018',
      change: '',
      changeColor: '',
      pnl: ''
    },
    {
      name: 'Bonk',
      symbol: 'Bonk',
      amount: '12000',
      value: '0.20328USDT',
      change: '-0.02 USDT(-9.60%)',
      changeColor: 'text-red-500',
      pnl: "Today's PNL"
    }
  ];

  // Card form data
  cardForm = {
    cardholderName: 'Tiana Rosser',
    cardNumber: '**** **** **** 3947',
    expMonth: '12',
    expYear: '2024',
    cvc: '123',
    setAsDefault: true
  };

  constructor(private router: Router) {}

  navigateToView(view: string) {
    this.currentView = view;
  }

  // Navigate to settings when profile is clicked
  goToSettings() {
    this.router.navigate(['/',RoutePath.SETTINGS]);
  }

  addFunds() {
    this.currentView = 'add-card';
  }

  seeMoreTransactions() {
    console.log('See more transactions');
  }

  addCard() {
    console.log('Adding card:', this.cardForm);
    console.log('Selected payment method:', this.selectedPaymentMethod);
    // Handle card addition logic
  }

  goBack() {
    if (this.currentView === 'add-card') {
      this.currentView = 'dashboard';
    }
  }

  toggleDashboardAmount() {
    this.dashboardAmountVisible = !this.dashboardAmountVisible;
    // Optional: Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  togglePortfolioAmount() {
    this.portfolioAmountVisible = !this.portfolioAmountVisible;
    // Optional: Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  getDisplayAmount(amount: number, isVisible: boolean): string {
    return isVisible ? `$${amount.toFixed(7)}` : '••••••••';
  }

  // Get eye icon name based on visibility state
  getEyeIcon(isVisible: boolean): string {
    return isVisible ? 'eye-outline' : 'eye-off-outline';
  }

  // Select payment method
  selectPaymentMethod(methodId: string) {
    this.selectedPaymentMethod = methodId;
  }

  // Check if payment method is selected
  isPaymentMethodSelected(methodId: string): boolean {
    return this.selectedPaymentMethod === methodId;
  }
}