import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSignDialogComponent } from './form-sign-dialog.component';

describe('FormSignDialogComponent', () => {
  let component: FormSignDialogComponent;
  let fixture: ComponentFixture<FormSignDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSignDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
