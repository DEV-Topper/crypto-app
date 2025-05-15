import { Routes } from '@angular/router';
import { RoutePath } from '../interfaces/route-path';

export const routes: Routes = [
  {
    path: RoutePath.ONBOARDING,
    loadChildren: () =>
      import('./onboarding/onboarding.route').then((m) => m.onboardingRoute),
  },
  {
    path: '',
    redirectTo: RoutePath.ONBOARDING,
    pathMatch: 'full',
  },
];
