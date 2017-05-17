import { Injectable } from '@angular/core';
import { Owner } from './owner';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class FieldOwnerService {

  constructor (private http: Http) {}

  getFieldOwner(uri: any): Observable<Owner> {
    return this.http.get(uri)
      .map((res: Response) => new Owner(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }
}

