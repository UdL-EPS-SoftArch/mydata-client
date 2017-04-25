import {Dataset} from "../dataset/dataset";
import {User} from "../login-basic/user";
/**
 * Created by santi on 25/04/17.
 */
export class Comment{
  uri: string;
  id: string;
  text: string;
  dataset: Dataset;
  user: User;
  dateTime: string;
  _links: any = {};

  constructor(values: Object = {}){
    (<any>Object).assign(this, values);
  }
}
