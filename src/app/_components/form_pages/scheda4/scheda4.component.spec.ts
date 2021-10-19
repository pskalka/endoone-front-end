import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Scheda4Component } from './scheda4.component';

describe('Scheda4Component', () => {
  let component: Scheda4Component;
  let fixture: ComponentFixture<Scheda4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Scheda4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Scheda4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
