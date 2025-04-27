import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable, of, tap } from 'rxjs';

import { Product, ProductResponse } from '@products/models/responses/product-response.interface';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private _http = inject(HttpClient);

  private _productsCache = new Map<string, ProductResponse>();
  private _productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductResponse> {
    const { limit = 10, offset = 0, gender = '' } = options;
    const key = `${limit}-${offset}-${gender}`;

    if (this._productsCache.has(key)) return of(this._productsCache.get(key)!);

    return this._http.get<ProductResponse>(`${baseUrl}/products`, {
      params: { limit, offset, gender },
    }).pipe(
      tap(res => this._productsCache.set(key, res)),
    );
  }

  getProductsBySlugId(slugId: string): Observable<Product> {
    if (this._productCache.has(slugId)) return of(this._productCache.get(slugId)!);

    return this._http.get<Product>(`${baseUrl}/products/${slugId}`)
      .pipe(
        tap(res => this._productCache.set(slugId, res)),
      );
  }
}
