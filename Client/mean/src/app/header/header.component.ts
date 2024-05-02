import { Component,  } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userName: string = '';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserName();
    
  }
  getUserName() {
    this.userService.getUser().subscribe({next: (data) => {
      this.userName = data.name;
    }});
  }

  isLoggedIn(): boolean {
    let loggedIn = false;
    this.userService.getUser().subscribe({
      next: (data) => {
        loggedIn = true;
      },
      error: (error) => {
        loggedIn = false;
      }
    });
    return loggedIn;
  }

}
