import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'cr-buy-sell-trading-view',
  templateUrl: './buy-sell-trading-view.component.html',
  styleUrls: ['./buy-sell-trading-view.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ButtonComponent],
})
export class BuySellTradingViewComponent implements OnInit {
  tradingMode: 'BUY' | 'SELL' = 'BUY';
  tradingPair: string = 'KAITO/USDT'; // Example trading pair
  tradingPercentChange: string = '+1.23%'; // Example percentage change
  orderType: string = 'Limit Order'; // Example order type
  tradingPrice: string = '2.03'; // Example trading price
  tradingData: any; // TODO: Define a proper interface for trading data
  orderBookData: any[] = []; // TODO: Define a proper interface for order book data

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize data (e.g., fetch trading data and order book)
    // This is placeholder data
    this.tradingData = {
      amount: null,
      availableBalance: '1000 USDT',
      maxBuy: '5000 KAITO',
      estFee: '0.01 USDT',
      total: '---',
      fiatTotal: '---', // Assuming fiat total is also displayed
    };
    this.orderBookData = [
      { price: '2.05', amount: '100' },
      { price: '2.04', amount: '200' },
      { price: '2.03', amount: '300' },
      { price: '2.02', amount: '400' },
      { price: '2.01', amount: '500' },
      { price: '2.00', amount: '600' },
      { price: '1.99', amount: '700' },
      // Add more order book data as needed
    ];
    // Re-calculate total/fiatTotal based on initial tradingMode or tradingData if needed
    this.updateTotals();
  }

  goBack() {
    this.router.navigate(['/dashboard']); // Assuming navigating back goes to the main dashboard view
  }

  setTradingMode(mode: 'BUY' | 'SELL') {
    this.tradingMode = mode;
    // TODO: Update trading data and order book based on trading mode
    this.updateTotals();
  }

  decreasePrice() {
    // Implement logic to decrease price
    console.log('Decrease price clicked');
  }

  increasePrice() {
    // Implement logic to increase price
    console.log('Increase price clicked');
  }

  decreaseAmount() {
    // Implement logic to decrease amount
    console.log('Decrease amount clicked');
  }

  increaseAmount() {
    // Implement logic to increase amount
    console.log('Increase amount clicked');
  }

  executeTrade() {
    // Implement trade execution logic
    console.log('Execute Trade clicked', this.tradingMode);
  }

  updateTotals() {
    // Placeholder for calculating total and fiatTotal based on tradingData and tradingPrice/Amount
    // This would involve actual calculation based on fetched data and user input
    if (this.tradingData.amount && this.tradingPrice) {
      const totalUsdt =
        parseFloat(this.tradingData.amount) * parseFloat(this.tradingPrice);
      this.tradingData.total = totalUsdt.toFixed(2) + ' USDT';
      // Assuming a conversion rate for fiat, e.g., 1 USDT = 80 INR
      const fiatConversionRate = 80;
      this.tradingData.fiatTotal = (totalUsdt * fiatConversionRate).toFixed(2);
    } else {
      this.tradingData.total = '---';
      this.tradingData.fiatTotal = '---';
    }
  }
}
