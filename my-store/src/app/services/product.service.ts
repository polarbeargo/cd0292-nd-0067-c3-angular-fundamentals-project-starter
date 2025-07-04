// filepath: /src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/interface';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private dataUrl = '../assets/data.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl).pipe(
      map((products) => {
        return products.map((product) => ({
          ...product,
          quantity: 1,
        }));
      }),
      catchError((error) => {
        console.error('Error fetching products', error);
        return throwError(error);
      }),
    );
  }
}
