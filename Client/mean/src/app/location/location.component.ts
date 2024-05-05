import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PropertyService } from '../services/property.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingFilter } from '../BookingFilter';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import mapboxgl from 'mapbox-gl';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ReviewBoxComponent } from '../review-box/review-box.component';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-location',
  standalone: true,
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    ReviewBoxComponent,
  ],
})
export class LocationComponent {
  @ViewChild(ReviewBoxComponent) reviewBoxComponent!: ReviewBoxComponent;

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
    private router: ActivatedRoute,
    private propertyService: PropertyService,
    private userService: UserService,
    private route: Router,
    private commentService: CommentService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.propertyId = this.router.snapshot.paramMap.get('id')!;
    this.setAverageScore();

    // Call method of ReviewBoxComponent on initialization
    this.callReviewBoxMethod();

    if (!this.router.snapshot.queryParams['filters']) {
    } else {
      this.filter = JSON.parse(this.router.snapshot.queryParams['filters']);
    }

    this.propertyService.getProperty(this.propertyId).subscribe({
      next: (response) => {
        this.property = response.property;
        if (isPlatformBrowser(this.platformId)) {
          // Check if running in the browser
          initMap(this.property);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load property:', error);
      },
      complete: () => {
        console.log('Property loaded');
      },
    });
  }

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

  setAverageScore() {
    if (!this.propertyId) return;
    this.commentService
      .getCommentsByProperty(Number(this.propertyId))
      .subscribe({
        next: (response) => {
          if (response.comments.length > 0) {
            let sum: any = 0;
            for (const comment of response.comments) {
              sum += comment.note;
            }
            this.property.review = Math.round(sum / response.comments.length);
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  onSubmit() {
    this.userService.getUser().subscribe({
      next: (response: HttpResponse<any>) => {},
      error: (error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.route.navigate(['/login']);
        }
      },
      complete: () => {},
    });

    if (this.filter.endDate && this.filter.startDate) {
      this.filter_model = this.filter;
    }
    this.propertyService
      .getPropertyAvailable(Number(this.propertyId), this.filter_model)
      .subscribe({
        next: (response) => {
          this.propertyAvailable = response.isAvailable;
          if (response.isAvailable) {
            this.showOverlay = true;
          }
        },
        error: (error: HttpErrorResponse) => {},
        complete: () => {
          console.log('Property availability check completed');
        },
      });
  }

  onSubmitReservation() {
    this.propertyService
      .makeReservation(Number(this.propertyId), this.filter_model)
      .subscribe({
        next: (response) => {
          this.showOverlay = false;
        },

        error: (error) => {
          console.error('Booking failed:', error);
        },
        complete: () => {
          console.log('Booking completed');
        },
      });
  }

  callReviewBoxMethod(): void {
    if (this.reviewBoxComponent) {
      this.reviewBoxComponent.getComments();
    }
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
    const numberOfNights = this.calculateNumberOfNights(); // Calculer le nombre de nuits
    return numberOfNights * this.property.price; // retourner le prix total
  }

  closeOverlay() {
    this.showOverlay = false;
  }
}

function initMap(property: any) {
  let center: [number, number] = [property.longitude, property.latitude];

  console.log(center);
  (mapboxgl as typeof mapboxgl).accessToken =
    'pk.eyJ1IjoiZXJpYy1naWxsZXMiLCJhIjoiY2x2bnY2ejV3MGlxMjJrcW9vbHE1YzBiciJ9.K8tUIRMvkyViACCawboUlA';
  const map = new mapboxgl.Map({
    container: 'map-container', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: center,
    zoom: 12, // starting zoom
  });
  // Add a marker at the center of the map
  new mapboxgl.Marker().setLngLat(center).addTo(map);
  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());
  map.on('load', () => {
    map.resize();
  });
}
