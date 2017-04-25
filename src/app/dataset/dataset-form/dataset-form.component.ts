import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Dataset } from '../dataset';
import { DatasetService } from '../dataset.service';
import { Router } from '@angular/router';
import { Schema } from '../../schema/schema';
import { SchemaService } from '../../schema/schema.service';

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

  constructor(private fb: FormBuilder,
              private router: Router,
              private datasetService: DatasetService, private schemaService: SchemaService) {
    this.datasetForm = fb.group({
      'title': ['Dataset title', Validators.required],
      'description': ['Dataset description']
    });
    this.titleCtrl = this.datasetForm.controls['title'];
    this.dataset = new Dataset();
  }

  ngOnInit() {
    this.schemaService.getAllSchemas().subscribe(
      schemas => { this.schemas = schemas; },
      error => this.errorMessage = <any>error.message
    );
  }

  onSubmit(): void {
    this.datasetService.addDataset(this.dataset)
      .subscribe(
        dataset => { this.router.navigate([dataset.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
