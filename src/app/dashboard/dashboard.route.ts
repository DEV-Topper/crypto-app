import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { AccountBalanceViewComponent } from './account-balance-view/account-balance-view.component';
import { SendToRizoViewComponent } from './send-to-rizo-view/send-to-rizo-view.component';
import { ConvertViewComponent } from './convert-view/convert-view.component';
import { BuySellTradingViewComponent } from './buy-sell-trading-view/buy-sell-trading-view.component';
import { NotificationsComponent } from '../notifications/notifications.component';

export const dashboardRoute: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: DashboardViewComponent,
      },
      {
        path: 'account-balance',
        component: AccountBalanceViewComponent,
      },
      {
        path: 'send-to-rizo',
        component: SendToRizoViewComponent,
      },
      {
        path: 'convert',
        component: ConvertViewComponent,
      },
      {
        path: 'buy-sell',
        component: BuySellTradingViewComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: 'donate',
        loadComponent: () =>
          import('./donate-view/donate-view.component').then(
            (m) => m.DonateViewComponent,
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile-view/profile-view.component').then(
            (m) => m.ProfileViewComponent,
          ),
      },
    ],
  },
];
