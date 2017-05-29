import {Component, OnInit} from '@angular/core';
import {DatasetService} from '../dataset.service';
import {Dataset} from '../dataset';
import {OwnerService} from '../../user/owner.service';
import {DataFileService} from '../datafile/datafile.service';
import {DataFile} from '../datafile/datafile';

@Component({
  selector: 'app-datasets-list',
  templateUrl: './datasets-list.component.html',
  styleUrls: ['./datasets-list.component.css']
})
export class DatasetsListComponent implements OnInit {
  public datasets: Dataset[] = [];
  public datafiles: DataFile [] = [];
  public datasetOwners: {} = {};
  public datafileOwners: {} = {};
  public errorMessage: string;

  constructor(private datasetService: DatasetService,
              private ownerService: OwnerService,
              private datafileService: DataFileService) {
  }

  onSearch(datasets) {
    this.datasets = datasets;
  }
  onSearch_datafiles(datafiles) {
    this.datafiles = datafiles;
  }

  ngOnInit() {
    this.datasetService.getAllDatasetsOrderedByTitle().subscribe(
      datasets => {
        this.datasets = datasets;
        datasets.forEach(dataset => {
          this.ownerService.getOwner(dataset._links.owner.href).subscribe(
            owner => {
              this.datasetOwners[dataset.uri] = owner.getUserName();
            });
        });
      },
      error => this.errorMessage = <any>error.message
    );

    this.datafileService.getAllDataFilesOrderedByTitle().subscribe(
      datafiles => {
        this.datafiles = datafiles;
        datafiles.forEach(datafile => {
          this.ownerService.getOwner(datafile._links.owner.href).subscribe(
            owner => {
              this.datafileOwners[datafile.uri] = owner.getUserName();
            });
        });
      },
      error => this.errorMessage = <any>error.message
    );


  }
}


