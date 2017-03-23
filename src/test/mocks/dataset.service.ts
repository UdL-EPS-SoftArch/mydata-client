import { DatasetService } from '../../app/dataset/dataset.service';
import { SpyObject } from '../helper';

export class MockDatasetService extends SpyObject {
  fakeResponse;
  getAllDatasets;
  getDataset;
  addDataset;

  constructor() {
    super(DatasetService);

    this.fakeResponse = null;
    this.getAllDatasets = this.spy('getAllDatasets').andReturn(this);
    this.getDataset = this.spy('getDataset').andReturn(this);
    this.addDataset = this.spy('addDataset').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: DatasetService, useValue: this }];
  }
}