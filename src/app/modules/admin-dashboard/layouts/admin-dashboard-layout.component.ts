import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'admin-dashboard-layout',
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AdminDashboardLayoutComponent {}
