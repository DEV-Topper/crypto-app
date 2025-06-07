import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  BiometricAuth,
  BiometryError,
  BiometryErrorType,
  BiometryType,
  CheckBiometryResult,
} from '@aparajita/capacitor-biometric-auth';
import { IonIcon, IonToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'cr-wallet-creation-step2',
  standalone: true,
  imports: [IonIcon, IonToggle, NgClass, CommonModule],
  templateUrl: './wallet-creation-step2.component.html',
  styleUrls: ['./wallet-creation-step2.component.scss'],
})
export class WalletCreationStep2Component implements OnInit {
  @Input() currentStep!: number;
  @Input() useDeviceAuth = false;
  @Output() useDeviceAuthChange = new EventEmitter<boolean>();
  @Output() stepReady = new EventEmitter<boolean>();

  biometryAvailable = false;
  biometryType: BiometryType = BiometryType.none;

  async ngOnInit() {
    await this.checkBiometryAvailability();
    if (!this.biometryAvailable) {
      this.stepReady.emit(true);
    } else {
      this.stepReady.emit(false);
    }
  }

  async checkBiometryAvailability() {
    try {
      const result: CheckBiometryResult = await BiometricAuth.checkBiometry();
      this.biometryAvailable = result.isAvailable;
      this.biometryType = result.biometryType;
      console.log('Biometry check result:', result);
    } catch (error) {
      console.error('Error checking biometry:', error);
      this.biometryAvailable = false;
      this.biometryType = BiometryType.none;
    }
  }

  async onToggleChange(event: any) {
    const isChecked = event.detail.checked;
    if (isChecked && this.biometryAvailable) {
      try {
        await BiometricAuth.authenticate({
          reason: 'Please authenticate to enable device authentication',
          cancelTitle: 'Cancel',
          allowDeviceCredential: true,
          iosFallbackTitle: 'Use passcode',
          androidTitle: 'Biometric Authentication',
          androidSubtitle: 'Authenticate to proceed',
          androidConfirmationRequired: false,
        });
        this.useDeviceAuth = true;
        this.useDeviceAuthChange.emit(this.useDeviceAuth);
        this.stepReady.emit(true);
      } catch (error) {
        console.error('Biometric authentication failed:', error);
        this.useDeviceAuth = false;
        this.useDeviceAuthChange.emit(this.useDeviceAuth);
        this.stepReady.emit(false);
        if (error instanceof BiometryError) {
          if (error.code !== BiometryErrorType.userCancel) {
            alert(`Authentication failed: ${error.message}`);
          }
        }
      }
    } else {
      this.useDeviceAuth = isChecked;
      this.useDeviceAuthChange.emit(this.useDeviceAuth);
      if (!isChecked) {
        this.stepReady.emit(true);
      } else {
        this.stepReady.emit(false);
      }
    }
  }

  // Removed onNext and onBack methods as navigation is handled by parent
}
