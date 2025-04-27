import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '@products/models/responses/product-response.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card card-compact bg-base-100 shadow-xl animate-fadeIn">
      <figure>
        <img [src]="product().images | productImage" [alt]="product().title" />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-accent text-lg hover:underline cursor-pointer" [routerLink]="['/product', product().slug]">
          {{ product().title }}
        </h2>
        <p>{{ product().description | slice: 0:70 }}...</p>
        <div class="card-actions justify-end">
          <a class="link link-accent" [routerLink]="['/product', product().slug]">View</a>
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  product = input.required<Product>();
}
