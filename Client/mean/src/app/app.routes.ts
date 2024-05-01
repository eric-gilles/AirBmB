import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { LocationContainerComponent } from './location-container/location-container.component';
import { LocationComponent } from './location/location.component';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'location/:id',
    component: LocationComponent,
    title: 'Location',
  },
  {
    path: 'locations',
    component: LocationContainerComponent,
    title: 'Location',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup',
  },
  {
    path: 'error',
    component: ErrorComponent,
    title: 'Error',
  },
  {
    path: 'history',
    component: HistoryComponent,
    title: 'Historique de Visite',
  },
];
