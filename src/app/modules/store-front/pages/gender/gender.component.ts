import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

import { map } from 'rxjs';

import { ProductsService } from '@products/services/products.service';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { PaginationComponent } from '@shared/pagination/pagination.component';
import { PaginationService } from '@shared/pagination/services/pagination.service';

@Component({
  selector: 'page-gender',
  imports: [ProductCardComponent, PaginationComponent],
  template: `
    <h1 class="text-3xl font-bold">{{ gender() }}</h1>
    <h2 class="text-xl mb-5">Find your favorite product</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2 gap-3">
      @for (product of productsResource.value()?.products; track $index) {
        <product-card [product]="product" />
      }
    </div>

    <pagination-component
      [pages]="productsResource.value()?.pages ?? 0"
      [currentPage]="paginationService.currentPage()"
    />
  `,
})
export class GenderComponent {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  gender = toSignal(
    this.route.params.pipe(map(({ gender }) => gender ))
  );

  productsResource = rxResource({
    request: () => ({
      gender: this.gender(),
      page: this.paginationService.currentPage() - 1,
    }),
    loader: ({ request }) => this.productsService.getProducts({
      gender: request.gender,
      offset: request.page * 9,
    }),
  });
}
