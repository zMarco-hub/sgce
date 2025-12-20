import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Auth } from '../../../modules/auth/services/auth';

enum UserRole {
  ADMIN = 'ADMIN',
  DOCENTE = 'DOCENTE',
  ESTUDIANTE = 'ESTUDIANTE',
}

interface MenuItem {
  title: string;
  path: string;
  icon: string;
  roles: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  public authService = inject(Auth);

  menuItems: MenuItem[] = [
    {
      title: 'Home',
      path: '/home',
      icon: '📊',
      roles: ['ADMIN', 'DOCENTE', 'ESTUDIANTE'],
    },
    {
      title: 'Usuarios',
      path: '/usuarios',
      icon: '👥',
      roles: ['ADMIN'],
    },
    {
      title: 'Cursos',
      path: '/cursos',
      icon: '📚',
      roles: ['ADMIN', 'DOCENTE'],
    },
    {
      title: 'Estudiantes',
      path: '/estudiantes',
      icon: '🎓',
      roles: ['ADMIN', 'DOCENTE'],
    },
    {
      title: 'Docentes',
      path: '/docentes',
      icon: '👨‍🏫',
      roles: ['ADMIN'],
    },
    {
      title: 'Evaluaciones',
      path: '/evaluaciones',
      icon: '📝',
      roles: ['ADMIN', 'DOCENTE'],
    },
    {
      title: 'Inscripciones',
      path: '/inscripciones',
      icon: '📋',
      roles: ['ADMIN', 'DOCENTE'],
    },
    {
      title: 'Notas',
      path: '/notas',
      icon: '⭐',
      roles: ['ADMIN', 'DOCENTE', 'ESTUDIANTE'],
    },
  ];

  get filteredMenuItems(): MenuItem[] {
    const userRole = this.authService.user()?.rol;
    return this.menuItems.filter((item) => item.roles.includes(userRole || ''));
  }

  isActiveRoute(path: string): boolean {
    // Implementar lógica de ruta activa si es necesario

    return false;
  }
}
