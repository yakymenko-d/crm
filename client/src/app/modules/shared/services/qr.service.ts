import { Message, QrCode } from '../interfaces';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QRService {
  constructor(private http: HttpClient) {}

  getAllQrCodes(): Observable<QrCode[]> {
    return this.http.get<QrCode[]>(`http://localhost:3000/api/qr`);
  }

  addNewQrCodes(qrCodes: QrCode[]): Observable<QrCode[]> {
    return this.http.post<QrCode[]>(`http://localhost:3000/api/qr`, qrCodes);
  }

  deleteQR(qrCode: QrCode): Observable<Message> {
    return this.http.delete<Message>(`http://localhost:3000/api/qr/${qrCode._id}`);
  }
}
