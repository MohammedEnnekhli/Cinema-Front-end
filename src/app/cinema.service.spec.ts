import { TestBed } from '@angular/core/testing';

import { CinemaServicesService } from './cinema.service';

describe('CinemaServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CinemaServicesService = TestBed.get(CinemaServicesService);
    expect(service).toBeTruthy();
  });
});
