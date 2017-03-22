import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { License } from './license';
import { environment } from '../../environments/environment';

@Injectable()
export class LicenseService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {}

  // GET /licenses
  getAllLicenses(): Observable<License[]> {
    return this.http.get(`${environment.API}/licenses`)
      .map((res: Response) => res.json()._embedded.licenses.map(json => new License(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /licenses/id
  getLicense(uri: string): Observable<License> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new License(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /licenses
  addLicense(license: License): Observable<License> {
    const body = JSON.stringify(license);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/licenses`, body, options)
      .map((res: Response) => new License(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }
}