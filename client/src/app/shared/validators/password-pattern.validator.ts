import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isStrongPassword } from 'validator';

export function passwordPatternValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    if (!password) return null;

    return !isStrongPassword(password)
      ? { passwordPatternMismatch: true }
      : null;
  };
}
