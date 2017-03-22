export class License {
  text: string;
  price: number;
  dateTime: string;
  lastModified: string;
  blocked = false;
  flags = 0;
  _links: any;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}