import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffettiPersonaliComponent } from './effetti-personali.component';

describe('EffettiPersonaliComponent', () => {
  let component: EffettiPersonaliComponent;
  let fixture: ComponentFixture<EffettiPersonaliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffettiPersonaliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffettiPersonaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
