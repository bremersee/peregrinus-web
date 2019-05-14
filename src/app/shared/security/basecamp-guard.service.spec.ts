import { TestBed } from '@angular/core/testing';

import { BasecampGuardService } from './basecamp-guard.service';

describe('BasecampGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasecampGuardService = TestBed.get(BasecampGuardService);
    expect(service).toBeTruthy();
  });
});
