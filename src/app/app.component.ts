import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { addIcons } from 'ionicons';
import { SafeArea } from '@capacitor-community/safe-area';
import { SplashComponent } from './splash/splash.component';
import {
  chevronBackOutline,
  trashOutline,
  notificationsOffOutline,
  lockClosed,
  scan,
  person,
  swapVerticalOutline,
  heart,
  notifications,
  checkmark,
  createOutline,
  personOutline,
  chevronForwardOutline,
  shieldOutline,
  cardOutline,
  globeOutline,
  carOutline,
  tabletPortraitOutline,
  arrowUpOutline,
  arrowDownOutline,
  chevronDownOutline,
  eyeOutline,
  eyeOffOutline,
  home,
  trendingUp,
  pencil,
  lockClosedOutline,
  walletOutline,
  helpCircleOutline,
  documentTextOutline,
  mailOutline,
  logOutOutline,
} from 'ionicons/icons';

@Component({
  selector: 'cr-root',
  imports: [IonApp, IonRouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'crypto-app';
  private storage = inject(Storage);
  private modalCtrl = inject(ModalController);
  private platform = inject(Platform);

  private addIconsToApp() {
    addIcons({
      'chevron-back-outline': chevronBackOutline,
      'trash-outline': trashOutline,
      'notifications-off-outline': notificationsOffOutline,
      'lock-closed': lockClosed,
      scan: scan,
      person: person,
      'swap-vertical-outline': swapVerticalOutline,
      heart: heart,
      notifications: notifications,
      checkmark: checkmark,
      'create-outline': createOutline,
      'person-outline': personOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'shield-outline': shieldOutline,
      'card-outline': cardOutline,
      'globe-outline': globeOutline,
      'car-outline': carOutline,
      'tablet-portrait-outline': tabletPortraitOutline,
      'arrow-up-outline': arrowUpOutline,
      'arrow-down-outline': arrowDownOutline,
      'chevron-down-outline': chevronDownOutline,
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline,
      home: home,
      'trending-up': trendingUp,
      pencil: pencil,
      'lock-closed-outline': lockClosedOutline,
      'wallet-outline': walletOutline,
      'help-circle-outline': helpCircleOutline,
      'document-text-outline': documentTextOutline,
      'mail-outline': mailOutline,
      'log-out-outline': logOutOutline,
    });
  }

  private async initializeSplashScreen() {
    await this.platform.ready();
    const splashModal = await this.modalCtrl.create({
      component: SplashComponent,
      cssClass: 'splash-modal',
      backdropDismiss: false,
      showBackdrop: false,
    });
    await splashModal.present();
  }

  private async initializeSafeArea() {
    await SafeArea.enable({
      config: {
        customColorsForSystemBars: true,
        statusBarColor: '#00000000',
        statusBarContent: 'light',
        navigationBarColor: '#00000000', 
        navigationBarContent: 'light',
      },
    });
  }

  async ngOnInit() {
    await this.storage.create();
    this.addIconsToApp();
    await this.initializeSplashScreen();
    await this.initializeSafeArea();
  }
}
