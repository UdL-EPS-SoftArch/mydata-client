import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Dataset } from './dataset';
import { environment } from '../../environments/environment';

@Injectable()
export class DatasetService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {}

  // GET /datasets
  getAllDatasets(): Observable<Dataset[]> {
    return this.http.get(`${environment.API}/datasets`)
      .map((res: Response) => res.json()._embedded.datasets.map(json => new Dataset(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /dataset/OrderByTitle
  getAllDatasetsOrderedByTitle(): Observable<Dataset[]> {
    return this.http.get(`${environment.API}/datasets?sort=title`)
      .map((res: Response) => res.json()._embedded.datasets.map(json => new Dataset(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /datasets/id
  getDataset(uri: string): Observable<Dataset> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new Dataset(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /datasets
  addDataset(dataset: Dataset): Observable<Dataset> {
    const body = JSON.stringify(dataset);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/datasets`, body, options)
      .map((res: Response) => new Dataset(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PUT /datasets/id
  updateDataset(dataset: Dataset): Observable<Dataset> {
    const body = JSON.stringify(dataset);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({ headers: headers });

    return this.http.put(`${environment.API}/datasets/${dataset.uri.split('/').pop()}`, body, options)
      .map((res: Response) => new Dataset(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /datasets/ + search/findByDescriptionContaining?description
  getDatasetByDescriptionWords(keyword: string): Observable<Dataset[]> {
    return this.http.get(environment.API + "/datasets/search/findByDescriptionContaining?description=" + keyword)
      .map((res: Response) => res.json()._embedded.datasets.map(json => new Dataset(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }
}
