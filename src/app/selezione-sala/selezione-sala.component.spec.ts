import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelezioneSalaComponent } from './selezione-sala.component';

describe('SelezioneSalaComponent', () => {
  let component: SelezioneSalaComponent;
  let fixture: ComponentFixture<SelezioneSalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelezioneSalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelezioneSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
