import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
  export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  )  {
    console.log('NavbarComponent initialized'); // Додайте цей рядок
}

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onAuthAction() {
    console.log('Auth action triggered'); // Додайте цей рядок
    if (this.user) {
        this.onLogout();
    } else {
        this.onLogin();
    }
}


  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  onLogin() {
    this.router.navigate(['/auth/login']);
  }

onLogout() {
    console.log('onLogout method triggered'); // Додайте цей рядок для перевірки
    this.authService.logout();
    console.log('Token after logout:', localStorage.getItem('token')); // Перевіряємо токен
    this.router.navigate(['/auth/login']); // Перенаправляємо на сторінку входу
}


  isAuthenticated(): boolean {
    // Перевіряємо наявність токена
    return !!localStorage.getItem('token');
  }
}
