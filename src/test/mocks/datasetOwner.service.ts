import { SpyObject } from '../helper';
import { DatasetOwnerService } from '../../app/user/datasetOwner.service';

export class MockDatasetOwnerService extends SpyObject {
  fakeResponse;

  getDatasetOwner;

  constructor() {
    super(DatasetOwnerService);

    this.fakeResponse = null;
    this.getDatasetOwner = this.spy('getDatasetOwner').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: DatasetOwnerService, useValue: this }];
  }
}
