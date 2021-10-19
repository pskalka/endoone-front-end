import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Scheda1Component } from './scheda1.component';

describe('Scheda1Component', () => {
  let component: Scheda1Component;
  let fixture: ComponentFixture<Scheda1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Scheda1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Scheda1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
