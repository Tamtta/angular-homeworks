import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const passw = control.get('password');
  const conf = control.get('confirm');

  return passw?.value !== conf?.value ? { noMatch: true } : null;
};

// export const passwordValidator: any = (
//   controlName: string,
//   matchingControlName: string
// ) => {
//   return (formGroup: FormGroup) => {
//     const control = formGroup.controls['password'];
//     const matchingControl = formGroup.controls['confirm'];
//     if (
//       matchingControl.errors &&
//       !matchingControl.errors['passwordValidator']
//     ) {
//       return;
//     }
//     if (control.value !== matchingControl.value) {
//       return false;
//     } else {
//       return true;
//     }
//   };
// };
