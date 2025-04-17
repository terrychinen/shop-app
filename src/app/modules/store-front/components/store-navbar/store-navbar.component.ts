import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'store-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './store-navbar.component.html',
})
export class StoreNavbarComponent {}
