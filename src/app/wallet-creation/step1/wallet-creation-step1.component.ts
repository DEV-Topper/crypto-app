import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, IonToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'cr-wallet-creation-step1',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonToggle],
  templateUrl: './wallet-creation-step1.component.html',
  styleUrls: ['./wallet-creation-step1.component.scss'],
})
export class WalletCreationStep1Component {
  @Input() termsAgreed = false;
  @Output() termsAgreedChange = new EventEmitter<boolean>();

  onTermsAgreedChange(agreed: boolean) {
    this.termsAgreed = agreed;
    this.termsAgreedChange.emit(this.termsAgreed);
  }
}
