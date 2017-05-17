import { SpyObject } from '../helper';
import {FieldOwnerService} from '../../app/user/field-owner.service';

export class MockFieldOwnerService extends SpyObject {
  fakeResponse;

  getFieldOwner;

  constructor() {
    super(FieldOwnerService);

    this.fakeResponse = null;
    this.getFieldOwner = this.spy('getFieldOwner').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: FieldOwnerService, useValue: this }];
  }
}
