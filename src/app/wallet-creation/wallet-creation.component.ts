// wallet-creation.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { RoutePath } from '../../interfaces/route-path';
import { WalletCreationStep1Component } from './step1/wallet-creation-step1.component';
import { WalletCreationStep2Component } from './step2/wallet-creation-step2.component';
import { WalletCreationStep3Component } from './step3/wallet-creation-step3.component';

@Component({
  selector: 'cr-wallet-creation',
  templateUrl: './wallet-creation.component.html',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ButtonComponent,
    WalletCreationStep1Component,
    WalletCreationStep2Component,
    WalletCreationStep3Component,
  ],
})
export class WalletCreationComponent {
  currentStep = 1;
  totalSteps = 3;
  termsAgreed = false;
  useDeviceAuth = true;
  isStep2Ready = false; // Track if step 2 is ready to proceed

  // Recovery phrase words (would be generated securely in a real app)
  recoveryPhrase = Array(12).fill('Farm');

  constructor(private router: Router) {}

  handleMainButtonClick() {
    if (this.currentStep < this.totalSteps) {
      this.nextStep();
    } else {
      this.createWallet();
    }
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      // Optional: Scroll to top on step change
      // const content = document.querySelector('ion-content');
      // content.scrollToTop(0);
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      // Optional: Scroll to top on step change
      // const content = document.querySelector('ion-content');
      // content.scrollToTop(0);
    }
  }

  copyToClipboard() {
    const phrase = this.recoveryPhrase.join(' ');
    navigator.clipboard
      .writeText(phrase)
      .then(() => {
        console.log('Recovery phrase copied to clipboard');
        // You could show a toast notification here
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  }

  createWallet() {
    if (this.currentStep < this.totalSteps) {
      this.nextStep();
    } else {
      // Final step - create wallet and navigate to dashboard
      console.log('Creating wallet...');
      this.router.navigate(['/', RoutePath.DASHBOARD]);
    }
  }

  onStep2ReadyChange(ready: boolean) {
    this.isStep2Ready = ready;
  }

  isMainButtonDisabled(): boolean {
    if (this.currentStep === 1) {
      return !this.termsAgreed;
    } else if (this.currentStep === 2) {
      return !this.isStep2Ready;
    } else if (this.currentStep === 3) {
      // Assuming step 3 is always ready once reached
      return false;
    }
    return true; // Default to disabled
  }
}
