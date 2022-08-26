import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthUserGuard } from './auth-user.guard';

describe('AuthUserGuard', () => {
  let guard: AuthUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(AuthUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
