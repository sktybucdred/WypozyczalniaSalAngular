import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[zmienKolor]',
  standalone: true,
})
export class ZmienKolorDyrektywa {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      '#e0e0e0' // Light gray color when hovered
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      'transparent'
    );
  }
}