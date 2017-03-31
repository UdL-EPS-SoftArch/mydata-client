import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { OpenLicense } from './open-license';
import { environment } from '../../../environments/environment';

@Injectable()
export class OpenLicenseService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {}

  // GET /OpenLicenses
  getAllOpenLicenses(): Observable<OpenLicense[]> {
    return this.http.get(`${environment.API}/openLicenses`)
      .map((res: Response) => res.json()._embedded.openLicenses.map(json => new OpenLicense(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /openLicenses/id
  getOpenLicense(uri: string): Observable<OpenLicense> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new OpenLicense(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /openLicenses
  addOpenLicense(openLicense: OpenLicense): Observable<OpenLicense> {
    const body = JSON.stringify(openLicense);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/openLicenses`, body, options)
      .map((res: Response) => new OpenLicense(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }
  // GET /openLicenses/ + search/findByTextContaining?text
  getOpenLicenseByTextWords(keyword: string): Observable<OpenLicense[]> {
    return this.http.get(environment.API + '/openLicenses/search/findByTextContaining?text=' + keyword)
      .map((res: Response) => res.json()._embedded.openLicenses.map(json => new OpenLicense(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }
}