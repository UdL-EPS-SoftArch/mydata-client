import {Component, OnInit} from '@angular/core';
import {DatasetService} from '../dataset.service';
import {Dataset} from '../dataset';
import {OwnerService} from '../../user/owner.service';

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
              private ownerService: OwnerService) {
  }

  onSearch(datasets) {
    this.datasets = datasets;
  }

  ngOnInit() {
    this.datasetService.getAllDatasetsOrderedByTitle().subscribe(
      datasets => {
        this.datasets = datasets;
        datasets.forEach(dataset => {
          this.datasetService.getTagsOfDataset(dataset.uri).subscribe(
            tags => {
              dataset.tags = tags;
            }
          );
          this.ownerService.getOwner(dataset._links.owner.href).subscribe(
            owner => {
              this.datasetOwners[dataset.uri] = owner.getUserName();
            });
        });
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
