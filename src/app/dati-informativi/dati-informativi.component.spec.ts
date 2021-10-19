import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatiInformativiComponent } from './dati-informativi.component';

describe('DatiInformativiComponent', () => {
  let component: DatiInformativiComponent;
  let fixture: ComponentFixture<DatiInformativiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatiInformativiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatiInformativiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
