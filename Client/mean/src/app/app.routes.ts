import { Routes } from '@angular/router';
import { LocationComponent } from './location/location.component';


export const routes: Routes = [
    {path:'location/:id', component: LocationComponent},
];
