import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[plateInput]'
})
export class PlateInputDirective {
  private regex: RegExp = /^[A-Z]{0,3}-?\d{0,4}$/; // Regex para validar durante a digitação

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.toUpperCase(); // Força letras maiúsculas

    // Remove caracteres não permitidos
    value = value.replace(/[^A-Z0-9-]/g, '');

    // Aplica o formato progressivamente com base na regex
    if (!this.regex.test(value)) {
      value = value.replace(/[^A-Z0-9]/g, ''); // Remove caracteres inválidos
    }

    // Formata automaticamente, adicionando o hífen após 3 letras
    if (value.length > 3 && value[3] !== '-') {
      value = value.slice(0, 3) + '-' + value.slice(3);
    }

    // Limita o comprimento a 8 caracteres
    input.value = value.slice(0, 8);
  }
}
