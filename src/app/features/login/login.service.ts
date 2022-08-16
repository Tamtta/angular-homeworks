import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router) {}

  isLoggedIn: boolean = false;
  authUser: boolean = false;

  public loginUser(
    enteredEmail: any,
    email: any,
    eneteredPassword: any,
    password: any
  ) {
    if (enteredEmail === email && eneteredPassword === password) {
      console.log('Login successful');
      this.router.navigate(['/users']);
      this.isLoggedIn = true;
    } else {
      alert('incorrect email or password! try again 💥');
    }
  }

  // public editUserAccess(email: string) {
  //   // return this.authUser;
  //   console.log('wee');
  //   return email === localStorage.getItem('mail');
  //   // this.authUser = email === localStorage.getItem('mail');
  // }
}
