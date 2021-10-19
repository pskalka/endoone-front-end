import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoEsameUrgenzaComponent } from './motivo-esame-urgenza.component';

describe('MotivoEsameUrgenzaComponent', () => {
  let component: MotivoEsameUrgenzaComponent;
  let fixture: ComponentFixture<MotivoEsameUrgenzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivoEsameUrgenzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoEsameUrgenzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
