import { Component } from '@angular/core';
import { LocationCardComponent } from '../location-card/location-card.component';
import { IProperty } from '../IProperty';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'location-container',
  standalone: true,
  imports: [LocationCardComponent, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './location-container.component.html',
  styleUrl: './location-container.component.css'
})
export class LocationContainerComponent {
  properties: IProperty[] = [{
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
  },
  {
    idProperty: 2,
    mailOwner: "anotherowner@example.com",
    city: "Paris",
    street: "15 rue de la Paix",
    zipCode: "75002",
    numSleeps: 2,
    numBedrooms: 1,
    distance: 2.0,
    price: 80,
    review: 3.5,
    photo: 'https://source.unsplash.com/1600x900/?house&paris'
  },
  {
    idProperty: 3,
    mailOwner: "thirdowner@example.com",
    city: "Marseille",
    street: "Quai des Belges",
    zipCode: "13001",
    numSleeps: 4,
    numBedrooms: 2,
    distance: 5.5,
    price: 150,
    review: 4.3,
    photo: 'https://source.unsplash.com/1600x900/?house&water'
  },
  {
    idProperty: 4,
    mailOwner: "ownerfour@example.com",
    city: "Lyon",
    street: "Rue de la République",
    zipCode: "69001",
    numSleeps: 6,
    numBedrooms: 3,
    distance: 3.5,
    price: 120,
    review: 4.5,
    photo: 'https://source.unsplash.com/1600x900/?house'
  },
  {
    idProperty: 5,
    mailOwner: "ownerfive@example.com",
    city: "Bordeaux",
    street: "Place de la Bourse",
    zipCode: "33000",
    numSleeps: 2,
    numBedrooms: 1,
    distance: 1.0,
    price: 200,
    review: 4.8,
    photo: 'https://source.unsplash.com/1600x900/?house'
  },
  {
    idProperty: 6,
    mailOwner: "ownersix@example.com",
    city: "Nice",
    street: "Promenade des Anglais",
    zipCode: "06000",
    numSleeps: 3,
    numBedrooms: 2,
    distance: 8.0,
    price: 180,
    review: 4.6,
    photo: 'https://source.unsplash.com/1600x900/?house'
  },
  {
    idProperty: 7,
    mailOwner: "ownerseven@example.com",
    city: "Toulouse",
    street: "Place du Capitole",
    zipCode: "31000",
    numSleeps: 4,
    numBedrooms: 2,
    distance: 4.5,
    price: 250,
    review: 4.9,
    photo: 'https://source.unsplash.com/1600x900/?house'
  },
  {
    idProperty: 8,
    mailOwner: "ownereight@example.com",
    city: "Strasbourg",
    street: "Place Kléber",
    zipCode: "67000",
    numSleeps: 4,
    numBedrooms: 2,
    distance: 1.8,
    price: 160,
    review: 4.7,
    photo: 'https://source.unsplash.com/1600x900/?house'
  },
  {
    idProperty: 9,
    mailOwner: "ownernine@example.com",
    city: "Lille",
    street: "Grand Place",
    zipCode: "59000",
    numSleeps: 6,
    numBedrooms: 3,
    distance: 0.5,
    price: 300,
    review: 4.6,
    photo: 'https://source.unsplash.com/1600x900/?house'
  }
  ];
}
