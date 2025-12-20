import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, Sidebar],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout implements OnInit {
  isLoginPage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Verifica si la ruta actual es la de login
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url.includes('/login');
    });
  }
}
