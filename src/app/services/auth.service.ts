import { Injectable } from '@angular/core';
import { LoginPayload, RegisterPayload } from '../pages/auth/auth.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = 'auth';

  constructor(private httpClient: HttpClient) {}

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
}
