import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-usuario-list',
  imports: [],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css',
})
export class UsuarioListComponent implements OnInit {
  usuarioService = inject(UsuarioService);
  private router = inject(Router);

  ngOnInit() {
    this.usuarioService.cargarUsuarios();
  }

  navegarACrear() {
    this.router.navigate(['/usuarios/crear']);
  }

  verDetalle(id: number) {
    this.router.navigate(['/usuarios', id]);
  }

  editarUsuario(id: number) {
    this.router.navigate(['/usuarios/editar', id]);
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => {
          this.usuarioService.cargarUsuarios();
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
        },
      });
    }
  }
}
