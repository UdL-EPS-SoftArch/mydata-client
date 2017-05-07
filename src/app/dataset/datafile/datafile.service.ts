import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {DataFile} from './datafile';
import {Injectable} from '@angular/core';

@Injectable()
export class DataFileService {

  constructor(private http: Http) {
  }


  // GET /datasets/OrderByTitle
  getAllDatasetsOrderedByTitle(): Observable<DataFile[]> {
    return this.http.get(`${environment.API}/dataFiles?sort=title`)
      .map((res: Response) => res.json()._embedded.dataFiles.map(json => new DataFile(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }


  // GET /datasets/id
  getDatafile(uri: string): Observable<DataFile> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => new DataFile(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

}
