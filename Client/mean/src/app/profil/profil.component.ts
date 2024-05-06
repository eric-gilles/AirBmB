import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { UserService } from "../services/user.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-profil',
    standalone: true,
    templateUrl: './profil.component.html',
    styleUrl: './profil.component.css',
    imports: [FormsModule, FooterComponent, HeaderComponent, CommonModule]
})
export class ProfilComponent {
    userName: string = '';
    mail: string = '';
    phoneNumber: string = '';
    showOverlay: boolean = false;
    constructor(
      private userService: UserService,
      private root: ActivatedRoute,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      if (!this.userService.getUser()) {
        this.router.navigate(['/login']);
      }
      this.getUserData();
    }
    
    overlay(): void {
      this.showOverlay = true;
      console.log(this.showOverlay);
    }

    getUserData() {
      this.userService.getUser().subscribe({
        next: (data) => {
            this.userName = data.user.firstname + ' ' + data.user.lastname;
            this.mail = data.user.email;
            this.phoneNumber = data.user.phone;
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/login']);
        },
      });
    }

    updateUser(form: NgForm) {
      const updatedUser = {
        password: dat
        firstname: this.userName.split(' ')[0],
        lastname: this.userName.split(' ')[1],
        email: this.mail,
        phone: this.phoneNumber
      };user = {
        email: '',
        phone: '',
        firstname: '',
        lastname: '',
      };
      this.userService.updateUser(updatedUser).subscribe({
        next: (data) => {
          console.log(data);
          this.showOverlay = false;
          this.getUserData();
        },
        error: (error) => {
          console.log(error);
        },
      });

    }
    
    closeOverlay() {
      this.showOverlay = false;
    }
  }