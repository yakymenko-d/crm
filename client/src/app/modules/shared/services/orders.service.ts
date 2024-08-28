import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  create(order: Order): Observable<Order> {
    return this.http.post<Order>('http://localhost:3000/api/order', order);
  }

  fetch(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:3000/api/order', {
      params: new HttpParams({
        fromObject: params,
      }),
    });
  }
}
