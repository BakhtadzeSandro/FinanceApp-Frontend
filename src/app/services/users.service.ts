import { HttpClient, HttpParams, httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private endpoint = 'users';

  currentUser = signal<User | undefined>(undefined);
  enteredOldPassword = signal<string | undefined>(undefined);

  constructor(private httpClient: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(
      `${environment.apiUrl}${this.endpoint}/me`
    );
  }

  checkPassword(payload: { password: string }): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${environment.apiUrl}${this.endpoint}/check-password`,
      payload
    );
  }

  updatePassword(payload: { newPassword: string }, userId: string) {
    return this.httpClient.patch(
      `${environment.apiUrl}${this.endpoint}/${userId}`,
      payload
    );
  }

  updateUser(payload: { userInfo: Partial<User> }, userId: string) {
    return this.httpClient.patch(
      `${environment.apiUrl}${this.endpoint}/${userId}`,
      payload
    );
  }

  checkIfUserExists(field: string, value: string): Observable<boolean> {
    const params = new HttpParams().set('field', field).set('value', value);
    return this.httpClient.get<boolean>(
      `${environment.apiUrl}${this.endpoint}/check-user`,
      {
        params,
      }
    );
  }
}
