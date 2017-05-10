import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {Dataset} from '../dataset';
import {DatasetService} from '../dataset.service';
import {Router} from '@angular/router';
import {Schema} from '../../schema/schema';
import {SchemaService} from '../../schema/schema.service';
import {DataFile} from '../datafile/datafile';
import { DataFileService } from '../datafile/datafile.service';

@Component({
  selector: 'app-dataset-form',
  templateUrl: './dataset-form.component.html',
  styleUrls: ['./dataset-form.component.css']
})
export class DatasetFormComponent implements OnInit {
  public dataset: Dataset;
  public datasetForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;
  public schemas: Schema[] = [];
  public fileAttached = false;
  public filename: string;
  public content: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private datasetService: DatasetService,
              private dataFileService: DataFileService,
              private schemaService: SchemaService) {

    this.datasetForm = fb.group({
        'title': ['Datafile title', Validators.required],
        'description': ['Datafile description'],
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
      const dataFile: DataFile = new DataFile();
      dataFile.title = this.dataset.title;
      dataFile.description = this.dataset.description;
      dataFile.schema = this.dataset.schema;
      dataFile.filename = this.filename;
      dataFile.content = this.content;
      this.dataFileService.addDataFile(dataFile)
        .subscribe(
          datafile => {
            this.router.navigate([datafile.uri]);
          }, error => {
            this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
          });
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
