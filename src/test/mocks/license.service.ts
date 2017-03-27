import { LicenseService } from '../../app/license/license.service';
import { SpyObject } from '../helper';

export class MockLicenseService extends SpyObject {
  fakeResponse;
  getAllLicenses;
  getLicense;
  addLicense;
  getAllLicenseOrderedByText;

  constructor() {
    super(LicenseService);

    this.fakeResponse = null;
    this.getAllLicenses = this.spy('getAllDatasets').andReturn(this);
    this.getLicense = this.spy('getDataset').andReturn(this);
    this.addLicense = this.spy('addDataset').andReturn(this);
    this.getAllLicenseOrderedByText = this.spy('getAllLicenseOrderedByText').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: LicenseService, useValue: this }];
  }
}
