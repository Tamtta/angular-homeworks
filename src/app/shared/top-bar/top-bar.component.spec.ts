import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture;
  // let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopBarComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user data from localStorage', () => {
    expect(component.loggedIn).toBeTruthy();
  });

  it('should remove user data from localStorage', () => {
    expect(component.loggedOut).toBeTruthy();
    // expect(component.loggedOut).toBeTruthy();
  });

  it('should check salary from localStorage', () => {
    expect(component.salaryCheck).not.toBeNull();
  });

  it('should remove salary from localStorage', () => {
    expect(component.salaryUncheck).toBeTruthy();
  });
});
