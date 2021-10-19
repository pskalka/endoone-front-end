import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearSchedaDialogComponent } from './clear-scheda-dialog.component';

describe('ClearSchedaDialogComponent', () => {
  let component: ClearSchedaDialogComponent;
  let fixture: ComponentFixture<ClearSchedaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearSchedaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearSchedaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
