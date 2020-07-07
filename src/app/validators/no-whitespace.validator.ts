import { AbstractControl } from '@angular/forms';

/**
 *  Ошибка если значение состоит только из пробелов
 */
export function NoWhitespaceValidator(control: AbstractControl) {
  const isValid = !!(control.value || '').toString().trim().length;
  return isValid ? null : { whitespace: true };
}
