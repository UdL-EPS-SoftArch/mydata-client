import { SchemaService } from '../../app/schema/schema.service';
import { SpyObject } from '../helper';

export class MockSchemaService extends SpyObject {
  fakeResponse;
  getAllSchemas;
  getAllSchemasPaginated;
  getSchema;
  addSchema;
  getSchemaOfDataset;

  constructor() {
    super(SchemaService);

    this.fakeResponse = null;
    this.getAllSchemas = this.spy('getAllSchemas').andReturn(this);
    this.getAllSchemasPaginated = this.spy('getAllSchemasPaginated').andReturn(this);
    this.getSchema = this.spy('getSchema').andReturn(this);
    this.addSchema = this.spy('addSchema').andReturn(this);
    this.getSchemaOfDataset = this.spy('getSchemaOfDataset').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: SchemaService, useValue: this }];
  }
}
