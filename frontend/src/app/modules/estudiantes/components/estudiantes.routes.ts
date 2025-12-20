import { Routes } from '@angular/router';
import { EstudianteList } from './estudiante-list/estudiante-list';
import { AuthGuard } from '../../../core/guards/auth-guard';
import { RolesGuard } from '../../../core/guards/roles-guard';
import { EstudianteForm } from './estudiante-form/estudiante-form';

export const ESTUDIANTES_ROUTES: Routes = [
  {
    path: '',
    component: EstudianteList,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'crear',
    component: EstudianteForm,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'editar/:id',
    component: EstudianteForm,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN'] },
  },
];
