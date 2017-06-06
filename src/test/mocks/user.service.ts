import { SpyObject } from '../helper';
import { UserService } from '../../app/user/user.service';

export class MockUserService extends SpyObject {
  fakeResponse;
  getUser;
  getUserDatasets;
  getUserDatasetsPaginated;
  getUserSchemas;
  getUserSchemasPaginated;
  getUserOpenLicenses;
  getUserOpenLicensesPaginated;
  getUserClosedLicenses;
  getUserClosedLicensesPaginated;

  constructor() {
    super(UserService);

    this.fakeResponse = null;
    this.getUser = this.spy('getUser').andReturn(this);
    this.getUserDatasets = this.spy('getUserDatasets').andReturn(this);
    this.getUserDatasetsPaginated = this.spy('getUserDatasetsPaginated').andReturn(this);
    this.getUserSchemas = this.spy('getUserSchemas').andReturn(this);
    this.getUserSchemasPaginated = this.spy('getUserSchemasPaginated').andReturn(this);
    this.getUserOpenLicenses = this.spy('getUserOpenLicenses').andReturn(this);
    this.getUserOpenLicensesPaginated = this.spy('getUserOpenLicensesPaginated').andReturn(this);
    this.getUserClosedLicenses = this.spy('getUserClosedLicenses').andReturn(this);
    this.getUserClosedLicensesPaginated = this.spy('getUserClosedLicensesPaginated').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: UserService, useValue: this }];
  }
}
