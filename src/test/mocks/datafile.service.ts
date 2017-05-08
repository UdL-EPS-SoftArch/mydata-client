import { DataFileService } from '../../app/dataset/datafile/datafile.service';
import { SpyObject } from '../helper';

export class MockDataFileService extends SpyObject {
  fakeResponse;
  getAllDatasets;
  getDataset;
  addDataset;
  getAllDatasetsOrderedByTitle;

  constructor() {
    super(DataFileService);

    this.fakeResponse = null;
    this.getAllDatasets = this.spy('getAllDataFiles').andReturn(this);
    this.getDataset = this.spy('getDataFile').andReturn(this);
    this.addDataset = this.spy('addDataFile').andReturn(this);
    this.getAllDatasetsOrderedByTitle = this.spy('getAllDataFilesOrderedByTitle').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: DataFileService, useValue: this }];
  }
}
