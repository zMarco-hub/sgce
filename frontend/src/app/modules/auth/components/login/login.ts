import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  loginForm: FormGroup;
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.error.set(null);

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.authService.setToken(response.access_token);
          this.router.navigate(['/usuarios']);
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set('Credenciales incorrectas');
          this.loading.set(false);
          console.error('Login error:', error);
        },
      });
    }
  }
}
