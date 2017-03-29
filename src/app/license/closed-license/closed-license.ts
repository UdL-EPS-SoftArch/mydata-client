export class ClosedLicense {
  uri: string;
  text: string;
  price: string;
  dateTime: string;
  lastModified: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
