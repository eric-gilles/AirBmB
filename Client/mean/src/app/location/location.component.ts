import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PropertyService } from '../services/property.service';
import { ActivatedRoute } from '@angular/router';
import { BookingFilter } from '../BookingFilter';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

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
    private userService: UserService
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
    });
  }

  onSubmit() {
    if (this.filter.endDate && this.filter.startDate) {
      this.filter_model = this.filter;
    }
    if (
      this.filter_model.startDate === '' ||
      this.filter_model.endDate === ''
    ) {
      alert('Please select the dates');
      return;
    }
    if (this.filter_model.minBeds === 0) {
      alert('Please select the number of person sleeping');
      return;
    }
    this.propertyService
      .getPropertyAvailable(Number(this.propertyId), this.filter_model)
      .subscribe((response) => {
        this.propertyAvailable = response.isAvailable;
        if (response.isAvailable) {
          alert('Property is available');
          this.showOverlay = true;
        }
      });
  }

  calculateNumberOfNights() {
    console.log(this.filter);
    // Convertir les chaînes de caractères en objets Date
    const startDate = new Date(this.filter.startDate);
    const endDate = new Date(this.filter.endDate);

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
}
