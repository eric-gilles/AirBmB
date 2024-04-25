import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LocationContainerComponent } from './location-container/location-container.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    LocationContainerComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-app';
}
