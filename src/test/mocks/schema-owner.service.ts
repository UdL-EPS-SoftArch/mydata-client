import { SpyObject } from '../helper';
import {SchemaOwnerService} from '../../app/user/schema-owner.service';

export class MockSchemaOwnerService extends SpyObject {
  fakeResponse;

  getSchemaOwner;

  constructor() {
    super(SchemaOwnerService);

    this.fakeResponse = null;
    this.getSchemaOwner = this.spy('getSchemaOwner').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: SchemaOwnerService, useValue: this }];
  }
}
