import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Dataset } from '../dataset';
import { DatasetService } from '../dataset.service';
import { Router } from '@angular/router';
import { Schema } from '../../schema/schema';
import { SchemaService } from '../../schema/schema.service';
import { OpenLicense } from '../../license/open-license/open-license';
import { OpenLicenseService } from '../../license/open-license/open-license.service';
import { ClosedLicense } from '../../license/closed-license/closed-license';
import { ClosedLicenseService } from '../../license/closed-license/closed-license.service';

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
  public openLicenses: OpenLicense[] = [];
  public closedLicenses: ClosedLicense[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private datasetService: DatasetService,
              private schemaService: SchemaService,
              private openLicenseService: OpenLicenseService,
              private closedLicenseService: ClosedLicenseService) {
    this.datasetForm = fb.group({
      'title': ['Dataset title', Validators.required],
      'description': ['Dataset description'],
      'schema': ['Dataset schema'],
      'license':['Dataset license']
    });
    this.titleCtrl = this.datasetForm.controls['title'];
    this.dataset = new Dataset();
  }

  ngOnInit() {
    this.schemaService.getAllSchemas().subscribe(
      schemas => { this.schemas = schemas; },
      error => this.errorMessage = <any>error.message
    );
    this.openLicenseService.getAllOpenLicenses().subscribe(
      openLicenses => { this.openLicenses = openLicenses },
      error => this.errorMessage = <any>error.message
    );
    this.closedLicenseService.getAllClosedLicenses().subscribe(
      closedLicenses => { this.closedLicenses = closedLicenses },
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
