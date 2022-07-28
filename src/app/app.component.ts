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

  users: {
    email: string;
    nickname: string;
    phoneNumber: string;
    website: string;
  }[] = [];

  constructor() {}

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/),
        ]),
        confirm: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/),
        ]),
        nickname: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9-]+$/),
        ]),
        phoneNumber: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^\+?([995]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/
          ),
        ]),
        website: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
          ),
        ]),
        agreement: new FormControl('', Validators.required),
      },
      { validators: passwordValidator }
    );
  }

  public onClick() {
    let userInfo = {
      email: this.formGroup.value.email,
      nickname: this.formGroup.value.nickname,
      phoneNumber: this.formGroup.value.phoneNumber,
      website: this.formGroup.value.website,
    };

    this.users.push(userInfo);

    console.log(this.users);
    this.formGroup.reset();

    return [...this.users];
  }

  public updateUser() {}

  public removeUser() {}
}
