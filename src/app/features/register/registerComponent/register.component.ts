import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { USER } from '../user.interface';
import { passwordValidator } from '../../../core/password-validator';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  public users: USER[] = [];
  public usersSubject: BehaviorSubject<USER[]> = new BehaviorSubject(
    <USER[]>[]
  );

  constructor(private registerService: RegisterService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup<any>(
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
        salary: new FormControl('', Validators.required),
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

  public addUser() {
    this.registerService
      .addUserService({
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        confirm: this.registerForm.value.confirm,
        nickname: this.registerForm.value.nickname,
        phoneNumber: this.registerForm.value.phoneNumber,
        salary: this.registerForm.value.salary,
        website: this.registerForm.value.website,
        agreement: this.registerForm.value.agreement,
      })
      .subscribe((res) => {
        this.users.push(res);
        this.registerForm.reset();
        console.log(res);
      });
  }
}
