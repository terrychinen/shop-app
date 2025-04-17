import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { ProductResponse } from '@products/models/responses/product.response.interface';
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

  getProducts(options: Options): Observable<ProductResponse> {
    const { limit = 10, offset = 0, gender = '' } = options;
    return this._http.get<ProductResponse>(`${baseUrl}/products`, {
      params: { limit, offset, gender },
    }).pipe(tap(res => console.log(res)));
  }

  getProductImg(imageName: string): Observable<string> {
    return this._http.get<string>(`${baseUrl}/product/${imageName}`);
  }
}
