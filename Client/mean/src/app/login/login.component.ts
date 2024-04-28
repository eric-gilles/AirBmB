import { Component, NgModule, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };
  constructor(private userService: UserService) {}

  onSubmit(): void {
    this.userService.login(this.user).subscribe(
      (response) => {
        console.log('Logged in successfully!');
        console.log(response);
        this.userService.setToken(response.token);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
