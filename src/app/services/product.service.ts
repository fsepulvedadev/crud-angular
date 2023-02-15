import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3004/';
    this.myApiUrl = 'api/productos/';
  }

  getListProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl);
  }

  getProduct(id: number | undefined): Observable<Product> {
    return this.http.get<Product>(this.myAppUrl + this.myApiUrl + id);
  }
  deleteProduct(id: number | undefined): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.myAppUrl + this.myApiUrl, product);
  }

  updateProduct(id: number | undefined, product: Product): Observable<Product> {
    return this.http.put<Product>(this.myAppUrl + this.myApiUrl + id, product);
  }
}
