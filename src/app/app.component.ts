import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { USER } from './interface';
import { passwordValidator } from './password-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-homeworks';

  formGroup = new FormGroup<any>('');

  users: USER[] = [];

  passwordConfirmation: boolean = true;
  editUserClicked: boolean = false;
  isReseted: boolean = false;
  isUpdated: boolean = false;
  userMail: string = '';
  reUsableID: string = '';

  btnUpdate = document.getElementById(
    'buttonUpdate'
  ) as HTMLButtonElement | null;
  btnRegister = document.getElementById(
    'buttonRegister'
  ) as HTMLButtonElement | null;

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

  public onClick(): USER[] {
    let userInfo = {
      id: `${Math.random().toString(36).substring(3, 11)}`,
      email: this.formGroup.value.email,
      password: this.formGroup.value.password,
      confirm: this.formGroup.value.confirm,
      nickname: this.formGroup.value.nickname,
      phoneNumber: this.formGroup.value.phoneNumber,
      website: this.formGroup.value.website,
      agreement: this.formGroup.value.agreement,
    };

    this.users.push(userInfo);

    console.log(this.users);
    this.formGroup.reset();

    return [...this.users];
  }

  public editUser(id: string) {
    this.reUsableID = id;
    const index = this.users.findIndex((p) => p.id == id);
    const user = this.users[index];
    this.formGroup.setValue({
      email: user.email,
      password: '',
      confirm: '',
      nickname: user.nickname,
      phoneNumber: user.phoneNumber,
      website: user.website,
      agreement: true,
    });

    if (user.agreement) {
      this.formGroup.controls['agreement'].disable();
    }
    this.editUserClicked = true;
    if (this.formGroup.valid && this.editUserClicked) {
      this.btnRegister?.setAttribute('disabled', '');
      this.btnUpdate?.removeAttribute('disabled');
    }
    // this.editUserClicked = false;

    return this.formGroup;
  }

  public updateUser(): USER[] {
    let userInfoUpdated = {
      id: this.reUsableID,
      email: this.formGroup.value.email,
      password: this.formGroup.value.password,
      confirm: this.formGroup.value.confirm,
      nickname: this.formGroup.value.nickname,
      phoneNumber: this.formGroup.value.phoneNumber,
      website: this.formGroup.value.website,
      agreement: this.formGroup.value.agreement,
    };

    const index = this.users.findIndex((p) => p.id == this.reUsableID);
    const user = this.users[index];
    if (
      userInfoUpdated.password === user.password &&
      userInfoUpdated.confirm === user.confirm
    ) {
      this.users = this.users.filter((p) => p.id != this.reUsableID);
      this.users.push(userInfoUpdated);
      console.log(this.users);
      this.formGroup.reset();
      this.isUpdated = true;
      if (this.isUpdated) {
        this.btnRegister?.removeAttribute('disabled');
      }
    } else {
      this.passwordConfirmation = false;
    }
    if (!user.agreement) {
      this.formGroup.controls['agreement'].enable();
    }
    this.isUpdated = false;
    return [...this.users];
  }

  public cancel(): void {
    this.formGroup.reset();
    this.isReseted = true;
    if (this.isReseted) {
      this.btnRegister?.removeAttribute('disabled');
    }
    this.formGroup.controls['agreement'].enable();
  }

  public removeUser(id: string): void {
    const index = this.users.findIndex((p) => p.id == id);
    if (
      confirm(
        `This action will remove a user with this email: ${(this.userMail =
          this.users[index].email)}. Are you sure? `
      )
    ) {
      console.log('confirmed');
      this.users = this.users.filter((p) => p.id != id);
    }
  }
}
