import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    imports: [FormsModule, FooterComponent, HeaderComponent]
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
      this.getUserData();
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
        },
      });
    }

    updateUser() {
      const updatedUser = {
          firstname: this.userName.split(' ')[0],
          lastname: this.userName.split(' ')[1],
          email: this.mail,
          phone: this.phoneNumber
      };

      this.userService.updateUser(updatedUser).subscribe({
          next: (response) => {
            this.router.navigate(['/profil']);
            alert('Informations utilisateurs mises à jour');
          },
          error: (error) => {
            console.log(error);
          }
      });
    }
    
    closeOverlay() {
      this.showOverlay = false;
    }
  }