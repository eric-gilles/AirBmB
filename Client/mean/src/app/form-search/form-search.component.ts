import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingFilter } from '../BookingFilter';

@Component({
  selector: 'app-form-search',
  standalone: true,
  imports: [HeroComponent, CommonModule, FormsModule],
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.css'],
})
export class FormSearchComponent {
  criteria: BookingFilter = {
    startDate: '',
    endDate: '',
  };
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.validateForm()) {
      this.router.navigate(['/locations'], {
        queryParams: { filters: JSON.stringify(this.criteria) },
      });
    } else {
      this.showAlert = true;
    }
  }

  validateForm(): boolean {
    if (!this.criteria.city) {
      this.alertMessage = 'Veuillez saisir une ville de destination.';
      return false;
    }

    if (!this.criteria.startDate || !this.criteria.endDate) {
      this.alertMessage = 'Veuillez saisir les dates de début et de fin.';
      return false;
    }

    if (new Date(this.criteria.startDate) >= new Date(this.criteria.endDate)) {
      this.alertMessage = 'La date de début doit être antérieure à la date de fin.';
      return false;
    }

    return true;
  }

  closeAlert() {
    this.showAlert = false;
    this.alertMessage = '';
  }
}