import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRemarksControlComponent } from './form-remarks-control.component';

describe('FormRemarksControlComponent', () => {
  let component: FormRemarksControlComponent;
  let fixture: ComponentFixture<FormRemarksControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRemarksControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRemarksControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
