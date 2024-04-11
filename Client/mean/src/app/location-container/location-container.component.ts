import { Component } from '@angular/core';
import { LocationCardComponent } from '../location-card/location-card.component';
import { IProperty } from '../IProperty';

@Component({
  selector: 'location-container',
  standalone: true,
  imports: [LocationCardComponent],
  templateUrl: './location-container.component.html',
  styleUrl: './location-container.component.css'
})
export class LocationContainerComponent {
  property: IProperty = {
    idProperty: 1,
    mailOwner: "navelmorgan34@gmail.com",
    city: "Montpellier",
    street: "20 rue salvador allende",
    zipCode: "34920",
    numSleeps: 3,
    numBedrooms: 3,
    distance: 7.5,
    price: 45,
    review: 4.5,
    photo: "../assets/image.jpg"
  };
}
