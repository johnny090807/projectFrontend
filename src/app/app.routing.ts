import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './auth/authentication.component';
import { AUTH_ROUTES } from './auth/auth.routes';
import {UsersComponent} from './user/users.component';
import {BedrijfInputComponent} from './bedrijf/bedrijf-input.component';


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'users', component: UsersComponent },
    { path: 'bedrijf', component: BedrijfInputComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
