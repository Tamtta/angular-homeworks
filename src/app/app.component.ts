import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-homeworks';
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.router.url, this.urlCheck());
  }

  urlCheck() {
    return this.router.url == '/404';
  }
}
