import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Settings } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient) {}

  getSettings(): Observable<Settings> {
    return this.http.get<Settings>(`http://localhost:3000/api/settings`);
  }

  create(settings: Partial<Settings>): Observable<Settings> {
    return this.http.post<Settings>('http://localhost:3000/api/settings', settings);
  }

  update(data: Partial<Settings>): Observable<Settings> {
    console.log(data);
    
    return this.http.patch<Settings>(`http://localhost:3000/api/settings/${data._id}`, data);
  }
}