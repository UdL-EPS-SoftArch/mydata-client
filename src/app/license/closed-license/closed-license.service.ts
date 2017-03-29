import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ClosedLicense } from './closed-license';
import { environment } from '../../../environments/environment';

@Injectable()
export class ClosedLicenseService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {}

  // GET /closedLicenses
  getAllClosedLicenses(): Observable<ClosedLicense[]> {
    return this.http.get(`${environment.API}/openLicenses`)
      .map((res: Response) => res.json()._embedded.openLicenses.map(json => new ClosedLicense(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /closedLicenses/id
  getClosedLicense(uri: string): Observable<ClosedLicense> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new ClosedLicense(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /closedLicenses
  addClosedLicense(closedLicense: ClosedLicense): Observable<ClosedLicense> {
    const body = JSON.stringify(closedLicense);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/closedLicenses`, body, options)
      .map((res: Response) => new ClosedLicense(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }
}
