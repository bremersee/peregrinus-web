import { TestBed } from '@angular/core/testing';

import { OpeningGuardService } from './opening-guard.service';

describe('OpeningGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpeningGuardService = TestBed.get(OpeningGuardService);
    expect(service).toBeTruthy();
  });
});
