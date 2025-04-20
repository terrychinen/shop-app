import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pagination-component',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="join flex justify-center items-center mt-4 mb-10">
      @for (page of getPages(); track $index) {
        <button
        class="join-item btn"
        [class.btn-primary]="page === activaPage()"
        [routerLink]="[]"
        [queryParams]="{ page }"
        (click)="activaPage.set(page)">
        {{ page }}
      </button>
      }

      @empty {

      }
    </div>
  `,
})
export class PaginationComponent {
  pages = input(0);
  currentPage = input(1);

  getPages = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });

  activaPage = linkedSignal(this.currentPage);
}
