import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cs390wapComponent } from './cs390wap.component';

describe('Cs390wapComponent', () => {
  let component: Cs390wapComponent;
  let fixture: ComponentFixture<Cs390wapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cs390wapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cs390wapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
