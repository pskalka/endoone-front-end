import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxtFieldComponent } from './txt-field.component';

describe('TxtFieldComponent', () => {
  let component: TxtFieldComponent;
  let fixture: ComponentFixture<TxtFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxtFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxtFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
