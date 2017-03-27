import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import {Tag} from "@angular/compiler/src/i18n/serializers/xml_helper";

@Injectable()
export class TagService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /tags
  getAllTags(): Observable<Tag[]> {
    return this.http.get(`${environment.API}/tags`)
      .map((res: Response) => res.json()._embedded.schemas.map(json => new Tag(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /tags/id
  getTag(uri: string): Observable<Tag> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new Tag(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }
}
