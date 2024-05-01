import { Component } from '@angular/core';
import { LocationCardComponent } from '../location-card/location-card.component';
import { IProperty } from '../IProperty';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { PropertyService } from '../services/property.service';
import { ActivatedRoute } from '@angular/router';
import { BookingFilter } from '../BookingFilter';

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
  criteria: BookingFilter | undefined;
  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (!params['filters']) {
        this.propertyService.getProperties().subscribe((data) => {
          this.properties = data.properties;
        });
        return;
      }
      this.criteria = JSON.parse(params['filters']);

      this.propertyService
        .getPropertiesAvailable(this.criteria)
        .subscribe((data) => {
          this.properties = data.properties;
        });
    });
  }
}
