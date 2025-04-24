import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sign-in-page',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="input">
      <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input type="search" class="grow" placeholder="Search" />
      <kbd class="kbd kbd-sm">⌘</kbd>
      <kbd class="kbd kbd-sm">K</kbd>
    </label>
    <label class="input">
      <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2.5"
          fill="none"
          stroke="currentColor"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
        </g>
      </svg>
      <input type="text" class="grow" placeholder="index.php" />
    </label>
    <label class="input">
      Path
      <input type="text" class="grow" placeholder="src/app/" />
      <span class="badge badge-neutral badge-xs">Optional</span>
    </label>
  `,
})
export class SignInComponent {}
