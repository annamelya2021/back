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
}

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onAuthAction() {
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
    this.authService.logout();
    this.router.navigate(['/auth/login']);
}


  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
