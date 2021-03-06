import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Field } from '../field/field';
import { Schema } from './schema';
import { environment } from '../../environments/environment';
import { Dataset } from '../dataset/dataset';
import { PageWrapper } from '../pageWrapper';
import { DataFile } from '../dataset/datafile/datafile';

@Injectable()
export class SchemaService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /schemas
  getAllSchemas(): Observable<Schema[]> {
    return this.http.get(`${environment.API}/schemas`)
      .map((res: Response) => res.json()._embedded.schemas.map(json => new Schema(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /schemas with pagination data
  getAllSchemasPaginated(pageNumber: number, size: number): Observable<PageWrapper> {
    return this.http.get(`${environment.API}/schemas?sort=title&page=${pageNumber}&size=${size}`)
      .map((res: Response) => {
        const pw = new PageWrapper();
        const data = res.json();
        pw.elements = data._embedded.schemas.map(json => new Schema(json));
        pw.pageInfo = data.page;
        return pw;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /schemas/id
  getSchema(uri: string): Observable<Schema> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new Schema(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /datasets/ + search/findByDescriptionContaining?description
  getSchemaByDescriptionWords(keyword: string): Observable<Schema[]> {
    return this.http.get(environment.API + '/schemas/search/findByDescriptionContaining?description=' + keyword)
      .map((res: Response) => res.json()._embedded.schemas.map(json => new Schema(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /schemas/id/datasets
  getDatasetsOfSchema(uri: string): Observable<Dataset[]> {
    return this.http.get(`${environment.API}${uri}/datasets`)
      .map((res: Response) => res.json()._embedded.datasets.map(json => new Dataset(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  getDatasetsOfSchemaPaginated(uri: string, pageNumber: number, size: number): Observable<PageWrapper> {
    return this.http.get(`${environment.API}${uri}/datasets?sort=title&page=${pageNumber}&size=${size}`)
      .map((res: Response) => {
        const pw = new PageWrapper();
        const data = res.json();
        pw.elements = data._embedded.datasets.map(json => new Dataset(json));
        if (data._embedded.dataFiles) {
          pw.elements = pw.elements.concat(data._embedded.dataFiles.map(json => new DataFile(json)));
        }
        pw.pageInfo = data.page;
        return pw;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /schemas/id/fields
  getFieldsOfSchema(uri: string): Observable<Field[]> {
    return this.http.get(`${environment.API}${uri}/contains`)
      .map((res: Response) => res.json()._embedded.fields.map(json => new Field(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /dataset/id/schema
  getSchemaOfDataset(uri: string): Observable<Schema> {
  return this.http.get(`${uri}`)
    .map((res: Response) => new Schema(res.json()));
  }

  // PUT /schemas/id
  updateSchema(schema: Schema): Observable<Schema> {
    const body = JSON.stringify(schema);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.put(`${environment.API}${schema.uri}`, body, options)
      .map((res: Response) => new Schema(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /schemas
  addSchema(schema: Schema): Observable<Schema> {
    const body = JSON.stringify(schema);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.post(`${environment.API}/schemas`, body, options)
      .map((res: Response) => new Schema(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /schema/{id}
  deleteSchema(schema: Schema): Observable<Response> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.delete(environment.API + schema.uri, options)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json()));
  }
}
