import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://localhost:7150'; // Backend URL

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  getMe(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`, this.getAuthHeaders());
  }

  getCatalog(): Observable<any> {
    return this.http.get(`${this.baseUrl}/catalog/items`, this.getAuthHeaders());
  }

  placeOrder(items: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders/place`, { items }, this.getAuthHeaders());
  }
  getOrders(): Observable<any> {
  return this.http.get(`${this.baseUrl}/orders/history`, this.getAuthHeaders());
}


  pay(orderId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/payments/pay`, { orderId }, this.getAuthHeaders());
  }
register(email: string, password: string) {
  return this.http.post(`${this.baseUrl}/register`, { email, password });
}

  private getAuthHeaders() {
    const token = localStorage.getItem('token') || '';
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
  }
}
