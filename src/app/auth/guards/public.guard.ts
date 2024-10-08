import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          // Якщо користувач авторизований, перенаправляємо на головну сторінку
          this.router.navigate(['/weather']); // Або інший маршрут
          return false; // Забороняємо доступ до маршруту
        }
        return true; // Дозволяємо доступ до маршруту
      })
    );
  }
}
