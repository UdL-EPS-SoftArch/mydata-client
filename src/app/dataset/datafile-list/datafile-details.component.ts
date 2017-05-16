import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFileService } from '../datafile/datafile.service';
import { DataFile } from '../datafile/datafile';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { SchemaService } from '../../schema/schema.service';
import { Schema } from '../../schema/schema';


@Component({
  selector: 'app-datafile-details',
  templateUrl: './datafile-details.component.html'
})
export class DatafileDetailsComponent implements OnInit {
  public datafile: DataFile = new DataFile();
  public schema: Schema = new Schema();
  public errorMessage: string;
  public isOwner: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private datafileService: DataFileService,
              private schemaService: SchemaService,
              private authenticationService: AuthenticationBasicService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/dataFiles/${id}`;
        this.datafileService.getDataFile(uri).subscribe(
          datafile => {
            this.datafile = datafile;
            const uri_schema = `/datasets/${id}/schema`;
            this.schemaService.getSchema(uri_schema).subscribe(
              schema => {
                this.schema = schema;

              })
          },
          error => this.errorMessage = <any>error.message,
        );
      });
  }

}
