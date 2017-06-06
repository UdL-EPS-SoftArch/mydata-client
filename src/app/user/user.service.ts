import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Http, Response} from '@angular/http';
import {User} from './user';
import {environment} from '../../environments/environment';
import {Dataset} from '../dataset/dataset';
import {Schema} from '../schema/schema';
import {OpenLicense} from '../license/open-license/open-license';
import {ClosedLicense} from '../license/closed-license/closed-license';
import {PageWrapper} from '../pageWrapper';

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

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

  getUserDatasetsPaginated(uri: any): Observable<PageWrapper> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => {
        const pw = new PageWrapper();
        const data = res.json();
        pw.elements = data._embedded.datasets.map(json => new Dataset(json));
        pw.pageInfo = data.page;
        return pw;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  getUserSchemas(uri: any): Observable<Schema[]> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => res.json()._embedded.schemas.map(json => new Schema(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  getUserSchemasPaginated(uri: any): Observable<PageWrapper> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => {
        const pw = new PageWrapper();
        const data = res.json();
        pw.elements = data._embedded.schemas.map(json => new Schema(json));
        pw.pageInfo = data.page;
        return pw;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  getUserOpenLicenses(uri: any): Observable<OpenLicense[]> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => {
        const data = res.json()._embedded;
        if (data.openLicenses) {
          return data.openLicenses.map(json => new OpenLicense(json));
        }
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  getUserOpenLicensePaginated(uri: any): Observable<PageWrapper> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => {
        const pw = new PageWrapper();
        const data = res.json();
        pw.elements = data._embedded.openLicenses.map(json => new OpenLicense(json));
        pw.pageInfo = data.page;
        return pw;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  getUserClosedLicenses(uri: any): Observable<ClosedLicense[]> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => {
        const data = res.json()._embedded;
        if (data.closedLicenses) {
          return res.json()._embedded.closedLicenses.map(json => new ClosedLicense(json));
        }
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  getUserClosedLicensePaginated(uri: any): Observable<PageWrapper> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => {
        const pw = new PageWrapper();
        const data = res.json();
        pw.elements = data._embedded.closedLicenses.map(json => new ClosedLicense(json));
        pw.pageInfo = data.page;
        return pw;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }
}

