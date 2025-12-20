import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Auth } from '../../modules/auth/services/auth';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate {
  private authService = inject(Auth);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[];

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (requiredRoles && !this.authService.hasAnyRole(requiredRoles)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
