import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatiInformativiBaseComponent } from './dati-informativi-base.component';

describe('DatiInformativiBaseComponent', () => {
  let component: DatiInformativiBaseComponent;
  let fixture: ComponentFixture<DatiInformativiBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatiInformativiBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatiInformativiBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
