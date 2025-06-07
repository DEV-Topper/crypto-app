import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { Country } from '../../../interfaces/country.interface';

@Component({
  selector: 'cr-country-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonSearchbar,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
  ],
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.scss'],
})
export class CountryModalComponent implements OnInit {
  modal = inject(ModalController);
  @Input() isOpen = false;
  @Input() countries: Country[] = [];

  searchControl: FormControl;
  filteredCountries: Country[] = [];

  constructor(private fb: FormBuilder) {
    this.searchControl = this.fb.control('');
  }

  ngOnInit() {
    this.filteredCountries = [...this.countries];

    this.searchControl.valueChanges.subscribe((value) => {
      if (!value) {
        this.filteredCountries = [...this.countries];
        return;
      }
      this.filteredCountries = this.countries.filter((country) =>
        country.name.toLowerCase().includes(value.toLowerCase()),
      );
    });
  }

  getCountryFlag(code: string): string {
    return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
  }

  selectCountry(country: Country) {
    this.modal.dismiss(country);
  }
}
