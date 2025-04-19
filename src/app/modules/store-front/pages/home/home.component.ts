import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'page-home',
  imports: [
    ProductCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="text-3xl font-bold">All products</h1>
    <h2 class="text-xl mb-5">Find your favorite product</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2 gap-3">
      @for (product of productsResource.value()?.products; track $index) {
        <product-card [product]="product" />
      }
    </div>
  `,
})
export class HomeComponent {
  private _productsService = inject(ProductsService);

  productsResource = rxResource({
    request: () => ({}),
    loader: ({ request }) => {
      return this._productsService.getProducts({});
    },
  });
}
