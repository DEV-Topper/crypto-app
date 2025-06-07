import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { ModalController } from '@ionic/angular';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'cr-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  standalone: true,
  imports: [IonContent],
})
export class SplashComponent {
  constructor(private modalCtrl: ModalController) {}

  ionViewDidEnter() {
    SplashScreen.hide(); // Hide the native splash screen

    setTimeout(() => {
      this.modalCtrl.dismiss(); // Dismiss the fake splash screen after a delay
    }, 3000); // Adjust this delay as needed for your animation
  }
}
