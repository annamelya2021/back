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
          this.router.navigate(['/weather']);
          return false;
        }
        return true;
      })
    );
  }
}
