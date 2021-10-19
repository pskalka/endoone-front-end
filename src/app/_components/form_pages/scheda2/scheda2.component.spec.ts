import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Scheda2Component } from './scheda2.component';

describe('Scheda2Component', () => {
  let component: Scheda2Component;
  let fixture: ComponentFixture<Scheda2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Scheda2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Scheda2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
