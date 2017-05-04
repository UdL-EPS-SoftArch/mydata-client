import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {Dataset} from '../dataset';
import {DatasetService} from '../dataset.service';
import {Router} from '@angular/router';
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

  constructor(private fb: FormBuilder,
              private router: Router,
              private datasetService: DatasetService,
              private http: Http,
              private authentication: AuthenticationBasicService) {

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
      'description': ['Dataset description']
    });

    this.titleCtrl = this.datasetForm.controls['title'];
    this.dataset = new Dataset();
  }

  ngOnInit() {
  }

  addDataFile(input): Observable<DataFile> {
    let file = input;
    let reader = new FileReader();

    let body = JSON.stringify({'inputFile': file.name, 'content': "TRIO MAQUINERO"});
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    let options = new RequestOptions({headers: headers});

    return this.http.post(`${environment.API}/pictures`, body, options)
      .map((res: Response) => new DataFile(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  onSubmit(): void {

    /*if(this.datafileForm == null){
     this.datasetService.addDataset(this.datafile)
     .subscribe(
     datafile => { this.router.navigate([datafile.uri]); },
     error => {
     this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
     });
     }else{
     this.datasetService.addDataset(this.dataset)
     .subscribe(
     dataset => { this.router.navigate([dataset.uri]); },
     error => {
     this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
     });
     }*/

    this.datasetService.addDataset(this.dataset)
      .subscribe(
        dataset => {
          this.router.navigate([dataset.uri]);
        },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
