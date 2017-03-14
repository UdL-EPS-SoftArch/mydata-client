import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { AuthenticationBasicService } from "../login-basic/authentication-basic.service";
import { Observable } from "rxjs";
import { Dataset } from "./dataset";
import { environment } from "../../environments/environment";

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

  // POST /datasets
  addDataset(dataset: Dataset): Observable<Dataset> {
    let body = JSON.stringify(dataset);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/datasets`, body, options)
      .map((res: Response) => new Dataset(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }
}
