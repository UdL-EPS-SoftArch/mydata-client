import { SpyObject } from '../helper';
import { OpenLicenseOwnerService } from '../../app/user/open-license-owner.service';

export class MockOpenLicenseOwnerService extends SpyObject {
  fakeResponse;

  getOpenLicenseOwner;

  constructor() {
    super(OpenLicenseOwnerService);

    this.fakeResponse = null;
    this.getOpenLicenseOwner = this.spy('getOpenLicenseOwner').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: OpenLicenseOwnerService, useValue: this }];
  }
}
