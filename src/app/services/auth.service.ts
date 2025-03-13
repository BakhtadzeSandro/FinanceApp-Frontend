import { Injectable } from '@angular/core';
import { LoginPayload, RegisterPayload } from '../pages/auth/auth.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = 'auth';

  constructor(private httpClient: HttpClient, private router: Router) {}

  registerUser(payload: RegisterPayload) {
    return this.httpClient.post(
      `${environment.apiUrl}${this.endpoint}/register`,
      payload
    );
  }

  login(payload: LoginPayload): Observable<Record<string, string>> {
    return this.httpClient.post<Record<string, string>>(
      `${environment.apiUrl}${this.endpoint}/login`,
      payload
    );
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(
      `${environment.apiUrl}${this.endpoint}/me`
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth']);
  }
}
