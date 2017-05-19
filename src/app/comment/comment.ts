import {Dataset} from '../dataset/dataset';
import {User} from '../login-basic/user';



export class Comment {
  uri: string;
  text: string;
  dataset: Dataset;
  user: User;
  dateTime: string;
  _links: any = {};

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
