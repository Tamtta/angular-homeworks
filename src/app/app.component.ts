import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from './password-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-homeworks';

  formGroup = new FormGroup<any>('');

  constructor() {}

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(7),
          Validators.pattern('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(7),
          Validators.pattern('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'),
        ]),
        nickname: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        website: new FormControl('', Validators.required),
        agreement: new FormControl('', Validators.required),
      },
      { validators: passwordValidator }
    );
  }

  public onClick(): void {
    console.log(this.formGroup);
  }
}
