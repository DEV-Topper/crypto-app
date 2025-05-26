// verification.component.ts
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { RoutePath } from '../../../interfaces/route-path';

@Component({
  selector: 'cr-verification',
  templateUrl: './verification.component.html',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ButtonComponent
  ]
})
export class VerificationComponent {
  @ViewChild('countryModal') countryModal!: IonModal;
  @ViewChild('documentCountryModal') documentCountryModal!: IonModal;
  
  currentStep = 1;
  totalSteps = 3;
  
  // Form data
  nationality = 'Nigeria';
  verifyWith = 'BVN';
  bvnNumber = '';
  documentCountry = 'Nigeria';
  documentType = 'ID Card';
  searchQuery = '';
  
  // Countries data with flags
  countries = [
    { name: 'Nigeria', code: 'NG', flag: 'assets/flags/ng.png' },
    { name: 'Ghana', code: 'GH', flag: 'assets/flags/gh.png' },
    { name: 'Kenya', code: 'KE', flag: 'assets/flags/ke.png' },
    { name: 'South Africa', code: 'ZA', flag: 'assets/flags/za.png' },
    { name: 'Egypt', code: 'EG', flag: 'assets/flags/eg.png' },
    { name: 'Morocco', code: 'MA', flag: 'assets/flags/ma.png' },
    { name: 'Algeria', code: 'DZ', flag: 'assets/flags/dz.png' },
    { name: 'Tunisia', code: 'TN', flag: 'assets/flags/tn.png' },
    { name: 'Cameroon', code: 'CM', flag: 'assets/flags/cm.png' },
    { name: 'Senegal', code: 'SN', flag: 'assets/flags/sn.png' },
    { name: 'Uganda', code: 'UG', flag: 'assets/flags/ug.png' },
    { name: 'Tanzania', code: 'TZ', flag: 'assets/flags/tz.png' }
  ];
  
  // Document types
  documentTypes = [
    { id: 'id-card', name: 'ID Card', icon: 'card-outline', recommended: true },
    { id: 'passport', name: 'Passport', icon: 'globe-outline', recommended: false },
    { id: 'drivers-license', name: 'Driver\'s License', icon: 'car-outline', recommended: false }
  ];

  constructor(private router: Router) {}

  get filteredCountries() {
    return this.countries.filter(country => 
      country.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getCountryFlag(countryName: string): string {
    const country = this.countries.find(c => c.name === countryName);
    return country ? country.flag : 'assets/flags/placeholder.png';
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    } else {
      // Navigate to the next page after verification
      this.router.navigate(['/',RoutePath.WALLETCREATION]);
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  selectCountry(country: any, isDocumentCountry = false) {
    if (isDocumentCountry) {
      this.documentCountry = country.name;
      this.documentCountryModal.dismiss();
    } else {
      this.nationality = country.name;
      this.countryModal.dismiss();
    }
  }

  selectDocumentType(type: string) {
    this.documentType = type;
  }

  takePictures() {
    console.log('Taking pictures');
    // Implement camera functionality
  }

  uploadPhotos() {
    console.log('Uploading photos');
    // Implement file upload functionality
  }

  resetSearch() {
    this.searchQuery = '';
  }
}