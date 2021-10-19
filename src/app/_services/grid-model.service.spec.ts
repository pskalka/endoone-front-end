import { TestBed } from '@angular/core/testing';

import { GridModelService } from './grid-model.service';

describe('GridModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GridModelService = TestBed.get(GridModelService);
    expect(service).toBeTruthy();
  });
});
