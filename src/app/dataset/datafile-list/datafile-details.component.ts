import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFileService } from '../datafile/datafile.service';
import { DataFile } from '../datafile/datafile';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { SchemaService } from '../../schema/schema.service';
import { Schema } from '../../schema/schema';
import {OwnerService} from '../../user/owner.service';
import { Tag } from '../../tag/tag';
import { TagService } from '../../tag/tag.service';
import { OpenLicense } from '../../license/open-license/open-license';
import { ClosedLicense } from '../../license/closed-license/closed-license';
import { ClosedLicenseService } from '../../license/closed-license/closed-license.service';
import { OpenLicenseService } from '../../license/open-license/open-license.service';

declare const require: any;

@Component({
  selector: 'app-datafile-details',
  templateUrl: './datafile-details.component.html',
  styleUrls: ['./datafile-details.component.css']
})
export class DatafileDetailsComponent implements OnInit {
  public datafile: DataFile = new DataFile();
  public schema: Schema = new Schema();
  public errorMessage: string;
  public isOwner: boolean;
  public ownerName: string;
  public tags: Tag[] = [];
  public openLicense: OpenLicense = new OpenLicense();
  public closedLicense: ClosedLicense = new ClosedLicense();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private datafileService: DataFileService,
              private authenticationService: AuthenticationBasicService,
              private datasetOwnerService: OwnerService,
              private schemaService: SchemaService,
              private openLicenseService: OpenLicenseService,
              private closedLicenseService: ClosedLicenseService,
              private tagService: TagService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/dataFiles/${id}`;
        this.datafileService.getDataFile(uri).subscribe(
          datafile => {
            this.datafile = datafile;
            if (this.datafile._links != null) {
              this.datasetOwnerService.getOwner(this.datafile._links.owner.href).subscribe(
                owner => {
                  this.ownerName = owner.getUserName();
                  this.isOwner = this.authenticationService.getCurrentUser().username === owner.getUserName();
                });
            }
            const uri_schema = `/datasets/${id}/schema`;
            this.schemaService.getSchema(uri_schema).subscribe(
              schema => {
                this.schema = schema;

              });

            const uri_open_license = `/datasets/${id}/license`;
            this.openLicenseService.getOpenLicense(uri_open_license).subscribe(
              openLicense => this.openLicense = openLicense
            );

            const uri_closed_license = `/datasets/${id}/license`;
            this.closedLicenseService.getClosedLicense(uri_closed_license).subscribe(
              closedLicense => this.closedLicense = closedLicense
            );

            this.tagService.getTagsOfDataset(uri).subscribe(
              tags => this.tags = tags
            );
          },
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onDelete(datafile) {
    this.datafileService.deleteDataFile(datafile).subscribe(
      response => {
        this.router.navigate(['/dataFiles']);
      },
      error => this.errorMessage = <any>error.message,
    );
  }

  onDownload(dataFile: DataFile) {
    const fileSaver = require('file-saver');
    const blob = new Blob([dataFile.content], {type: 'text/plain;charset=utf-8'});
    fileSaver.saveAs(blob, dataFile.filename);
  }
}
