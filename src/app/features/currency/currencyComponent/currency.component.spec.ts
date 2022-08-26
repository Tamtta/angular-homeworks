import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyService } from '../currency.service';

import { CurrencyComponent } from './currency.component';

describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  // let fixture: ComponentFixture<CurrencyComponent>;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyComponent],
      imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should return currency rate', () => {
  //   expect(component.get).toBeGreaterThan(0);
  // });
});
