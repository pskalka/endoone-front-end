import { TestBed } from '@angular/core/testing';

import { GETService } from './get.service';

describe('GETService', () => {
  let service: GETService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GETService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
