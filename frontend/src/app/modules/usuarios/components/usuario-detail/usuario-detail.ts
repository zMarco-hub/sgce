import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-usuario-detail',
  imports: [],
  templateUrl: './usuario-detail.html',
  styleUrl: './usuario-detail.css',
})
export class UsuarioDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  usuarioService = inject(UsuarioService);

  usuario = signal<Usuario | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarUsuario(+id);
    }
  }

  cargarUsuario(id: number) {
    this.usuarioService.obtenerUsuarioPorId(id).subscribe({
      next: (usuario) => {
        this.usuario.set(usuario);
      },
      error: (error) => {
        console.error('Error al cargar usuario:', error);
      },
    });
  }

  editarUsuario() {
    this.router.navigate(['/usuarios/editar', this.usuario()?.id]);
  }

  eliminarUsuario() {
    if (this.usuario() && confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(this.usuario()!.id).subscribe({
        next: () => {
          this.router.navigate(['/usuarios']);
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
        },
      });
    }
  }

  volverALista() {
    this.router.navigate(['/usuarios']);
  }
}
