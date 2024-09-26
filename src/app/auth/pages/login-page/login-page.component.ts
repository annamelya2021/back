import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: []
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';  // Для демонстрації, але пароль не використовується

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin(): void {
    if (!this.email || !this.password) {
      console.error('Email and password are required');
      return;
    }

    this.authService.login(this.email, this.password)
      .subscribe(user => {
        if (user) {
          this.router.navigate(['/countries/by-capital']);
        } else {
          console.error('Invalid email or password');
        }
      });
  }
}
