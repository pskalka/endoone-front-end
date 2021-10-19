import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxtAreaFieldComponent } from './txt-area-field.component';

describe('TxtAreaFieldComponent', () => {
  let component: TxtAreaFieldComponent;
  let fixture: ComponentFixture<TxtAreaFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxtAreaFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxtAreaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
