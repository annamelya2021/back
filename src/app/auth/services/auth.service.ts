import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'https://back-git-main-annas-projects-8c717413.vercel.app/data/db.json';
  private user?: User;


  private static readonly adminToken = 'admin-token-example';
  private static readonly userToken = 'user-token-example';

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    return this.user ? structuredClone(this.user) : undefined;
  }

  login(email: string, password: string): Observable<User | null> {
    return this.http.get<{ users: User[] }>(this.baseUrl).pipe(
      map(response => response.users.find(user => user.email === email) || null),
      tap(user => {
        if (user) {
          this.user = user;
          const token = user.rol === 1 ? AuthService.adminToken : AuthService.userToken;
          localStorage.setItem('token', token);
          localStorage.setItem('rol', JSON.stringify(user.rol));
        } else {
          console.log('No user found with email:', email);
        }
      }),
      catchError(err => {
        console.error('Error during login request:', err);
        return of(null);
      })
    );
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('rol');
    return role !== null && JSON.parse(role) === 1;
  }

  checkAuthentication(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return of(!!token);
  }

 logout(): void {
  this.user = undefined;
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
}

}
