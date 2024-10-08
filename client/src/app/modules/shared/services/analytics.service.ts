import { AnalyticsPage, OverviewPage } from '../interfaces';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getOverview(): Observable<OverviewPage> {
    return this.http.get<OverviewPage>('http://localhost:3000/api/analytics/overview');
  }

  getAnalytics(): Observable<AnalyticsPage> {
    return this.http.get<AnalyticsPage>('http://localhost:3000/api/analytics/analytics');
  }
}
