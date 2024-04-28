import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { PropertyService } from '../services/property.service';
import { Form, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
  constructor(private propertyService: PropertyService) {}

  onSubmit(): void {
    console.log(this.criteria);
    this.propertyService.getPropertyAvailable(this.criteria).subscribe(
      (response: Response) => {
        console.log('Properties found:', response);
      },
      (error: Error) => {
        console.error('Error while searching:', error);
      }
    );
  }
}
