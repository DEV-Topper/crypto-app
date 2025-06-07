import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { ModalController } from '@ionic/angular';
import { IonContent } from '@ionic/angular/standalone';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'cr-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  standalone: true,
  imports: [IonContent],
})
export class SplashComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private modalCtrl = inject(ModalController);

  ngOnInit() {
    SplashScreen.hide(); 

    this.subscription = interval(3000).subscribe(() => {
      this.modalCtrl.dismiss();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
