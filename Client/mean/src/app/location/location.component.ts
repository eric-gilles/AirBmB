import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PropertyService } from '../services/property.service';
import * as L from 'leaflet'; // Import Leaflet globally
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent {
  propertyId: string = '';
  property: any = {};
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.propertyId = this.route.snapshot.paramMap.get('id')!;
    this.propertyService.getProperty(this.propertyId).subscribe((response) => {
      this.property = response.property;
    });
  }
}
