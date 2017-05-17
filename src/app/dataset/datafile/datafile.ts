export class DataFile {
  uri: string;
  title: string;
  description: string;
  filename: string;
  content: string;
  dateTime: string;
  lastModified: string;
  blocked = false;
  flags = 0;
  schema: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
