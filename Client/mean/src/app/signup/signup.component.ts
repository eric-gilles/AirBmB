import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  user = {
    email: '',
    password: '',
    phone: '',
    firstname: '',
    lastname: '',
  };
  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    this.userService.register(this.user).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Sign up failed:', error);
      }
    );
  }
}
