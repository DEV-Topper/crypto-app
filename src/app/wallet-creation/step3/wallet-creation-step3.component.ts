import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'cr-wallet-creation-step3',
  standalone: true,
  imports: [NgClass, IonContent, IonIcon, ButtonComponent],
  templateUrl: './wallet-creation-step3.component.html',
  styleUrls: ['./wallet-creation-step3.component.scss'],
})
export class WalletCreationStep3Component {
  @Input() currentStep!: number;
  @Input() recoveryPhrase: string[] = [];
  @Output() copyToClipboard = new EventEmitter<void>();

  onCopy() {
    this.copyToClipboard.emit();
  }
}
