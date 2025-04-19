import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'page-gender',
  imports: [],
  template: `
    <h1>{{ gender() }}</h1>
  `,
})
export class GenderComponent {
  route = inject(ActivatedRoute);
  gender = toSignal(
    this.route.params.pipe(map(({ gender }) => gender ))
  );
}
