import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOnInputFocus]'
})
export class OnInputFocusDirective {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('focus') onFocus() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', '#e6f3f8');
  }

  @HostListener('blur') onBlur() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
  }
}
