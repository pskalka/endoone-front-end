import { TestBed } from '@angular/core/testing';

import { GenerateSecretService } from './generate-secret.service';

describe('GenerateSecretService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateSecretService = TestBed.get(GenerateSecretService);
    expect(service).toBeTruthy();
  });
});
