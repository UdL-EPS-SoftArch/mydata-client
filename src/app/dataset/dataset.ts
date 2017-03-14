export class Dataset {
  title: string;
  description: string;
  dateTime: string;
  lastModified: string;
  blocked: boolean = false;
  flags: number = 0;
  _links: any;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
