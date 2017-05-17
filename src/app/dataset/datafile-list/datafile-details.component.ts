import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFileService } from '../datafile/datafile.service';
import { DataFile } from '../datafile/datafile';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
declare const require: any;

@Component({
  selector: 'app-datafile-details',
  templateUrl: './datafile-details.component.html'
})
export class DatafileDetailsComponent implements OnInit {
  public datafile: DataFile = new DataFile();
  public errorMessage: string;
  public isOwner: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private datafileService: DataFileService,
              private authenticationService: AuthenticationBasicService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/dataFiles/${id}`;
        this.datafileService.getDataFile(uri).subscribe(
          datafile => {
            this.datafile = datafile;
          },
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onDownload(dataFile: DataFile) {
    const fileSaver = require('file-saver');
    const blob = new Blob([dataFile.content], {type: 'text/plain;charset=utf-8'});
    fileSaver.saveAs(blob, dataFile.filename);
  }

}
