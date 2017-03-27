import { TestBed, inject } from '@angular/core/testing';

import { OpenLicenseService } from './open-license.service';

describe('OpenLicenseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenLicenseService]
    });
  });

  it('should ...', inject([OpenLicenseService], (service: OpenLicenseService) => {
    expect(service).toBeTruthy();
  }));
});