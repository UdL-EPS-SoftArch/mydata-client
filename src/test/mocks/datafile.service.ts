import { DataFileService } from '../../app/dataset/datafile/datafile.service';
import { SpyObject } from '../helper';

export class MockDataFileService extends SpyObject {
  fakeResponse;
  getAllDatafiles;
  getDatafile;
  addDatafile;
  getAllDatafilesOrderedByTitle;

  constructor() {
    super(DataFileService);

    this.fakeResponse = null;
    this.getAllDatafiles = this.spy('getAllDataFiles').andReturn(this);
    this.getDatafile = this.spy('getDataFile').andReturn(this);
    this.addDatafile = this.spy('addDataFile').andReturn(this);
    this.getAllDatafilesOrderedByTitle = this.spy('getAllDataFilesOrderedByTitle').andReturn(this);
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
