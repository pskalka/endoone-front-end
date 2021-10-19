import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModArrivoComponent } from './mod-arrivo.component';

describe('ModArrivoComponent', () => {
  let component: ModArrivoComponent;
  let fixture: ComponentFixture<ModArrivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModArrivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModArrivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
