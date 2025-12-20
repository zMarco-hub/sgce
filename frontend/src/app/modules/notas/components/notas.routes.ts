import { Routes } from '@angular/router';
import { NotaList } from './nota-list/nota-list';
import { AuthGuard } from '../../../core/guards/auth-guard';
import { RolesGuard } from '../../../core/guards/roles-guard';
import { NotaForm } from './nota-form/nota-form';

export const NOTAS_ROUTES: Routes = [
  {
    path: '',
    component: NotaList,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN', 'DOCENTE'] },
  },
  {
    path: 'crear',
    component: NotaForm,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN', 'DOCENTE'] },
  },
  {
    path: 'editar/:id',
    component: NotaForm,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN', 'DOCENTE'] },
  },
];
