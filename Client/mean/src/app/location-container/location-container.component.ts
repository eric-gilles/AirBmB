import { Component } from '@angular/core';
import { LocationCardComponent } from '../location-card/location-card.component';
import { IProperty } from '../IProperty';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'location-container',
  standalone: true,
  imports: [LocationCardComponent, HeaderComponent, FooterComponent],
  templateUrl: './location-container.component.html',
  styleUrl: './location-container.component.css',
})
export class LocationContainerComponent {
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
