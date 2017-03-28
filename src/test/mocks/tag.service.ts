import { TagService } from '../../app/tag/tag.service';
import { SpyObject } from '../helper';

export class MockTagService extends SpyObject {
  fakeResponse;
  getAllTags;
  getTag;

  constructor() {
    super(TagService);

    this.fakeResponse = null;
    this.getAllTags = this.spy('getAllTags').andReturn(this);
    this.getTag = this.spy('getTag').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: TagService, useValue: this }];
  }
}
