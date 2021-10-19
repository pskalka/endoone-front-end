import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValutazioneDoloreNrsComponent } from './valutazione-dolore-nrs.component';

describe('ValutazioneDoloreNrsComponent', () => {
  let component: ValutazioneDoloreNrsComponent;
  let fixture: ComponentFixture<ValutazioneDoloreNrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValutazioneDoloreNrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValutazioneDoloreNrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
