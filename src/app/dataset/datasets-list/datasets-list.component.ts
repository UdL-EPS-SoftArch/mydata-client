import {Component, OnInit} from '@angular/core';
import {DatasetService} from '../dataset.service';
import {Dataset} from '../dataset';
import {DatasetOwnerService} from '../../user/dataset-owner.service';

@Component({
  selector: 'app-datasets-list',
  templateUrl: './datasets-list.component.html',
  styleUrls: ['./datasets-list.component.css']
})
export class DatasetsListComponent implements OnInit {
  public datasets: Dataset[] = [];
  public datasetOwners: {} = {};
  public errorMessage: string;

  constructor(private datasetService: DatasetService,
              private datasetOwnerService: DatasetOwnerService) {
  }

  onSearch(datasets) {
    this.datasets = datasets;
  }

  ngOnInit() {
    this.datasetService.getAllDatasetsOrderedByTitle().subscribe(
      datasets => {
        this.datasets = datasets;
        datasets.forEach(dataset => {
          this.datasetOwnerService.getDatasetOwner(dataset._links.owner.href).subscribe(
            owner => {
              this.datasetOwners[dataset.uri] = owner.getUserName();
            });
        });
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
