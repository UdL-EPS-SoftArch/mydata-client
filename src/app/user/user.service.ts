import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, Response } from '@angular/http';
import {User} from './user';
import {environment} from '../../environments/environment';
import {Dataset} from '../dataset/dataset';

@Injectable()
export class UserService {

  constructor (private http: Http) {}

  getUser(uri: any): Observable<User> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new User(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  getUserDatasets(uri: any): Observable<Dataset[]> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => res.json()._embedded.datasets.map(json => new Dataset(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }
}

