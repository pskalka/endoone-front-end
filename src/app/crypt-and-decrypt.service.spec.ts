import { TestBed } from '@angular/core/testing';

import { CryptAndDecryptService } from './crypt-and-decrypt.service';

describe('CryptAndDecryptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CryptAndDecryptService = TestBed.get(CryptAndDecryptService);
    expect(service).toBeTruthy();
  });
});
