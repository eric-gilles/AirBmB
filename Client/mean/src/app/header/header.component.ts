import { Component } from '@angular/core';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private propertyService: PropertyService) {}
  clearFilteredProperties(): void {
    this.propertyService.setPropertiesFiltered([]);
  }
}