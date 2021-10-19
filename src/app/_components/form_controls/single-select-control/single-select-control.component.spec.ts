import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSelectControlComponent } from './single-select-control.component';

describe('SingleSelectControlComponent', () => {
  let component: SingleSelectControlComponent;
  let fixture: ComponentFixture<SingleSelectControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSelectControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSelectControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
