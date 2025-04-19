import { Component, ChangeDetectionStrategy, input, viewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .swiper {
      width: 100%;
      height: 500px;
    };
  `,
  template: `
    <div class="swiper" #swiperDiv>
      <div class="swiper-wrapper">
        @for (image of images(); track $index) {
          <div class="swiper-slide">
            <img [src]="image | productImage" alt="product" class="w-full object-cover">
          </div>
        }
      </div>

      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-scrollbar"></div>
    </div>
  `,
})
export class ProductCarouselComponent implements AfterViewInit {
  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  ngAfterViewInit(): void {
    const element = this.swiperDiv().nativeElement;
    if (!element) return;
    
    const swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      modules: [
        Navigation, Pagination
      ],
    
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });    
  }
}
