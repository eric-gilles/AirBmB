import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  constructor(private userService: UserService) {}

  onSubmit(): void {
    this.userService.register(this.user).subscribe(
      (response) => {
        console.log('Sign up successfully!');
        console.log(response);
      },
      (error) => {
        console.error('Sign up failed:', error);
      }
    );
  }
}
