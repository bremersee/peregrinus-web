import { TestBed } from '@angular/core/testing';

import { BasecampBusService } from './basecamp-bus.service';

describe('BasecampBusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasecampBusService = TestBed.get(BasecampBusService);
    expect(service).toBeTruthy();
  });
});
