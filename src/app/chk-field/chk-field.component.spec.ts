import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChkFieldComponent } from './chk-field.component';

describe('ChkFieldComponent', () => {
  let component: ChkFieldComponent;
  let fixture: ComponentFixture<ChkFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChkFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChkFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
