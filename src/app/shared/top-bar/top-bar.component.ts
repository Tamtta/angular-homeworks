import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../features/login/login.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  user = localStorage.getItem('mail');

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
