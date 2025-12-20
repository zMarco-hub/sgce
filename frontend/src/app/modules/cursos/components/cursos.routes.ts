import { Routes } from '@angular/router';
import { CursoList } from './curso-list/curso-list';
import { AuthGuard } from '../../../core/guards/auth-guard';
import { RolesGuard } from '../../../core/guards/roles-guard';
import { CursoForm } from './curso-form/curso-form';

export const CURSOS_ROUTES: Routes = [
  {
    path: '',
    component: CursoList,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'crear',
    component: CursoForm,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'editar/:id',
    component: CursoForm,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN'] },
  },
];
