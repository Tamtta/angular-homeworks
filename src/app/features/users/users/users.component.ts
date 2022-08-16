import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, tap } from 'rxjs';
import { USER } from '../../register/user.interface';
import { passwordValidator } from '../../../core/password-validator';
import { RegisterService } from '../../register/register.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  registerForm!: FormGroup;
  public users: USER[] = [];
  userID!: number;
  editBtnClicked: boolean = false;
  public authUser = localStorage.getItem('mail');
  public authUserS = JSON.parse(localStorage.getItem('salary')!);
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

    this.getUsers();
  }

  public getUsers() {
    this.registerService
      .getUsersService()
      .pipe(tap((response) => this.usersSubject.next((this.users = response))))
      .subscribe();
  }

  public getUser(id: number) {
    this.registerService
      .getUserService(id)
      .pipe(
        tap((response) => this.usersSubject.next((this.userID = response.id)))
      )
      .subscribe((res) =>
        this.registerForm.setValue({
          email: res.email,
          password: '',
          confirm: '',
          nickname: res.nickname,
          phoneNumber: res.phoneNumber,
          salary: res.salary,
          website: res.website,
          agreement: true,
        })
      );
    this.editBtnClicked = true;
    this.registerForm.controls['agreement'].disable();
  }

  public updateUser() {
    let update = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirm: this.registerForm.value.confirm,
      nickname: this.registerForm.value.nickname,
      phoneNumber: this.registerForm.value.phoneNumber,
      salary: this.registerForm.value.salary,
      website: this.registerForm.value.website,
      agreement: this.registerForm.value.agreement,
    };
    const index = this.users.findIndex((p) => p.id == this.userID);
    const user = this.users[index];
    this.registerService
      .updateUserService(this.userID, update)
      .subscribe(
        (res) => (
          (user.email = res.email),
          (user.password = res.password),
          (user.confirm = res.confirm),
          (user.nickname = res.nickname),
          (user.phoneNumber = res.phoneNumber),
          (user.salary = res.salary),
          (user.website = res.website),
          (user.agreement = res.agreement),
          localStorage.setItem('salary', JSON.stringify(res.salary)),
          localStorage.setItem('mail', res.email),
          this.registerForm.reset(),
          console.log(localStorage)
        )
      );
    this.editBtnClicked = false;
  }

  public cancel() {
    this.registerForm.reset();
    this.editBtnClicked = false;
  }

  public deleteUser(id: number) {
    this.registerService
      .deleteUserService(id)
      .subscribe(
        () => (
          confirm(
            `This action will remove a user with this id: ${id}. Are you sure? `
          ),
          (this.users = this.users.filter((p) => p.id != id))
        )
      );
  }
}
