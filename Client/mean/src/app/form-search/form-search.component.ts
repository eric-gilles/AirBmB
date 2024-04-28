import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { PropertyService } from '../services/property.service';
import { Form, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form-search',
  standalone: true,
  imports: [HeroComponent, CommonModule, FormsModule],
  templateUrl: './form-search.component.html',
  styleUrl: './form-search.component.css',
})
export class FormSearchComponent {
  criteria = {
    city: '',
    startDate: '',
    endDate: '',
    maxPrice: '',
    minBedrooms: '',
    minBeds: '',
    maxDistance: '',
  };
  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {}

  onSubmit() {
    console.log(this.criteria);
    this.propertyService
      .getPropertyAvailable(this.criteria)
      .subscribe((response) => {
        if (response.message === 'Succeed') {
          this.propertyService.setPropertiesFiltered(response.properties);
          console.log(response);
          this.router.navigate(['/locations']);
        }
      });
  }
}
