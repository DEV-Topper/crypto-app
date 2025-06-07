import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-account-balance-view',
  templateUrl: './account-balance-view.component.html',
  styleUrls: ['./account-balance-view.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class AccountBalanceViewComponent implements OnInit {
  user: any; // TODO: Define a proper interface for user
  portfolioAmountVisible: boolean = true;
  accountCrypto: any[] = []; // TODO: Define a proper interface for crypto holdings

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize data (e.g., fetch from a service)
    // This is placeholder data
    this.user = { totalValue: 54321.98 };
    this.accountCrypto = [
      {
        name: 'Bitcoin',
        symbol: 'BTC',
        amount: '0.5',
        value: '$10,000',
        pnl: '+5%',
        change: '+1%',
        changeColor: 'text-green-500',
      },
      {
        name: 'Ethereum',
        symbol: 'ETH',
        amount: '2',
        value: '$4,000',
        pnl: '-2%',
        change: '-0.5%',
        changeColor: 'text-red-500',
      },
      // Add more crypto holdings as needed
    ];
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  togglePortfolioAmount() {
    this.portfolioAmountVisible = !this.portfolioAmountVisible;
  }

  getEyeIcon(isVisible: boolean): string {
    return isVisible ? 'eye-outline' : 'eye-off-outline';
  }

  getDisplayAmount(amount: number, isVisible: boolean): string {
    if (!isVisible) {
      return '********';
    }
    // Format amount, e.g., with commas
    return '$' + amount.toLocaleString('en-US');
  }

  goToConvert() {
    this.router.navigate(['/dashboard/convert']);
  }

  goToSend() {
    this.router.navigate(['/dashboard/send-to-rizo']);
  }
}
