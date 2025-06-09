import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from '../../../components/button/button.component';


@Component({
  selector: 'cr-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
  standalone: true,
  imports: [IonicModule, ButtonComponent],
})
export class DashboardViewComponent implements OnInit {
  user: any; // TODO: Define a proper interface for user
  dashboardAmountVisible: boolean = true;
  cryptoHoldings: any[] = []; // TODO: Define a proper interface for crypto holdings

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize data (e.g., fetch from a service)
    // This is placeholder data
    this.user = { name: 'Ahmed', totalValue: 12345.67 };
    this.cryptoHoldings = [
      {
        name: 'Bitcoin',
        fullName: 'BTC',
        amount: '0.5 BTC',
        value: '$10,000',
        pnl: '+5%',
        change: '+1%',
      },
      {
        name: 'Ethereum',
        fullName: 'ETH',
        amount: '2 ETH',
        value: '$4,000',
        pnl: '-2%',
        change: '-0.5%',
      },
      // Add more crypto holdings as needed
    ];
  }

  goToSettings() {
    // Implement navigation to settings
    console.log('Navigating to Settings');
  }

  goToNotifications() {
    this.router.navigate(['/dashboard/notifications']);
  }

  toggleDashboardAmount() {
    this.dashboardAmountVisible = !this.dashboardAmountVisible;
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

  addFunds() {
    this.router.navigate(['/dashboard/account-balance']);

    console.log('Add Funds clicked');
  }
}
