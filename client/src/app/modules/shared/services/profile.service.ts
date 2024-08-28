import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/api/profile`);
  }

  update(userId: string, data: Partial<User>): Observable<User> {
    return this.http.patch<User>(`http://localhost:3000/api/profile/${userId}`, data);
  }
}
