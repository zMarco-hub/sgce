import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../environments/environment.development';
import { DecodedToken, LoginRequest, LoginResponse } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly TOKEN_KEY = 'auth_token';
  private readonly apiUrl = environment.authUrl;

  // Señales para el estado de autenticación
  private tokenSignal = signal<string | null>(this.getTokenFromStorage());
  private userSignal = signal<DecodedToken | null>(this.getUserFromToken());

  // Computadas
  readonly token = this.tokenSignal.asReadonly();
  readonly user = this.userSignal.asReadonly();
  readonly isAuthenticated = () => !!this.tokenSignal() && !this.isTokenExpired();

  // Métodos de autenticación
  login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  logout() {
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  setToken(token: string) {
    this.tokenSignal.set(token);
    this.userSignal.set(this.decodeToken(token));
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private getTokenFromStorage(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getUserFromToken(): DecodedToken | null {
    const token = this.getTokenFromStorage();
    return token ? this.decodeToken(token) : null;
  }

  private decodeToken(token: string): DecodedToken {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      this.logout();
      throw error;
    }
  }

  private isTokenExpired(): boolean {
    const user = this.userSignal();
    if (!user || !user.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return user.exp < currentTime;
  }

  hasRole(requiredRole: string): boolean {
    const user = this.userSignal();
    return user?.rol === requiredRole;
  }

  hasAnyRole(requiredRoles: string[]): boolean {
    const user = this.userSignal();
    return requiredRoles.includes(user?.rol || '');
  }

  getToken(): string | null {
    return this.tokenSignal();
  }
}
