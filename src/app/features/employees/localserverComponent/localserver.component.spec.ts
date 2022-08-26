import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { LocalserverComponent } from './localserver.component';

describe('LocalserverComponent', () => {
  let component: LocalserverComponent;
  let fixture: ComponentFixture<LocalserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalserverComponent],
      imports: [RouterTestingModule, HttpClientModule, NgxPaginationModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LocalserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
