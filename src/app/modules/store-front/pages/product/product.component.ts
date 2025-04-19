import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductCarouselComponent } from '@products/components/product-carousel/product-carousel.component';
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'page-product',
  imports: [RouterModule, ProductCarouselComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (productResource.isLoading()) {
      <div class="flex justify-center items-center h-screen">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
    }

    @if (productResource.hasValue()) {
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <product-carousel [images]="productResource.value().images" />
        <div>
          <h2 class="text-2xl font-bold">
            {{ productResource.value().title }}
          </h2>
          <div class="divider"></div>

          <p>
            {{ productResource.value().description }}
          </p>
        </div>
      </div>
    }
  `,
})
export class ProductComponent {
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);

  productSlugId = this.activatedRoute.snapshot.params['slugId'];

  productResource = rxResource({
    request: () => ({ slugId: this.productSlugId }),
    loader: ({ request }) => {
      return this.productService.getProductsBySlugId(request.slugId);
    },
  });
}
