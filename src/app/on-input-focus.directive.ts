import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOnInputFocus]'
})
export class OnInputFocusDirective {

  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';

  @HostListener('focus') onFocus() {
    this.backgroundColor = '#e6f3f8';
  }

  @HostListener('blur') onBlur() {
    this.backgroundColor = 'transparent';
  }
}