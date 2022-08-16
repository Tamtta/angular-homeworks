import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  count = this.service.getData();

  constructor(private service: TestService) {}

  ngOnInit(): void {}

  onClickIncrease() {
    this.service.increaseCount();
  }

  onClickDecrease() {
    this.service.decreaseCount();
  }
}
