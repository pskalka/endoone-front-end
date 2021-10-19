import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMultiComponent } from './test-multi.component';

describe('TestMultiComponent', () => {
  let component: TestMultiComponent;
  let fixture: ComponentFixture<TestMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
