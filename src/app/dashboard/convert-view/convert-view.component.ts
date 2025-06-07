import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cr-convert-view',
  templateUrl: './convert-view.component.html',
  styleUrls: ['./convert-view.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ButtonComponent, FormsModule],
})
export class ConvertViewComponent implements OnInit {
  activeInputField: 'from' | 'to' = 'from';
  convertFrom: string = 'BTC';
  convertTo: string = 'USDT';
  convertFromAmount: string = '';
  convertToAmount: string = '';
  user: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.user = { totalValue: 54321.98, balance: { BTC: 1.5, USDT: 10000 } };
  }

  goBack() {
    this.router.navigate(['/dashboard/account-balance']);
  }

  getAvailableBalance(currency: string): string {
    if (currency === 'BTC') {
      return this.user.balance.BTC + ' BTC';
    } else if (currency === 'USDT') {
      return this.user.balance.USDT + ' USDT';
    }
    return 'N/A';
  }

  setActiveInputField(field: 'from' | 'to') {
    this.activeInputField = field;
  }

  setMaxAmount() {
    if (this.activeInputField === 'from') {
      this.convertFromAmount = this.user.balance[this.convertFrom].toString();
    }
  }

  appendToConvertAmount(value: string) {
    if (this.activeInputField === 'from') {
      this.convertFromAmount += value;
    } else if (this.activeInputField === 'to') {
      this.convertToAmount += value;
    }
  }

  convert() {
    console.log(
      'Convert clicked',
      this.convertFromAmount,
      this.convertFrom,
      this.convertTo,
    );
  }
}
