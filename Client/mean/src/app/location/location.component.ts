import { Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { IProperty } from '../IProperty';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent {
  constructor() {}

  property: IProperty = {
    idProperty: 1,
    mailOwner: 'navelmorgan34@gmail.com',
    city: 'Montpellier',
    street: '1424 Rte de Mende',
    zipCode: '34090',
    numSleeps: 3,
    numBedrooms: 3,
    distance: 7.5,
    price: 45,
    review: 4.5,
    photo: '../assets/image.jpg',
  };
}
