export class Field {
  uri: string;
  title: string;
  description: string;
  dateTime: string;
  lastModified: string;
  partOf: string;

  _links: any = {};


  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
