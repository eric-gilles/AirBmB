import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { UserService } from "../services/user.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-profil',
    standalone: true,
    templateUrl: './profil.component.html',
    styleUrl: './profil.component.css',
    imports: [FooterComponent, HeaderComponent]
})
export class ProfilComponent {
    userName: string = '';
    mail: string = '';
    phoneNumber: string = '';

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
        error: (error) => {},
      });
    }
  }