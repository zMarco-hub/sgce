import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AdminLayout } from './layouts/admin-layout/admin-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminLayout],
  template: `
    <div class="bg-gray-900 min-h-screen">
      <app-admin-layout></app-admin-layout>
      <!-- <app-header></app-header> -->
      <!-- <app-sidebar></app-sidebar> -->
      <router-outlet></router-outlet>
      <!-- <app-footer></app-footer>  -->
    </div>
  `,
})
export class AppComponent {
  title = 'Sistema de Usuarios';
}
