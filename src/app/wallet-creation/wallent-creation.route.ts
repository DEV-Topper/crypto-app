import { Route } from '@angular/router';
import { WalletCreationComponent } from './wallet-creation.component';


export const walletRoute: Route[] = [
  {
    path: '',
    component: WalletCreationComponent,
  },
];
