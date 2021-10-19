import { TestBed } from '@angular/core/testing';

import { POSTService } from './post.service';

describe('POSTService', () => {
  let service: POSTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(POSTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
