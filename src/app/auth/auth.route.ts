import { Route } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RoutePath } from '../../interfaces/route-path';
import { VerificationComponent } from './verification/verification.component';

export const authRoute: Route[] = [
  {
    path: '',
    children: [
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
      },
      
    ],
  },
];
