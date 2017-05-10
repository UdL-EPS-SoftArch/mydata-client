import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, Response } from '@angular/http';
import {User} from './user';

@Injectable()
export class UserService {

  constructor (private http: Http) {}

  getUser(uri: any): Observable<User> {
    console.log(uri);
    return this.http.get(uri)
      .map((res: Response) => new User(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }
}

