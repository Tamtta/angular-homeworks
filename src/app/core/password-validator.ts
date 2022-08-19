import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const passw = control.get('password');
  const conf = control.get('confirm');

  return passw?.value !== conf?.value ? { noMatch: true } : null;
};
