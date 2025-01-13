import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[plateInput]'
})
export class PlateInputDirective {
  private regex: RegExp = /^[A-Z]{0,3}-?\d{0,4}$/;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.toUpperCase();

    value = value.replace(/[^A-Z0-9-]/g, '');

    if (!this.regex.test(value)) {
      value = value.replace(/[^A-Z0-9]/g, '');
    }

    if (value.length > 3 && value[3] !== '-') {
      value = value.slice(0, 3) + '-' + value.slice(3);
    }

    input.value = value.slice(0, 8);
  }
}
