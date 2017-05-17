import { SpyObject } from '../helper';
import { ClosedLicenseOwnerService } from '../../app/user/closed-license-owner.service';

export class MockClosedLicenseOwnerService extends SpyObject {
  fakeResponse;

  getClosedLicenseOwner;

  constructor() {
    super(ClosedLicenseOwnerService);

    this.fakeResponse = null;
    this.getClosedLicenseOwner = this.spy('getClosedLicenseOwner').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: ClosedLicenseOwnerService, useValue: this }];
  }
}
