import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredFieldMarkComponent } from './required-field-mark.component';

describe('RequiredFieldMarkComponent', () => {
  let component: RequiredFieldMarkComponent;
  let fixture: ComponentFixture<RequiredFieldMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiredFieldMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredFieldMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
