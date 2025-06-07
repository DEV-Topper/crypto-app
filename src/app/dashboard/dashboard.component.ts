import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';

@Component({
  selector: 'cr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonTabs,
    IonTabButton,
    IonTabBar,
    IonIcon,
    IonLabel,
  ],
})
export class DashboardComponent {}
