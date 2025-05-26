import { Routes } from '@angular/router';
import { RoutePath } from '../interfaces/route-path';

export const routes: Routes = [
  {
    path: RoutePath.ONBOARDING,
    loadChildren: () =>
      import('./onboarding/onboarding.route').then((m) => m.onboardingRoute),
  },
  {
     path: RoutePath.AUTH,
     loadChildren: () => import('./auth/auth.route').then((m) => m.authRoute)
  },
  {
     path: RoutePath.WALLETCREATION,
     loadChildren: () => import('./wallet-creation/wallent-creation.route').then((m) => m.walletRoute)
  },
  {
     path: RoutePath.DASHBOARD,
     loadChildren: () => import('./dashboard/dashboard.route').then((m) => m.dashboardRoute)
  },
  {
     path: RoutePath.SETTINGS,
     loadChildren: () => import('./settings/settings.route').then((m) => m.settingsRoute)
  },
  {
    path: '', 
    redirectTo: RoutePath.ONBOARDING, 
    pathMatch: 'full',
  },
];
