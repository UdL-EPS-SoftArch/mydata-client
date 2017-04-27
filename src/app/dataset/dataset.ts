export class Dataset {
  uri: string;
  title: string;
  description: string;
  dateTime: string;
  lastModified: string;
  blocked = false;
  flags = 0;
  _links: any = {};
  schema: string;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
