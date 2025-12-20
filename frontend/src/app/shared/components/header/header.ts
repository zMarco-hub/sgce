import { Component, inject } from '@angular/core';
import { Auth } from '../../../modules/auth/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private authService = inject(Auth);
  private router = inject(Router);

  user = this.authService.user;
  isAuthenticated = this.authService.isAuthenticated;

  logout() {
    this.authService.logout();
  }

  navigateToProfile() {
    this.router.navigate(['/perfil']);
  }
}
