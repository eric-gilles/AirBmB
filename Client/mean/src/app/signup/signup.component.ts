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
    if (this.user.email === '' || this.user.password === '' || this.user.phone === '' || this.user.firstname === '' || this.user.lastname === ''
          || !this.user.email || !this.user.password || !this.user.phone || !this.user.firstname || !this.user.lastname) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    this.userService.register(this.user).subscribe(
      (response) => {
        if (response.status === 200) {
          console.log('Sign up successful:', response);
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error('Sign up failed:', error);
      }
    );
  }
}
