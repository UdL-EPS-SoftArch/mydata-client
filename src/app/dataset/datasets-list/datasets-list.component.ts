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
  public totalItems = 64;
  public currentPage = 0;
  public smallnumPages = 0;

  constructor(private datasetService: DatasetService,
              private ownerService: OwnerService) {
  }

  onSearch(datasets) {
    this.datasets = datasets;
  }

  ngOnInit() {
    this.datasetService.getAllDatasetsOrderedByTitlePaginated(0).subscribe(
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
  }

  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
