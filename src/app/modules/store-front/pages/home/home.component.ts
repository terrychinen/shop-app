import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponent } from '@shared/pagination/pagination.component';
import { PaginationService } from '@shared/pagination/services/pagination.service';

@Component({
  selector: 'page-home',
  imports: [
    ProductCardComponent,
    PaginationComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="text-3xl font-bold">All products {{ currentPage() }}</h1>
    <h2 class="text-xl mb-5">Find your favorite product</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2 gap-3">
      @for (product of productsResource.value()?.products; track $index) {
        <product-card [product]="product" />
      }

      @empty {
        <p>There are no products</p>
      }
    </div>

    <pagination-component
      [pages]="productsResource.value()?.pages ?? 0"
      [currentPage]="currentPage()"
    />
  `,
})
export class HomeComponent {
  private _productsService = inject(ProductsService);
  private _paginationService = inject(PaginationService);

  currentPage = this._paginationService.currentPage;

  productsResource = rxResource({
    request: () => ({ page: this.currentPage() - 1 }),
    loader: ({ request }) => {
      return this._productsService.getProducts({
        offset: request.page * 9,
      });
    },
  });
}
