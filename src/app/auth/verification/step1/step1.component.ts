import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonInput, IonIcon } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { RoutePath } from '../../../../interfaces/route-path';
import { VerificationService } from '../verification.service';
import { CountryModalComponent } from '../../../shared/components/country-modal/country-modal.component';
import { Country } from '../../../interfaces/country.interface';
import { ButtonComponent } from '../../../../components/button/button.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'cr-step1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonContent,
    IonInput,
    IonIcon,
    ButtonComponent,
    NgClass,
  ],
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component implements OnInit {
  form!: FormGroup;
  nationality: string | null = null;
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private verificationService: VerificationService,
    private modalCtrl: ModalController,
  ) {
    this.form = this.fb.group({
      nationality: ['', Validators.required],
      verifyWith: ['BVN', Validators.required],
      bvnNumber: ['', Validators.required],
    });
  }

  get verifyWithControl() {
    return this.form.get('verifyWith') as FormControl;
  }

  get bvnNumberControl() {
    return this.form.get('bvnNumber') as FormControl;
  }

  ngOnInit() {
    const state = this.verificationService.getState();
    if (state.nationality) {
      this.nationality = state.nationality;
      this.form.patchValue({ nationality: state.nationality });
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
    console.debug({ data });
    if (data) {
      this.onCountrySelected(data);
    }
  }

  onCountrySelected(country: Country) {
    this.nationality = country.name;
    this.form.patchValue({ nationality: country.name });
  }

  getCountryFlag(code: string): string {
    return `https://flagcdn.com/w40/${this.countries.find((e) => e.name.toLowerCase() === code.toLowerCase())?.code.toLowerCase()}.png`;
  }

  nextStep() {
    if (this.form.valid) {
      //   this.verificationService.updateState({
      //     nationality: this.form.value.nationality,
      //     verifyWith: this.form.value.verifyWith,
      //     bvnNumber: this.form.value.bvnNumber,
      //   });
      this.router.navigate([
        '/auth/verification',
        RoutePath.VERIFICATION_STEP2,
      ]);
    }
  }
}
