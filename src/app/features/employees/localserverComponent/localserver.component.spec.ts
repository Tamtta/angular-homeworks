import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalserverComponent } from './localserver.component';

describe('LocalserverComponent', () => {
  let component: LocalserverComponent;
  let fixture: ComponentFixture<LocalserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalserverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
