import { Component, Input } from '@angular/core';
import { IProperty } from '../IProperty';

@Component({
  selector: 'location-card',
  standalone: true,
  imports: [],
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.css',
})
export class LocationCardComponent {
  @Input() property!: any;
}
