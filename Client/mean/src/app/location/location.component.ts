import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PropertyService } from '../services/property.service';
import { ActivatedRoute } from '@angular/router';
import { BookingFilter } from '../BookingFilter';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent {
  propertyId: string = '';
  user: any;
  property: any = {};
  filter: BookingFilter = {
    startDate: '',
    endDate: '',
    city: '',
    maxPrice: 0,
    minBedrooms: 0,
    minBeds: 1,
    maxDistance: 0,
  };
  filter_model: BookingFilter = {
    startDate: '',
    endDate: '',
    city: '',
    maxPrice: 0,
    minBedrooms: 0,
    minBeds: 1,
    maxDistance: 0,
  };
  propertyAvailable: boolean = true;
  showOverlay = false;
  payment = {
    cvv: '',
    cardNumber: '',
    expirationDate: '',
  };

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) {}

  decrementValue() {
    if (this.filter_model.minBeds! > 1) {
      this.filter_model.minBeds!--;
    }
  }

  incrementValue() {
    if (this.filter_model.minBeds! < this.property.numSleeps) {
      this.filter_model.minBeds!++;
    }
  }

  ngOnInit() {
    this.propertyId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.route.snapshot.queryParams['filters']);
    if (!this.route.snapshot.queryParams['filters']) {
    } else {
      this.filter = JSON.parse(this.route.snapshot.queryParams['filters']);
    }

    this.propertyService.getProperty(this.propertyId).subscribe((response) => {
      this.property = response.property;
      if (isPlatformBrowser(this.platformId)) {
        // Check if running in the browser
        initMap(this.property);
      }
    });
  }

  onSubmit() {
    if (this.filter.endDate && this.filter.startDate) {
      this.filter_model = this.filter;
    }
    this.propertyService
      .getPropertyAvailable(Number(this.propertyId), this.filter_model)
      .subscribe((response) => {
        this.propertyAvailable = response.isAvailable;
        if (response.isAvailable) {
          this.showOverlay = true;
        }
      });
  }

  calculateNumberOfNights() {
    // Convertir les chaînes de caractères en objets Date
    const startDate = new Date(this.filter_model.startDate);
    const endDate = new Date(this.filter_model.endDate);

    // Calculer la différence en millisecondes
    const differenceMillis = endDate.getTime() - startDate.getTime();

    // Convertir la différence en jours (1 jour = 24 * 60 * 60 * 1000 millisecondes)
    const differenceDays = differenceMillis / (24 * 60 * 60 * 1000);

    // Retourner le nombre de nuits arrondi à l'entier supérieur
    return Math.ceil(differenceDays);
  }
  calculateTotalPrice() {
    // Calculer le nombre de nuits
    const numberOfNights = this.calculateNumberOfNights();

    // Calculer le prix total
    return numberOfNights * this.property.price;
  }
  closeOverlay() {
    this.showOverlay = false;
  }
  onSubmitReservation() {
    this.userService.getUser().subscribe((user) => {
      this.propertyService
        .makeReservation(Number(this.propertyId), this.filter_model, user)
        .subscribe((response) => {
          if (response.message === 'Succeed') {
            alert('Booking successful');
            this.showOverlay = false;
          } else {
            alert('Booking failed');
          }
        });
    });
  }
}

function initMap(property: any) {
  let center: [number, number] = [property.latitude, property.longitude];
  let center1: [number, number] = [3.8783815, 43.6157942];
  (mapboxgl as typeof mapboxgl).accessToken =
    'pk.eyJ1IjoiZXJpYy1naWxsZXMiLCJhIjoiY2x2bnY2ejV3MGlxMjJrcW9vbHE1YzBiciJ9.K8tUIRMvkyViACCawboUlA';
  const map = new mapboxgl.Map({
    container: 'map-container', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: center1,
    zoom: 15, // starting zoom
  });
  // Add a marker at the center of the map
  new mapboxgl.Marker().setLngLat(center1).addTo(map);
  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());
  map.on('load', () => {
    map.resize();
  });
}
