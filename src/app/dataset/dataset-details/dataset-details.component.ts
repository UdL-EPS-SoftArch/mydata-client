import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatasetService } from '../dataset.service';
import { Dataset } from '../dataset';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { DatasetOwnerService } from '../../user/dataset-owner.service';
import { Schema } from '../../schema/schema';
import { SchemaService } from '../../schema/schema.service';
import { SchemaOwnerService } from '../../user/schema-owner.service';

@Component({
  selector: 'app-dataset-details',
  templateUrl: './dataset-details.component.html',
  styleUrls: ['./dataset-details.component.css']
})
export class DatasetDetailsComponent implements OnInit {
  public dataset: Dataset = new Dataset();
  public schema: Schema = new Schema();
  public errorMessage: string;
  public isOwner: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private datasetService: DatasetService,
              private schemaService: SchemaService,
              private schemaOwnerService: SchemaOwnerService,
              private authenticationService: AuthenticationBasicService,
              private datasetOwnerService: DatasetOwnerService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/datasets/${id}`;
        this.datasetService.getDataset(uri).subscribe(
          dataset => {
            this.dataset = dataset;
            if (this.dataset._links != null) {
              this.datasetOwnerService.getDatasetOwner(this.dataset._links.owner.href).subscribe(
                owner => {
                  this.isOwner = this.authenticationService.getCurrentUser().username === owner.getUserName();
                });
            }
          },
          error => this.errorMessage = <any>error.message,
        );
      });
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/datasets/${id}/schema`;
        this.schemaService.getSchema(uri).subscribe(
          schema => {
            this.schema = schema;
            if (this.schema._links != null) {
              this.schemaOwnerService.getSchemaOwner(this.schema._links.owner.href).subscribe(
                owner => {
                  this.isOwner = this.authenticationService.getCurrentUser().username === owner.getUserName();
                });
            }
          },
          error => this.errorMessage = <any>error.message
        );
      });

  }

  onDelete(dataset) {
    this.datasetService.deleteDataset(dataset).subscribe(
      response => { this.router.navigate(['/datasets']); },
      error => this.errorMessage = <any>error.message,
    );
  }
}
