import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValutazioneDoloreComponent } from './valutazione-dolore.component';

describe('ValutazioneDoloreComponent', () => {
  let component: ValutazioneDoloreComponent;
  let fixture: ComponentFixture<ValutazioneDoloreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValutazioneDoloreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValutazioneDoloreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
