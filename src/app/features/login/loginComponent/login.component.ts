import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, tap } from 'rxjs';
import { USER } from 'src/app/features/register/user.interface';
import { RegisterService } from 'src/app/features/register/register.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  public users: USER[] = [];
  public usersSubject: BehaviorSubject<USER[]> = new BehaviorSubject(
    <USER[]>[]
  );
  constructor(
    private registerService: RegisterService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.getUsers();
  }

  public getUsers() {
    this.registerService
      .getUsersService()
      .pipe(tap((response) => this.usersSubject.next((this.users = response))))
      .subscribe((res) => console.log(res));
  }

  public validateUser(): any {
    const that = this;
    const index = this.users.findIndex(
      (p) => p.email == this.loginForm.value.email
    );
    const user = this.users[index];

    this.loginService.loginUser(
      this.loginForm.value.email,
      user.email,
      this.loginForm.value.password,
      user.password
    );

    if (
      this.loginForm.value.email === user.email &&
      this.loginForm.value.password === user.password
    ) {
      localStorage.setItem('mail', user.email);
      localStorage.setItem('salary', JSON.stringify(user.salary));
      console.log(localStorage);
    }
  }

  public cancel() {
    this.loginForm.reset();
  }
}
