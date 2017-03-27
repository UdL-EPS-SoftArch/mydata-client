export class OpenLicense {
  text: string;
  dateTime: string;
  lastModified: string;
  _links: any;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}