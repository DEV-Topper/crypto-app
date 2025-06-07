import { Route } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RoutePath } from '../../interfaces/route-path';
import { VerificationComponent } from './verification/verification.component';
import { Step1Component } from './verification/step1/step1.component';
import { Step2Component } from './verification/step2/step2.component';
import { Step3Component } from './verification/step3/step3.component';

export const authRoute: Route[] = [
  {
    path: RoutePath.REGISTER,
    component: RegisterComponent,
  },
  {
    path: RoutePath.LOGIN,
    component: LoginComponent,
  },
  {
    path: RoutePath.VERIFICATION,
    component: VerificationComponent,
    children: [
      {
        path: RoutePath.VERIFICATION_STEP1,
        component: Step1Component,
      },
      {
        path: RoutePath.VERIFICATION_STEP2,
        component: Step2Component,
      },
      {
        path: RoutePath.VERIFICATION_STEP3,
        component: Step3Component,
      },
      {
        path: '',
        redirectTo: RoutePath.VERIFICATION_STEP1,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: RoutePath.REGISTER,
    pathMatch: 'full',
  },
];
