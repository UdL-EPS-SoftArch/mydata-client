import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import {Tag} from "./tag";

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

  // POST /tag
  addTag(tag: Tag): Observable<Tag> {
    const body = JSON.stringify(Tag);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/tags`, body, options)
      .map((res: Response) => new Tag(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }
}
