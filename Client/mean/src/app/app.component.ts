import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationContainerComponent } from './location-container/location-container.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LocationContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
  
}
