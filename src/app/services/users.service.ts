import { HttpClient } from '@angular/common/http';
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

  constructor(private httpClient: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(
      `${environment.apiUrl}${this.endpoint}/me`
    );
  }
}
