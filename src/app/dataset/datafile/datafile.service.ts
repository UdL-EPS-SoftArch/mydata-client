import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {DataFile} from './datafile';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
export class DataFileService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // POST /pictures
  addDataFile(dataFile: DataFile): Observable<DataFile> {
    const body = JSON.stringify({'filename': dataFile.filename, 'content': dataFile.content});
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.post(`${environment.API}/pictures`, body, options)
      .map((res: Response) => new DataFile(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

}
