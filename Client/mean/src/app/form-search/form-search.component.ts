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
  styleUrl: './form-search.component.css',
})
export class FormSearchComponent {
  criteria: BookingFilter = {
    startDate: '',
    endDate: '',
  };

  constructor(private router: Router) {}

  onSubmit() {
    this.router.navigate(['/locations'], {
      queryParams: { filters: JSON.stringify(this.criteria) },
    });
  }
}
