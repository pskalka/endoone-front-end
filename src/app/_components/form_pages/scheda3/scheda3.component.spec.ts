import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Scheda3Component } from './scheda3.component';

describe('Scheda3Component', () => {
  let component: Scheda3Component;
  let fixture: ComponentFixture<Scheda3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Scheda3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Scheda3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
