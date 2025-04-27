import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'sign-in-page',
  imports: [RouterLink, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="flex flex-col gap-2" [formGroup]="form" (ngSubmit)="onSubmit()">
      <input type="text" placeholder="Email" class="input" formControlName="email" />
      <input type="password" placeholder="password" class="input" formControlName="password" />

      <button type="submit" class="btn btn-secondary">Login</button>

      <p class="text-slate-700">
        Create your account
        <a routerLink="/auth/sign-up" class="text-secondary">here</a>
      </p>
    </form>

    @if (hasError()) {
      <div role="alert" class="alert alert-error fixed top-5 right-5 w-60">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>User account has error!</span>
      </div>
    }
  `,
})
export class SignInComponent {
  formBuilder = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  hasError = signal(false);
  isPosting = signal(false);

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 2000);
      return;
    }

    const { email, password } = this.form.value;

    this.auth.signIn(email!, password!).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 2000);
    });
  }
}
