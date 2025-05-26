// wallet-creation.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { RoutePath } from '../../interfaces/route-path';

@Component({
  selector: 'cr-wallet-creation',
  templateUrl: './wallet-creation.component.html',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ButtonComponent
  ]
})
export class WalletCreationComponent {
  currentStep = 1;
  totalSteps = 3;
  termsAgreed = false;
  useDeviceAuth = true;
  
  // Recovery phrase words (would be generated securely in a real app)
  recoveryPhrase = Array(12).fill('Farm');

  constructor(private router: Router) {}

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    } else {
      // Navigate to the wallet dashboard
      this.router.navigate(['/wallet/dashboard']);
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  copyToClipboard() {
    const phrase = this.recoveryPhrase.join(' ');
    navigator.clipboard.writeText(phrase)
      .then(() => {
        console.log('Recovery phrase copied to clipboard');
        // You could show a toast notification here
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  }

  createWallet() {
    if (this.currentStep < this.totalSteps) {
      this.nextStep();
    } else {
      // Final step - create wallet and navigate to dashboard
      console.log('Creating wallet...');
      this.router.navigate(['/',RoutePath.DASHBOARD]);
    }
  }
}