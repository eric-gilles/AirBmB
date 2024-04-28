import { Component } from '@angular/core';
import { LocationCardComponent } from '../location-card/location-card.component';
import { IProperty } from '../IProperty';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'location-container',
  standalone: true,
  imports: [
    LocationCardComponent,
    HeaderComponent,
    FooterComponent,
    CommonModule,
  ],

  templateUrl: './location-container.component.html',
  styleUrl: './location-container.component.css',
})
export class LocationContainerComponent {
  properties: any = []; // Array to store fetched properties

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    const filtered = this.propertyService.getPropertiesFiltered();
    if (filtered.length > 0) {
      this.properties = filtered;
      return;
    }
    this.propertyService.getProperties().subscribe((response) => {
      if (response.message === 'Succeed') {
        this.properties = response.properties;
        return;
      }
    });
    
  }
}
