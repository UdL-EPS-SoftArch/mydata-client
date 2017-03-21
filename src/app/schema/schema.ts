export class Schema {
  title: string;
  description: string;
  dateTime: string;
  lastModified: string;
  _links: any;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
