import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgClass } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { register } from 'swiper/element/bundle';
import { RouterLink } from '@angular/router';
import { RoutePath } from '../../interfaces/route-path';
register();

@Component({
  selector: 'cr-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
  imports: [IonContent, IonIcon, NgClass, ButtonComponent, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OnboardingComponent implements AfterViewInit {
  title = 'Welcome to the Crypto App';

  Route = RoutePath

  carousels = [
    {
      b: 'Access Top Assets',
      p: 'Unlock the potential: Access top assets and love crypto journey from the start',
      icon: '/assets/icons/black-wallet.svg',
    },
    {
      b: 'Trade Bitcoin',
      p: 'Dive into bitcoin trading where innovation meets opportunity',
      icon: '/assets/icons/coin-lg.svg',
    },
    {
      b: 'Smart Contracts',
      p: 'In RIZO trust is coded, and agreements execute automatically',
      icon: '/assets/icons/smart-contract.svg',
    },
  ];

  currentIndex = 0;

  @ViewChild('swiperRef', { static: false }) swiperRef!: ElementRef;

  get currentCarousel() {
    return this.carousels[this.currentIndex];
  }

  get isLastSlide() {
    return this.currentIndex === this.carousels.length - 1;
  }

  next() {
    if (this.currentIndex < this.carousels.length - 1) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  constructor() {}

  ngAfterViewInit() {
    if (this.swiperRef?.nativeElement) {
      const swiperEl = this.swiperRef.nativeElement;
      const params = {
        speed: 400,
        spaceBetween: 24,
        on: {
          slideChange: () => {
            console.log('Slide changed');
            const swiper = swiperEl.swiper;
            if (swiper && typeof swiper.activeIndex === 'number') {
              this.currentIndex = swiper.activeIndex;
            }
          },
        },
      };
      Object.assign(swiperEl, params);
      swiperEl.initialize();
    }
  }

  goToSlide(idx: number) {
    const swiperEl = this.swiperRef?.nativeElement;
    if (swiperEl && swiperEl.swiper) {
      swiperEl.swiper.slideTo(idx);
      this.currentIndex = idx;
    }
  }
}
