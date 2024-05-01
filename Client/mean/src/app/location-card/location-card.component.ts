import { Component, Input } from '@angular/core';
import { BookingFilter } from '../BookingFilter';
import { Router } from '@angular/router';

@Component({
  selector: 'location-card',
  standalone: true,
  imports: [],
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.css',
})
export class LocationCardComponent {
  @Input() property!: any;
  @Input() filter: BookingFilter | undefined;

  constructor(private rooter: Router) {}
  navigate() {
    this.rooter.navigate(['/location', this.property.idProperty], {
      queryParams: { filters: JSON.stringify(this.filter) },
    });
  }
}
