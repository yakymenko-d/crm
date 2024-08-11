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
    return this.http.get<User>(`/api/profile`);
  }

  update(userId: string, data): Observable<User> {
    console.log(userId, data);
    
    return this.http.patch<User>(`/api/profile/${userId}`, data);
  }
}
