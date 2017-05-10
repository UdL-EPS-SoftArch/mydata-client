export class User {
  uri: string;
  _links: any = {};

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  getUserName(): string {
    return this.uri.split('/').pop();
  }

  getData(): string {
    return JSON.stringify(this._links);
  }
}
