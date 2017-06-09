import { Component, OnInit } from '@angular/core';
import { SchemaService } from '../schema.service';
import { Dataset } from '../../dataset/dataset';
import { ActivatedRoute } from '@angular/router';
import { OwnerService } from '../../user/owner.service';
import { TagService } from '../../tag/tag.service';

@Component({
  selector: 'app-datasets-list',
  templateUrl: '../../dataset/datasets-list/datasets-list.component.html',
  styleUrls: ['../../dataset/datasets-list/datasets-list.component.css']
})
export class SchemasDatasetListComponent implements OnInit {
  public datasets: Dataset[] = [];
  public errorMessage: string;
  public currentPage = 1;
  public maxSize = 5;
  public bigTotalItems: number;
  public itemsPerPage = 20;
  public datasetOwners: {} = {};

  constructor(private schemaService: SchemaService,
              private route: ActivatedRoute,
              private ownerService: OwnerService,
              private tagService: TagService) { }

  onSearch(datasets) {
    this.datasets = datasets;
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/schemas/${id}`;
        this.getDatasets(uri, 0, this.itemsPerPage);
      });
  }

  public getDatasets(uri: string, page: number, size: number) {
    this.schemaService.getDatasetsOfSchemaPaginated(uri, page, size).subscribe(
      pageWrapper => {
        this.datasets = pageWrapper.elements;
        this.bigTotalItems = pageWrapper.pageInfo.totalElements;
        this.itemsPerPage = pageWrapper.pageInfo.size;
        this.datasets.forEach(dataset => {
          this.ownerService.getOwner(dataset._links.owner.href).subscribe(
            owner => this.datasetOwners[dataset.uri] = owner.getUserName()
          );
          this.tagService.getTagsOfDataset(dataset.uri).subscribe(
            tags => dataset.tags = tags
          );
        });
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
