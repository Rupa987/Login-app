import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl =
    'https://dev.myemprove.com/api/ver3api/student-login?lang=en&store=KW';

  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    const payload = {
      email,
      password,
      device_type: 'W',
      device_token: '',
      device_model: '',
      app_version: '',
      os_version: '',
      phone_code: '965',
    };

    return this.http.post<any>(this.apiUrl, payload).pipe(
      tap((res) => {
        if (res.success) {
          console.log('Login successful! Saving token...');
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.data));
          this.authStatus.next(true);
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Login failed:', res);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }
}
