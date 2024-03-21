import { Component } from '@angular/core';
import { FormSearchComponent } from '../form-search/form-search.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FormSearchComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

}
