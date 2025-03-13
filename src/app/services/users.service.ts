import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private endpoint = 'users';

  constructor(private httpClient: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(
      `${environment.apiUrl}${this.endpoint}/me`
    );
  }
}
