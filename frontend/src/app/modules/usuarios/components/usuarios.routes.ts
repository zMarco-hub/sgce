import { Routes } from '@angular/router';
import { UsuarioListComponent } from './usuario-list/usuario-list';
import { AuthGuard } from '../../../core/guards/auth-guard';
import { RolesGuard } from '../../../core/guards/roles-guard';

import { UsuarioDetailComponent } from './usuario-detail/usuario-detail';
import { UsuarioFormComponent } from './usuario-form/usuario-form';

export const USUARIOS_ROUTES: Routes = [
  {
    path: '',
    component: UsuarioListComponent,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'crear',
    component: UsuarioFormComponent,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'editar/:id',
    component: UsuarioFormComponent,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: ':id',
    component: UsuarioDetailComponent,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN', 'DOCENTE'] },
  },
];
