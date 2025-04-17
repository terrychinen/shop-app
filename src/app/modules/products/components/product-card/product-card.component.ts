import { SlicePipe } from '@angular/common';
import { Component, computed, input } from "@angular/core";
import { RouterLink } from '@angular/router';
import { Product } from '@products/models/responses/product.response.interface';

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe],
  template: `
    <div class="card card-compact bg-base-100 shadow-xl animate-fadeIn">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          [alt]="product().title" />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-accent text-lg">{{ product().title }}</h2>
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

  imgeUrl = computed(() => {
    return ''
  });
}
