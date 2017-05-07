import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {Dataset} from '../dataset';
import {DatasetService} from '../dataset.service';
import {Router} from '@angular/router';
import {Schema} from '../../schema/schema';
import {SchemaService} from '../../schema/schema.service';
import {DataFile} from '../datafile/datafile';
import {Observable} from 'rxjs/Observable';
import {Headers, RequestOptions, Response, Http} from '@angular/http';
import {environment} from '../../../environments/environment';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-dataset-form',
  templateUrl: './dataset-form.component.html',
  styleUrls: ['./dataset-form.component.css']
})
export class DatasetFormComponent implements OnInit {
  public dataset: Dataset;
  public datafile: DataFile;
  public datafileForm: FormGroup;
  public datasetForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;
  public schemas: Schema[] = [];
  public filename: string;
  public fileAttached = false;
  public content: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private datasetService: DatasetService,
              private http: Http,
              private authentication: AuthenticationBasicService,
              private schemaService: SchemaService) {

    if ('inputFile' != null) {
      this.datafileForm = fb.group({
        'title': ['Datafile title', Validators.required],
        'description': ['Datafile description'],
        'inputFile': ['Datafile inputFile'],
        'schema': ['Dataset schema']
      });
    } else {
      this.datasetForm = fb.group({
        'title': ['Dataset title', Validators.required],
        'description': ['Dataset description'],
        'schema': ['Dataset schema']
      });
    }

    this.datasetForm = fb.group({
      'title': ['Dataset title', Validators.required],
      'description': ['Dataset description'],
      'schema': ['Dataset schema']
    });
    this.titleCtrl = this.datasetForm.controls['title'];
    this.dataset = new Dataset();
  }

  ngOnInit() {
    this.schemaService.getAllSchemas().subscribe(
      schemas => {
        this.schemas = schemas;
      },
      error => this.errorMessage = <any>error.message
    );
  }

  addDataFile(event): void {
    const fileList: FileList = event.target.files;
    const file: File = fileList[0];
    const reader = new FileReader();


    reader.readAsText(file);

    reader.onloadend = (e) => {
      this.fileAttached = true;
      this.content = reader.result;
      this.filename = file.name;
    };
  }


  onSubmit(): void {
    if (this.fileAttached) {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.append('Authorization', this.authentication.getCurrentUser().authorization);
      const options = new RequestOptions({headers: headers});
      const body = JSON.stringify({
        'title': this.dataset.title,
        'description': this.dataset.description,
        'schema': this.dataset.schema,
        'filename': this.filename,
        'content': this.content
      });

      this.http.post(`${environment.API}/dataFiles`, body, options)
        .map((res: Response) => new DataFile(res.json()))
        .catch((error: any) => Observable.throw(error.json()))
        .subscribe(
          datafile => {
            this.router.navigate([datafile.uri]);
            console.log(Response);
          },
          error => {
            this.errorMessage = <any>error;
          },
          () => console.log('random look complete'));
    } else {
      this.datasetService.addDataset(this.dataset)
        .subscribe(
          dataset => {
            this.router.navigate([dataset.uri]);
          }, error => {
            this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
          });
    }
    this.fileAttached = false;
  }
}
