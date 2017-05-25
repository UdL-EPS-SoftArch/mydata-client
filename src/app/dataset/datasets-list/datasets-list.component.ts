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
  public currentPage = 1;
  public maxSize = 5;
  public bigTotalItems: number;
  public itemsPerPage: number;

  constructor(private datasetService: DatasetService,
              private ownerService: OwnerService) {
  }

  onSearch(datasets) {
    this.datasets = datasets;
  }

  ngOnInit() {
    this.getDatasets(0);
  }

  public getDatasets(page: number) {
    this.datasetService.getAllDatasetsOrderedByTitlePaginated(page).subscribe(
      pageWrapper => {
        this.datasets = pageWrapper.elements;
        this.bigTotalItems = pageWrapper.pageInfo.totalElements;
        this.itemsPerPage = pageWrapper.pageInfo.size;
        this.datasets.forEach(dataset => {
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
    this.getDatasets(event.page - 1);
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
