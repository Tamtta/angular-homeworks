import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CurrencyGuard } from './currency.guard';

describe('CurrencyGuard', () => {
  let guard: CurrencyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(CurrencyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
