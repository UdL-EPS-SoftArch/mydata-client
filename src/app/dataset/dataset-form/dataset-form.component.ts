import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators, AbstractControl} from "@angular/forms";
import {Dataset} from "../dataset";
import {DatasetService} from "../dataset.service";
import {Router} from "@angular/router";
import {Schema} from "../../schema/schema";
import {SchemaService} from "../../schema/schema.service";
import {DataFile} from "../datafile/datafile";
import {Observable} from "rxjs";
import {Headers, RequestOptions, Response, Http} from "@angular/http";
import {environment} from "../../../environments/environment";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";

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
        'inputFile': ['Datafile inputFile']
      });
    } else {
      this.datasetForm = fb.group({
        'title': ['Dataset title', Validators.required],
        'description': ['Dataset description']
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

    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onloadend = (e) => {

      let body = JSON.stringify({
        'title': 'Title1',
        'description': 'asdasda',
        'filename': file.name,
        'content': reader.result
      });
      let headers = new Headers({'Content-Type': 'application/json'});
      headers.append('Authorization', this.authentication.getCurrentUser().authorization);
      let options = new RequestOptions({headers: headers});

      this.http.post(`${environment.API}/dataFiles`, body, options)
        .map((res: Response) => new DataFile(res.json()))
        .catch((error: any) => Observable.throw(error.json()))
        .subscribe(
          data => {
            console.log(Response);
          },
          error => {
            this.errorMessage = <any>error;
          },
          () => console.log('random look complete'));

    };
  }


  onSubmit(): void {
    this.datasetService.addDataset(this.dataset)
      .subscribe(
        dataset => {
          this.router.navigate([dataset.uri]);
        }, error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
