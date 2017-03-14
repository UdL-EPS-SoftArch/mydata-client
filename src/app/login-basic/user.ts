import {Authority} from './authority';

export class User {
  username: string = '';
  authorities: Authority[] = [];
  authorization: string = '';
  password: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
