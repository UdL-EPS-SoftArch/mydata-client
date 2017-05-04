

export class DataFile {
  uri: string;
  filename: string;
  content: string;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
