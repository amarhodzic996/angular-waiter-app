import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSuccessfulPost]',
})
export class SuccessfulPostDirective {
  constructor(private el: ElementRef) {
    setTimeout(() => {
      this.el.nativeElement.style.display = 'none';
      this.el.nativeElement.style.transition = '1s';
    }, 5000);
  }
}
