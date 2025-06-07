import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonIcon,
  ModalController,
} from '@ionic/angular/standalone';
import { ButtonComponent } from '../../../../components/button/button.component';
import { RoutePath } from '../../../../interfaces/route-path';
import { Country } from '../../../interfaces/country.interface';
import { CountryModalComponent } from '../../../shared/components/country-modal/country-modal.component';
import { VerificationService } from '../verification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cr-step2',
  imports: [ReactiveFormsModule, IonContent, IonIcon, ButtonComponent],
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private verificationService = inject(VerificationService);
  private modalCtrl = inject(ModalController);

  form: FormGroup;
  documentCountry: string | null = null;
  documentType: string | null = null;
  countries: Country[] = [
    { name: 'Nigeria', code: 'NG', phoneCode: '+234' },
    { name: 'Ghana', code: 'GH', phoneCode: '+233' },
    { name: 'Kenya', code: 'KE', phoneCode: '+254' },
    { name: 'South Africa', code: 'ZA', phoneCode: '+27' },
    { name: 'United States', code: 'US', phoneCode: '+1' },
    { name: 'United Kingdom', code: 'GB', phoneCode: '+44' },
    { name: 'Canada', code: 'CA', phoneCode: '+1' },
    { name: 'Australia', code: 'AU', phoneCode: '+61' },
    { name: 'Germany', code: 'DE', phoneCode: '+49' },
    { name: 'France', code: 'FR', phoneCode: '+33' },
    { name: 'Italy', code: 'IT', phoneCode: '+39' },
    { name: 'Spain', code: 'ES', phoneCode: '+34' },
    { name: 'Japan', code: 'JP', phoneCode: '+81' },
    { name: 'China', code: 'CN', phoneCode: '+86' },
    { name: 'India', code: 'IN', phoneCode: '+91' },
    { name: 'Brazil', code: 'BR', phoneCode: '+55' },
    { name: 'Mexico', code: 'MX', phoneCode: '+52' },
    { name: 'Russia', code: 'RU', phoneCode: '+7' },
    { name: 'South Korea', code: 'KR', phoneCode: '+82' },
    { name: 'Singapore', code: 'SG', phoneCode: '+65' },
  ];
  documentTypes = [
    'International Passport',
    'National ID Card',
    "Driver's License",
    "Voter's Card",
    'Residence Permit',
  ];

  constructor() {
    this.form = this.fb.group({
      documentCountry: ['', Validators.required],
      documentType: ['', Validators.required],
    });
  }

  ngOnInit() {
    const state = this.verificationService.getState();
    if (state.documentCountry) {
      this.documentCountry = state.documentCountry;
      this.form.patchValue({ documentCountry: state.documentCountry });
    }
    if (state.documentType) {
      this.documentType = state.documentType;
      this.form.patchValue({ documentType: state.documentType });
    }
  }

  async openCountryModal() {
    const modal = await this.modalCtrl.create({
      component: CountryModalComponent,
      componentProps: {
        countries: this.countries,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.onCountrySelected(data);
    }
  }

  onCountrySelected(country: Country) {
    this.documentCountry = country.name;
    this.form.patchValue({ documentCountry: country.name });
  }

  selectDocumentType(type: string) {
    this.documentType = type;
    this.form.patchValue({ documentType: type });
  }

  getCountryFlag(code: string): string {
    return `https://flagcdn.com/w40/${this.countries.find((e) => e.name.toLowerCase() === code.toLowerCase())?.code.toLowerCase()}.png`;
  }

  nextStep() {
    if (this.form.valid) {
    //   this.verificationService.updateState({
    //     documentCountry: this.form.value.documentCountry,
    //     documentType: this.form.value.documentType,
    //   });
      this.router.navigate([
        '/auth/verification',
        RoutePath.VERIFICATION_STEP3,
      ]);
    }
  }

  back() {
    this.router.navigate(['/auth/verification', RoutePath.VERIFICATION_STEP1]);
  }
}
