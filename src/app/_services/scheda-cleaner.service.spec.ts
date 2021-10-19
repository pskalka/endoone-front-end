import { TestBed } from '@angular/core/testing';

import { SchedaCleanerService } from './scheda-cleaner.service';

describe('SchedaCleanerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchedaCleanerService = TestBed.get(SchedaCleanerService);
    expect(service).toBeTruthy();
  });
});
