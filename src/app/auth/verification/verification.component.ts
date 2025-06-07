import { Component } from '@angular/core';
import { IonContent, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'cr-verification',
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss',
  imports: [IonRouterOutlet, IonContent],
})
export class VerificationComponent {}
