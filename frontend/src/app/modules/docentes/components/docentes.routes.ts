import { Routes } from '@angular/router';
import { DocenteList } from './docente-list/docente-list';
import { AuthGuard } from '../../../core/guards/auth-guard';
import { RolesGuard } from '../../../core/guards/roles-guard';
import { DocenteForm } from './docente-form/docente-form';

export const DOCENTES_ROUTES: Routes = [
  {
    path: '',
    component: DocenteList,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'crear',
    component: DocenteForm,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'editar/:id',
    component: DocenteForm,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN'] },
  },
];
