import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const passw = control.get('password');
  const confirm = control.get('confirmPassword');

  return passw?.value !== confirm?.value ? { noMatch: true } : null;
};
