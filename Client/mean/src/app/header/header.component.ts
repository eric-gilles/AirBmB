import { Component,  } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userName: string = '';

  constructor(
    private userService: UserService,
    private root: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserName();
  }
  logout(): void {
    this.userService.logout();
    window.location.reload();
  }
  getUserName() {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.userName = data.user.firstname + ' ' + data.user.lastname;
      },
      error: (error) => {},
    });
  }
}
