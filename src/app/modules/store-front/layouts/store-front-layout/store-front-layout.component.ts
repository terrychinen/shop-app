import { Component } from "@angular/core";
import { RouterOutlet } from '@angular/router';

import { StoreNavbarComponent } from '../../components/store-navbar/store-navbar.component';

@Component({
  selector: 'layout-store-front',
  imports: [RouterOutlet, StoreNavbarComponent],
  template: `
    <store-navbar />
    <section class="container mx-auto">
      <router-outlet />
    </section>
  `,
})
export class StoreFrontLayoutComponent {}
