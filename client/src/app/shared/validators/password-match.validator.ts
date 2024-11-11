import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(
  passwordControlName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) return null;

    const parent = control.parent;
    const password = parent.get(passwordControlName)?.value;
    const confirmPassword = control.value;

    return password !== confirmPassword ? { passwordMismatch: true } : null;
  };
}
