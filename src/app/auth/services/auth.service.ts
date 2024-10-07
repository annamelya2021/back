import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://back-git-main-annas-projects-8c717413.vercel.app/data/db.json';
  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

login(email: string, password: string): Observable<User | null> {
  return this.http.get<{ users: User[] }>(this.baseUrl).pipe(
    tap(response => console.log('Users fetched from API:', response)),
    map(response => response.users.find(user => user.email === email) || null), // Змінено на find
    tap(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('token', 'aASDgjhasda.asdasd.aadsf123k');
        localStorage.setItem('user', JSON.stringify(user)); // Тепер тут буде роль
        console.log('User saved to localStorage:', user);
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


  checkAuthentication(): Observable<boolean> {
    const token = localStorage.getItem('token');
    console.log('Checking authentication, token found:', token);

    if (!token) {
      console.log('No token found, user is not authenticated.');
      return of(false);
    }

  const storedUser = localStorage.getItem('user');
if (storedUser) {
  const parsedUser = JSON.parse(storedUser);
  console.log('Stored user found:', parsedUser); // Логуємо користувача
  console.log('User role:', parsedUser.rol); // Логуємо роль користувача
} else {
  console.log('No user found in localStorage.');
}

    console.log('No stored user found, making API call to verify authentication.');
    return this.http.get<{ users: User[] }>(this.baseUrl).pipe(
      tap(response => {
        console.log('Users fetched from API for authentication:', response);
        const foundUser = response.users.find(u => u.email === this.user?.email);
        if (foundUser) {
          this.user = foundUser;
        }
      }),
      map(user => !!user),
      catchError(err => {
        console.error('Error during authentication check:', err);
        return of(false);
      })
    );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}
