import { Component, OnInit } from '@angular/core';
import { Dataset } from '../dataset';
import { ActivatedRoute } from '@angular/router';
import { DatasetService } from '../dataset.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Schema } from '../../schema/schema';
import { SchemaService } from '../../schema/schema.service';


@Component({
  selector: 'app-dataset-edit',
  templateUrl: './dataset-edit.component.html',
  styleUrls: ['./dataset-edit.component.css']
})
export class DatasetEditComponent implements OnInit {
  public dataset: Dataset = new Dataset();
  public errorMessage: string;
  public datasetForm: FormGroup;
  public titleCtrl: AbstractControl;
  public schemas: Schema[] = [];

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private datasetService: DatasetService,
              private schemaService: SchemaService,
              private router: Router) {
    this.datasetForm = fb.group({
      'title': ['Dataset title', Validators.required],
      'description': ['Dataset description'],
      'schema': ['Dataset schema'],
    });
    this.titleCtrl = this.datasetForm.controls['title'];
  }

  ngOnInit() {
    this.schemaService.getAllSchemas().subscribe(
      schemas => { this.schemas = schemas; },
      error => this.errorMessage = <any>error.message
    );

    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/datasets/${id}`;
        this.datasetService.getDataset(uri).subscribe(
          dataset => this.dataset = dataset,
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onSubmit(): void {
    this.datasetService.updateDataset(this.dataset)
      .subscribe(
        dataset => { this.router.navigate([dataset.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.dataset1errors[0].message : <any>error.message;
        });
  }

  onChangeSchema(event): void {
    console.log(this.dataset.schema);
  }
}
