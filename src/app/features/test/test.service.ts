import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private count = new BehaviorSubject<number>(0);

  constructor() {}

  getData(): BehaviorSubject<number> {
    return this.count;
  }

  increaseCount(): void {
    this.count.next(this.count.getValue() + 1);
  }

  decreaseCount(): void {
    this.count.next(this.count.getValue() - 1);
  }
}
