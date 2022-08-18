import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { LoginService } from '../../features/login/login.service';
import { LoginComponent } from '../../features/login/loginComponent/login.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  user = localStorage.getItem('mail');
  // url = this.router.url === '/404';

  ngOnInit(): void {}

  loggedIn() {
    return localStorage.getItem('mail');
  }

  loggedOut() {
    this.loginService.isLoggedIn = false;
    return localStorage.removeItem('mail');
  }

  salaryCheck() {
    const salary = JSON.parse(localStorage.getItem('salary')!);
    return salary > 400;
  }

  salaryUncheck() {
    return localStorage.removeItem('salary');
  }
}
